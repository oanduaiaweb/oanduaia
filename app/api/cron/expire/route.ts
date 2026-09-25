import { NextResponse } from 'next/server'
import { readPayments, writePayments } from '@/lib/payments'
import { readBookings, writeBookings } from '@/lib/bookings'
import { HOUSE_SLUGS, type HouseSlug } from '@/lib/availability'

/**
 * Unpaid links past their deadline: cancelled, and their nights handed back.
 *
 * Mikk's rule, in his words: the link goes out 14 days before arrival, the guest has four days
 * to pay, "if they wount pai this link lets just cansel the order" — which leaves ten days to
 * find someone else. That only works if the nights actually go back on sale, so releasing the
 * block matters as much as cancelling the link: a held night is invisible to Booking.com too,
 * because our feed publishes it as CLOSED.
 *
 * Runs on a schedule. Also safe to call by hand — it is idempotent, and a link that is already
 * paid, cancelled or expired is never touched.
 */
export const dynamic = 'force-dynamic'

function authorised(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  // Vercel signs its own scheduled calls with this header.
  const header = req.headers.get('authorization')
  if (secret && header === `Bearer ${secret}`) return true
  // Vercel Cron also identifies itself; accept that only when no secret is configured.
  if (!secret && req.headers.get('x-vercel-cron')) return true
  return false
}

export async function GET(req: Request) {
  if (!authorised(req)) {
    return NextResponse.json({ error: 'Not authorised' }, { status: 401 })
  }

  const today = new Date().toISOString().slice(0, 10)
  const store = await readPayments()

  const due = store.payments.filter(
    p => p.status === 'unpaid' && p.dueAt && p.dueAt < today,
  )
  if (due.length === 0) {
    return NextResponse.json({ ok: true, expired: 0, released: 0, checked: today })
  }

  // Release the held nights first. If this throws, nothing is marked expired and the next
  // run tries again — better than a link marked expired whose dates stayed closed.
  const bookings = await readBookings()
  let released = 0
  for (const p of due) {
    if (!p.blockId) continue
    for (const slug of HOUSE_SLUGS as readonly HouseSlug[]) {
      const list = bookings.blocks[slug] ?? []
      const i = list.findIndex(b => b.id === p.blockId)
      if (i >= 0) { list.splice(i, 1); released++ }
    }
  }
  if (released > 0) await writeBookings(bookings)

  const now = new Date().toISOString()
  for (const p of due) {
    p.status = 'expired'
    p.expiredAt = now
  }
  await writePayments(store)

  console.info(`[expire] ${due.length} link(s) expired, ${released} block(s) released`)
  return NextResponse.json({
    ok: true,
    expired: due.length,
    released,
    checked: today,
    ids: due.map(p => p.id),
  })
}
