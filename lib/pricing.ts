import { T, type Lang } from './translations'
import { addDays, nightsBetween, type DateStr } from './ical'
import type { HouseSlug } from './availability'

/** Published on the page, so it can be quoted here: 20 € for the whole stay, not per night. */
export const PET_FEE_EUR = 20
/** 20 € per person, per morning — and the guest chooses which mornings. */
export const BREAKFAST_EUR = 20
/** 28 € per person, per evening. Pre-ordered: the kitchen cooks to a number, not to a maybe. */
export const DINNER_EUR = 28

/**
 * The meals arranged for one booking.
 *
 * Kept as dates and headcounts rather than a sentence, because the kitchen cooks off this and
 * "breakfast for 2" buried in a paragraph cannot be counted, sorted or totalled. Declared here
 * rather than beside the payment record on purpose: `payments.ts` pulls in `@vercel/blob`, and
 * the admin that edits these is a client component.
 */
export type Meals = {
  /** Mornings breakfast is wanted, ISO dates. */
  breakfastDates?: string[]
  /** How many eat it — not always everyone in the house. */
  breakfastPeople?: number
  /** Evenings dinner is wanted, ISO dates. */
  dinnerDates?: string[]
  dinnerPeople?: number
  /** Settled at the house on arrival instead of being included in the card amount. */
  atHouse?: boolean
}

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
  /** Mornings chosen, so the line can show the arithmetic the guest actually picked. */
  breakfastCount: number
  /** How many people eat it — not always everyone in the house. */
  breakfastPeople: number
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
/**
 * The mornings a guest could actually eat breakfast on this stay.
 *
 * Arrival is from 2 pm, so there is no breakfast on the day you come. Departure is at noon,
 * so there IS one on the day you leave. That makes the eligible mornings the day after
 * check-in through the check-out day inclusive — exactly as many mornings as there are
 * nights, which is why the old all-or-nothing price of `guests × nights` was right.
 */
export function breakfastMornings(checkIn: DateStr, checkOut: DateStr): DateStr[] {
  const n = nightsBetween(checkIn, checkOut)
  return Array.from({ length: Math.max(0, n) }, (_, i) => addDays(checkIn, i + 1))
}

/**
 * The evenings a guest could actually eat dinner on this stay.
 *
 * The mirror image of the mornings: arrival is from 2 pm so there IS dinner on the day you come,
 * and departure is at noon so there is none on the day you leave. That makes it the check-in day
 * through the last night — as many evenings as there are nights, shifted one day earlier than
 * the breakfasts.
 */
export function dinnerEvenings(checkIn: DateStr, checkOut: DateStr): DateStr[] {
  const n = nightsBetween(checkIn, checkOut)
  return Array.from({ length: Math.max(0, n) }, (_, i) => addDays(checkIn, i))
}

/** What the arranged meals come to, split so a line can show where the money is. */
export function mealsCost(m: Meals | undefined): {
  breakfast: number; dinner: number; total: number
} {
  const eaters = (n: number | undefined) => Math.max(0, Math.floor(n ?? 0))
  const breakfast = (m?.breakfastDates?.length ?? 0) * eaters(m?.breakfastPeople) * BREAKFAST_EUR
  const dinner = (m?.dinnerDates?.length ?? 0) * eaters(m?.dinnerPeople) * DINNER_EUR
  return { breakfast, dinner, total: breakfast + dinner }
}

/** Whether anything is actually being cooked — an empty `meals` object is not a meal. */
export function hasMeals(m: Meals | undefined): boolean {
  return mealsCost(m).total > 0
}

export function quote(
  slug: HouseSlug | string,
  guests: number,
  checkIn: DateStr,
  checkOut: DateStr,
  pet: boolean,
  /** How many mornings breakfast was asked for — not whether it was. */
  breakfastCount: number,
  /**
   * How many people eat it. Separate from `guests` on purpose: a family of four often wants
   * breakfast for two, and billing the whole house for it is the kind of surprise on a quote
   * that loses the booking.
   */
  breakfastPeople: number,
): Quote | null {
  const nights = nightsBetween(checkIn, checkOut)
  const rate = nightlyRate(slug, guests)
  if (nights < 1 || rate === null) return null

  const accommodation = nights * rate
  const petFee = pet ? PET_FEE_EUR : 0
  // Never bill for more eaters than there are people in the house, whatever is passed in.
  const eaters = Math.min(Math.max(0, breakfastPeople), guests)
  const mornings = Math.max(0, breakfastCount)
  const morningMeals = eaters * mornings * BREAKFAST_EUR
  return {
    nights,
    rate,
    accommodation,
    petFee,
    breakfast: morningMeals,
    breakfastCount: mornings,
    breakfastPeople: eaters,
    total: accommodation + petFee + morningMeals,
  }
}

/** `2026-09-01` → `1. september 2026` / `1 September 2026` / `1 сентября 2026`. */
export function formatDate(date: DateStr, lang: Lang): string {
  const d = new Date(`${date}T12:00:00Z`)
  const locale = lang === 'en' ? 'en-GB' : lang
  const body = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d)
  // Estonian already supplies the ordinal period; Russian appends a " \u0433." we do not need.
  return body.replace(/\s*\u0433\.$/, '')
}
