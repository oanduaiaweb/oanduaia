'use client'

import { FormEvent, useState } from 'react'

export default function Booking() {
  const [form, setForm] = useState({ nimi: '', email: '', kuupaevad: '', sonum: '' })
  const [sent, setSent] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('Pakkumise päring - Oanduaia')
    const body = encodeURIComponent(
      `Nimi: ${form.nimi}\nE-post: ${form.email}\nKuupäevad: ${form.kuupaevad}\n\n${form.sonum}`
    )
    window.location.href = `mailto:info@oanduaia.ee?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section className="booking-section" id="broneeri">
      <p className="booking-eyebrow">Reserveerimine</p>
      <h2 className="booking-heading reveal">
        Millal sa <em>tuled?</em>
      </h2>
      <p className="booking-sub reveal reveal-delay-1">
        Kirjuta meile, ootame Sind.
      </p>

      {sent ? (
        <p className="booking-success reveal">
          Aitäh - avame sinu e-postirakenduse kohe.
        </p>
      ) : (
        <form className="booking-form reveal reveal-delay-2" onSubmit={submit} noValidate>
          <div className="form-field">
            <label className="form-label" htmlFor="nimi">Nimi</label>
            <input
              className="form-input"
              id="nimi" name="nimi" type="text"
              placeholder="Sinu nimi"
              value={form.nimi} onChange={handle} required
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="email">E-post</label>
            <input
              className="form-input"
              id="email" name="email" type="email"
              placeholder="sinu@email.ee"
              value={form.email} onChange={handle} required
            />
          </div>

          <div className="form-field form-field--full">
            <label className="form-label" htmlFor="kuupaevad">Kuupäevad</label>
            <input
              className="form-input"
              id="kuupaevad" name="kuupaevad" type="text"
              placeholder="Saabun - lahkun"
              value={form.kuupaevad} onChange={handle}
            />
          </div>

          <div className="form-field form-field--full">
            <label className="form-label" htmlFor="sonum">Sõnum</label>
            <textarea
              className="form-textarea"
              id="sonum" name="sonum"
              placeholder="Külaliste arv, soovid, küsimused..."
              value={form.sonum} onChange={handle}
              rows={4}
            />
          </div>

          <div className="form-field form-field--full form-submit">
            <button type="submit" className="btn-dark">
              Küsi pakkumist
            </button>
          </div>
        </form>
      )}
    </section>
  )
}
