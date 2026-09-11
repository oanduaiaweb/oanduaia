import Stripe from 'stripe'

/**
 * The Stripe client, built per call rather than at module scope.
 *
 * Module-scope construction runs during the build's page-data collection, where the key is not
 * set, and fails the whole build — the same trap `app/api/contact/route.ts` documents for Resend.
 * It also means the site deploys and runs perfectly well BEFORE Mikk has added the keys: every
 * card path reports "not configured yet" instead of the page falling over.
 */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  return new Stripe(key, { apiVersion: '2026-08-26.dahlia' })
}

export const stripeConfigured = () => !!process.env.STRIPE_SECRET_KEY

/**
 * Whether we are pointed at a real Stripe account or a test one, decided by the key itself so
 * it can never disagree with reality. Surfaced in /admin — sending a guest a test-mode link
 * takes no money and nobody finds out until they arrive.
 */
export const stripeLive = () => (process.env.STRIPE_SECRET_KEY ?? '').startsWith('sk_live_')
