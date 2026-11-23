import type Stripe from 'stripe'
import { updatePayment, type Payment } from './payments'
import { SITE } from './i18n'

const STRIPE_LOCALES = ['et', 'ru', 'de', 'es', 'sv', 'fi', 'lv'] as const

/**
 * One Stripe Checkout session for one payment record. The amount always comes from the record,
 * never from a request body — a price posted by a browser is a price the browser can change.
 *
 * `expiresAt` (unix seconds) is for online bookings: the session must die no later than the
 * nights stop being held for it, or a guest could pay for a night that went back on sale.
 */
export async function createCheckout(stripe: Stripe, payment: Payment, expiresAt?: number): Promise<string> {
  const base = `${SITE}/${payment.lang}/pay/${payment.id}`
  const locale = (STRIPE_LOCALES as readonly string[]).includes(payment.lang)
    ? payment.lang as (typeof STRIPE_LOCALES)[number]
    : 'en'
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: payment.email,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: payment.currency,
        unit_amount: payment.amount,
        product_data: {
          name: payment.voucher ? 'Oanduaia – kinkekaart / gift voucher' : 'Oanduaia',
          description: payment.reference.slice(0, 500),
        },
      },
    }],
    success_url: payment.voucher ? `${SITE}/${payment.lang}/gift/${payment.id}?paid=1` : `${base}?paid=1`,
    cancel_url: base,
    locale,
    ...(expiresAt ? { expires_at: expiresAt } : {}),
    metadata: { token: payment.id, name: payment.name },
  })
  await updatePayment(payment.id, p => { p.sessionId = session.id })
  if (!session.url) throw new Error('Stripe returned no checkout URL')
  return session.url
}

/** Stripe's floor for `expires_at` is 30 minutes; the hold outlives the session by a margin. */
export const SESSION_MINUTES = 31
export const HOLD_MINUTES = 36
