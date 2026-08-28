import { addDays, blockedNights, type DateStr } from './ical'
import { readBookings, blockedNightsFor } from './bookings'
import { closedNights } from './season'

/**
 * Our own calendar is the master, and any channel feed is merged on top of it.
 *
 * This is the way round Mikk wants it: the aim is direct guests, with Booking.com as one
 * channel among others rather than the owner of the truth. So every house's availability
 * starts from the blocks kept in our own store.
 *
 * A configured Booking.com iCal feed is then unioned in. It cannot free a night we hold —
 * it can only add nights we did not know about. That makes it a safety net rather than an
 * authority: paste the export links and the "check Booking.com before confirming" step
 * stops depending on anyone remembering.
 *
 * A house may carry more than one feed — separate the URLs with a comma.
 *
 * On top of both sits the winter closure (see `season.ts`), which no feed and no admin
 * action can open: a house that is shut is shut.
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
   * `ok` — our own calendar was read, and every configured feed answered.
   * `error` — our store failed, or a configured feed did not answer.
   *
   * `error` is NOT "everything is free". It must be shown as unknown, or the first thing
   * this calendar does is sell a night that is already sold.
   */
  status: 'ok' | 'error'
  blocked: DateStr[]
  /** Whether a channel feed is wired up for this house — surfaced in the admin, not to guests. */
  feedConnected: boolean
  /**
   * Whether what we show is complete: a channel feed is connected, or Mikk has marked this
   * house's own calendar as up to date. When false the guest is told the dates still need
   * confirming, because an empty calendar and a free calendar look identical.
   */
  trusted: boolean
}

export type Availability = {
  from: DateStr
  to: DateStr
  houses: HouseAvailability[]
}

function today(): DateStr {
  return new Date().toISOString().slice(0, 10)
}

async function readFeeds(
  slug: HouseSlug,
  from: DateStr,
  to: DateStr,
  own: DateStr[],
  live: boolean,
): Promise<HouseAvailability> {
  const urls = (process.env[FEED_ENV[slug]] ?? '')
    .split(',')
    .map(u => u.trim())
    .filter(Boolean)

  // Our own blocks are the floor, and the closed season sits under everything.
  const nights = new Set<DateStr>([
    ...closedNights(slug, from, to),
    ...own.filter(n => n >= from && n < to),
  ])
  let failed = false

  if (!urls.length) {
    return { slug, status: 'ok', blocked: [...nights].sort(), feedConnected: false, trusted: live }
  }

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
  return {
    slug,
    status: failed ? 'error' : 'ok',
    blocked: [...nights].sort(),
    feedConnected: true,
    trusted: true,
  }
}

export async function getAvailability(): Promise<Availability> {
  const from = today()
  const to = addDays(from, HORIZON_MONTHS * 31)

  // If our own store cannot be read we know nothing, whatever the feeds say.
  let store
  try {
    store = await readBookings()
  } catch {
    return {
      from,
      to,
      houses: HOUSE_SLUGS.map(slug => ({
        slug,
        status: 'error' as const,
        blocked: [],
        feedConnected: false,
        trusted: false,
      })),
    }
  }

  const houses = await Promise.all(
    HOUSE_SLUGS.map(slug =>
      readFeeds(slug, from, to, blockedNightsFor(store, slug), !!store.live[slug]),
    ),
  )
  return { from, to, houses }
}
