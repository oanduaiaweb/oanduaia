import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { Resend } from 'resend'
import { SESSION_COOKIE, verifySession } from '@/lib/adminAuth'
import { readEnquiries } from '@/lib/enquiries'
import { readPayments } from '@/lib/payments'
import { readBookings } from '@/lib/bookings'
import { todayTallinn } from '@/lib/enquiryStatus'
import { buildCustomers, customerKey, readCustomerStore, writeCustomerStore, type CustomerNote } from '@/lib/customers'
import { christmasLetter } from '@/lib/christmasEmail'

export const dynamic = 'force-dynamic'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not configured')
  return new Resend(key)
}

async function authed(): Promise<boolean> {
  return verifySession((await cookies()).get(SESSION_COOKIE)?.value)
}
const denied = () => NextResponse.json({ error: 'Not authorised' }, { status: 401 })

const isDay = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

async function load() {
  const [enq, pay, cal, store] = await Promise.all([readEnquiries(), readPayments(), readBookings(), readCustomerStore()])
  return { store, customers: buildCustomers(enq.enquiries, pay.payments, cal.blocks, store, todayTallinn()) }
}

export async function GET() {
  if (!await authed()) return denied()
  const { customers } = await load()
  return NextResponse.json({ customers })
}

const text = (v: unknown, n: number) => String(v ?? '').trim().slice(0, n)

/** Edits one person: phone, note, hidden, stayed, review asked, and so on. */
export async function PATCH(req: Request) {
  if (!await authed()) return denied()
  const b = await req.json().catch(() => null)
  if (!b?.key) return NextResponse.json({ error: 'Missing key' }, { status: 400 })

  const store = await readCustomerStore()
  const n: CustomerNote = store.people[b.key] ?? {}
  for (const [field, max] of [['name', 120], ['email', 200], ['phone', 40], ['lang', 5], ['note', 1000]] as const) {
    if (field in b) n[field] = text(b[field], max) || undefined
  }
  if ('hidden' in b) n.hidden = !!b.hidden || undefined
  if ('stayed' in b) n.stayed = typeof b.stayed === 'boolean' ? b.stayed : undefined
  for (const field of ['lastStay', 'reviewAskedAt', 'christmasSentAt'] as const) {
    if (field in b) n[field] = isDay(b[field]) ? b[field] : undefined
  }
  store.people[b.key] = n
  await writeCustomerStore(store)
  return NextResponse.json({ ok: true })
}

/**
 * Two jobs:
 *   · { action: 'add', name, email?, phone?, ... } — a guest who never used the form or the mail,
 *     e.g. a Booking.com or phone booking.
 *   · { action: 'christmas', keys: [...] } — sends the greeting to those people, one mail each,
 *     and stamps the date so nobody gets it twice.
 */
export async function POST(req: Request) {
  if (!await authed()) return denied()
  const b = await req.json().catch(() => null)

  if (b?.action === 'add') {
    const name = text(b.name, 120)
    if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 })
    const email = text(b.email, 200).toLowerCase()
    const phone = text(b.phone, 40)
    const store = await readCustomerStore()
    const key = customerKey(email, phone, name)
    store.people[key] = {
      ...store.people[key],
      manual: true,
      name,
      email: email || undefined,
      phone: phone || undefined,
      lang: text(b.lang, 5) || undefined,
      note: text(b.note, 1000) || undefined,
      lastStay: isDay(b.lastStay) ? b.lastStay : undefined,
    }
    await writeCustomerStore(store)
    return NextResponse.json({ ok: true })
  }

  if (b?.action === 'christmas' && Array.isArray(b.keys)) {
    const { store, customers } = await load()
    const wanted = new Set<string>(b.keys.map(String))
    const today = todayTallinn()
    const sent: string[] = []
    const failed: string[] = []
    for (const c of customers) {
      if (!wanted.has(c.key) || c.hidden || c.christmasSentAt || !isEmail(c.email)) continue
      const letter = christmasLetter(c.name, c.lang, c.stayed)
      try {
        await getResend().emails.send({
          from: 'Oanduaia <info@oanduaia.ee>',
          to: c.email,
          replyTo: 'info@oanduaia.ee',
          subject: letter.subject,
          text: letter.text,
        })
        store.people[c.key] = { ...store.people[c.key], christmasSentAt: today }
        sent.push(c.name)
      } catch (error) {
        console.error('[customers] christmas mail failed:', c.email, error)
        failed.push(c.name)
      }
      // Resend allows two requests a second.
      await new Promise(r => setTimeout(r, 600))
    }
    await writeCustomerStore(store)
    return NextResponse.json({ ok: true, sent, failed })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
