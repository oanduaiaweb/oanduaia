'use client'

import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { T } from '@/lib/translations'
import { HOUSE_SLUGS, type HouseSlug } from '@/lib/availability'
import { nightsBetween } from '@/lib/ical'
import type { Block } from '@/lib/bookings'
import type { Enquiry } from '@/lib/enquiries'
import type { Payment } from '@/lib/payments'
import {
  BREAKFAST_EUR, DINNER_EUR, breakfastMornings, dinnerEvenings, hasMeals, mealsCost,
  type Meals,
} from '@/lib/pricing'
import AdminStats from '@/components/AdminStats'

type Payload = {
  blocks: Record<string, Block[]>
  feeds: Record<string, boolean>
  live: Record<string, boolean>
}

const houseName = (slug: string) =>
  T.feature.houses.find(h => h.slug === slug)?.name.et ?? slug

export default function Admin() {
  const [ready, setReady] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [data, setData] = useState<Payload | null>(null)
  const [enquiries, setEnquiries] = useState<Enquiry[] | null>(null)
  const [payments, setPayments] = useState<Payment[] | null>(null)
  const [stripe, setStripe] = useState<{ configured: boolean; live: boolean } | null>(null)
  const [pay, setPay] = useState({
    name: '', email: '', reference: '', amount: '', lang: 'et',
    house: '', checkIn: '', checkOut: '', send: true, cash: false,
    bDates: [] as string[], bPeople: 2, dDates: [] as string[], dPeople: 2, mealsAtHouse: false,
  })
  const [payError, setPayError] = useState('')
  const [payFilter, setPayFilter] = useState<'all' | 'paid' | 'unpaid' | 'meals'>('all')
  const [showHandled, setShowHandled] = useState(false)
  const [copied, setCopied] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const [house, setHouse] = useState<HouseSlug>('tiigimaja')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [guest, setGuest] = useState('')
  const [note, setNote] = useState('')

  const loadPayments = useCallback(async () => {
    const res = await fetch('/api/admin/payments', { cache: 'no-store' })
    if (!res.ok) { setPayments([]); return }
    const data = await res.json()
    setPayments(data.payments); setStripe(data.stripe)
  }, [])

  const loadEnquiries = useCallback(async () => {
    const res = await fetch('/api/admin/enquiries', { cache: 'no-store' })
    // Never blocks the calendar: an empty enquiry log must not make this page look broken.
    setEnquiries(res.ok ? (await res.json()).enquiries : [])
  }, [])

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/blocks', { cache: 'no-store' })
    if (res.status === 401) { setAuthed(false); setReady(true); return }
    if (!res.ok) { setError('Could not load the calendar.'); setReady(true); return }
    setData(await res.json())
    setAuthed(true)
    setReady(true)
    loadEnquiries()
    loadPayments()
  }, [loadEnquiries, loadPayments])

  useEffect(() => { load() }, [load])

  const login = async (e: FormEvent) => {
    e.preventDefault()
    setLoginError(''); setBusy(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) { setLoginError(body.error ?? 'Wrong password.'); return }
      setPassword('')
      await load()
    } finally { setBusy(false) }
  }

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setAuthed(false); setData(null)
  }

  const add = async (e: FormEvent) => {
    e.preventDefault()
    setError(''); setBusy(true)
    try {
      const res = await fetch('/api/admin/blocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ house, from, to, guest, note }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) { setError(body.error ?? 'Could not save.'); return }
      setFrom(''); setTo(''); setGuest(''); setNote('')
      await load()
    } finally { setBusy(false) }
  }

  const setLive = async (slug: HouseSlug, live: boolean) => {
    setBusy(true)
    try {
      const res = await fetch('/api/admin/blocks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ house: slug, live }),
      })
      if (!res.ok) setError('Could not change that.')
      await load()
    } finally { setBusy(false) }
  }

  const payLink = (p: Payment) => `${location.origin}/${p.lang}/pay/${p.id}`

  /*
   * Paid and unpaid used to sit in one undivided list, which is why "who has actually paid" was
   * hard to read off the page at a glance.
   */
  const allPayments = payments ?? []
  const paidPayments = allPayments.filter(p => p.status === 'paid')
  const waitingPayments = allPayments.filter(p => p.status === 'unpaid')
  const mealPayments = allPayments.filter(p => hasMeals(p.meals))
  const shownPayments =
    payFilter === 'paid' ? paidPayments
      : payFilter === 'unpaid' ? waitingPayments
        : payFilter === 'meals' ? mealPayments
          : allPayments
  const paidTotal = paidPayments.reduce((sum, p) => sum + p.amount, 0)

  const createPayment = async (e: FormEvent) => {
    e.preventDefault()
    setPayError(''); setBusy(true)
    const res = await fetch('/api/admin/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...pay,
        method: pay.cash ? 'cash' : 'card',
        meals: {
          breakfastDates: pay.bDates, breakfastPeople: pay.bPeople,
          dinnerDates: pay.dDates, dinnerPeople: pay.dPeople,
          atHouse: pay.mealsAtHouse,
        },
      }),
    })
    const data = await res.json().catch(() => ({}))
    setBusy(false)
    if (!res.ok) { setPayError(data.error ?? 'Could not create that link.'); return }
    setPay(prev => ({ ...prev, reference: '', amount: '', checkIn: '', checkOut: '' }))
    if (data.mailError) setPayError(data.mailError)
    loadPayments()
    // Straight to the clipboard: the next thing that happens is always pasting it into a reply.
    navigator.clipboard?.writeText(payLink(data.payment)).then(() => setCopied(data.payment.id)).catch(() => {})
  }

  const cancelPayment = async (id: string) => {
    if (!confirm('Cancel this payment link? The guest will no longer be able to pay with it.')) return
    const res = await fetch('/api/admin/payments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, cancel: true }),
    })
    if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error ?? 'Could not cancel that.'); return }
    loadPayments()
  }

  /** `2026-10-14` → `14. okt`, short enough to sit in a chip. */
  const dayLabel = (d: string) =>
    new Intl.DateTimeFormat('et-EE', { day: 'numeric', month: 'short', timeZone: 'UTC' })
      .format(new Date(`${d}T12:00:00Z`))

  const toggleDate = (key: 'bDates' | 'dDates', d: string) =>
    setPay(p => ({
      ...p,
      [key]: p[key].includes(d) ? p[key].filter(x => x !== d) : [...p[key], d].sort(),
    }))

  /** What is being cooked, for whom, and where the money for it sits. */
  const mealsSummary = (m: Meals) => {
    const cost = mealsCost(m)
    const parts: string[] = []
    if (m.breakfastDates?.length && m.breakfastPeople) {
      parts.push(`breakfast ${m.breakfastPeople}×${m.breakfastDates.length}`)
    }
    if (m.dinnerDates?.length && m.dinnerPeople) {
      parts.push(`dinner ${m.dinnerPeople}×${m.dinnerDates.length}`)
    }
    return `${parts.join(' · ')} — ${cost.total} € ${m.atHouse ? 'at the house' : 'in the amount'}`
  }

  /** Cash handed over at the house. Only ever offered on a cash booking. */
  const markCashPaid = async (id: string) => {
    if (!confirm('Mark this booking as paid in cash?')) return
    const res = await fetch('/api/admin/payments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, markPaid: true }),
    })
    if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error ?? 'Could not mark that paid.'); return }
    loadPayments()
  }

  /** Fills the form straight from an enquiry, so the details are never retyped or mistyped. */
  const chargeFor = (e: Enquiry) => {
    setPay({
      name: e.name,
      email: e.email,
      reference: [e.dates, e.message].filter(Boolean).join('\n').slice(0, 400),
      amount: '',
      lang: e.lang && ['et', 'en', 'ru', 'de', 'es', 'sv', 'fi', 'lv'].includes(e.lang) ? e.lang : 'et',
      house: '', checkIn: '', checkOut: '', send: true, cash: false,
      bDates: [], bPeople: 2, dDates: [], dPeople: 2, mealsAtHouse: false,
    })
    document.getElementById('pay-amount')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => (document.getElementById('pay-amount') as HTMLInputElement | null)?.focus(), 400)
  }

  const markEnquiry = async (id: string, handled: boolean) => {
    // Painted immediately, then confirmed — ticking a list of ten should not mean ten waits.
    setEnquiries(prev => prev?.map(e => (e.id === id ? { ...e, handled } : e)) ?? prev)
    const res = await fetch('/api/admin/enquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, handled }),
    })
    if (!res.ok) { setError('Could not save that.'); loadEnquiries() }
  }

  const removeEnquiry = async (id: string, who: string) => {
    if (!confirm(`Delete the enquiry from ${who}? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/enquiries?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
    if (!res.ok) { setError('Could not delete that.'); return }
    loadEnquiries()
  }

  const remove = async (id: string, label: string) => {
    if (!confirm(`Release ${label}?`)) return
    setBusy(true)
    try {
      const res = await fetch(`/api/admin/blocks?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (!res.ok) setError('Could not remove that block.')
      await load()
    } finally { setBusy(false) }
  }

  if (!ready) return <main className="adm"><p className="adm-muted">Loading…</p></main>

  if (!authed) {
    return (
      <main className="adm adm--narrow">
        <h1 className="adm-title">Oanduaia availability</h1>
        <form onSubmit={login} className="adm-login">
          <label className="adm-label" htmlFor="pw">Password</label>
          <input
            id="pw" className="adm-input" type="password" autoComplete="current-password"
            value={password} onChange={e => setPassword(e.target.value)} required
          />
          {loginError && <p className="adm-error">{loginError}</p>}
          <button className="adm-btn" type="submit" disabled={busy}>
            {busy ? 'Checking…' : 'Sign in'}
          </button>
        </form>
      </main>
    )
  }

  const nights = from && to ? nightsBetween(from, to) : 0
  const waiting = enquiries?.filter(e => !e.handled).length ?? 0

  /*
   * Dealt-with enquiries are kept but not shown. Nothing is deleted — the record of who wrote
   * in still matters months later — but the list should only hold what still needs answering.
   */
  const allEnquiries = enquiries ?? []
  const handledCount = allEnquiries.filter(e => e.handled).length
  const shownEnquiries = showHandled ? allEnquiries : allEnquiries.filter(e => !e.handled)

  return (
    <main className="adm">
      <header className="adm-head">
        <h1 className="adm-title">Oanduaia availability</h1>
        <button className="adm-link" onClick={logout} type="button">Sign out</button>
      </header>

      {/*
        Enquiries first, above the calendar. This is the only page that has to be opened to
        find out whether anyone has written in — burying it under the availability form would
        defeat the point of keeping a copy at all.
      */}
      <section className="adm-section">
        <h2 className="adm-h2">
          Enquiries
          {waiting > 0 && <span className="adm-badge">{waiting} waiting</span>}
          {handledCount > 0 && (
            <button type="button"
              className={`adm-chip${showHandled ? ' is-on' : ''}`}
              onClick={() => setShowHandled(v => !v)}>
              {showHandled ? 'Hide dealt with' : `Dealt with (${handledCount})`}
            </button>
          )}
        </h2>

        {enquiries === null ? (
          <p className="adm-muted">Loading…</p>
        ) : enquiries.length === 0 ? (
          <p className="adm-muted">
            Nothing yet. Every enquiry sent from the website is kept here from now on, whether
            or not the e-mail arrives.
          </p>
        ) : (
          <ul className="adm-enq-list">
            {shownEnquiries.map(e => (
              <li className={`adm-enq${e.handled ? ' is-done' : ''}`} key={e.id}>
                <div className="adm-enq-head">
                  <span className="adm-enq-who">
                    {e.name}
                    {e.lang && <span className="adm-enq-lang">{e.lang.toUpperCase()}</span>}
                  </span>
                  <a className="adm-link" href={`mailto:${e.email}`}>{e.email}</a>
                  <span className="adm-enq-when">
                    {new Date(e.received).toLocaleString('et-EE', { timeZone: 'Europe/Tallinn' })}
                  </span>
                </div>

                {e.dates && <p className="adm-enq-dates">{e.dates}</p>}
                {e.phone && <p className="adm-enq-dates">{e.phone}</p>}
                <pre className="adm-enq-body">{e.message}</pre>

                {/* The one thing the inbox cannot tell you. */}
                {!e.mailed && (
                  <p className="adm-error">
                    This one never reached the inbox — the e-mail failed to send. The guest
                    believes it was sent, so it needs answering from here.
                  </p>
                )}

                <div className="adm-enq-actions">
                  <label className="adm-live">
                    <input
                      type="checkbox"
                      checked={!!e.handled}
                      onChange={ev => markEnquiry(e.id, ev.target.checked)}
                    />
                    <span>Dealt with</span>
                  </label>
                  <button className="adm-link" type="button" onClick={() => chargeFor(e)}>
                    Create payment link
                  </button>
                  <button className="adm-link adm-link--danger" type="button"
                    onClick={() => removeEnquiry(e.id, e.name)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <AdminStats />

      <section className="adm-section">
        <h2 className="adm-h2">
          Card payments
          {stripe && !stripe.configured && <span className="adm-badge adm-badge--warn">not connected</span>}
          {stripe?.configured && !stripe.live && <span className="adm-badge adm-badge--warn">TEST mode</span>}
          {stripe?.configured && stripe.live && <span className="adm-badge">live</span>}
        </h2>

        {stripe && !stripe.configured && (
          <p className="adm-muted">
            Stripe is not connected yet. Add <b>STRIPE_SECRET_KEY</b> and{' '}
            <b>STRIPE_WEBHOOK_SECRET</b> in Vercel and these links will start working. You can
            still create them now — nobody can pay until the keys are in.
          </p>
        )}
        {stripe?.configured && !stripe.live && (
          <p className="adm-muted">
            <b>Test mode.</b> Links created now take no real money. Swap the key for the live one
            before sending any of these to a guest.
          </p>
        )}

        <p className="adm-muted">
          Confirm the dates first, then make a link and paste it into your reply. Creating a link
          charges nobody — the guest pays only when they open it and press the button. Card,
          Apple&nbsp;Pay and Google&nbsp;Pay all work; no card details ever touch this site.
        </p>

        <form className="adm-form" onSubmit={createPayment}>
          <div className="adm-field">
            <label className="adm-label" htmlFor="pay-name">Guest</label>
            <input id="pay-name" className="adm-input" value={pay.name} required
              onChange={e => setPay(p => ({ ...p, name: e.target.value }))} />
          </div>
          <div className="adm-field">
            <label className="adm-label" htmlFor="pay-email">E-mail</label>
            <input id="pay-email" className="adm-input" type="email" value={pay.email} required
              onChange={e => setPay(p => ({ ...p, email: e.target.value }))} />
          </div>
          <div className="adm-field">
            <label className="adm-label" htmlFor="pay-amount">Amount &euro;</label>
            <input id="pay-amount" className="adm-input" inputMode="decimal" placeholder="720.00"
              value={pay.amount} required
              onChange={e => setPay(p => ({ ...p, amount: e.target.value }))} />
          </div>
          <div className="adm-field">
            <label className="adm-label" htmlFor="pay-lang">Their language</label>
            <select id="pay-lang" className="adm-input" value={pay.lang}
              onChange={e => setPay(p => ({ ...p, lang: e.target.value }))}>
              <option value="et">Eesti</option><option value="en">English</option>
              <option value="ru">Русский</option><option value="de">Deutsch</option><option value="es">Español</option><option value="sv">Svenska</option><option value="fi">Suomi</option><option value="lv">Latviešu</option>
            </select>
          </div>
          <div className="adm-field adm-field--wide">
            <label className="adm-label" htmlFor="pay-ref">What it is for &mdash; the guest sees this</label>
            <input id="pay-ref" className="adm-input" value={pay.reference} required
              placeholder="Saunamaja, 7&ndash;10 September 2026, 3 nights, breakfast for 2"
              onChange={e => setPay(p => ({ ...p, reference: e.target.value }))} />
          </div>
          <div className="adm-field">
            <label className="adm-label" htmlFor="pay-house">House &mdash; holds the nights</label>
            <select id="pay-house" className="adm-input" value={pay.house}
              onChange={e => setPay(p => ({ ...p, house: e.target.value }))}>
              <option value="">Do not hold any nights</option>
              <option value="saunamaja">Saunamaja</option>
              <option value="metsamaja">Metsamaja</option>
              <option value="tiigimaja">Tiigimaja</option>
            </select>
          </div>
          <div className="adm-field">
            <label className="adm-label" htmlFor="pay-in">Arrival</label>
            <input id="pay-in" className="adm-input" type="date" value={pay.checkIn}
              onChange={e => setPay(p => ({ ...p, checkIn: e.target.value }))} />
          </div>
          <div className="adm-field">
            <label className="adm-label" htmlFor="pay-out">Departure</label>
            <input id="pay-out" className="adm-input" type="date" value={pay.checkOut}
              onChange={e => setPay(p => ({ ...p, checkOut: e.target.value }))} />
          </div>
          {/*
            Only once the dates are known: which mornings and evenings even exist follows from
            the stay, and offering meal days before that would be guessing at them.
          */}
          {pay.checkIn && pay.checkOut && (
            <div className="adm-field adm-field--wide">
              <span className="adm-label">Meals &mdash; who eats, and which days</span>

              <div className="adm-meal-row">
                <span className="adm-meal-name">Breakfast &middot; {BREAKFAST_EUR}&nbsp;&euro; pp</span>
                <input className="adm-input adm-input--n" type="number" min={0} max={40}
                  aria-label="How many eat breakfast" value={pay.bPeople}
                  onChange={e => setPay(p => ({ ...p, bPeople: Math.max(0, Number(e.target.value) || 0) }))} />
                <span className="adm-filter">
                  {breakfastMornings(pay.checkIn, pay.checkOut).map(d => (
                    <button key={d} type="button"
                      className={`adm-chip${pay.bDates.includes(d) ? ' is-on' : ''}`}
                      onClick={() => toggleDate('bDates', d)}>{dayLabel(d)}</button>
                  ))}
                </span>
              </div>

              <div className="adm-meal-row">
                <span className="adm-meal-name">Dinner &middot; {DINNER_EUR}&nbsp;&euro; pp</span>
                <input className="adm-input adm-input--n" type="number" min={0} max={40}
                  aria-label="How many eat dinner" value={pay.dPeople}
                  onChange={e => setPay(p => ({ ...p, dPeople: Math.max(0, Number(e.target.value) || 0) }))} />
                <span className="adm-filter">
                  {dinnerEvenings(pay.checkIn, pay.checkOut).map(d => (
                    <button key={d} type="button"
                      className={`adm-chip${pay.dDates.includes(d) ? ' is-on' : ''}`}
                      onClick={() => toggleDate('dDates', d)}>{dayLabel(d)}</button>
                  ))}
                </span>
              </div>

              {mealsCost({
                breakfastDates: pay.bDates, breakfastPeople: pay.bPeople,
                dinnerDates: pay.dDates, dinnerPeople: pay.dPeople,
              }).total > 0 && (
                <label className="adm-label adm-meal-total">
                  <input type="checkbox" checked={pay.mealsAtHouse}
                    onChange={e => setPay(p => ({ ...p, mealsAtHouse: e.target.checked }))} />
                  {' '}Food paid at the house &mdash;{' '}
                  {mealsCost({
                    breakfastDates: pay.bDates, breakfastPeople: pay.bPeople,
                    dinnerDates: pay.dDates, dinnerPeople: pay.dPeople,
                  }).total}&nbsp;&euro; NOT included in the amount above
                </label>
              )}
            </div>
          )}

          <div className="adm-field adm-field--wide">
            <label className="adm-label" htmlFor="pay-cash">
              <input id="pay-cash" type="checkbox" checked={pay.cash}
                onChange={e => setPay(p => ({ ...p, cash: e.target.checked }))} />
              {' '}Paying cash at the house &mdash; holds the nights, no card link
            </label>
          </div>
          {!pay.cash && (
            <div className="adm-field adm-field--wide">
              <label className="adm-label" htmlFor="pay-send">
                <input id="pay-send" type="checkbox" checked={pay.send}
                  onChange={e => setPay(p => ({ ...p, send: e.target.checked }))} />
                {' '}E-mail the link to the guest now
              </label>
            </div>
          )}
          <div className="adm-field adm-field--submit">
            <button className="adm-btn" type="submit" disabled={busy}>
              {busy ? 'Working\u2026'
                : pay.cash ? 'Save cash booking'
                  : pay.send ? 'Confirm and send' : 'Create link'}
            </button>
          </div>
        </form>
        {payError && <p className="adm-error">{payError}</p>}

        {payments === null ? (
          <p className="adm-muted">Loading&hellip;</p>
        ) : payments.length === 0 ? (
          <p className="adm-muted">No payment links yet.</p>
        ) : (
          <>
            <div className="adm-filter">
              {([
                ['all', `All (${allPayments.length})`],
                ['paid', `Paid (${paidPayments.length})`],
                ['unpaid', `Waiting (${waitingPayments.length})`],
                ['meals', `Meals (${mealPayments.length})`],
              ] as const).map(([key, label]) => (
                <button key={key} type="button"
                  className={`adm-chip${payFilter === key ? ' is-on' : ''}`}
                  onClick={() => setPayFilter(key)}>{label}</button>
              ))}
              {paidPayments.length > 0 && (
                <span className="adm-muted adm-filter-sum">
                  {(paidTotal / 100).toFixed(2)} &euro; received
                </span>
              )}
            </div>

            {shownPayments.length === 0 ? (
              <p className="adm-muted">Nothing under that filter.</p>
            ) : (
              <ul className="adm-list">
                {shownPayments.map(p => (
                  <li className={`adm-item adm-pay adm-pay--${p.status}`} key={p.id}>
                    <span className="adm-dates">
                      {(p.amount / 100).toFixed(2)} &euro;
                      <span className="adm-nights">{` \u00b7 ${p.method === 'cash' ? 'cash \u00b7 ' : ''}${p.status}${p.paidAt ? ' ' + new Date(p.paidAt).toLocaleDateString('et-EE') : ''}`}</span>
                    </span>
                    {/*
                      Everything about the guest stays inside this one cell. The row is a
                      three-column grid, so a fourth sibling silently wraps onto a second line
                      and drags the buttons under the amount with it.
                    */}
                    <span className="adm-who">
                      {p.name} &mdash; {p.reference}
                      <br />
                      <span className="adm-nights">{p.email}</span>
                      {hasMeals(p.meals) && (
                        <>
                          <br />
                          <span className="adm-nights adm-meals-line">{mealsSummary(p.meals!)}</span>
                        </>
                      )}
                      {p.status !== 'paid' && (p.dueAt || p.mailedAt) && (
                        <>
                          <br />
                          <span className="adm-nights">
                            {p.dueAt ? `Pay by ${p.dueAt}` : ''}
                            {p.dueAt && p.mailedAt ? ' \u00b7 ' : ''}
                            {p.mailedAt ? 'e-mailed' : p.dueAt ? 'not e-mailed' : ''}
                          </span>
                        </>
                      )}
                    </span>
                    <span className="adm-pay-actions">
                      {p.status === 'paid' && (
                        <a className="adm-link" href={`/api/admin/invoice/${p.id}`}
                          target="_blank" rel="noopener noreferrer">Invoice</a>
                      )}
                      {p.status === 'unpaid' && p.method === 'cash' && (
                        <button className="adm-link" type="button"
                          onClick={() => markCashPaid(p.id)}>Cash received</button>
                      )}
                      {/* There is no link to copy on a cash booking. */}
                      {p.method !== 'cash' && (
                        <button className="adm-link" type="button"
                          onClick={() => { navigator.clipboard?.writeText(payLink(p)); setCopied(p.id) }}>
                          {copied === p.id ? 'Copied' : 'Copy link'}
                        </button>
                      )}
                      {p.status === 'unpaid' && (
                        <button className="adm-link adm-link--danger" type="button"
                          onClick={() => cancelPayment(p.id)}>Cancel</button>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>

      <p className="adm-muted">
        This calendar is what the website shows. A connected Booking.com feed is merged on
        top of it and can only add nights, never free one.
      </p>

      <form className="adm-form" onSubmit={add}>
        <div className="adm-field">
          <label className="adm-label" htmlFor="house">House</label>
          <select id="house" className="adm-input" value={house}
            onChange={e => setHouse(e.target.value as HouseSlug)}>
            {HOUSE_SLUGS.map(s => <option key={s} value={s}>{houseName(s)}</option>)}
          </select>
        </div>
        <div className="adm-field">
          <label className="adm-label" htmlFor="from">Arrival</label>
          <input id="from" className="adm-input" type="date" value={from}
            onChange={e => setFrom(e.target.value)} required />
        </div>
        <div className="adm-field">
          <label className="adm-label" htmlFor="to">Departure</label>
          <input id="to" className="adm-input" type="date" value={to}
            onChange={e => setTo(e.target.value)} required />
        </div>
        <div className="adm-field">
          <label className="adm-label" htmlFor="guest">Guest (optional)</label>
          <input id="guest" className="adm-input" value={guest}
            onChange={e => setGuest(e.target.value)} maxLength={80} />
        </div>
        <div className="adm-field adm-field--wide">
          <label className="adm-label" htmlFor="note">Note (optional)</label>
          <input id="note" className="adm-input" value={note}
            onChange={e => setNote(e.target.value)} maxLength={300} />
        </div>
        <div className="adm-field adm-field--submit">
          <button className="adm-btn" type="submit" disabled={busy || nights < 1}>
            {busy ? 'Saving…' : nights > 0 ? `Hold ${nights} night${nights === 1 ? '' : 's'}` : 'Hold'}
          </button>
        </div>
      </form>
      {/* Departure is exclusive, the same as every channel feed: the night before it is the last one held. */}
      {from && to && nights < 1 && <p className="adm-error">Departure must be after arrival.</p>}
      {error && <p className="adm-error">{error}</p>}

      {HOUSE_SLUGS.map(slug => {
        const blocks = data?.blocks[slug] ?? []
        return (
          <section className="adm-house" key={slug}>
            <h2 className="adm-house-name">
              {houseName(slug)}
              <span className={`adm-tag${data?.feeds[slug] ? ' adm-tag--on' : ''}`}>
                {data?.feeds[slug] ? 'Booking.com feed connected' : 'No channel feed — this calendar only'}
              </span>
            </h2>
            {!data?.feeds[slug] && (
              <label className="adm-live">
                <input
                  type="checkbox"
                  checked={!!data?.live[slug]}
                  disabled={busy}
                  onChange={e => setLive(slug, e.target.checked)}
                />
                <span>
                  This calendar is up to date — show real availability on the site.
                  {!data?.live[slug] && (
                    <b className="adm-live-warn">
                      {' '}Until you tick this, the site tells guests these dates still need confirming.
                    </b>
                  )}
                </span>
              </label>
            )}
            {blocks.length === 0 ? (
              <p className="adm-muted">Nothing held.</p>
            ) : (
              <ul className="adm-list">
                {blocks.map(b => (
                  <li className="adm-item" key={b.id}>
                    <span className="adm-dates">
                      {b.from} → {b.to}
                      <span className="adm-nights">
                        {` · ${nightsBetween(b.from, b.to)} night${nightsBetween(b.from, b.to) === 1 ? '' : 's'}`}
                      </span>
                    </span>
                    <span className="adm-who">{[b.guest, b.note].filter(Boolean).join(' — ')}</span>
                    <button className="adm-link adm-link--danger" type="button"
                      onClick={() => remove(b.id, `${houseName(slug)} ${b.from} → ${b.to}`)}>
                      Release
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )
      })}
    </main>
  )
}
