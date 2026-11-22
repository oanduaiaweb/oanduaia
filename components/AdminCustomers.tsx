'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Customer } from '@/lib/customers'
import { CHRISTMAS_LANGS, christmasLetter } from '@/lib/christmasEmail'
import { waNudge, waNumber } from '@/lib/whatsapp'

type Filter = 'all' | 'guests' | 'enquiries' | 'nophone' | 'hidden'

const FILTERS: [Filter, string][] = [
  ['all', 'Everyone'],
  ['guests', 'Stayed'],
  ['enquiries', 'Only wrote'],
  ['nophone', 'No phone'],
  ['hidden', 'Hidden'],
]

const day = (iso?: string) =>
  iso ? new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''

const todayIso = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Tallinn' })

const canMail = (c: Customer) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)

/** Everyone who has stayed or written, with how to reach them and what we have sent them. */
export default function AdminCustomers() {
  const [list, setList] = useState<Customer[] | null>(null)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<string | null>(null)
  const [draft, setDraft] = useState<Partial<Customer>>({})
  const [adding, setAdding] = useState(false)
  const [add, setAdd] = useState({ name: '', email: '', phone: '', lang: 'et', lastStay: '', note: '' })
  const [xmas, setXmas] = useState<Set<string>>(new Set())
  const [preview, setPreview] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/customers', { cache: 'no-store' })
    const j = await res.json().catch(() => ({}))
    if (!res.ok) { setError(j.error || `HTTP ${res.status}`); return }
    const people: Customer[] = j.customers
    setList(people)
    setXmas(new Set(people.filter(c => !c.hidden && !c.christmasSentAt && canMail(c)).map(c => c.key)))
  }, [])

  useEffect(() => { load() }, [load])

  const patch = async (key: string, body: Record<string, unknown>) => {
    setBusy(true)
    try {
      const res = await fetch('/api/admin/customers', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, ...body }),
      })
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Saving failed')
      await load()
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Saving failed')
    } finally {
      setBusy(false)
    }
  }

  const addGuest = async () => {
    setBusy(true)
    const res = await fetch('/api/admin/customers', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'add', ...add }),
    })
    setBusy(false)
    if (!res.ok) { setMsg('Could not add the guest.'); return }
    setAdd({ name: '', email: '', phone: '', lang: 'et', lastStay: '', note: '' })
    setAdding(false)
    load()
  }

  const sendChristmas = async () => {
    setBusy(true); setConfirming(false); setMsg('Sending… this takes about a second per person.')
    try {
      const res = await fetch('/api/admin/customers', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'christmas', keys: [...xmas] }),
      })
      const j = await res.json()
      if (!res.ok) throw new Error(j.error || 'Sending failed')
      setMsg(`Sent to ${j.sent.length}.${j.failed.length ? ` Failed: ${j.failed.join(', ')}.` : ''}`)
      await load()
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Sending failed')
    } finally {
      setBusy(false)
    }
  }

  const shown = useMemo(() => (list ?? []).filter(c => {
    if (filter === 'hidden') return c.hidden
    if (c.hidden) return false
    if (filter === 'guests') return c.stayed
    if (filter === 'enquiries') return !c.stayed
    if (filter === 'nophone') return !c.phone
    return true
  }), [list, filter])

  const ready = (list ?? []).filter(c => xmas.has(c.key) && !c.hidden && !c.christmasSentAt && canMail(c))
  const sample = (list ?? []).find(c => c.key === preview) ?? ready[0]
  const letter = sample && christmasLetter(sample.name, sample.lang, sample.stayed)

  const toggle = (key: string) => setXmas(s => {
    const n = new Set(s)
    if (n.has(key)) n.delete(key); else n.add(key)
    return n
  })

  return (
    <section className="adm-section">
      <h2 className="adm-h2">
        Customers
        {FILTERS.map(([f, label]) => (
          <button key={f} type="button" className={`adm-chip${filter === f ? ' is-on' : ''}`} onClick={() => setFilter(f)}>{label}</button>
        ))}
        <button type="button" className="adm-chip" onClick={() => setAdding(a => !a)}>{adding ? 'Close' : '+ Add guest'}</button>
      </h2>
      <p className="adm-muted">
        Everyone who wrote through the form or to info@, plus everyone who paid by card. New requests appear here by themselves.
        Booking.com and phone guests: add them by hand.
      </p>

      {adding && (
        <div className="adm-cust-add">
          <input className="adm-input" placeholder="Name" value={add.name} onChange={e => setAdd({ ...add, name: e.target.value })} />
          <input className="adm-input" placeholder="E-mail" type="email" value={add.email} onChange={e => setAdd({ ...add, email: e.target.value })} />
          <input className="adm-input" placeholder="Phone" type="tel" value={add.phone} onChange={e => setAdd({ ...add, phone: e.target.value })} />
          <select className="adm-input" value={add.lang} onChange={e => setAdd({ ...add, lang: e.target.value })}>
            {CHRISTMAS_LANGS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <label className="adm-cust-label">Stayed on
            <input className="adm-input" type="date" value={add.lastStay} onChange={e => setAdd({ ...add, lastStay: e.target.value })} />
          </label>
          <input className="adm-input" placeholder="Note (e.g. Booking.com, Saunamaja)" value={add.note} onChange={e => setAdd({ ...add, note: e.target.value })} />
          <button type="button" className="adm-btn" disabled={busy || !add.name.trim()} onClick={addGuest}>Add</button>
        </div>
      )}

      {error ? <p className="adm-error">{error}</p> : !list ? <p className="adm-muted">Loading…</p> : (
        <>
          <p className="adm-muted">
            {list.filter(c => !c.hidden).length} people · {list.filter(c => !c.hidden && c.stayed).length} stayed ·{' '}
            {list.filter(c => !c.hidden && !c.phone).length} without a phone number
          </p>
          <ul className="adm-cust-list">
            {shown.map(c => {
              const editing = open === c.key
              return (
                <li key={c.key} className={`adm-cust${c.hidden ? ' is-hidden' : ''}`}>
                  <div className="adm-cust-row">
                    <input type="checkbox" title="Send the Christmas greeting" disabled={!!c.christmasSentAt || !canMail(c) || c.hidden}
                      checked={xmas.has(c.key) && !c.christmasSentAt} onChange={() => toggle(c.key)} />
                    <button type="button" className="adm-cust-name" onClick={() => {
                      setOpen(editing ? null : c.key)
                      setDraft({ name: c.name, email: c.email, phone: c.phone, lang: c.lang, note: c.note })
                    }}>
                      {c.name}
                    </button>
                    {c.stayed ? <span className="adm-badge">stayed</span>
                      : c.lastStay ? <span className="adm-badge adm-badge--warn">coming</span> : null}
                    {c.lang && <span className="adm-tag">{c.lang}</span>}
                    <span className="adm-cust-contact">
                      {c.email && <a className="adm-link" href={`mailto:${c.email}`}>{c.email}</a>}
                      {c.phone
                        ? <>
                            <a className="adm-link" href={`https://wa.me/${waNumber(c.phone)}`} target="_blank" rel="noreferrer">{c.phone}</a>
                            <a className="adm-link adm-wa" href={waNudge(c.phone, c.name, c.lang)} target="_blank" rel="noreferrer">WhatsApp: check spam</a>
                          </>
                        : <span className="adm-cust-missing">no phone</span>}
                    </span>
                  </div>
                  <div className="adm-cust-meta">
                    {c.lastStay && <span>Stay {day(c.lastStay)}</span>}
                    {!c.lastStay && <span>Wrote {day(c.firstSeen)}</span>}
                    {c.paid > 0 && <span>Paid {(c.paid / 100).toLocaleString('et-EE')} €</span>}
                    <span>
                      Review: {c.reviewAskedAt ? `asked ${day(c.reviewAskedAt)}` : (
                        <button type="button" className="adm-link" disabled={busy} onClick={() => patch(c.key, { reviewAskedAt: todayIso() })}>mark asked today</button>
                      )}
                    </span>
                    <span>Christmas: {c.christmasSentAt ? `sent ${day(c.christmasSentAt)}` : '–'}</span>
                    {c.note && <span className="adm-cust-note">{c.note}</span>}
                  </div>

                  {editing && (
                    <div className="adm-cust-edit">
                      <input className="adm-input" placeholder="Name" value={draft.name ?? ''} onChange={e => setDraft({ ...draft, name: e.target.value })} />
                      <input className="adm-input" placeholder="E-mail" value={draft.email ?? ''} onChange={e => setDraft({ ...draft, email: e.target.value })} />
                      <input className="adm-input" placeholder="Phone" type="tel" value={draft.phone ?? ''} onChange={e => setDraft({ ...draft, phone: e.target.value })} />
                      <select className="adm-input" value={draft.lang ?? ''} onChange={e => setDraft({ ...draft, lang: e.target.value })}>
                        <option value="">language?</option>
                        {CHRISTMAS_LANGS.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                      <input className="adm-input adm-cust-wide" placeholder="Note" value={draft.note ?? ''} onChange={e => setDraft({ ...draft, note: e.target.value })} />
                      <div className="adm-cust-actions">
                        <button type="button" className="adm-btn" disabled={busy} onClick={() => { patch(c.key, draft); setOpen(null) }}>Save</button>
                        <button type="button" className="adm-link" onClick={() => patch(c.key, { stayed: !c.stayed })}>
                          {c.stayed ? 'Has not stayed' : 'Has stayed'}
                        </button>
                        {c.reviewAskedAt && <button type="button" className="adm-link" onClick={() => patch(c.key, { reviewAskedAt: null })}>Clear review date</button>}
                        <button type="button" className="adm-link" onClick={() => setPreview(c.key)}>Preview Christmas mail</button>
                        <button type="button" className="adm-link adm-link--danger" onClick={() => patch(c.key, { hidden: !c.hidden })}>
                          {c.hidden ? 'Show again' : 'Hide (not a guest)'}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="adm-xmas">
            <h3 className="adm-stat-h3">Christmas greeting</h3>
            <p className="adm-muted">
              A short plain-text mail from info@ in each person&rsquo;s language, thanking them for staying or for writing.
              Ticked: {ready.length}. Untick anyone who should not get it. Nobody gets it twice.
            </p>
            {letter && (
              <pre className="adm-xmas-letter">
                <b>To: {sample.name} &lt;{sample.email}&gt; · {sample.lang || 'en'}</b>{'\n'}<b>{letter.subject}</b>{'\n\n'}{letter.text}
              </pre>
            )}
            {!confirming ? (
              <button type="button" className="adm-btn" disabled={busy || ready.length === 0} onClick={() => setConfirming(true)}>
                Send to {ready.length} people
              </button>
            ) : (
              <span className="adm-cust-actions">
                <button type="button" className="adm-btn" disabled={busy} onClick={sendChristmas}>Yes, send {ready.length} e-mails now</button>
                <button type="button" className="adm-link" onClick={() => setConfirming(false)}>Cancel</button>
              </span>
            )}
          </div>
          {msg && <p className="adm-muted">{msg}</p>}
        </>
      )}
    </section>
  )
}
