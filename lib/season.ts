import type { HouseSlug } from './availability'
import type { DateStr } from './ical'

/**
 * Houses that shut for the winter.
 *
 * Tiigimaja and Metsamaja close from the end of November to the beginning of April;
 * Saunamaja stays open all year. Written as a recurring rule rather than as dated blocks,
 * so it applies to every year the calendar can reach without anyone re-entering it each
 * autumn — the one job most likely to be forgotten, and the one whose cost is a guest
 * asking for a night that cannot happen.
 *
 * Shown to guests as "hõivatud" — the same as any other unavailable night. A closed season
 * needs no separate explanation on the calendar; the enquiry answers the rest.
 *
 * The window wraps the year end, so `from` is later in the calendar than `to`.
 */
export type ClosedSeason = {
  /** First closed night, as [month, day]. Month is 1-12. */
  from: [number, number]
  /** Last closed night, as [month, day]. */
  to: [number, number]
}

export const CLOSED_SEASONS: Partial<Record<HouseSlug, ClosedSeason>> = {
  // Closed 1 December through 31 March. Last night of the season is 30 November;
  // the first night of the new season is 1 April.
  tiigimaja: { from: [12, 1], to: [3, 31] },
  metsamaja: { from: [12, 1], to: [3, 31] },
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Is this date inside the house's closed season, in whichever year it falls? */
export function isClosed(slug: HouseSlug, date: DateStr): boolean {
  const season = CLOSED_SEASONS[slug]
  if (!season) return false

  const md = date.slice(5) // 'MM-DD'
  const from = `${pad(season.from[0])}-${pad(season.from[1])}`
  const to = `${pad(season.to[0])}-${pad(season.to[1])}`

  // A window that wraps the year end is "on or after the start OR on or before the end".
  return from > to ? md >= from || md <= to : md >= from && md <= to
}

/** Every closed night for a house within [from, to). */
export function closedNights(slug: HouseSlug, from: DateStr, to: DateStr): DateStr[] {
  if (!CLOSED_SEASONS[slug]) return []
  const out: DateStr[] = []
  const d = new Date(`${from}T00:00:00Z`)
  const end = new Date(`${to}T00:00:00Z`)
  while (d < end) {
    const iso = d.toISOString().slice(0, 10)
    if (isClosed(slug, iso)) out.push(iso)
    d.setUTCDate(d.getUTCDate() + 1)
  }
  return out
}

/**
 * The closed season as whole [start, endExclusive) runs, for the iCal export — so a channel
 * importing our feed closes the same nights instead of receiving 120 one-night events.
 */
export function closedRuns(slug: HouseSlug, from: DateStr, to: DateStr): Array<[DateStr, DateStr]> {
  const nights = closedNights(slug, from, to)
  const runs: Array<[DateStr, DateStr]> = []
  let start: DateStr | null = null
  let prev: DateStr | null = null

  const next = (d: DateStr) => {
    const x = new Date(`${d}T00:00:00Z`)
    x.setUTCDate(x.getUTCDate() + 1)
    return x.toISOString().slice(0, 10)
  }

  for (const n of nights) {
    if (start === null) { start = n; prev = n; continue }
    if (n === next(prev!)) { prev = n; continue }
    runs.push([start, next(prev!)])
    start = n; prev = n
  }
  if (start) runs.push([start, next(prev!)])
  return runs
}
