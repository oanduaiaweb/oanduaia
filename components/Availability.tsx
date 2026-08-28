'use client'

import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useBookingDraft } from '@/contexts/BookingDraftContext'
import { T, type Lang } from '@/lib/translations'
import type { DateStr } from '@/lib/ical'
import { HOUSE_SLUGS, HORIZON_MONTHS, type Availability as Feed, type HouseSlug } from '@/lib/availability'
import { formatDate, house as houseData, maxGuests, nightlyRate, quote } from '@/lib/pricing'

const LOCALE: Record<Lang, string> = { et: 'et', en: 'en-GB', ru: 'ru' }

const pad = (n: number) => String(n).padStart(2, '0')
const key = (y: number, m: number, d: number): DateStr => `${y}-${pad(m + 1)}-${pad(d)}`

/** Monday-first, the way a calendar is read here. `getUTCDay()` puts Sunday at 0. */
const mondayIndex = (jsDay: number) => (jsDay + 6) % 7

function monthLabel(y: number, m: number, lang: Lang) {
  const s = new Intl.DateTimeFormat(LOCALE[lang], { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(y, m, 1)))
    .replace(/\s*г\.$/, '')
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function weekdayInitials(lang: Lang) {
  const fmt = new Intl.DateTimeFormat(LOCALE[lang], { weekday: 'short', timeZone: 'UTC' })
  // 5 Jan 2026 is a Monday.
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(Date.UTC(2026, 0, 5 + i))))
}

/** Estonian and English take two forms, Russian three. */
function nights(n: number, lang: Lang) {
  const t = T.availability
  let word: string
  if (lang === 'ru') {
    const mod10 = n % 10
    const mod100 = n % 100
    word =
      mod10 === 1 && mod100 !== 11 ? t.nightOne.ru
      : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? t.nightFew.ru
      : t.nightMany.ru
  } else {
    word = n === 1 ? t.nightOne[lang] : t.nightFew[lang]
  }
  return `${n} ${word}`
}

/**
 * `initialHouse` lets a per-house page open its own calendar already selected — the guest
 * arrived asking about that house, so making them pick it again is a step for nothing.
 */
export default function Availability({ initialHouse }: { initialHouse?: HouseSlug } = {}) {
  const { lang } = useLanguage()
  const { request } = useBookingDraft()
  const t = T.availability

  const [feed, setFeed] = useState<Feed | null>(null)
  const [failed, setFailed] = useState(false)
  const [slug, setSlug] = useState<HouseSlug>(initialHouse ?? 'saunamaja')
  const [guests, setGuests] = useState(2)
  const [checkIn, setCheckIn] = useState<DateStr | null>(null)
  const [checkOut, setCheckOut] = useState<DateStr | null>(null)
  const [hovered, setHovered] = useState<DateStr | null>(null)
  const [pet, setPet] = useState(false)
  const [breakfast, setBreakfast] = useState(false)
  const [warn, setWarn] = useState(false)
  const [cursor, setCursor] = useState<{ y: number; m: number } | null>(null)

  // The grid depends on today's date, so it is built after mount rather than on the server —
  // otherwise the first paint can disagree with the client and React throws out the markup.
  useEffect(() => {
    const now = new Date()
    setCursor({ y: now.getUTCFullYear(), m: now.getUTCMonth() })
    fetch('/api/availability')
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then(setFeed)
      .catch(() => setFailed(true))
  }, [])

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const houseFeed = feed?.houses.find(h => h.slug === slug)
  const known = houseFeed?.status === 'ok'
  // Complete, as opposed to merely readable. An empty calendar is not an empty house.
  const trusted = houseFeed?.trusted === true
  const blocked = useMemo(() => new Set(known ? houseFeed!.blocked : []), [known, houseFeed])

  const max = maxGuests(slug)
  const h = houseData(slug)

  /** First taken night on or after arrival — the stay cannot reach past it. */
  const firstTakenAfterCheckIn = useMemo(() => {
    if (!checkIn || !known) return null
    for (const night of houseFeed!.blocked) if (night >= checkIn) return night
    return null
  }, [checkIn, known, houseFeed])

  const canCheckOutOn = (date: DateStr) =>
    !!checkIn && date > checkIn && (!firstTakenAfterCheckIn || date <= firstTakenAfterCheckIn)

  const pickDay = (date: DateStr) => {
    setWarn(false)
    if (!checkIn || checkOut || date <= checkIn) {
      if (blocked.has(date)) return // cannot arrive on a night that is sold
      setCheckIn(date)
      setCheckOut(null)
      return
    }
    if (!canCheckOutOn(date)) { setWarn(true); return }
    setCheckOut(date)
  }

  const changeHouse = (next: HouseSlug) => {
    setSlug(next)
    setGuests(g => Math.min(g, maxGuests(next)))
    // Free nights differ per house, so a range chosen against one house means nothing for another.
    setCheckIn(null); setCheckOut(null); setWarn(false)
  }

  const q = checkIn && checkOut ? quote(slug, guests, checkIn, checkOut, pet, breakfast) : null
  const rate = nightlyRate(slug, guests)

  const rangeEnd = checkOut ?? (checkIn && hovered && hovered > checkIn && canCheckOutOn(hovered) ? hovered : null)

  const submit = () => {
    if (!checkIn || !checkOut || !q) return
    const dates = `${formatDate(checkIn, lang)} – ${formatDate(checkOut, lang)} (${nights(q.nights, lang)})`
    const message = [
      `${t.mHouse[lang]}: ${h.name[lang]}`,
      `${t.mGuests[lang]}: ${guests}`,
      pet ? `${t.mPet[lang]}: ${t.mYes[lang]}` : '',
      breakfast ? `${t.mBreakfast[lang]}: ${t.mYes[lang]}` : '',
      `${t.mEstimate[lang]}: ${q.total} €`,
      '',
    ].filter(Boolean).join('\n')
    request({ dates, message })
    document.getElementById('broneeri')?.scrollIntoView({ behavior: 'smooth' })
  }

  const months = cursor
    ? [cursor, { y: cursor.m === 11 ? cursor.y + 1 : cursor.y, m: (cursor.m + 1) % 12 }]
    : []

  const limit = useMemo(() => {
    const d = new Date()
    d.setUTCDate(1)
    d.setUTCMonth(d.getUTCMonth() + HORIZON_MONTHS - 1)
    return { y: d.getUTCFullYear(), m: d.getUTCMonth() }
  }, [])

  const step = (delta: number) => setCursor(c => {
    if (!c) return c
    const d = new Date(Date.UTC(c.y, c.m + delta, 1))
    const next = { y: d.getUTCFullYear(), m: d.getUTCMonth() }
    const now = new Date()
    if (next.y * 12 + next.m < now.getUTCFullYear() * 12 + now.getUTCMonth()) return c
    if (next.y * 12 + next.m > limit.y * 12 + limit.m) return c
    return next
  })

  const atStart = !!cursor && cursor.y * 12 + cursor.m <= new Date().getUTCFullYear() * 12 + new Date().getUTCMonth()
  const atEnd = !!cursor && cursor.y * 12 + cursor.m >= limit.y * 12 + limit.m

  return (
    <section className="avail-section" id="saadavus">
      <p className="avail-eyebrow">{t.label[lang]}</p>
      <h2 className="avail-heading reveal">
        {t.h1[lang]} <em>{t.h2em[lang]}</em>
      </h2>
      <p className="avail-sub reveal reveal-delay-1">{t.sub[lang]}</p>

      <div className="avail-panel reveal reveal-delay-2">
        <div className="avail-controls">
          <div className="avail-control">
            <span className="avail-label">{t.lHouse[lang]}</span>
            <div className="avail-houses" role="group" aria-label={t.lHouse[lang]}>
              {HOUSE_SLUGS.map(s => (
                <button
                  key={s}
                  type="button"
                  className={`avail-house${s === slug ? ' is-on' : ''}`}
                  aria-pressed={s === slug}
                  onClick={() => changeHouse(s)}
                >
                  {houseData(s).name[lang]}
                </button>
              ))}
            </div>
          </div>

          <div className="avail-control avail-control--guests">
            <label className="avail-label" htmlFor="avail-guests">{t.lGuests[lang]}</label>
            <select
              id="avail-guests"
              className="avail-select"
              value={guests}
              onChange={e => setGuests(Number(e.target.value))}
            >
              {Array.from({ length: max }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {h.priceExtra && guests === max && (
          <p className="avail-note">{h.priceExtra[lang]}</p>
        )}

        {!cursor ? (
          <p className="avail-status">{t.loading[lang]}</p>
        ) : (
          <>
            {known && !trusted && <p className="avail-status">{t.notLinked[lang]}</p>}
            {(failed || houseFeed?.status === 'error') && (
              <p className="avail-status avail-status--warn">{t.unknown[lang]}</p>
            )}

            <div className="avail-calendar">
              <div className="avail-nav">
                <button type="button" className="avail-arrow" onClick={() => step(-1)}
                  disabled={atStart} aria-label={t.prevMonth[lang]}>‹</button>
                <button type="button" className="avail-arrow" onClick={() => step(1)}
                  disabled={atEnd} aria-label={t.nextMonth[lang]}>›</button>
              </div>

              <div className="avail-months">
                {months.map(({ y, m }, idx) => {
                  const first = new Date(Date.UTC(y, m, 1))
                  const lead = mondayIndex(first.getUTCDay())
                  const days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate()

                  return (
                    <div className={`avail-month${idx === 1 ? ' avail-month--second' : ''}`} key={`${y}-${m}`}>
                      <p className="avail-month-name">{monthLabel(y, m, lang)}</p>
                      <div className="avail-week-heads" aria-hidden="true">
                        {weekdayInitials(lang).map((w, i) => <span key={i}>{w}</span>)}
                      </div>
                      <div className="avail-grid">
                        {Array.from({ length: lead }, (_, i) => <span className="avail-day is-blank" key={`b${i}`} />)}
                        {Array.from({ length: days }, (_, i) => {
                          const d = i + 1
                          const date = key(y, m, d)
                          const past = date < today
                          const taken = blocked.has(date)
                          const isIn = date === checkIn
                          const isOut = date === checkOut
                          const inRange = !!checkIn && !!rangeEnd && date > checkIn && date < rangeEnd
                          // Only while a departure day is actually being chosen — once the range
                          // is set, hinting at other possible checkouts is just noise.
                          const asCheckout = taken && !checkOut && canCheckOutOn(date)
                          const disabled = past || (taken && !asCheckout)

                          const cls = [
                            'avail-day',
                            past ? 'is-past' : '',
                            taken ? 'is-taken' : '',
                            asCheckout ? 'is-checkout-ok' : '',
                            isIn || isOut ? 'is-picked' : '',
                            inRange ? 'is-range' : '',
                          ].filter(Boolean).join(' ')

                          return (
                            <button
                              type="button"
                              key={date}
                              className={cls}
                              disabled={disabled}
                              aria-label={formatDate(date, lang)}
                              aria-pressed={isIn || isOut}
                              onMouseEnter={() => setHovered(date)}
                              onMouseLeave={() => setHovered(null)}
                              onClick={() => pickDay(date)}
                            >
                              {d}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="avail-legend">
                <span><i className="avail-swatch avail-swatch--free" />{t.legendFree[lang]}</span>
                <span><i className="avail-swatch avail-swatch--taken" />{t.legendTaken[lang]}</span>
                <span><i className="avail-swatch avail-swatch--picked" />{t.legendPicked[lang]}</span>
              </div>
              {/*
                Why a booked night can sit next to a free arrival: departure is 12.00 and
                arrival 14.00, so one day carries two different parties. Saying it here, at
                the grid, is what makes the turnover read as deliberate rather than as a bug.
              */}
              <p className="avail-turnover">{T.booking.times[lang]}</p>
            </div>

            {warn && <p className="avail-status avail-status--warn">{t.crosses[lang]}</p>}

            <div className="avail-summary">
              <p className="avail-hint">
                {!checkIn ? t.pickIn[lang]
                  : !checkOut ? t.pickOut[lang]
                  : `${formatDate(checkIn, lang)} – ${formatDate(checkOut, lang)}`}
              </p>

              <div className="avail-extras">
                <label className="avail-check">
                  <input type="checkbox" checked={pet} onChange={e => setPet(e.target.checked)} />
                  <span>{t.petAdd[lang]}</span>
                </label>
                <label className="avail-check">
                  <input type="checkbox" checked={breakfast} onChange={e => setBreakfast(e.target.checked)} />
                  <span>{t.breakfastAdd[lang]}</span>
                </label>
              </div>

              {q && rate !== null && (
                <dl className="avail-quote">
                  <div className="avail-quote-row">
                    <dt>{`${nights(q.nights, lang)} × ${rate} €`}</dt>
                    <dd>{`${q.accommodation} €`}</dd>
                  </div>
                  {q.breakfast > 0 && (
                    <div className="avail-quote-row">
                      <dt>{`${t.breakfastLine[lang]} · ${guests} × ${q.nights} × 20 €`}</dt>
                      <dd>{`${q.breakfast} €`}</dd>
                    </div>
                  )}
                  {q.petFee > 0 && (
                    <div className="avail-quote-row">
                      <dt>{t.petLine[lang]}</dt>
                      <dd>{`${q.petFee} €`}</dd>
                    </div>
                  )}
                  <div className="avail-quote-row avail-quote-row--total">
                    <dt>{t.total[lang]}</dt>
                    <dd>{`${q.total} €`}</dd>
                  </div>
                  <p className="avail-quote-note">{t.indicative[lang]}</p>
                </dl>
              )}

              <button type="button" className="btn-dark avail-cta" disabled={!q} onClick={submit}>
                {t.cta[lang]}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
