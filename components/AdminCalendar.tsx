'use client'

import { useEffect, useMemo, useState } from 'react'
import { T } from '@/lib/translations'
import { HOUSE_SLUGS } from '@/lib/availability'
import { addDays, nightsBetween } from '@/lib/ical'
import type { Block } from '@/lib/bookings'
import type { Enquiry } from '@/lib/enquiries'
import type { Payment } from '@/lib/payments'
import { isClosed } from '@/lib/season'
import { needsReply, sameGuest, stayOf, todayTallinn } from '@/lib/enquiryStatus'

type Props = {
  blocks: Record<string, Block[]>
  enquiries: Enquiry[]
  payments: Payment[]
  onOpen: (id: string) => void
  /** Holds nights in our own calendar; resolves to an error message, or null when it worked. */
  onHold: (house: string, from: string, to: string, guest: string, note: string) => Promise<string | null>
  onRelease: (id: string, label: string) => void
}

/** One stay in one house: held by us (with a name), or a range the Booking.com feed has taken. */
type Stay = { id?: string; house: string; from: string; to: string; guest?: string; note?: string; channel: boolean; closed?: boolean }

const SHORT: Record<string, string> = { saunamaja: 'S', tiigimaja: 'T', metsamaja: 'M' }
const houseName = (slug: string) => T.feature.houses.find(h => h.slug === slug)?.name.et ?? slug
const WEEK = ['E', 'T', 'K', 'N', 'R', 'L', 'P']

const pad = (n: number) => String(n).padStart(2, '0')
const dmy = (d: string) => `${d.slice(8, 10)}.${d.slice(5, 7)}`
const firstName = (s?: string) => (s ?? '').trim().split(/\s+/)[0] ?? ''

/** Turns a sorted list of nights into stays: arrival = first night, departure = day after the last. */
function rangesOf(nights: string[]): { from: string; to: string }[] {
  const out: { from: string; to: string }[] = []
  for (const n of [...nights].sort()) {
    const last = out[out.length - 1]
    if (last && last.to === n) last.to = addDays(n, 1)
    else out.push({ from: n, to: addDays(n, 1) })
  }
  return out
}

/**
 * The month at a glance: which house is taken on which night, whose arrival falls on which day,
 * and — one click on a day — everything we know about the people involved.
 */
export default function AdminCalendar({ blocks, enquiries, payments, onOpen, onHold, onRelease }: Props) {
  const today = todayTallinn()
  const [month, setMonth] = useState(today.slice(0, 7))
  const [picked, setPicked] = useState<string | null>(today)
  const [feedNights, setFeedNights] = useState<Record<string, string[]>>({})
  // The close/book form under a day: one house, or 'all' for every house free that night.
  const [form, setForm] = useState<{ house: string; nights: string; guest: string; note: string } | null>(null)
  const [formBusy, setFormBusy] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    fetch('/api/availability', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(a => {
        if (!a) return
        setFeedNights(Object.fromEntries(a.houses.map((h: { slug: string; blocked: string[] }) => [h.slug, h.blocked])))
      })
      .catch(() => {})
  }, [])

  const stays = useMemo(() => {
    const out: Stay[] = []
    for (const house of HOUSE_SLUGS) {
      const own = blocks[house] ?? []
      for (const b of own) out.push({ id: b.id, house, from: b.from, to: b.to, guest: b.guest, note: b.note, channel: false })
      const held = new Set(own.flatMap(b => Array.from({ length: nightsBetween(b.from, b.to) }, (_, i) => addDays(b.from, i))))
      const rest = (feedNights[house] ?? []).filter(n => !held.has(n))
      for (const r of rangesOf(rest.filter(n => !isClosed(house, n)))) out.push({ house, ...r, channel: true })
      for (const r of rangesOf(rest.filter(n => isClosed(house, n)))) out.push({ house, ...r, channel: false, closed: true })
    }
    return out
  }, [blocks, feedNights])

  /** Requests not yet held in the calendar, placed on the dates they asked for. */
  const requests = useMemo(() => enquiries
    .map(e => ({ e, s: stayOf(e) }))
    .filter(({ e, s }) => s.checkIn && s.checkOut && s.checkOut >= today && !e.handled &&
      !stays.some(st => !st.channel && st.guest && sameGuest(st.guest, e.name))),
  [enquiries, stays, today])

  const [y, m] = month.split('-').map(Number)
  const first = `${month}-01`
  const lead = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 6) % 7
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const cells = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => `${month}-${pad(i + 1)}`)]
  const shift = (n: number) => {
    const d = new Date(Date.UTC(y, m - 1 + n, 1))
    setMonth(`${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}`)
  }
  const title = new Date(`${first}T12:00:00Z`).toLocaleDateString('et-EE', { month: 'long', year: 'numeric', timeZone: 'UTC' })

  const nightOf = (house: string, d: string) => stays.find(s => s.house === house && s.from <= d && d < s.to)

  /** Who this person is: e-mail, phone and payment, found through the request or the card link. */
  const contactFor = (s: Stay) => {
    if (s.closed) return null
    const pay = payments.find(p => p.status !== 'cancelled' && (
      (p.house === s.house && p.checkIn === s.from) || (!!s.guest && sameGuest(s.guest, p.name))))
    const enq = s.guest ? enquiries.find(e => sameGuest(s.guest, e.name)) : undefined
    return { pay, enq, email: enq?.email || pay?.email, phone: enq?.phone }
  }

  const freeOn = (h: string, d: string) => !nightOf(h, d)

  const openForm = (house: string) => { setForm({ house, nights: '1', guest: '', note: '' }); setFormError('') }

  const saveForm = async () => {
    if (!form || !picked) return
    const nights = Number(form.nights)
    if (!Number.isInteger(nights) || nights < 1 || nights > 60) { setFormError('Nights must be 1–60.'); return }
    const to = addDays(picked, nights)
    const houses = form.house === 'all' ? HOUSE_SLUGS.filter(h => freeOn(h, picked)) : [form.house]
    setFormBusy(true); setFormError('')
    const errors: string[] = []
    for (const h of houses) {
      const err = await onHold(h, picked, to, form.guest.trim(), form.note.trim())
      if (err) errors.push(`${houseName(h)}: ${err}`)
    }
    setFormBusy(false)
    if (errors.length) setFormError(errors.join(' · '))
    else setForm(null)
  }

  const holdForm = (house: string) => form?.house === house && picked && (
    <div className="adm-cal-form">
      <label>Nights
        <input className="adm-input" inputMode="numeric" value={form.nights}
          onChange={e => setForm({ ...form, nights: e.target.value.replace(/\D/g, '') })} />
      </label>
      <label>Name (optional)
        <input className="adm-input" value={form.guest} onChange={e => setForm({ ...form, guest: e.target.value })} />
      </label>
      <label>Note (optional)
        <input className="adm-input" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
      </label>
      <span className="adm-muted">
        {dmy(picked)} → {Number(form.nights) > 0 ? dmy(addDays(picked, Number(form.nights))) : '…'}
      </span>
      <button type="button" className="adm-btn" disabled={formBusy} onClick={saveForm}>{formBusy ? 'Saving…' : 'Close these nights'}</button>
      <button type="button" className="adm-link" onClick={() => setForm(null)}>Cancel</button>
      {formError && <p className="adm-error">{formError}</p>}
    </div>
  )

  const dayStays = picked ? stays.filter(s => s.from <= picked && picked <= s.to) : []
  const dayRequests = picked ? requests.filter(({ s }) => s.checkIn! <= picked && picked < s.checkOut!) : []

  return (
    <section className="adm-section adm-cal">
      <h2 className="adm-h2">
        Calendar
        <button type="button" className="adm-chip" onClick={() => shift(-1)} aria-label="Previous month">‹</button>
        <span className="adm-cal-title">{title}</span>
        <button type="button" className="adm-chip" onClick={() => shift(1)} aria-label="Next month">›</button>
        <button type="button" className="adm-chip" onClick={() => { setMonth(today.slice(0, 7)); setPicked(today) }}>Today</button>
      </h2>
      <p className="adm-cal-legend">
        <span><i className="adm-cal-key is-own" /> booked with us</span>
        <span><i className="adm-cal-key is-channel" /> Booking.com</span>
        <span><i className="adm-cal-key is-closed" /> closed for winter</span>
        <span><i className="adm-cal-key is-req" /> request, not booked yet</span>
        <span>S · T · M = Saunamaja · Tiigimaja · Metsamaja</span>
      </p>

      <div className="adm-cal-grid" role="grid">
        {WEEK.map(w => <span className="adm-cal-wd" key={w}>{w}</span>)}
        {cells.map((d, i) => {
          if (!d) return <span key={`x${i}`} />
          const arrivals = stays.filter(s => s.from === d)
          const reqs = requests.filter(({ s }) => s.checkIn === d)
          return (
            <button type="button" key={d}
              className={`adm-cal-day${d === today ? ' is-today' : ''}${d === picked ? ' is-picked' : ''}${d < today ? ' is-past' : ''}`}
              onClick={() => setPicked(d)}>
              <span className="adm-cal-num">{Number(d.slice(8))}</span>
              <span className="adm-cal-bars">
                {HOUSE_SLUGS.map(h => {
                  const n = nightOf(h, d)
                  return <i key={h} className={n ? (n.closed ? 'is-closed' : n.channel ? 'is-channel' : 'is-own') : ''} title={houseName(h)}>{SHORT[h]}</i>
                })}
              </span>
              {arrivals.filter(a => !a.channel && !a.closed).map(a => (
                <span className="adm-cal-arr" key={a.house + a.from}>→ {firstName(a.guest) || houseName(a.house)}</span>
              ))}
              {arrivals.some(a => a.channel) && <span className="adm-cal-arr is-channel">→ Booking.com</span>}
              {reqs.length > 0 && <span className="adm-cal-arr is-req">● {reqs.map(r => firstName(r.e.name)).join(', ')}</span>}
            </button>
          )
        })}
      </div>

      {picked && (
        <div className="adm-cal-detail">
          <h3 className="adm-stat-h3">
            {new Date(`${picked}T12:00:00Z`).toLocaleDateString('et-EE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}
          </h3>
          {picked >= today && HOUSE_SLUGS.filter(h => freeOn(h, picked)).length > 1 && form?.house !== 'all' && (
            <button type="button" className="adm-chip adm-cal-all" onClick={() => openForm('all')}>
              Close all free houses from this date
            </button>
          )}
          {holdForm('all')}
          {HOUSE_SLUGS.map(h => {
            const here = dayStays.filter(s => s.house === h)
            const canHold = picked >= today && freeOn(h, picked)
            return (
              <div className="adm-cal-house" key={h}>
                <b>{houseName(h)}</b>
                {here.length === 0 && <span className="adm-muted">free</span>}
                {canHold && form?.house !== h && (
                  <button type="button" className="adm-link" onClick={() => openForm(h)}>Close / book from this date</button>
                )}
                {holdForm(h)}
                {here.map(s => {
                  const c = s.channel ? null : contactFor(s)
                  const what = s.from === picked ? 'arrives' : s.to === picked ? 'leaves' : 'staying'
                  return (
                    <div className={`adm-cal-stay${s.channel ? ' is-channel' : ''}${s.closed ? ' is-closed' : ''}`} key={s.from}>
                      <span className="adm-cal-who">
                        {s.closed ? 'Closed for the winter' : s.channel ? 'Booking.com guest' : s.guest || 'Held (no name)'}
                        <em> · {what} · {dmy(s.from)} → {dmy(s.to)} · {nightsBetween(s.from, s.to)} n</em>
                      </span>
                      {s.note && <span className="adm-muted">{s.note}</span>}
                      {s.id && (
                        <button type="button" className="adm-link adm-link--danger"
                          onClick={() => onRelease(s.id!, `${houseName(s.house)} ${dmy(s.from)} → ${dmy(s.to)}`)}>
                          Release these nights
                        </button>
                      )}
                      {s.channel && <span className="adm-muted">Name and contact are in the Booking.com extranet.</span>}
                      {c && (
                        <span className="adm-cal-contact">
                          {c.email && <a className="adm-link" href={`mailto:${c.email}`}>{c.email}</a>}
                          {c.phone && <a className="adm-link" href={`tel:${c.phone.replace(/[^+\d]/g, '')}`}>{c.phone}</a>}
                          {c.pay && <span className={`adm-cal-pay${c.pay.status === 'paid' ? ' is-paid' : ''}`}>
                            {c.pay.amount / 100} € {c.pay.status === 'paid' ? 'paid' : c.pay.method === 'cash' ? 'cash on arrival' : 'not paid yet'}
                          </span>}
                          {c.enq && <button type="button" className="adm-link" onClick={() => onOpen(c.enq!.id)}>Open request</button>}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
          {dayRequests.length > 0 && (
            <div className="adm-cal-house">
              <b>Requests for this date</b>
              {dayRequests.map(({ e, s }) => (
                <div className={`adm-cal-stay is-req${needsReply(e) ? ' is-red' : ''}`} key={e.id}>
                  <span className="adm-cal-who">{e.name}<em> · {dmy(s.checkIn!)} → {dmy(s.checkOut!)} · {needsReply(e) ? 'needs a reply' : 'answered, not booked'}</em></span>
                  <span className="adm-cal-contact">
                    {e.email && <a className="adm-link" href={`mailto:${e.email}`}>{e.email}</a>}
                    <button type="button" className="adm-link" onClick={() => onOpen(e.id)}>Open request</button>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
