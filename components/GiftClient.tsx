'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { track } from '@/lib/analytics'
import { G, GIFT_AMOUNTS, GIFT_MAX, GIFT_MIN } from '@/lib/gift'

/** The voucher order form: amount, who it is from and for, then straight on to Stripe. */
export default function GiftClient() {
  const { lang } = useLanguage()
  const [amount, setAmount] = useState<number | 'other'>(200)
  const [other, setOther] = useState('')
  const [form, setForm] = useState({ name: '', email: '', recipient: '', message: '', company: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(false)

  const euros = amount === 'other' ? Math.round(Number(other)) : amount
  const valid = Number.isFinite(euros) && euros >= GIFT_MIN && euros <= GIFT_MAX

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!valid) return
    setBusy(true); setError(false)
    try {
      const res = await fetch('/api/gift', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: euros, lang }),
      })
      const j = await res.json()
      if (!res.ok || !j.token) throw new Error()
      track('gift_checkout', { lang, value: euros, currency: 'EUR' })
      const pay = await fetch(`/api/pay/${j.token}`, { method: 'POST' }).then(r => r.json())
      if (!pay.url) throw new Error()
      window.location.href = pay.url
    } catch {
      setError(true); setBusy(false)
    }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <section className="gift">
      <div className="gift-photo">
        <Image src="/galerii/saunamaja/ohtuvalgus.jpeg" alt="" fill priority fetchPriority="high"
          sizes="(max-width: 900px) 100vw, 45vw" quality={70} style={{ objectFit: 'cover' }} />
      </div>
      <div className="gift-body">
        <p className="section-label">{G.label[lang]}</p>
        <h1 className="gift-title">{G.title[lang]}</h1>
        <p className="gift-lead">{G.lead[lang]}</p>

        <form className="gift-form" onSubmit={submit}>
          <fieldset className="gift-amounts">
            <legend className="form-label">{G.amount[lang]}</legend>
            {GIFT_AMOUNTS.map(a => (
              <button key={a} type="button" className={`gift-amount${amount === a ? ' is-on' : ''}`}
                aria-pressed={amount === a} onClick={() => setAmount(a)}>{a} €</button>
            ))}
            <button type="button" className={`gift-amount${amount === 'other' ? ' is-on' : ''}`}
              aria-pressed={amount === 'other'} onClick={() => setAmount('other')}>{G.other[lang]}</button>
            {amount === 'other' && (
              <input className="form-input gift-other" inputMode="numeric" placeholder={`${GIFT_MIN}–${GIFT_MAX} €`}
                value={other} onChange={e => setOther(e.target.value.replace(/[^\d]/g, ''))} aria-label={G.other[lang]} />
            )}
            <p className="gift-hint">{G.hint[lang]}</p>
          </fieldset>

          <label className="form-label" htmlFor="g-name">{G.buyer[lang]}</label>
          <input id="g-name" className="form-input" required value={form.name} onChange={set('name')} autoComplete="name" />
          <label className="form-label" htmlFor="g-email">{G.email[lang]}</label>
          <input id="g-email" className="form-input" type="email" required value={form.email} onChange={set('email')} autoComplete="email" />
          <label className="form-label" htmlFor="g-for">{G.recipient[lang]}</label>
          <input id="g-for" className="form-input" value={form.recipient} onChange={set('recipient')} />
          <label className="form-label" htmlFor="g-msg">{G.message[lang]}</label>
          <textarea id="g-msg" className="form-textarea" rows={3} maxLength={400} value={form.message} onChange={set('message')} />
          <div className="form-hp" aria-hidden="true">
            <input name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={set('company')} />
          </div>

          {error && <p className="booking-error">{G.error[lang]}</p>}
          <button type="submit" className="btn-dark gift-submit" disabled={busy || !valid}>
            {busy ? G.paying[lang] : `${G.pay[lang]}${valid ? ` · ${euros} €` : ''}`}
          </button>
          <p className="gift-note">{G.note[lang]}</p>
        </form>
      </div>
    </section>
  )
}
