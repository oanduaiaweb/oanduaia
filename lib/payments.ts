import { put, get, BlobNotFoundError } from '@vercel/blob'
import { randomBytes, randomUUID } from 'node:crypto'
import type { Meals } from './pricing'

/**
 * Card payments, on our side.
 *
 * The flow Mikk chose: the guest requests dates as they always have, we confirm the nights are
 * free, and only THEN do we send a link. Nothing here ever charges anyone automatically, and no
 * night is ever sold before a person has looked at the calendar — which matters while Booking.com
 * can still sell the same night out from under us.
 *
 * Private blob, like the bookings and enquiry stores: names, e-mail addresses, travel dates and
 * amounts owed. A public blob URL is readable by anyone who learns it.
 */
const PATH = 'payments/log.json'
const MAX = 500

/**
 * `expired` is its own status, not a flavour of `cancelled`.
 *
 * Cancelled means a person decided; expired means the 4-day deadline ran out and the nights
 * were put back on sale automatically. Keeping them apart is the difference between "we let
 * this one go" and "the guest never paid" when the same dates come up in conversation later.
 */
export type PaymentStatus = 'unpaid' | 'paid' | 'cancelled' | 'expired'

export type Payment = {
  /** Also the URL token. Random, never sequential — a guessable id would expose other guests. */
  id: string
  created: string
  name: string
  email: string
  /** What they are paying for, in their own language: house, dates, what is included. */
  reference: string
  lang: string
  /** Stored in CENTS. Never carry money as a float. */
  amount: number
  currency: 'eur'
  status: PaymentStatus
  paidAt?: string
  /** Kept so a payment can be traced in the Stripe dashboard without guesswork. */
  sessionId?: string
  paymentIntentId?: string

  /*
   * The stay this link is for.
   *
   * `reference` is prose for the guest and always was; these are the machine-readable facts,
   * and they exist so two things can happen without a human: the deadline can be computed
   * from the arrival date, and the nights can be handed back if nobody pays.
   */
  house?: string
  checkIn?: string
  checkOut?: string
  /** When the money is due. Unpaid past this and the link expires. */
  dueAt?: string
  /** The calendar block held for these nights, so expiry can release exactly that one. */
  blockId?: string
  /** Set when the deadline passed and the nights were released. */
  expiredAt?: string
  /** Whether the guest was actually e-mailed the link, and when. */
  mailedAt?: string

  /**
   * How the guest pays. Absent means card: every record written before cash existed is a card
   * one, so this stays optional and nothing has to be migrated.
   *
   * A cash booking holds the nights exactly as a link does, but there is nothing to pay online —
   * no Stripe session, and deliberately no `dueAt`, because the expiry job releases nights on
   * anything unpaid past its deadline and a cash booking never becomes paid on its own.
   */
  method?: 'card' | 'cash'

  /**
   * Breakfasts and dinners arranged for this stay, with the dates and headcounts the kitchen
   * needs. `meals.atHouse` says the food is settled on arrival rather than being part of the
   * amount above — the two are tracked apart because a guest can pay the room by card and hand
   * over cash for the meals.
   */
  meals?: Meals
}

export type PaymentStore = { version: 1; payments: Payment[] }

const empty = (): PaymentStore => ({ version: 1, payments: [] })

/**
 * 24 hex characters from a CSPRNG. The pay page is reachable by anyone holding the link — that
 * is the point of a link — so the only thing protecting one guest's page from another is that
 * the token cannot be guessed or walked. `randomUUID` would also do; this is shorter to type
 * out over the phone if it ever comes to that.
 */
export const newToken = () => randomBytes(12).toString('hex')

export async function readPayments(): Promise<PaymentStore> {
  try {
    const res = await get(PATH, { access: 'private', useCache: false })
    if (!res || res.statusCode !== 200) return empty()
    const parsed = JSON.parse(await new Response(res.stream).text()) as PaymentStore
    parsed.payments ??= []
    return parsed
  } catch (err) {
    if (err instanceof BlobNotFoundError) return empty()
    console.error('[payments] read failed:', err)
    throw err
  }
}

export async function writePayments(store: PaymentStore): Promise<void> {
  await put(PATH, JSON.stringify(store, null, 2), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 0,
  })
}

export async function findPayment(token: string): Promise<Payment | null> {
  if (!/^[0-9a-f]{24}$/.test(token)) return null
  const store = await readPayments()
  return store.payments.find(p => p.id === token) ?? null
}

/** Applies a change to one payment and saves. Returns the updated record, or null if unknown. */
export async function updatePayment(
  token: string,
  patch: (p: Payment) => void,
): Promise<Payment | null> {
  const store = await readPayments()
  const found = store.payments.find(p => p.id === token)
  if (!found) return null
  patch(found)
  await writePayments(store)
  return found
}

export async function addPayment(p: Omit<Payment, 'id' | 'created' | 'status'>): Promise<Payment> {
  const store = await readPayments()
  const record: Payment = { ...p, id: newToken(), created: new Date().toISOString(), status: 'unpaid' }
  store.payments.unshift(record)
  if (store.payments.length > MAX) store.payments.length = MAX
  await writePayments(store)
  return record
}

/** Euros as typed by a human ("720", "720.50") to cents. Returns null if it is not money. */
export function eurosToCents(input: string): number | null {
  const cleaned = String(input).trim().replace(',', '.')
  if (!/^\d{1,6}(\.\d{1,2})?$/.test(cleaned)) return null
  const cents = Math.round(parseFloat(cleaned) * 100)
  // A zero-value charge is always a mistake, and Stripe rejects anything under 50 cents anyway.
  return cents >= 50 ? cents : null
}

export const formatEur = (cents: number) =>
  (cents / 100).toLocaleString('et-EE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** `randomUUID` re-exported so callers do not each import node:crypto. */
export { randomUUID }
