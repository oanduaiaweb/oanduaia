import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SESSION_COOKIE, verifySession } from '@/lib/adminAuth'
import { addPayment, eurosToCents, readPayments, updatePayment } from '@/lib/payments'
import { stripeConfigured, stripeLive } from '@/lib/stripe'
import { LOCALES } from '@/lib/i18n'

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

  const record = await addPayment({
    name: String(name).slice(0, 120),
    email: String(email).slice(0, 200),
    reference: String(reference).slice(0, 400),
    lang: (LOCALES as readonly string[]).includes(String(lang)) ? String(lang) : 'et',
    amount: cents,
    currency: 'eur',
  })
  return NextResponse.json({ ok: true, payment: record })
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
  const updated = await updatePayment(body.id, p => { p.status = body.cancel ? 'cancelled' : 'unpaid' })
  return NextResponse.json({ ok: true, payment: updated })
}
