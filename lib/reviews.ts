import type { Lang } from './translations'
import { SOCIAL } from './social'

/**
 * Where the reviews actually live.
 *
 * Oanduaia is reviewed in three places and had been showing one hand-picked quote from
 * one of them. These are the real scores, read off each listing — Booking.com runs the
 * two houses as separate properties, so they carry separate scores and separate review
 * counts. Update them here when they move; nothing else needs touching.
 *
 * Deliberately NOT marked up as `aggregateRating` in the structured data. Marking up
 * someone else's review score as your own is exactly the sort of thing Google penalises.
 */
export type ReviewSource = {
  id: string
  channel: string
  /** Which house, where a channel splits them. Omitted for whole-property listings. */
  place?: string
  /** A number, not a string, so each language prints its own decimal mark. */
  score: number
  outOf: number
  count: number
  url: string
}

export const REVIEW_SOURCES: ReviewSource[] = [
  {
    id: 'booking-saunamaja',
    channel: 'Booking.com',
    place: 'Saunamaja',
    score: 9.7,
    outOf: 10,
    count: 27,
    url: SOCIAL.booking,
  },
  {
    id: 'booking-metsamaja',
    channel: 'Booking.com',
    place: 'Metsamaja',
    score: 9.6,
    outOf: 10,
    count: 31,
    url: 'https://www.booking.com/hotel/ee/metsamaja.html',
  },
  {
    id: 'google',
    channel: 'Google',
    score: 5,
    outOf: 5,
    count: 32,
    url: SOCIAL.mapsPlace,
  },
]

/**
 * Where "write a review" goes.
 *
 * Google's documented one-tap composer, search.google.com/local/writereview?placeid=…,
 * 404s for this listing — the Place ID it wants is not the one derivable from the Maps
 * URL, and Google does not expose the real one on the page. The link below opens the
 * listing itself, from which "Write a review" is one tap.
 *
 * The proper short link (https://g.page/r/…/review) can only be issued from Oanduaia's
 * own Google Business Profile. When Mikk sends it, replace this one constant.
 */
export const WRITE_REVIEW_URL = SOCIAL.mapsPlace

/** Estonian and Russian write 9,7; English writes 9.7. */
export function formatScore(score: number, lang: Lang): string {
  const locale = lang === 'et' ? 'et' : lang === 'ru' ? 'ru' : 'en-GB'
  return score.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}

/** Estonian keeps one partitive form; Russian needs three. */
export function reviewCount(n: number, lang: Lang): string {
  if (lang === 'et') return `${n} arvustust`
  if (lang === 'en') return `${n} ${n === 1 ? 'review' : 'reviews'}`
  const mod10 = n % 10
  const mod100 = n % 100
  const word =
    mod10 === 1 && mod100 !== 11 ? 'отзыв'
    : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? 'отзыва'
    : 'отзывов'
  return `${n} ${word}`
}
