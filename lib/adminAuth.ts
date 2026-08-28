import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto'

/**
 * A single-operator gate for the availability admin. There is one person with the keys, so
 * this is a password and a signed cookie rather than user accounts.
 *
 * ADMIN_PASSWORD and ADMIN_SECRET live in Vercel's encrypted environment. Without both set,
 * every check below fails closed — an unconfigured deployment has no admin, rather than an
 * open one.
 */
export const SESSION_COOKIE = 'oa_admin'
const SESSION_HOURS = 12

function secret(): string | null {
  return process.env.ADMIN_SECRET || null
}

/** Constant-time compare, so a wrong password cannot be found one character at a time. */
export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || !candidate) return false
  const a = Buffer.from(candidate)
  const b = Buffer.from(expected)
  // timingSafeEqual throws on a length mismatch, which would itself leak the length.
  if (a.length !== b.length) {
    timingSafeEqual(b, b)
    return false
  }
  return timingSafeEqual(a, b)
}

export function issueSession(): { value: string; maxAge: number } | null {
  const s = secret()
  if (!s) return null
  const exp = Date.now() + SESSION_HOURS * 3600_000
  const nonce = randomUUID()
  const body = `${exp}.${nonce}`
  const sig = createHmac('sha256', s).update(body).digest('base64url')
  return { value: `${body}.${sig}`, maxAge: SESSION_HOURS * 3600 }
}

export function verifySession(cookie: string | undefined): boolean {
  const s = secret()
  if (!s || !cookie) return false
  const parts = cookie.split('.')
  if (parts.length !== 3) return false
  const [exp, nonce, sig] = parts
  const good = createHmac('sha256', s).update(`${exp}.${nonce}`).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(good)
  if (a.length !== b.length) return false
  if (!timingSafeEqual(a, b)) return false
  return Number(exp) > Date.now()
}

export function isConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD && !!process.env.ADMIN_SECRET
}

/**
 * Login throttle, per instance and in memory. It is not a distributed rate limiter and does
 * not pretend to be — it is enough to make guessing over the network pointless, which with
 * one operator and a strong password is the whole threat.
 */
const attempts = new Map<string, { n: number; until: number }>()
const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 10 * 60_000

export function tooManyAttempts(ip: string): boolean {
  const rec = attempts.get(ip)
  if (!rec) return false
  if (Date.now() > rec.until) { attempts.delete(ip); return false }
  return rec.n >= MAX_ATTEMPTS
}

export function noteFailure(ip: string): void {
  const rec = attempts.get(ip)
  if (rec && Date.now() <= rec.until) rec.n += 1
  else attempts.set(ip, { n: 1, until: Date.now() + LOCKOUT_MS })
}

export function clearAttempts(ip: string): void {
  attempts.delete(ip)
}
