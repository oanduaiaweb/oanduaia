'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Stats } from '@/lib/googleStats'

type Answer = { configured: boolean; stats?: Stats; error?: string }

const CHANNEL: Record<string, string> = {
  Direct: 'Direct / Booking / messages',
  'Organic Search': 'Google search',
  'AI Assistant': 'AI assistants',
  'Organic Social': 'Facebook / Instagram',
  'Organic Shopping': 'Google hotels',
  Referral: 'Other websites',
  Unassigned: 'Unknown',
}

const fmt = (n: number) => n.toLocaleString('et-EE')

function List({ title, rows, note }: { title: string; rows: { label: string; value: number }[]; note?: string }) {
  const max = Math.max(1, ...rows.map(r => r.value))
  return (
    <div className="adm-stat-list">
      <h3 className="adm-stat-h3">{title}</h3>
      {rows.length === 0 ? <p className="adm-muted">No data yet.</p> : (
        <ul>
          {rows.map(r => (
            <li key={r.label}>
              <span className="adm-stat-bar" style={{ width: `${(r.value / max) * 100}%` }} />
              <span className="adm-stat-label">{r.label || '(none)'}</span>
              <span className="adm-stat-num">{fmt(r.value)}</span>
            </li>
          ))}
        </ul>
      )}
      {note && <p className="adm-stat-note">{note}</p>}
    </div>
  )
}

/** Website statistics from Google Analytics and Search Console, refreshed every ten minutes. */
export default function AdminStats() {
  const [days, setDays] = useState(30)
  const [answer, setAnswer] = useState<Answer | null>(null)

  const load = useCallback(async (d: number) => {
    setAnswer(null)
    const res = await fetch(`/api/admin/stats?days=${d}`, { cache: 'no-store' })
    setAnswer(await res.json().catch(() => ({ configured: true, error: `HTTP ${res.status}` })))
  }, [])

  useEffect(() => { load(days) }, [days, load])

  const s = answer?.stats
  const peak = Math.max(1, ...(s?.daily.map(d => d.value) ?? [1]))

  return (
    <section className="adm-section">
      <h2 className="adm-h2">
        Website statistics
        {[7, 30, 90].map(d => (
          <button key={d} type="button" className={`adm-chip${days === d ? ' is-on' : ''}`} onClick={() => setDays(d)}>
            {d} days
          </button>
        ))}
      </h2>

      {answer === null ? <p className="adm-muted">Loading…</p>
        : !answer.configured ? <p className="adm-muted">Not connected to Google Analytics yet.</p>
        : answer.error || !s ? <p className="adm-muted">Google did not answer: {answer.error}</p>
        : (
          <>
            <div className="adm-stat-tiles">
              <div className="adm-stat-tile is-live"><b>{fmt(s.liveNow)}</b><span>on the site now</span></div>
              <div className="adm-stat-tile"><b>{fmt(s.users)}</b><span>visitors</span></div>
              <div className="adm-stat-tile"><b>{fmt(s.sessions)}</b><span>visits</span></div>
              <div className="adm-stat-tile"><b>{fmt(s.pageViews)}</b><span>pages viewed</span></div>
              <div className="adm-stat-tile"><b>{fmt(s.dateChecks)}</b><span>calendar checks</span></div>
              <div className="adm-stat-tile"><b>{fmt(s.bookClicks)}</b><span>&ldquo;Book&rdquo; clicks</span></div>
              <div className="adm-stat-tile is-key"><b>{fmt(s.enquiries)}</b><span>enquiries sent</span></div>
            </div>

            <div className="adm-stat-daily" aria-label="Visitors per day">
              {s.daily.map(d => (
                <span key={d.label} style={{ height: `${Math.max(3, (d.value / peak) * 100)}%` }}
                  title={`${d.label.slice(6, 8)}.${d.label.slice(4, 6)} — ${d.value}`} />
              ))}
            </div>

            <div className="adm-stat-grid">
              <List title="Where visitors came from" rows={s.channels.map(c => ({ label: CHANNEL[c.label] ?? c.label, value: c.value }))} />
              <List title="Countries" rows={s.countries} note="United States includes Mikk's own visits and site tests." />
              <List title="Most viewed pages" rows={s.pages} />
              {s.search && (
                <List
                  title={`Google searches · ${fmt(s.search.clicks)} clicks · ${fmt(s.search.impressions)} views · position ${s.search.position}`}
                  rows={s.search.queries}
                  note="Search Console data is 2–3 days behind."
                />
              )}
            </div>
            <p className="adm-stat-note">Updated {new Date(s.fetched).toLocaleTimeString('et-EE', { hour: '2-digit', minute: '2-digit' })} · refreshes every 10 minutes</p>
          </>
        )}
    </section>
  )
}
