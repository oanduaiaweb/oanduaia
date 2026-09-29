import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SESSION_COOKIE, verifySession } from '@/lib/adminAuth'
import { addPayment, eurosToCents, readPayments, updatePayment } from '@/lib/payments'
import { stripeConfigured, stripeLive } from '@/lib/stripe'
import { LOCALES } from '@/lib/i18n'
import { Resend } from 'resend'
import { randomUUID } from 'node:crypto'
import { dueDate, linkLetter } from '@/lib/paymentEmail'
import { overlaps, readBookings, validateBlock, writeBookings, type Block } from '@/lib/bookings'
import { type HouseSlug } from '@/lib/availability'

const SITE = 'https://www.oanduaia.ee'

// Per request, never at module scope: module-scope construction runs during the build's
// page-data collection and throws wherever the key is not set.
function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not configured')
  return new Resend(key)
}

export const dynamic = 'force-dynamic'

async function authed(): Promise<boolean> {
  return verifySession((await cookies()).get(SESSION_COOKIE)?.value)
}
const denied = () => NextResponse.json({ error: 'Not authorised' }, { status: 401 })

export async function GET() {
  if (!await authed()) return denied()
  const store = await readPayments()
  return NextResponse.json({
    payments: store.payments,
    // So the admin can say plainly whether a link will actually take money.
    stripe: { configured: stripeConfigured(), live: stripeLive() },
  })
}

/** Creates one link. Creating it charges nobody — the guest still has to open it and pay. */
export async function POST(req: Request) {
  if (!await authed()) return denied()

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Bad request' }, { status: 400 })

  const { name, email, reference, amount, lang } = body
  if (!name || !email || !reference) {
    return NextResponse.json({ error: 'Name, e-mail and what it is for are all needed.' }, { status: 400 })
  }
  const cents = eurosToCents(String(amount ?? ''))
  if (cents === null) {
    return NextResponse.json({ error: 'That amount is not a euro figure (minimum 0.50).' }, { status: 400 })
  }

  const { house, checkIn, checkOut, send } = body
  const wantsStay = Boolean(house && checkIn && checkOut)

  /*
   * Holding the nights is the whole point of sending a link, in Mikk's words: "nobody can book
   * after i sent the link". The block is what makes that true beyond this site — our iCal feed
   * publishes it as CLOSED, so Booking.com stops selling the same night.
   *
   * It is created BEFORE the record, so a clash fails without leaving a link behind.
   */
  let blockId: string | undefined
  if (wantsStay) {
    const problem = validateBlock(String(house), String(checkIn), String(checkOut))
    if (problem) return NextResponse.json({ error: problem }, { status: 400 })
    const bookings = await readBookings()
    if (overlaps(bookings, house as HouseSlug, checkIn, checkOut)) {
      return NextResponse.json({ error: 'Those nights are already held.' }, { status: 409 })
    }
    const block: Block = {
      id: randomUUID(),
      from: String(checkIn),
      to: String(checkOut),
      guest: String(name).slice(0, 80),
      note: 'Held for a payment link',
      created: new Date().toISOString(),
    }
    bookings.blocks[house as HouseSlug] = [...(bookings.blocks[house as HouseSlug] ?? []), block]
    await writeBookings(bookings)
    blockId = block.id
  }

  const today = new Date().toISOString().slice(0, 10)
  const record = await addPayment({
    name: String(name).slice(0, 120),
    email: String(email).slice(0, 200),
    reference: String(reference).slice(0, 400),
    lang: (LOCALES as readonly string[]).includes(String(lang)) ? String(lang) : 'et',
    amount: cents,
    currency: 'eur',
    ...(wantsStay ? {
      house: String(house),
      checkIn: String(checkIn),
      checkOut: String(checkOut),
      dueAt: dueDate(today, String(checkIn)),
      blockId,
    } : {}),
  })

  /*
   * The letter goes last, and a failure here is reported without losing the link: the record
   * and the block already exist, and the admin can copy the URL by hand. Silence would be the
   * worse outcome — that is exactly how Janine ended up waiting a fortnight for a link that
   * was promised and never sent.
   */
  let mailError: string | undefined
  if (send) {
    try {
      const letter = linkLetter({
        guest: record.name,
        reference: record.reference,
        amountCents: record.amount,
        payUrl: `${SITE}/${record.lang}/pay/${record.id}`,
        dueAt: record.dueAt ?? today,
        lang: record.lang,
      })
      await getResend().emails.send({
        from: 'Oanduaia <info@oanduaia.ee>',
        to: record.email,
        replyTo: 'info@oanduaia.ee',
        subject: letter.subject,
        text: letter.text,
      })
      await updatePayment(record.id, p => { p.mailedAt = new Date().toISOString() })
      record.mailedAt = new Date().toISOString()
    } catch (error) {
      console.error('[payments] link e-mail failed:', error)
      mailError = 'The link was created but the e-mail did not go out.'
    }
  }

  return NextResponse.json({ ok: true, payment: record, ...(mailError ? { mailError } : {}) })
}

/** Cancels a link that has not been paid. Never touches one that has. */
export async function PATCH(req: Request) {
  if (!await authed()) return denied()
  const body = await req.json().catch(() => null)
  if (!body?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const store = await readPayments()
  const found = store.payments.find(p => p.id === body.id)
  if (!found) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (found.status === 'paid') {
    return NextResponse.json({ error: 'That one is already paid — refund it in Stripe instead.' }, { status: 409 })
  }
  /*
   * Re-send an existing link, optionally with a note of our own above the standard letter.
   *
   * Added because the letter had to go out while Gmail was locked behind a "verify it's you"
   * prompt, and recreating the link to get it sent would have minted a new URL and disturbed
   * the calendar hold. "Send that one again" is wanted often enough on its own: a guest who
   * lost the mail, or a deadline worth repeating.
   */
  if (body.resend) {
    if (found.status !== 'unpaid') {
      return NextResponse.json({ error: 'Only an unpaid link can be sent again.' }, { status: 409 })
    }
    const today = new Date().toISOString().slice(0, 10)
    const letter = linkLetter({
      guest: found.name,
      reference: found.reference,
      amountCents: found.amount,
      payUrl: `${SITE}/${found.lang}/pay/${found.id}`,
      dueAt: found.dueAt ?? today,
      lang: found.lang,
    })
    const note = typeof body.note === 'string' && body.note.trim()
      ? `${body.note.trim()}\n\n`
      : ''
    try {
      await getResend().emails.send({
        from: 'Oanduaia <info@oanduaia.ee>',
        to: found.email,
        replyTo: 'info@oanduaia.ee',
        subject: letter.subject,
        text: note + letter.text,
      })
    } catch (error) {
      console.error('[payments] resend failed:', error)
      return NextResponse.json({ error: 'The e-mail did not go out.' }, { status: 502 })
    }
    const sent = await updatePayment(body.id, p => { p.mailedAt = new Date().toISOString() })
    return NextResponse.json({ ok: true, payment: sent, mailed: true })
  }

  const updated = await updatePayment(body.id, p => { p.status = body.cancel ? 'cancelled' : 'unpaid' })
  return NextResponse.json({ ok: true, payment: updated })
}
