import { T, type Lang } from './translations'
import { nightsBetween, type DateStr } from './ical'
import type { HouseSlug } from './availability'

/** Published on the page, so it can be quoted here: 20 € for the whole stay, not per night. */
export const PET_FEE_EUR = 20
/** 20 € per person, per morning. A stay of N nights has N mornings. */
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
  breakfast: number
  total: number
}

/**
 * What the stay costs at the published rates.
 *
 * The pet fee is once per stay; breakfast is per person for every morning of it, and a stay
 * of N nights has N mornings — arrival evening has none, departure morning does.
 *
 * The total is indicative for the reason `feature.priceNote` already says out loud: high
 * season, holidays and long stays can be priced differently.
 */
export function quote(
  slug: HouseSlug | string,
  guests: number,
  checkIn: DateStr,
  checkOut: DateStr,
  pet: boolean,
  breakfast: boolean,
): Quote | null {
  const nights = nightsBetween(checkIn, checkOut)
  const rate = nightlyRate(slug, guests)
  if (nights < 1 || rate === null) return null

  const accommodation = nights * rate
  const petFee = pet ? PET_FEE_EUR : 0
  const morningMeals = breakfast ? guests * nights * BREAKFAST_EUR : 0
  return {
    nights,
    rate,
    accommodation,
    petFee,
    breakfast: morningMeals,
    total: accommodation + petFee + morningMeals,
  }
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
