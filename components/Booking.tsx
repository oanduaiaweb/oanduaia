'use client'

import { FormEvent, useEffect, useState } from 'react'
import { track } from '@/lib/analytics'
import { useLanguage } from '@/contexts/LanguageContext'
import { useBookingDraft } from '@/contexts/BookingDraftContext'
import { T } from '@/lib/translations'

export default function Booking() {
  const { lang } = useLanguage()
  const t = T.booking
  const { draft } = useBookingDraft()
  const [form, setForm] = useState({ nimi: '', email: '', telefon: '', kuupaevad: '', sonum: '', company: '' })
  /**
   * What the calendar picked, kept apart from whatever the guest types. Mixing the two into
   * the textarea means a second trip through the calendar either duplicates the summary or
   * eats the guest's own words.
   */
  const [summary, setSummary] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!draft) return
    setSummary(draft.message)
    setForm(prev => ({ ...prev, kuupaevad: draft.dates }))
    setSent(false)
  }, [draft])

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.nimi,
          email: form.email,
          phone: form.telefon,
          dates: form.kuupaevad,
          message: [summary, form.sonum].filter(Boolean).join('\n'),
          subject: t.eSubj[lang],
          // So the admin list shows which language to answer in, without guessing from the text.
          lang,
          company: form.company,
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      /*
       * The conversion. Everything else on this site exists to produce this event, so it
       * carries the language and whether the calendar filled the dates in — that is how
       * you find out which language and which path actually produce guests.
       */
      track('enquiry_sent', { lang, from_calendar: Boolean(draft) })
    } catch {
      setError(true)
      // Tracked too: a form that silently fails is the worst thing that can happen here,
      // and without this the only symptom is enquiries quietly stopping.
      track('enquiry_failed', { lang })
    } finally {
      setSending(false)
    }
  }

  // The intro to all of this now lives above the calendar; this section is just the message.
  return (
    <section className="booking-section booking-section--form" id="vorm">
      {/*
        Beside the form, not above the calendar. Someone reads this at the moment they are
        deciding whether to send it here or go back to the channel — which is the only
        moment the argument is worth making.
      */}
      <aside className="booking-direct reveal reveal-delay-1">
        <p className="booking-direct-label">{t.directLabel[lang]}</p>
        <ul className="booking-direct-list">
          {t.direct.map(d => <li key={d.et}>{d[lang]}</li>)}
        </ul>
      </aside>

      {sent ? (
        <div className="booking-success">
          <h3 className="booking-success-title">{t.success[lang]}</h3>
          <p className="booking-success-sub">{t.successSub[lang]}</p>
          <p className="booking-success-sub booking-success-spam">{t.successSpam[lang].replace('{email}', form.email)}</p>
        </div>
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
          <div className="form-field">
            <label className="form-label" htmlFor="telefon">{t.lPhone[lang]}</label>
            <input className="form-input" id="telefon" name="telefon" type="tel" autoComplete="tel"
              placeholder={t.pPhone[lang]} value={form.telefon} onChange={handle} />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="kuupaevad">{t.lKuup[lang]}</label>
            <input className="form-input" id="kuupaevad" name="kuupaevad" type="text"
              placeholder={t.pKuup[lang]} value={form.kuupaevad} onChange={handle} />
          </div>
          <div className="form-hp" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off"
              value={form.company} onChange={handle} />
          </div>
          {summary && (
            <div className="form-field form-field--full">
              <p className="booking-summary">{summary.trim()}</p>
            </div>
          )}
          <div className="form-field form-field--full">
            <label className="form-label" htmlFor="sonum">{t.lSonum[lang]}</label>
            <textarea className="form-textarea" id="sonum" name="sonum"
              placeholder={t.pSonum[lang]} value={form.sonum} onChange={handle} rows={4} />
          </div>
          {error && <p className="booking-error">{t.error[lang]}</p>}
          <div className="form-field form-field--full form-submit">
            <button type="submit" className="btn-dark" disabled={sending}>
              {sending ? t.sending[lang] : t.submit[lang]}
            </button>
          </div>
        </form>
      )}
    </section>
  )
}
