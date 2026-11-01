import type { Enquiry } from './enquiries'
import { parseStay } from './stayDates'

/** The stay an enquiry is about: stored dates first, otherwise read out of its text. */
export const stayOf = (e: Enquiry): { checkIn?: string; checkOut?: string } =>
  e.checkIn || e.checkOut
    ? { checkIn: e.checkIn, checkOut: e.checkOut ?? e.checkIn }
    : parseStay(e.dates ?? e.message, e.received)

/** Red in the admin: the guest is waiting for us. */
export const needsReply = (e: Enquiry) => !e.handled && !e.answered

export const todayTallinn = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Tallinn' })

export const gmailLink = (threadId: string) =>
  `https://mail.google.com/mail/?authuser=info%40oanduaia.ee#all/${threadId}`

type HeldBlock = { from: string; to: string; guest?: string }

const words = (s?: string) => (s ?? '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').split(/[^\p{L}]+/u).filter(w => w.length > 1)

/** Same person: the guest name on a held block shares at least one name with the request. */
export const sameGuest = (a?: string, b?: string) => {
  const wa = words(a), wb = new Set(words(b))
  return wa.length > 0 && wa.some(w => wb.has(w))
}

/**
 * The held block that is this request's booking: a block in our calendar under the guest's
 * name, or one with exactly the requested dates. Undefined while nothing is held for them.
 */
export function bookingFor(e: Enquiry, blocks: Record<string, HeldBlock[]>, today: string) {
  const stay = stayOf(e)
  for (const [house, list] of Object.entries(blocks)) {
    for (const b of list) {
      if (b.to < today) continue
      const byName = !!b.guest && sameGuest(b.guest, e.name)
      const byDates = !!stay.checkIn && b.from === stay.checkIn && (!stay.checkOut || b.to === stay.checkOut) && (!b.guest || byName)
      if (byName || byDates) return { house, block: b }
    }
  }
  return undefined
}
