'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { track } from '@/lib/analytics'
import { useLanguage } from '@/contexts/LanguageContext'
import { useBookingDraft } from '@/contexts/BookingDraftContext'
import { T, type Lang } from '@/lib/translations'
import type { DateStr } from '@/lib/ical'
import { HOUSE_SLUGS, HORIZON_MONTHS, type Availability as Feed, type HouseSlug } from '@/lib/availability'
import {
  breakfastMornings,
  formatDate,
  house as houseData,
  maxGuests,
  nightlyRate,
  quote,
} from '@/lib/pricing'
import { HOUSE_IMAGES } from '@/lib/houses'

const LOCALE: Record<Lang, string> = { et: 'et', en: 'en-GB', ru: 'ru', de: 'de-DE', es: 'es-ES', sv: 'sv-SE', fi: 'fi-FI', lv: 'lv-LV' }

const pad = (n: number) => String(n).padStart(2, '0')
const key = (y: number, m: number, d: number): DateStr => `${y}-${pad(m + 1)}-${pad(d)}`

/** Monday-first, the way a calendar is read here. `getUTCDay()` puts Sunday at 0. */
const mondayIndex = (jsDay: number) => (jsDay + 6) % 7

function monthLabel(y: number, m: number, lang: Lang) {
  // Month name and year are joined here rather than by Intl: Latvian formats a month with its
  // year as "2026. g. novembris", Spanish as "noviembre de 2026", Russian adds "г.".
  const s = new Intl.DateTimeFormat(LOCALE[lang], { month: 'long', timeZone: 'UTC' })
    .format(new Date(Date.UTC(y, m, 1)))
  return `${s.charAt(0).toUpperCase()}${s.slice(1)} ${y}`
}

/** Intl's short Latvian weekdays are whole words ("Ceturtd.") and pushed Sat–Sun off the panel. */
const WEEKDAYS: Partial<Record<Lang, string[]>> = { lv: ['P', 'O', 'T', 'C', 'Pk', 'S', 'Sv'] }

function weekdayInitials(lang: Lang) {
  const fixed = WEEKDAYS[lang]
  if (fixed) return fixed
  const fmt = new Intl.DateTimeFormat(LOCALE[lang], { weekday: 'short', timeZone: 'UTC' })
  // 5 Jan 2026 is a Monday.
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(Date.UTC(2026, 0, 5 + i))))
}

/** Estonian and English take two forms, Russian three. */
function nights(n: number, lang: Lang) {
  const t = T.availability
  const b = T.booking
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
  const b = T.booking

  const [feed, setFeed] = useState<Feed | null>(null)
  const [failed, setFailed] = useState(false)
  const [slug, setSlug] = useState<HouseSlug>(initialHouse ?? 'saunamaja')
  const [guests, setGuests] = useState(2)
  const [checkIn, setCheckIn] = useState<DateStr | null>(null)
  const [checkOut, setCheckOut] = useState<DateStr | null>(null)
  const [hovered, setHovered] = useState<DateStr | null>(null)
  const [pet, setPet] = useState(false)
  /*
   * Which mornings, not whether. A four-night stay might want breakfast on two of them, and
   * the kitchen needs to know which two — "yes to breakfast" is not something anyone can cook
   * from. Held as a Set of dates so the arithmetic and the enquiry both read off one source.
   */
  /*
   * Whether breakfast is wanted at all, held SEPARATELY from which mornings.
   *
   * These were one piece of state — the checkbox read `chosen.length > 0` and the chips only
   * rendered while something was chosen. Turning off the last remaining morning therefore made
   * the entire block vanish mid-click: chips, the headcount, and the tick itself. The guest had
   * clicked one chip and the section disappeared out from under them, with no way back except
   * re-ticking the box, which re-selected everything. One flag cannot answer both "do you want
   * breakfast" and "on which days".
   */
  const [breakfastOn, setBreakfastOn] = useState(false)
  const [breakfastDays, setBreakfastDays] = useState<Set<DateStr>>(new Set())
  /*
   * How many of them eat it. NOT the same as `guests`: a family of four often wants breakfast
   * for two, and quoting the whole house is the sort of surprise that loses the booking. It
   * follows the guest count until someone changes it, and is clamped below so it can never
   * exceed the number of people in the house.
   */
  const [breakfastPeople, setBreakfastPeople] = useState(2)

  /*
   * New dates while breakfast is on: take all the mornings of the new stay. The old selection
   * refers to days that are no longer part of it, and silently leaving nothing chosen under a
   * ticked box is the same trap in slower motion.
   */
  useEffect(() => {
    if (!breakfastOn) return
    // Half-chosen stay: nothing to select yet. The tick is KEPT — the guest said they want
    // breakfast and changing dates is not them changing their mind — and the box is locked
    // meanwhile, so it cannot be clicked into the invisible state described above.
    if (!checkIn || !checkOut) { setBreakfastDays(new Set()); return }
    setBreakfastDays(new Set(breakfastMornings(checkIn, checkOut)))
  }, [breakfastOn, checkIn, checkOut])
  /*
   * What to tell the guest about their last click, if anything.
   *
   * Was a boolean, which could only ever say "that does not work". It now carries WHICH
   * problem, so the calendar can name the night that is in the way instead of leaving the
   * guest to find it by trial and error.
   */
  const [warn, setWarn] = useState<null | { kind: 'crosses' | 'taken' | 'released'; date?: DateStr }>(null)
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

  const clearDates = () => { setCheckIn(null); setCheckOut(null) }

  /**
   * One click on a day.
   *
   * The rule that was missing: **a completed range has to be releasable.** Before this, once
   * both ends were set the only way out was to click a different free day, which silently
   * became a new arrival — and clicking a SOLD day did nothing whatsoever, no movement and no
   * message, which is what made the calendar feel stuck.
   *
   * Now every click either advances the selection or releases it and says why.
   */
  const pickDay = (date: DateStr) => {
    setWarn(null)

    // Clicking either end of the selection again lets it go. This is the way out.
    if ((checkOut && date === checkOut) || (checkIn && date === checkIn)) {
      clearDates()
      setWarn({ kind: 'released' })
      return
    }

    /*
     * A legal departure day, and this is checked BEFORE the sold-night test on purpose: you
     * may leave on the morning the next guest arrives, so the last day of a stay is often a
     * night that IS sold. Testing `blocked` first would refuse exactly the booking we want.
     */
    if (checkIn && !checkOut && canCheckOutOn(date)) {
      setCheckOut(date)
      return
    }

    // A night that is sold, and not a departure. Release rather than ignore the click: silence
    // reads as a frozen calendar, and the guest cannot tell a refusal from a broken page.
    if (blocked.has(date)) {
      clearDates()
      setWarn({ kind: 'taken' })
      return
    }

    // No arrival yet, or the range is already complete, or they went backwards — start here.
    if (!checkIn || checkOut || date <= checkIn) {
      setCheckIn(date)
      setCheckOut(null)
      return
    }

    // Forward of the arrival, but something is sold in between.
    {
      // Their click is not wasted: the old range goes, and the day they clicked becomes the
      // new arrival, so they are left with a usable selection rather than a dead end.
      setCheckIn(date)
      setCheckOut(null)
      setWarn({ kind: 'crosses', date: firstTakenAfterCheckIn ?? undefined })
    }
  }

  /** Guests moved, so the breakfast headcount follows it rather than being left stale. */
  const changeGuests = (n: number) => {
    setGuests(n)
    setBreakfastPeople(n)
  }

  const changeHouse = (next: HouseSlug) => {
    setSlug(next)
    setGuests(g => Math.min(g, maxGuests(next)))
    setBreakfastPeople(p => Math.min(p, maxGuests(next)))
    // Free nights differ per house, so a range chosen against one house means nothing for another.
    setCheckIn(null); setCheckOut(null); setWarn(null)
  }

  const stayChosen = !!checkIn && !!checkOut
  const mornings = stayChosen ? breakfastMornings(checkIn!, checkOut!) : []
  // A morning that is no longer part of the stay must not stay selected and priced.
  const chosen = mornings.filter(d => breakfastDays.has(d))
  // Clamped for display too, not only inside quote(), so the control and the price agree.
  const eaters = Math.min(breakfastPeople, guests)
  const q = checkIn && checkOut
    ? quote(slug, guests, checkIn, checkOut, pet, chosen.length, eaters)
    : null

  const toggleMorning = (d: DateStr) =>
    setBreakfastDays(prev => {
      const next = new Set(prev)
      next.has(d) ? next.delete(d) : next.add(d)
      return next
    })

  /** Short enough to sit in a chip: "6. sept" / "6 Sep". */
  const morningLabel = (d: DateStr) =>
    new Intl.DateTimeFormat(LOCALE[lang], { day: 'numeric', month: 'short', timeZone: 'UTC' })
      .format(new Date(`${d}T12:00:00Z`))
  const rate = nightlyRate(slug, guests)

  const rangeEnd = checkOut ?? (checkIn && hovered && hovered > checkIn && canCheckOutOn(hovered) ? hovered : null)

  const submit = () => {
    if (!checkIn || !checkOut || !q) return
    const dates = `${formatDate(checkIn, lang)} – ${formatDate(checkOut, lang)} (${nights(q.nights, lang)})`
    const message = [
      `${t.mHouse[lang]}: ${h.name[lang]}`,
      `${t.mGuests[lang]}: ${guests}`,
      pet ? `${t.mPet[lang]}: ${t.mYes[lang]}` : '',
      chosen.length
        ? `${t.mMornings[lang]}: ${chosen.map(morningLabel).join(', ')}`
        : '',
      // Spelled out separately: the kitchen cooks off this number, not off the guest count.
      chosen.length ? `${t.mBreakfastWho[lang]}: ${eaters}` : '',
      `${t.mEstimate[lang]}: ${q.total} €`,
      '',
    ].filter(Boolean).join('\n')
    /*
     * The step before the enquiry: dates picked, price quoted, handed to the form. The gap
     * between this event and `enquiry_sent` is the drop-off on the last screen — the most
     * expensive place to lose someone, and invisible without both numbers.
     */
    track('dates_requested', {
      lang,
      house: slug,
      nights: q.nights,
      guests,
      pet,
      breakfast: chosen.length,
      breakfast_people: eaters,
      value: q.total,
      currency: 'EUR',
    })
    request({ dates, message })
    document.getElementById('vorm')?.scrollIntoView({ behavior: 'smooth' })
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
    <section className="avail-section" id="broneeri">
      {/*
        The reservation intro used to sit below the calendar, introducing only the form.
        It heads the whole block now: why you are here, the house rules, then the dates,
        then the message. Moved wholesale rather than duplicated — the form keeps none of it.
      */}
      <p className="avail-eyebrow">{b.label[lang]}</p>
      <h2 className="booking-heading reveal">
        {b.h1[lang]} <em>{b.h2em[lang]}</em>
      </h2>
      <p className="booking-sub reveal reveal-delay-1">{b.sub[lang]}</p>
      <p className="booking-times reveal reveal-delay-1">
        {b.times[lang]}
        <span className="booking-terms">{b.terms[lang]}</span>
        <span className="booking-terms">{b.cancel[lang]}</span>
        <span className="booking-terms">{b.practical[lang]}</span>
        <span className="booking-pets">{b.pets[lang]}</span>
      </p>

      <div className="avail-panel reveal reveal-delay-2">
        {/*
          The house you picked, behind the panel. All three are stacked and cross-faded
          rather than swapped, so switching houses dissolves instead of flashing, and each
          keeps its own focal point so the building survives the crop. The veil over them is
          dark, not linen: the panel's type is light, so the photograph is only ever allowed
          to darken the ground it sits on.
        */}
        <div className="avail-panel-bg" aria-hidden="true">
          {HOUSE_SLUGS.map(s => {
            const img = HOUSE_IMAGES[s]
            if (!img) return null
            return (
              <div key={s} className={`avail-panel-photo${s === slug ? ' is-on' : ''}`}>
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 900px"
                  quality={70}
                  style={{ objectFit: 'cover', objectPosition: img.focus ?? 'center' }}
                />
              </div>
            )
          })}
          <div className="avail-panel-scrim" />
        </div>

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

        </div>

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
                          /*
                           * ONLY past days are disabled.
                           *
                           * Sold nights used to be disabled too, which is the real reason the
                           * calendar felt frozen: clicking one produced no movement and no
                           * message, indistinguishable from a broken page. They are still
                           * unselectable — pickDay refuses them — but they can now answer for
                           * themselves and say the night is taken. `aria-disabled` keeps the
                           * fact that they are unavailable available to screen readers.
                           */
                          const disabled = past

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
                              aria-disabled={taken && !asCheckout}
                              aria-label={formatDate(date, lang)}
                              aria-pressed={isIn || isOut}
                              /*
                               * Mouse only. On a phone the hover preview redrew the calendar
                               * on the first tap, and iOS then waited for a second tap to
                               * pick the day (Mikk, 29 Oct: "I need to click two times").
                               */
                              onPointerEnter={e => { if (e.pointerType === 'mouse') setHovered(date) }}
                              onPointerLeave={e => { if (e.pointerType === 'mouse') setHovered(null) }}
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

            {warn && (
              <p className="avail-status avail-status--warn">
                {warn.kind === 'released' ? t.released[lang]
                  : warn.kind === 'taken' ? t.takenDay[lang]
                  : warn.date ? t.crossesOn[lang].replace('{date}', formatDate(warn.date, lang))
                  : t.crosses[lang]}
              </p>
            )}

            <div className="avail-summary">
              <p className="avail-hint">
                {!checkIn ? t.pickIn[lang]
                  : !checkOut ? t.pickOut[lang]
                  : `${formatDate(checkIn, lang)} – ${formatDate(checkOut, lang)}`}
              </p>

              {/*
                How many people. It used to sit in the header beside the house buttons, above
                the calendar — but it belongs to the stay, not to the house, and the guest only
                thinks about it once the dates are chosen. It also drives the nightly rate
                (1-2 vs 3-4), so it has to be visible right where the price is.
              */}
              <div className="avail-people">
                <label className="avail-label" htmlFor="avail-guests">{t.lGuests[lang]}</label>
                <select
                  id="avail-guests"
                  className="avail-select"
                  value={guests}
                  onChange={e => changeGuests(Number(e.target.value))}
                >
                  {Array.from({ length: max }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {h.priceExtra && guests === max && (
                <p className="avail-note">{h.priceExtra[lang]}</p>
              )}

              <div className="avail-extras">
                <label className="avail-check">
                  <input type="checkbox" checked={pet} onChange={e => setPet(e.target.checked)} />
                  <span>{t.petAdd[lang]}</span>
                </label>
                {/*
                  Unavailable until there is a stay to attach it to.
                  Without this it could be ticked with no dates chosen, where it changed
                  NOTHING on screen — no chips, no price, because there are no mornings yet.
                  The guest, seeing no effect, clicked it again, which turned breakfast OFF;
                  they then picked dates, and the next click finally "worked". That is the
                  "first try resets everything, second time it works" Mikk hit. A control
                  that accepts a click and shows no result is worse than one that refuses it.
                */}
                <label className={`avail-check${stayChosen ? '' : ' is-locked'}`}>
                  <input
                    type="checkbox"
                    checked={breakfastOn}
                    disabled={!stayChosen}
                    onChange={e => {
                      setBreakfastOn(e.target.checked)
                      setBreakfastDays(e.target.checked ? new Set(mornings) : new Set())
                    }}
                  />
                  <span>{t.breakfastAdd[lang]}</span>
                </label>
              </div>

              {/*
                The mornings themselves. Ticking the box above takes all of them, which is the
                common case and matches what the old checkbox did; the chips are for the guest
                who wants two of four. Only shown once there are dates to choose between.
              */}
              {/*
                Shown for as long as breakfast is ticked — NOT while something happens to be
                chosen. Clearing every chip now leaves an empty row of chips to click back on,
                which is what a guest expects, instead of deleting the block.
              */}
              {breakfastOn && mornings.length > 0 && (
                <div className="avail-mornings">
                  {/*
                    The mornings start INCLUDED, so every tap here removes one. Three plain
                    date buttons did not say that: a guest reads them as "pick your days",
                    taps all three to choose them, and turns every one off instead — the
                    breakfast line then disappears from the price and it reads as a reset.
                    The tick is what makes the direction legible, and All/None gives a
                    one-tap way back from either end.
                  */}
                  <div className="avail-mornings-head">
                    <span className="avail-mornings-label">{t.breakfastWhich[lang]}</span>
                    <span className="avail-mornings-bulk">
                      <button type="button" className="avail-bulk"
                        onClick={() => setBreakfastDays(new Set(mornings))}
                        disabled={chosen.length === mornings.length}>
                        {t.breakfastAll[lang]}
                      </button>
                      <button type="button" className="avail-bulk"
                        onClick={() => setBreakfastDays(new Set())}
                        disabled={chosen.length === 0}>
                        {t.breakfastNone[lang]}
                      </button>
                    </span>
                  </div>
                  <div className="avail-morning-list">
                    {mornings.map(d => (
                      <button
                        key={d}
                        type="button"
                        className={`avail-morning${breakfastDays.has(d) ? ' is-on' : ''}`}
                        aria-pressed={breakfastDays.has(d)}
                        onClick={() => toggleMorning(d)}
                      >
                        {/* Always rendered, only hidden — so a chip does not change width
                            when it is toggled and the whole row reflows under the finger. */}
                        <span className="avail-morning-tick" aria-hidden="true">✓</span>
                        {morningLabel(d)}
                      </button>
                    ))}
                  </div>

                  {chosen.length === 0 && (
                    <p className="avail-note avail-note--pick">{t.breakfastPick[lang]}</p>
                  )}

                  {/* Only offered when there is a choice to make — at one guest there is none. */}
                  {chosen.length > 0 && guests > 1 && (
                    <div className="avail-people avail-people--breakfast">
                      <label className="avail-label" htmlFor="avail-breakfast-people">
                        {t.breakfastWho[lang]}
                      </label>
                      <select
                        id="avail-breakfast-people"
                        className="avail-select"
                        value={eaters}
                        onChange={e => setBreakfastPeople(Number(e.target.value))}
                      >
                        {Array.from({ length: guests }, (_, i) => i + 1).map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {q && rate !== null && (
                <dl className="avail-quote">
                  <div className="avail-quote-row">
                    <dt>{`${nights(q.nights, lang)} × ${rate} €`}</dt>
                    <dd>{`${q.accommodation} €`}</dd>
                  </div>
                  {q.breakfast > 0 && (
                    <div className="avail-quote-row">
                      <dt>{`${t.breakfastLine[lang]} · ${q.breakfastPeople} × ${q.breakfastCount} × 20 €`}</dt>
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
