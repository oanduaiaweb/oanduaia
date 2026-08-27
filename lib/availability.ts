import { addDays, blockedNights, type DateStr } from './ical'

/**
 * Availability is read from the channels, not stored here.
 *
 * Booking.com publishes one iCal export link per room type, and each of the three houses
 * is its own room type — so each house gets its own feed URL, set as an environment
 * variable. Booking.com stays the single source of truth, which is the whole point: a
 * calendar of our own would be a second truth to keep in sync, and the two would drift.
 *
 * Booking.com allows iCal only while the property has no channel manager / XML connection
 * and no more than 20 room types with one unit each. Three houses sits well inside that.
 *
 * A house may carry more than one feed (a second channel later on) — separate the URLs
 * with a comma. Everything the feeds block is merged.
 */
export const HOUSE_SLUGS = ['saunamaja', 'tiigimaja', 'metsamaja'] as const
export type HouseSlug = (typeof HOUSE_SLUGS)[number]

const FEED_ENV: Record<HouseSlug, string> = {
  saunamaja: 'ICAL_SAUNAMAJA',
  tiigimaja: 'ICAL_TIIGIMAJA',
  metsamaja: 'ICAL_METSAMAJA',
}

/** How far ahead the calendar can be browsed. */
export const HORIZON_MONTHS = 12

/** Feeds are re-read on this cadence. Channel iCal is polled, never live — an hour is the norm. */
export const REVALIDATE_SECONDS = 1800

export type HouseAvailability = {
  slug: HouseSlug
  /**
   * `ok` — the feeds answered and `blocked` is complete.
   * `unconfigured` — no feed URL set yet.
   * `error` — a feed exists but did not answer.
   *
   * The last two are NOT "everything is free". Anything other than `ok` must be shown as
   * unknown, or the first thing this calendar does is sell a night that is already sold.
   */
  status: 'ok' | 'unconfigured' | 'error'
  blocked: DateStr[]
}

export type Availability = {
  from: DateStr
  to: DateStr
  houses: HouseAvailability[]
}

function today(): DateStr {
  return new Date().toISOString().slice(0, 10)
}

async function readFeeds(slug: HouseSlug, from: DateStr, to: DateStr): Promise<HouseAvailability> {
  const urls = (process.env[FEED_ENV[slug]] ?? '')
    .split(',')
    .map(u => u.trim())
    .filter(Boolean)

  if (!urls.length) return { slug, status: 'unconfigured', blocked: [] }

  const nights = new Set<DateStr>()
  let failed = false

  await Promise.all(
    urls.map(async url => {
      try {
        const res = await fetch(url, {
          signal: AbortSignal.timeout(10_000),
          next: { revalidate: REVALIDATE_SECONDS },
        })
        if (!res.ok) throw new Error(`${res.status}`)
        const body = await res.text()
        // A feed that came back as an HTML error page must not read as an empty calendar.
        if (!body.includes('BEGIN:VCALENDAR')) throw new Error('not an iCalendar feed')
        for (const night of blockedNights(body)) {
          if (night >= from && night < to) nights.add(night)
        }
      } catch (err) {
        failed = true
        console.error(`[availability] ${slug} feed failed:`, err)
      }
    }),
  )

  // One bad feed out of several still means we cannot claim to know what is free.
  return { slug, status: failed ? 'error' : 'ok', blocked: [...nights].sort() }
}

export async function getAvailability(): Promise<Availability> {
  const from = today()
  const to = addDays(from, HORIZON_MONTHS * 31)
  const houses = await Promise.all(HOUSE_SLUGS.map(slug => readFeeds(slug, from, to)))
  return { from, to, houses }
}
