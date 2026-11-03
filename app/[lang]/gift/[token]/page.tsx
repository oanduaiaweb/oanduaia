import type { Metadata } from 'next'
import { findPayment } from '@/lib/payments'
import { LOCALES } from '@/lib/i18n'
import type { Lang } from '@/lib/translations'
import { G } from '@/lib/gift'
import PrintButton from './PrintButton'
import PurchaseEvent from '@/components/PurchaseEvent'

/** One buyer's voucher: never indexed, rendered fresh so a just-confirmed payment shows. */
export const dynamic = 'force-dynamic'

export function generateMetadata(): Metadata {
  return { title: 'Oanduaia', robots: { index: false, follow: false, nocache: true } }
}

const fmtDate = (d: string, lang: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString(lang === 'en' ? 'en-GB' : lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export default async function VoucherPage({ params }: { params: Promise<{ lang: string; token: string }> }) {
  const { lang: raw, token } = await params
  const lang = ((LOCALES as readonly string[]).includes(raw) ? raw : 'et') as Lang
  const p = await findPayment(token)

  if (!p?.voucher) {
    return <main className="voucher-page"><p className="voucher-wait">{G.error[lang]}</p></main>
  }
  if (p.status !== 'paid' || !p.voucher.validUntil) {
    return <main className="voucher-page"><PurchaseEvent id={p.id} euros={p.amount / 100} kind="gift" /><p className="voucher-wait">{G.pending[lang]}</p></main>
  }

  return (
    <main className="voucher-page">
      <article className="voucher">
        <p className="voucher-brand">OANDUAIA</p>
        <p className="voucher-kind">{G.name[lang]}</p>
        <p className="voucher-value">{p.amount / 100} €</p>
        {p.voucher.recipient && <p className="voucher-line"><span>{G.for[lang]}</span>{p.voucher.recipient}</p>}
        <p className="voucher-line"><span>{G.from[lang]}</span>{p.name}</p>
        {p.voucher.message && <p className="voucher-message">“{p.voucher.message}”</p>}
        <div className="voucher-facts">
          <p><span>{G.code[lang]}</span><b>{p.voucher.code}</b></p>
          <p><span>{G.valid[lang]}</span><b>{fmtDate(p.voucher.validUntil, lang)}</b></p>
        </div>
        <p className="voucher-how">{G.howTo[lang]}</p>
        <p className="voucher-site">www.oanduaia.ee · Oandu, Lahemaa</p>
      </article>
      <PurchaseEvent id={p.id} euros={p.amount / 100} kind="gift" />
      <PrintButton label={G.print[lang]} />
    </main>
  )
}
