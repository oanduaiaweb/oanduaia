/**
 * Rules for booking and paying on the website without anyone in between. Shared by the calendar
 * (what it offers) and /api/book (what it accepts), so the two can never disagree.
 */

/** Arrival at least this many days after today (Tallinn time). Mikk, 22 Nov 2026: "2 days". */
export const MIN_NOTICE_DAYS = 2

/** Longer stays go through a person — they are usually priced by arrangement. */
export const MAX_ONLINE_NIGHTS = 14

/** Free cancellation ends this many days before arrival (Mikk, 22 Nov 2026: unchanged, 7). */
export const FREE_CANCEL_DAYS = 7

/** The last day a booking can be cancelled for a full refund. Pure date arithmetic, client-safe. */
export function freeCancelUntil(checkIn: string): string {
  const d = new Date(`${checkIn}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() - FREE_CANCEL_DAYS)
  return d.toISOString().slice(0, 10)
}

/** Today in Tallinn, YYYY-MM-DD — the day the guest is booking from, not the server's UTC day. */
export const todayTallinn = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Tallinn' })
