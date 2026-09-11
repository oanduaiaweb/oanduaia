import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { updatePayment } from '@/lib/payments'
import { getStripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

/**
 * Stripe telling us a payment went through.
 *
 * The signature check is not optional and there is no fallback path around it. This endpoint is
 * public — anyone can POST to it — and without verification a stranger could mark any stay paid
 * simply by knowing the shape of the JSON. If the signing secret is missing we refuse the
 * request rather than trusting the body.
 *
 * The raw body must be read as TEXT, before any parsing: Stripe signs the exact bytes, and
 * `req.json()` would re-serialise them into something that no longer matches.
 */
export async function POST(req: Request) {
  const stripe = getStripe()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!stripe || !secret) {
    console.error('[stripe webhook] not configured — refusing to trust an unverified body')
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) return NextResponse.json({ error: 'unsigned' }, { status: 400 })

  const raw = await req.text()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(raw, signature, secret)
  } catch (err) {
    console.error('[stripe webhook] bad signature:', err)
    return NextResponse.json({ error: 'bad_signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const token = session.metadata?.token
    if (token) {
      const updated = await updatePayment(token, p => {
        p.status = 'paid'
        p.paidAt = new Date().toISOString()
        p.sessionId = session.id
        p.paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : undefined
      })
      if (!updated) console.error('[stripe webhook] paid session for an unknown token:', token)
    }
  }

  // Always 200 for a verified event, even one we ignore — a non-2xx makes Stripe retry for days.
  return NextResponse.json({ received: true })
}
