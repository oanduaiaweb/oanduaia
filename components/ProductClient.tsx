'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { track } from '@/lib/analytics'
import Lightbox from '@/components/Lightbox'
import { PT, eur, productBySlug } from '@/lib/products'

/** One product: photos that open big, the hide choice with a running total, and an order enquiry. */
export default function ProductClient({ slug }: { slug: string }) {
  const { lang } = useLanguage()
  const p = productBySlug(slug)!
  const [open, setOpen] = useState<number | null>(null)
  const [opt, setOpt] = useState(p.options[0].id)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', company: '' })
  const [state, setState] = useState<'idle' | 'busy' | 'sent' | 'error'>('idle')

  const option = p.options.find(o => o.id === opt)!
  const total = p.price + option.price
  const photos = p.photos.map(ph => ({ src: ph.src, alt: ph.alt[lang] }))

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setState('busy')
    const line = [p.name[lang], p.options.length > 1 ? `${(p.optionLabel ?? PT.hide)[lang]}: ${option.name[lang]}` : '', `${PT.total[lang]} ${eur(total)}`]
      .filter(Boolean).join(' · ')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: [line, form.message].filter(Boolean).join('\n\n'),
          subject: `${PT.subject[lang]}: ${p.name[lang]} – Oanduaia`,
          lang,
          company: form.company,
        }),
      })
      if (!res.ok) throw new Error()
      track('product_enquiry', { lang, item: p.slug, value: total, currency: 'EUR' })
      setState('sent')
    } catch {
      setState('error')
    }
  }

  return (
    <section className="product">
      <div className="product-photos">
        {photos.map((ph, i) => (
          <button key={ph.src} type="button" className={`product-photo${i === 0 ? ' is-main' : ''}`}
            onClick={() => setOpen(i)} aria-label={ph.alt}>
            <Image src={ph.src} alt={ph.alt} fill priority={i === 0}
              sizes={i === 0 ? '(max-width: 900px) 100vw, 55vw' : '(max-width: 900px) 50vw, 14vw'}
              quality={75} style={{ objectFit: 'cover' }} />
          </button>
        ))}
      </div>

      <div className="product-body">
        <a className="product-back" href={`/${lang}/products`}>{PT.back[lang]}</a>
        <p className="section-label">{PT.label[lang]}</p>
        <h1 className="product-title">{p.name[lang]}</h1>
        <p className="product-tagline">{p.tagline[lang]}</p>
        {p.body.map((b, i) => <p className="product-text" key={i}>{b[lang]}</p>)}
        <ul className="product-facts">{p.facts.map((f, i) => <li key={i}>{f[lang]}</li>)}</ul>

        {p.options.length > 1 && (
          <fieldset className="product-options">
            <legend className="form-label">{(p.optionLabel ?? PT.hide)[lang]}</legend>
            {p.options.map(o => (
              <button key={o.id} type="button" className={`gift-amount${opt === o.id ? ' is-on' : ''}`}
                aria-pressed={opt === o.id} onClick={() => setOpt(o.id)}>
                {o.name[lang]}{o.price ? ` +${eur(o.price)}` : ''}
              </button>
            ))}
          </fieldset>
        )}
        <p className="product-total">{PT.total[lang]} <b>{eur(total)}</b></p>

        {state === 'sent' ? (
          <p className="product-sent" role="status">{PT.sent[lang]}</p>
        ) : (
          <form className="gift-form product-form" onSubmit={submit}>
            <h2 className="product-h2">{PT.order[lang]}</h2>
            <label className="form-label" htmlFor="pr-name">{PT.name[lang]}</label>
            <input id="pr-name" className="form-input" required autoComplete="name" value={form.name} onChange={set('name')} />
            <label className="form-label" htmlFor="pr-email">{PT.email[lang]}</label>
            <input id="pr-email" className="form-input" type="email" required autoComplete="email" value={form.email} onChange={set('email')} />
            <label className="form-label" htmlFor="pr-phone">{PT.phone[lang]}</label>
            <input id="pr-phone" className="form-input" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
            <label className="form-label" htmlFor="pr-msg">{PT.message[lang]}</label>
            <textarea id="pr-msg" className="form-textarea" rows={3} value={form.message} onChange={set('message')} />
            <div className="form-hp" aria-hidden="true">
              <input name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={set('company')} />
            </div>
            <button type="submit" className="btn-primary gift-submit" disabled={state === 'busy'}>{PT.send[lang]}</button>
            {state === 'error' && <p className="gift-note" role="alert">{PT.error[lang]}</p>}
            <p className="gift-note">{PT.orderNote[lang]}</p>
          </form>
        )}
      </div>

      {open !== null && (
        <Lightbox photos={photos} index={open} onClose={() => setOpen(null)}
          onStep={d => setOpen(i => ((i ?? 0) + d + photos.length) % photos.length)} />
      )}
    </section>
  )
}
