'use client'

import { useEffect, useState } from 'react'
import { T, type Lang } from '@/lib/translations'

type View = { name: string; reference: string; amount: string; status: string }

export default function PayClient({
  lang, token, payment,
}: { lang: Lang; token: string; payment: View | null }) {
  const t = T.pay
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [justPaid, setJustPaid] = useState(false)

  // Stripe sends the guest back with ?paid=1. The webhook is what actually marks the record
  // paid — this only decides what the guest sees on the way back, and the two can be a second
  // apart, so the page trusts either one rather than showing "unpaid" to someone who just paid.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('paid') === '1') setJustPaid(true)
  }, [])

  if (!payment || payment.status === 'cancelled') {
    return (
      <main className="pay">
        <div className="pay-card">
          <p className="pay-eyebrow">{t.eyebrow[lang]}</p>
          <h1 className="pay-h1">{t.goneH[lang]}</h1>
          <p className="pay-note">{t.goneBody[lang]}</p>
        </div>
      </main>
    )
  }

  if (payment.status === 'paid' || justPaid) {
    return (
      <main className="pay">
        <div className="pay-card">
          <p className="pay-eyebrow">{t.eyebrow[lang]}</p>
          <h1 className="pay-h1">{t.paidH[lang]}</h1>
          <p className="pay-note">{t.paidBody[lang]}</p>
          <dl className="pay-rows">
            <div><dt>{t.what[lang]}</dt><dd>{payment.reference}</dd></div>
            <div><dt>{t.amount[lang]}</dt><dd className="pay-amount">{payment.amount} €</dd></div>
          </dl>
        </div>
      </main>
    )
  }

  const start = async () => {
    setBusy(true); setError('')
    try {
      const res = await fetch(`/api/pay/${token}`, { method: 'POST' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.url) throw new Error(data.error ?? 'failed')
      window.location.href = data.url
    } catch {
      setError(t.failed[lang])
      setBusy(false)
    }
  }

  return (
    <main className="pay">
      <div className="pay-card">
        <p className="pay-eyebrow">{t.eyebrow[lang]}</p>
        <h1 className="pay-h1">{t.h1[lang]}</h1>

        <dl className="pay-rows">
          <div><dt>{t.forWhom[lang]}</dt><dd>{payment.name}</dd></div>
          <div><dt>{t.what[lang]}</dt><dd>{payment.reference}</dd></div>
          <div><dt>{t.amount[lang]}</dt><dd className="pay-amount">{payment.amount} €</dd></div>
        </dl>

        <button type="button" className="btn-dark pay-cta" onClick={start} disabled={busy}>
          {busy ? t.working[lang] : t.cta[lang]}
        </button>

        {error && <p className="pay-error">{error}</p>}
        <p className="pay-note">{t.secure[lang]}</p>
      </div>
    </main>
  )
}
