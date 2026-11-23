import { NextResponse } from 'next/server'
import { findPayment, updatePayment } from '@/lib/payments'
import { getStripe } from '@/lib/stripe'
import { createCheckout, SESSION_MINUTES, HOLD_MINUTES } from '@/lib/checkout'
import { readBookings, writeBookings } from '@/lib/bookings'

export const dynamic = 'force-dynamic'

/**
 * Starts a Stripe Checkout session for one payment link and hands back the URL to send the
 * guest to. Deliberately a POST from the pay page rather than something that happens on page
 * load: opening a link should never begin a payment, only a click should.
 *
 * Card, Apple Pay and Google Pay all come from Checkout itself — Stripe shows whichever the
 * guest's device supports. There is no card form on our side and there never will be; we do
 * not want card numbers touching this server.
 */
export async function POST(_req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params

  const payment = await findPayment(token)
  if (!payment) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  if (payment.status === 'paid') return NextResponse.json({ error: 'already_paid' }, { status: 409 })
  if (payment.status === 'cancelled') return NextResponse.json({ error: 'cancelled' }, { status: 409 })
  // Arranged to be settled at the house. The pay page is reachable by anyone holding the URL,
  // so this is refused here rather than only left out of the admin.
  if (payment.method === 'cash') return NextResponse.json({ error: 'cash_booking' }, { status: 409 })

  const stripe = getStripe()
  if (!stripe) return NextResponse.json({ error: 'not_configured' }, { status: 503 })

  /*
   * An online booking holds its nights for a few minutes only. Past that they may already be
   * someone else's, so the page must not take money for them; within it, a guest who came back
   * from Stripe without paying gets a fresh session and the hold is stretched to cover it.
   */
  let expiresAt: number | undefined
  if (payment.source === 'online') {
    if (payment.status === 'expired' || !payment.holdUntil || Date.parse(payment.holdUntil) <= Date.now()) {
      return NextResponse.json({ error: 'hold_lapsed' }, { status: 409 })
    }
    const now = Date.now()
    expiresAt = Math.floor(now / 1000) + SESSION_MINUTES * 60
    const holdUntil = new Date(now + HOLD_MINUTES * 60_000).toISOString()
    const bookings = await readBookings()
    for (const list of Object.values(bookings.blocks)) {
      const b = list.find(x => x.id === payment.blockId)
      if (b) b.holdUntil = holdUntil
    }
    await writeBookings(bookings)
    await updatePayment(payment.id, p => { p.holdUntil = holdUntil })
  } else if (payment.status === 'expired') {
    return NextResponse.json({ error: 'expired' }, { status: 409 })
  }

  try {
    return NextResponse.json({ url: await createCheckout(stripe, payment, expiresAt) })
  } catch (err) {
    console.error('[pay] could not create a checkout session:', err)
    return NextResponse.json({ error: 'stripe_failed' }, { status: 502 })
  }
}
