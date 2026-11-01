import { NextResponse } from 'next/server'
import { readPayments, writePayments, newToken, type Payment } from '@/lib/payments'
import { GIFT_MAX, GIFT_MIN, giftCode } from '@/lib/gift'
import { LOCALES } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

/** Unpaid voucher orders kept at most; a bot filling the form must never push real records out. */
const MAX_OPEN = 40
const STALE_MS = 48 * 3600_000

/**
 * Starts a gift voucher purchase: writes an unpaid payment record marked as a voucher and
 * returns its token. The page then asks /api/pay/[token] for the Stripe Checkout URL, exactly
 * as a guest's payment link does — one payment path, not two.
 */
export async function POST(req: Request) {
  const b = await req.json().catch(() => null)
  if (!b || b.company) return NextResponse.json({ ok: true })

  const euros = Math.round(Number(b.amount))
  const name = String(b.name ?? '').trim().slice(0, 120)
  const email = String(b.email ?? '').trim().slice(0, 200)
  if (!Number.isFinite(euros) || euros < GIFT_MIN || euros > GIFT_MAX) {
    return NextResponse.json({ error: 'amount' }, { status: 400 })
  }
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'fields' }, { status: 400 })
  }
  const lang = (LOCALES as readonly string[]).includes(b.lang) ? b.lang : 'en'
  const recipient = b.recipient ? String(b.recipient).trim().slice(0, 120) : undefined
  const message = b.message ? String(b.message).trim().slice(0, 400) : undefined

  const store = await readPayments()
  // Abandoned voucher checkouts are noise: drop the stale ones and cap the rest.
  const now = Date.now()
  store.payments = store.payments.filter(p =>
    !(p.voucher && p.status === 'unpaid' && now - Date.parse(p.created) > STALE_MS))
  const open = store.payments.filter(p => p.voucher && p.status === 'unpaid')
  if (open.length >= MAX_OPEN) {
    const drop = new Set(open.slice(MAX_OPEN - 1).map(p => p.id))
    store.payments = store.payments.filter(p => !drop.has(p.id))
  }

  const id = newToken()
  const code = giftCode(id)
  const record: Payment = {
    id,
    created: new Date().toISOString(),
    status: 'unpaid',
    name,
    email,
    lang,
    amount: euros * 100,
    currency: 'eur',
    method: 'card',
    reference: `Kinkekaart ${code} · ${euros} €${recipient ? ` · ${recipient}` : ''}`,
    voucher: { code, recipient, message },
  }
  store.payments.unshift(record)
  await writePayments(store)
  return NextResponse.json({ ok: true, token: id })
}
