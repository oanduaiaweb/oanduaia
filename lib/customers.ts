import { put, get, BlobNotFoundError } from '@vercel/blob'
import type { Enquiry } from './enquiries'
import type { Payment } from './payments'
import { sameGuest, stayOf } from './enquiryStatus'

/**
 * Everyone who has written to us or booked, one row per person.
 *
 * The people themselves are not stored twice: they are read out of the enquiry and payment logs
 * every time, so a new enquiry shows up here without anyone copying it over. What lives in this
 * blob is only what those logs cannot know — a phone number found later, a note, a Booking.com
 * guest typed in by hand, and the dates we asked for a review or sent a Christmas greeting.
 *
 * Private blob, like the stores it reads from.
 */
const PATH = 'customers/log.json'

export type CustomerNote = {
  name?: string
  email?: string
  phone?: string
  lang?: string
  /** Overrides what the logs say: true/false set by hand. */
  stayed?: boolean
  note?: string
  /** Not a guest at all — a business offer, a film scout, our own tests. */
  hidden?: boolean
  /** Typed in by hand in /admin, e.g. a Booking.com or phone guest. */
  manual?: boolean
  lastStay?: string
  reviewAskedAt?: string
  christmasSentAt?: string
}

export type CustomerStore = { version: 1; people: Record<string, CustomerNote> }

export type Customer = {
  key: string
  name: string
  email: string
  phone: string
  lang: string
  firstSeen: string
  /** Arrival of the latest stay we know of. */
  lastStay?: string
  stayed: boolean
  /** Euro cents paid by card. */
  paid: number
  requests: number
  note: string
  hidden: boolean
  manual: boolean
  reviewAskedAt?: string
  christmasSentAt?: string
}

const empty = (): CustomerStore => ({ version: 1, people: {} })

export async function readCustomerStore(): Promise<CustomerStore> {
  try {
    const res = await get(PATH, { access: 'private', useCache: false })
    if (!res || res.statusCode !== 200) return empty()
    const parsed = JSON.parse(await new Response(res.stream).text()) as CustomerStore
    parsed.people ??= {}
    return parsed
  } catch (err) {
    if (err instanceof BlobNotFoundError) return empty()
    console.error('[customers] read failed:', err)
    throw err
  }
}

export async function writeCustomerStore(store: CustomerStore): Promise<void> {
  await put(PATH, JSON.stringify(store, null, 2), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 0,
  })
}

/** Our own addresses and test entries — never a customer. */
const OURS = new Set(['mikkseger@gmail.com', 'oanduaiaweb@gmail.com', 'info@oanduaia.ee'])
const isTest = (name: string, email: string) => OURS.has(email) || /^test\b/i.test(name.trim())

const digits = (s?: string) => (s ?? '').replace(/\D/g, '')

/** One person = one e-mail address; a phone number only when there is no address. */
export const customerKey = (email?: string, phone?: string, name?: string) => {
  const e = (email ?? '').trim().toLowerCase()
  if (e) return e
  const p = digits(phone)
  if (p) return `tel:${p}`
  return `name:${(name ?? '').trim().toLowerCase()}`
}

/** A name that is really just the e-mail address the mailbox sync fell back to. */
const realName = (name: string) => (name.includes('@') ? '' : name.trim())

type HeldBlock = { from: string; guest?: string }

export function buildCustomers(
  enquiries: Enquiry[], payments: Payment[], blocks: Record<string, HeldBlock[]>, store: CustomerStore, today: string,
): Customer[] {
  const out = new Map<string, Customer>()

  const touch = (key: string, at: string) => {
    let c = out.get(key)
    if (!c) {
      c = { key, name: '', email: '', phone: '', lang: '', firstSeen: at, stayed: false, paid: 0, requests: 0, note: '', hidden: false, manual: false }
      out.set(key, c)
    }
    if (at < c.firstSeen) c.firstSeen = at
    return c
  }

  // Oldest first, so the newest name, language and phone win.
  for (const e of [...enquiries].sort((a, b) => a.received.localeCompare(b.received))) {
    if (isTest(e.name, e.email)) continue
    const c = touch(customerKey(e.email, e.phone, e.name), e.received.slice(0, 10))
    c.name = realName(e.name) || c.name
    c.email = e.email || c.email
    c.phone = e.phone || c.phone
    c.lang = e.lang || c.lang
    c.requests++
  }

  for (const p of [...payments].sort((a, b) => a.created.localeCompare(b.created))) {
    if (isTest(p.name, p.email) || p.status !== 'paid') continue
    const c = touch(customerKey(p.email, undefined, p.name), p.created.slice(0, 10))
    c.name = realName(p.name) || c.name
    c.email = p.email || c.email
    c.lang = c.lang || p.lang
    c.paid += p.amount
    const day = p.checkIn ?? p.paidAt?.slice(0, 10) ?? p.created.slice(0, 10)
    if (!c.lastStay || day > c.lastStay) c.lastStay = day
  }

  // A request whose dates have passed, by someone who paid, is a stay that happened.
  for (const e of enquiries) {
    const c = out.get(customerKey(e.email, e.phone, e.name))
    const arrive = stayOf(e).checkIn
    if (c && c.paid > 0 && arrive && (!c.lastStay || arrive > c.lastStay)) c.lastStay = arrive
  }

  // Our calendar knows the cash guests too: a held block under their name is their stay.
  for (const list of Object.values(blocks)) {
    for (const b of list) {
      for (const c of out.values()) {
        if (b.guest && sameGuest(b.guest, c.name) && (!c.lastStay || b.from > c.lastStay)) c.lastStay = b.from
      }
    }
  }

  for (const [key, n] of Object.entries(store.people)) {
    if (!out.has(key) && !n.manual) continue
    const c = out.get(key) ?? touch(key, today)
    c.name = n.name ?? c.name
    c.email = n.email ?? c.email
    c.phone = n.phone ?? c.phone
    c.lang = n.lang ?? c.lang
    c.lastStay = n.lastStay ?? c.lastStay
    c.note = n.note ?? ''
    c.hidden = !!n.hidden
    c.manual = !!n.manual
    c.reviewAskedAt = n.reviewAskedAt
    c.christmasSentAt = n.christmasSentAt
    if (n.stayed !== undefined) c.stayed = n.stayed
  }

  for (const c of out.values()) {
    const n = store.people[c.key]
    if (n?.stayed === undefined) c.stayed = !!c.lastStay && c.lastStay <= today
    c.name ||= c.email || c.phone
  }

  return [...out.values()].sort((a, b) =>
    Number(b.stayed) - Number(a.stayed) || (b.lastStay ?? b.firstSeen).localeCompare(a.lastStay ?? a.firstSeen))
}
