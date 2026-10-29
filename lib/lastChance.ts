import { CLOSED_SEASONS } from './season'
import type { HouseSlug } from './availability'

/** The houses that shut for winter, in the order they are promoted. */
export const LAST_CHANCE_HOUSES = Object.keys(CLOSED_SEASONS) as HouseSlug[]

/** Weeks of run-up before the closing night during which the promotion shows. */
const LEAD_DAYS = 61

/** Today in Estonia, so the promotion ends at midnight Tallinn time, not the visitor's. */
function tallinnToday(now: Date): Date {
  const ymd = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Tallinn' }).format(now)
  return new Date(`${ymd}T00:00:00Z`)
}

/**
 * Nights still bookable before the winter closing, or null when the promotion is not on.
 * Read from CLOSED_SEASONS, so moving the closing date moves this with it.
 */
export function nightsBeforeWinter(now = new Date()): number | null {
  const season = CLOSED_SEASONS.tiigimaja ?? CLOSED_SEASONS.metsamaja
  if (!season) return null
  const today = tallinnToday(now)
  const [m, d] = season.from
  let close = new Date(Date.UTC(today.getUTCFullYear(), m - 1, d))
  // Past this year's closing already: the next one is a year on, and well outside the lead.
  if (close <= today) close = new Date(Date.UTC(today.getUTCFullYear() + 1, m - 1, d))
  const nights = Math.round((close.getTime() - today.getTime()) / 86_400_000)
  return nights <= LEAD_DAYS ? nights : null
}
