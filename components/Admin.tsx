'use client'

import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { T } from '@/lib/translations'
import { HOUSE_SLUGS, type HouseSlug } from '@/lib/availability'
import { nightsBetween } from '@/lib/ical'
import type { Block } from '@/lib/bookings'

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
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const [house, setHouse] = useState<HouseSlug>('tiigimaja')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [guest, setGuest] = useState('')
  const [note, setNote] = useState('')

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/blocks', { cache: 'no-store' })
    if (res.status === 401) { setAuthed(false); setReady(true); return }
    if (!res.ok) { setError('Could not load the calendar.'); setReady(true); return }
    setData(await res.json())
    setAuthed(true)
    setReady(true)
  }, [])

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

  return (
    <main className="adm">
      <header className="adm-head">
        <h1 className="adm-title">Oanduaia availability</h1>
        <button className="adm-link" onClick={logout} type="button">Sign out</button>
      </header>

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
