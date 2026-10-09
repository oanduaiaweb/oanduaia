import type { Metadata } from 'next'
import { findPayment, formatEur } from '@/lib/payments'
import { LOCALES } from '@/lib/i18n'
import type { Lang } from '@/lib/translations'
import PayClient from './PayClient'

/**
 * A payment page belongs to one guest and must never be indexed, cached at the edge, or
 * summarised into a search result. `noindex` plus dynamic rendering; the token is unguessable,
 * but that is not a reason to let a crawler that is handed the link keep a copy.
 */
export const dynamic = 'force-dynamic'

export function generateMetadata(): Metadata {
  return { title: 'Oanduaia', robots: { index: false, follow: false, nocache: true } }
}

export default async function PayPage({
  params,
}: { params: Promise<{ lang: string; token: string }> }) {
  const { lang: rawLang, token } = await params
  const lang = ((LOCALES as readonly string[]).includes(rawLang) ? rawLang : 'et') as Lang

  const payment = await findPayment(token)

  return (
    <PayClient
      lang={lang}
      token={token}
      // Only what the page has to show. The record also carries the Stripe ids, which are
      // ours and have no business being in a page anyone with the link can open.
      payment={
        payment
          ? {
              name: payment.name,
              reference: payment.reference,
              amount: formatEur(payment.amount),
              status: payment.status,
              method: payment.method ?? 'card',
            }
          : null
      }
    />
  )
}
