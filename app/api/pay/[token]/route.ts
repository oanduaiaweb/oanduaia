import { NextResponse } from 'next/server'
import { findPayment, updatePayment } from '@/lib/payments'
import { getStripe } from '@/lib/stripe'
import { SITE } from '@/lib/i18n'

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

  const stripe = getStripe()
  if (!stripe) return NextResponse.json({ error: 'not_configured' }, { status: 503 })

  const base = `${SITE}/${payment.lang}/pay/${payment.id}`
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: payment.email,
      // The amount comes from OUR record, never from the request body. A price posted by the
      // browser is a price the browser can change.
      line_items: [{
        quantity: 1,
        price_data: {
          currency: payment.currency,
          unit_amount: payment.amount,
          product_data: { name: 'Oanduaia', description: payment.reference.slice(0, 500) },
        },
      }],
      success_url: `${base}?paid=1`,
      cancel_url: base,
      locale: payment.lang === 'et' ? 'et' : payment.lang === 'ru' ? 'ru' : payment.lang === 'de' ? 'de' : 'en',
      metadata: { token: payment.id, name: payment.name },
    })
    await updatePayment(payment.id, p => { p.sessionId = session.id })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[pay] could not create a checkout session:', err)
    return NextResponse.json({ error: 'stripe_failed' }, { status: 502 })
  }
}
