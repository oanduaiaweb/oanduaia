/**
 * A very small iCalendar (RFC 5545) reader — enough for channel feeds, nothing more.
 *
 * Booking.com, Airbnb and every channel manager publish the same shape: a VCALENDAR of
 * VEVENTs with all-day DATE values, where DTEND is EXCLUSIVE. A stay of 1–5 September is
 * DTSTART 20260901 / DTEND 20260905, and the 5th is free for the next arrival.
 *
 * So the unit we work in is the NIGHT, named by the date it starts on. That event blocks
 * the nights of the 1st, 2nd, 3rd and 4th. Departure day stays bookable — which is what
 * makes back-to-back stays possible and is exactly how the channels themselves read it.
 */

export type DateStr = string // 'YYYY-MM-DD'

/** Undo RFC 5545 line folding: CRLF (or LF) followed by one space or tab. */
function unfold(text: string): string[] {
  return text.replace(/\r\n/g, '\n').replace(/\n[ \t]/g, '').split('\n')
}

/**
 * Split `DTSTART;VALUE=DATE:20260901` into its name, its parameters and its value.
 * The colon inside a quoted parameter is rare in these feeds but cheap to respect.
 */
function parseLine(line: string): { name: string; params: string; value: string } | null {
  let inQuote = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') inQuote = !inQuote
    else if (c === ':' && !inQuote) {
      const left = line.slice(0, i)
      const semi = left.indexOf(';')
      return {
        name: (semi === -1 ? left : left.slice(0, semi)).toUpperCase().trim(),
        params: semi === -1 ? '' : left.slice(semi + 1).toUpperCase(),
        value: line.slice(i + 1).trim(),
      }
    }
  }
  return null
}

/** `20260901` or `20260901T140000Z` → `2026-09-01`. Returns null on anything else. */
function toDateStr(value: string): DateStr | null {
  const m = /^(\d{4})(\d{2})(\d{2})/.exec(value)
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null
}

export function addDays(date: DateStr, n: number): DateStr {
  const d = new Date(`${date}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

export function nightsBetween(from: DateStr, to: DateStr): number {
  const a = Date.parse(`${from}T00:00:00Z`)
  const b = Date.parse(`${to}T00:00:00Z`)
  return Math.round((b - a) / 86400000)
}

/**
 * Every night blocked by the feed, as `YYYY-MM-DD` of the night's first day.
 *
 * Cancelled events and events explicitly marked as free time (TRANSP:TRANSPARENT) are
 * skipped. A DTEND at or before DTSTART is treated as a single night rather than dropped,
 * because a zero-length block in a feed still means "do not sell this date".
 */
export function blockedNights(ics: string): DateStr[] {
  const nights = new Set<DateStr>()
  let start: DateStr | null = null
  let end: DateStr | null = null
  let inEvent = false
  let usable = true

  for (const raw of unfold(ics)) {
    const line = parseLine(raw)
    if (!line) continue

    if (line.name === 'BEGIN' && line.value.toUpperCase() === 'VEVENT') {
      inEvent = true; start = null; end = null; usable = true
      continue
    }
    if (!inEvent) continue

    if (line.name === 'END' && line.value.toUpperCase() === 'VEVENT') {
      if (usable && start) {
        const last = end && nightsBetween(start, end) > 0 ? end : addDays(start, 1)
        // Guard against a malformed feed asking us to walk for years.
        const span = Math.min(nightsBetween(start, last), 800)
        for (let i = 0; i < span; i++) nights.add(addDays(start, i))
      }
      inEvent = false
      continue
    }

    switch (line.name) {
      case 'DTSTART': start = toDateStr(line.value); break
      case 'DTEND':   end   = toDateStr(line.value); break
      case 'STATUS':  if (line.value.toUpperCase() === 'CANCELLED') usable = false; break
      case 'TRANSP':  if (line.value.toUpperCase() === 'TRANSPARENT') usable = false; break
    }
  }

  return [...nights].sort()
}
