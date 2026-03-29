'use client'

import { FormEvent, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

export default function Booking() {
  const { lang } = useLanguage()
  const t = T.booking
  const [form, setForm] = useState({ nimi: '', email: '', kuupaevad: '', sonum: '' })
  const [sent, setSent] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(t.eSubj[lang])
    const body = encodeURIComponent(
      `${t.eName[lang]}: ${form.nimi}\n${t.eEmail[lang]}: ${form.email}\n${t.eDates[lang]}: ${form.kuupaevad}\n\n${form.sonum}`
    )
    window.location.href = `mailto:info@oanduaia.ee?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section className="booking-section" id="broneeri">
      <p className="booking-eyebrow">{t.label[lang]}</p>
      <h2 className="booking-heading reveal">
        {t.h1[lang]} <em>{t.h2em[lang]}</em>
      </h2>
      <p className="booking-sub reveal reveal-delay-1">{t.sub[lang]}</p>

      {sent ? (
        <p className="booking-success reveal">{t.success[lang]}</p>
      ) : (
        <form className="booking-form reveal reveal-delay-2" onSubmit={submit} noValidate>
          <div className="form-field">
            <label className="form-label" htmlFor="nimi">{t.lNimi[lang]}</label>
            <input className="form-input" id="nimi" name="nimi" type="text"
              placeholder={t.pNimi[lang]} value={form.nimi} onChange={handle} required />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="email">{t.lEmail[lang]}</label>
            <input className="form-input" id="email" name="email" type="email"
              placeholder={t.pEmail[lang]} value={form.email} onChange={handle} required />
          </div>
          <div className="form-field form-field--full">
            <label className="form-label" htmlFor="kuupaevad">{t.lKuup[lang]}</label>
            <input className="form-input" id="kuupaevad" name="kuupaevad" type="text"
              placeholder={t.pKuup[lang]} value={form.kuupaevad} onChange={handle} />
          </div>
          <div className="form-field form-field--full">
            <label className="form-label" htmlFor="sonum">{t.lSonum[lang]}</label>
            <textarea className="form-textarea" id="sonum" name="sonum"
              placeholder={t.pSonum[lang]} value={form.sonum} onChange={handle} rows={4} />
          </div>
          <div className="form-field form-field--full form-submit">
            <button type="submit" className="btn-dark">{t.submit[lang]}</button>
          </div>
        </form>
      )}
    </section>
  )
}
