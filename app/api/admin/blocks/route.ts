import { NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { cookies } from 'next/headers'
import { SESSION_COOKIE, verifySession } from '@/lib/adminAuth'
import {
  overlaps, readBookings, validateBlock, writeBookings, type Block,
} from '@/lib/bookings'
import { HOUSE_SLUGS, type HouseSlug } from '@/lib/availability'

export const dynamic = 'force-dynamic'

async function authed(): Promise<boolean> {
  return verifySession((await cookies()).get(SESSION_COOKIE)?.value)
}

const denied = () => NextResponse.json({ error: 'Not authorised' }, { status: 401 })

export async function GET() {
  if (!await authed()) return denied()
  const store = await readBookings()
  return NextResponse.json({
    blocks: store.blocks,
    live: store.live,
    feeds: Object.fromEntries(
      HOUSE_SLUGS.map(s => [s, !!process.env[`ICAL_${s.toUpperCase()}`]]),
    ),
  })
}

export async function POST(req: Request) {
  if (!await authed()) return denied()

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Bad request' }, { status: 400 })

  const { house, from, to, guest, note } = body
  const problem = validateBlock(String(house), String(from), String(to))
  if (problem) return NextResponse.json({ error: problem }, { status: 400 })

  const store = await readBookings()
  if (overlaps(store, house as HouseSlug, from, to)) {
    return NextResponse.json({ error: 'Those nights are already held.' }, { status: 409 })
  }

  const block: Block = {
    id: randomUUID(),
    from,
    to,
    guest: guest ? String(guest).slice(0, 80) : undefined,
    note: note ? String(note).slice(0, 300) : undefined,
    created: new Date().toISOString(),
  }
  store.blocks[house].push(block)
  store.blocks[house].sort((a, b) => a.from.localeCompare(b.from))
  await writeBookings(store)

  return NextResponse.json({ ok: true, block })
}

/** Marks one house's own calendar as complete, or not. */
export async function PATCH(req: Request) {
  if (!await authed()) return denied()

  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Bad request' }, { status: 400 })

  const { house, live } = body
  if (!(HOUSE_SLUGS as readonly string[]).includes(String(house))) {
    return NextResponse.json({ error: 'Unknown house' }, { status: 400 })
  }

  const store = await readBookings()
  store.live[String(house)] = !!live
  await writeBookings(store)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  if (!await authed()) return denied()

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const store = await readBookings()
  let removed = false
  for (const slug of HOUSE_SLUGS) {
    const before = store.blocks[slug].length
    store.blocks[slug] = store.blocks[slug].filter(b => b.id !== id)
    if (store.blocks[slug].length !== before) removed = true
  }
  if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await writeBookings(store)
  return NextResponse.json({ ok: true })
}
