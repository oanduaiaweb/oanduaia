import { T, type Lang } from './translations'
import { nightsBetween, type DateStr } from './ical'
import type { HouseSlug } from './availability'

/** Published on the page, so it can be quoted here: 20 € for the whole stay, not per night. */
export const PET_FEE_EUR = 20
/** Published as 20 € per person. Deliberately NOT multiplied into the total — see `quote()`. */
export const BREAKFAST_EUR = 20

export type House = (typeof T.feature.houses)[number]

export function house(slug: HouseSlug | string): House {
  const found = T.feature.houses.find(h => h.slug === slug)
  if (!found) throw new Error(`Unknown house: ${slug}`)
  return found
}

/** The largest party the published tiers cover. Saunamaja goes further by arrangement. */
export function maxGuests(slug: HouseSlug | string): number {
  return Math.max(...house(slug).prices.map(p => p.upTo))
}

/** The cheapest published tier that still fits the party. */
export function nightlyRate(slug: HouseSlug | string, guests: number): number | null {
  const tier = house(slug).prices.find(p => guests <= p.upTo)
  return tier ? tier.eur : null
}

export type Quote = {
  nights: number
  rate: number
  accommodation: number
  petFee: number
  total: number
}

/**
 * What the stay costs at the published rates.
 *
 * Breakfast is offered at 20 € per person but the site does not say per what — per morning
 * or per stay — so it is carried through as a request, never added to this total. Quoting a
 * number we have not published is how a guest ends up arguing about the bill on arrival.
 *
 * The total is indicative for the same reason `feature.priceNote` already says out loud:
 * high season, holidays and long stays can be priced differently.
 */
export function quote(
  slug: HouseSlug | string,
  guests: number,
  checkIn: DateStr,
  checkOut: DateStr,
  pet: boolean,
): Quote | null {
  const nights = nightsBetween(checkIn, checkOut)
  const rate = nightlyRate(slug, guests)
  if (nights < 1 || rate === null) return null

  const accommodation = nights * rate
  const petFee = pet ? PET_FEE_EUR : 0
  return { nights, rate, accommodation, petFee, total: accommodation + petFee }
}

/** `2026-09-01` → `1. september 2026` / `1 September 2026` / `1 сентября 2026`. */
export function formatDate(date: DateStr, lang: Lang): string {
  const d = new Date(`${date}T12:00:00Z`)
  const locale = lang === 'et' ? 'et' : lang === 'ru' ? 'ru' : 'en-GB'
  const body = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d)
  // Estonian already supplies the ordinal period; Russian appends a " \u0433." we do not need.
  return body.replace(/\s*\u0433\.$/, '')
}
