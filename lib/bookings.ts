import { put, get, BlobNotFoundError } from '@vercel/blob'
import { HOUSE_SLUGS, type HouseSlug } from './availability'
import { nightsBetween, type DateStr } from './ical'

/**
 * Our own calendar, for houses we do not let a channel own.
 *
 * Tiigimaja has no Booking.com listing, so there is no feed to import — this is where its
 * availability actually lives. The longer aim is for every house to end up here and for
 * Booking.com to import OUR feed instead of the other way round.
 *
 * Stored as one private blob. Private matters: a booking list is guest data, and a public
 * blob URL is readable by anyone who learns it.
 */
const PATH = 'availability/bookings.json'

export type Block = {
  id: string
  /** First night held. */
  from: DateStr
  /** Departure day — exclusive, exactly as an iCal DTEND. The night before `to` is the last one held. */
  to: DateStr
  guest?: string
  note?: string
  created: string
}

export type BookingStore = {
  version: 1
  blocks: Record<string, Block[]>
  /**
   * Whether this house's calendar can be trusted to be complete.
   *
   * A house switched to our own calendar starts with an empty one, and an empty calendar
   * looks exactly like a house with no bookings. Until Mikk says otherwise the site shows
   * the dates as unconfirmed rather than free — an empty store must never sell a night
   * that Booking.com already sold.
   */
  live: Record<string, boolean>
}

const empty = (): BookingStore => ({
  version: 1,
  blocks: Object.fromEntries(HOUSE_SLUGS.map(s => [s, []])),
  live: Object.fromEntries(HOUSE_SLUGS.map(s => [s, false])),
})

export async function readBookings(): Promise<BookingStore> {
  try {
    const res = await get(PATH, { access: 'private', useCache: false })
    // `get` returns null when the blob has never been written — first run, not a failure.
    if (!res || res.statusCode !== 200) return empty()
    const text = await new Response(res.stream).text()
    const parsed = JSON.parse(text) as BookingStore
    // A store written before a house existed must not read as "that house is missing".
    parsed.live ??= {}
    for (const s of HOUSE_SLUGS) {
      parsed.blocks[s] ??= []
      parsed.live[s] ??= false
    }
    return parsed
  } catch (err) {
    if (err instanceof BlobNotFoundError) return empty()
    console.error('[bookings] read failed:', err)
    throw err
  }
}

export async function writeBookings(store: BookingStore): Promise<void> {
  await put(PATH, JSON.stringify(store, null, 2), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 0,
  })
}

/** Every night held for a house, expanded from its blocks. Same night model as the feeds. */
export function blockedNightsFor(store: BookingStore, slug: HouseSlug): DateStr[] {
  const nights = new Set<DateStr>()
  for (const b of store.blocks[slug] ?? []) {
    const span = Math.min(nightsBetween(b.from, b.to), 800)
    for (let i = 0; i < span; i++) {
      const d = new Date(`${b.from}T00:00:00Z`)
      d.setUTCDate(d.getUTCDate() + i)
      nights.add(d.toISOString().slice(0, 10))
    }
  }
  return [...nights].sort()
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/** Rejects anything the admin form should never have sent. Returns an error string, or null. */
export function validateBlock(house: string, from: string, to: string): string | null {
  if (!(HOUSE_SLUGS as readonly string[]).includes(house)) return 'Unknown house'
  if (!DATE_RE.test(from) || !DATE_RE.test(to)) return 'Dates must be YYYY-MM-DD'
  if (Number.isNaN(Date.parse(`${from}T00:00:00Z`)) || Number.isNaN(Date.parse(`${to}T00:00:00Z`)))
    return 'Not a real date'
  const nights = nightsBetween(from, to)
  if (nights < 1) return 'Departure must be after arrival'
  if (nights > 365) return 'That block is longer than a year'
  return null
}

/** Does this range touch anything already held for the house? */
export function overlaps(store: BookingStore, slug: HouseSlug, from: DateStr, to: DateStr): boolean {
  return (store.blocks[slug] ?? []).some(b => from < b.to && b.from < to)
}
