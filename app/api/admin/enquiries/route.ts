import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SESSION_COOKIE, verifySession } from '@/lib/adminAuth'
import { randomUUID } from 'node:crypto'
import { readEnquiries, recordEnquiry, writeEnquiries } from '@/lib/enquiries'

export const dynamic = 'force-dynamic'

async function authed(): Promise<boolean> {
  return verifySession((await cookies()).get(SESSION_COOKIE)?.value)
}

const denied = () => NextResponse.json({ error: 'Not authorised' }, { status: 401 })

export async function GET() {
  if (!await authed()) return denied()
  const store = await readEnquiries()
  return NextResponse.json({ enquiries: store.enquiries })
}

const isDay = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)

/** A request that came by e-mail or phone, typed in so every booking request lives in one list. */
export async function POST(req: Request) {
  if (!await authed()) return denied()
  const b = await req.json().catch(() => null)
  if (!b?.name) return NextResponse.json({ error: 'Missing name' }, { status: 400 })
  const cut = (v: unknown, n: number) => (v ? String(v).slice(0, n) : undefined)
  const ok = await recordEnquiry({
    id: randomUUID(),
    received: b.received ? new Date(b.received).toISOString() : new Date().toISOString(),
    name: String(b.name).slice(0, 120),
    email: cut(b.email, 200) ?? '',
    phone: cut(b.phone, 40),
    dates: cut(b.dates, 200),
    checkIn: isDay(b.checkIn) ? b.checkIn : undefined,
    checkOut: isDay(b.checkOut) ? b.checkOut : undefined,
    message: cut(b.message, 4000) ?? '',
    lang: cut(b.lang, 5),
    mailed: true,
    manual: true,
  })
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Could not save' }, { status: 500 })
}

/** Ticks one off, or puts it back. */
export async function PATCH(req: Request) {
  if (!await authed()) return denied()

  const body = await req.json().catch(() => null)
  if (!body?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const store = await readEnquiries()
  const found = store.enquiries.find(e => e.id === body.id)
  if (!found) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if ('handled' in body) found.handled = !!body.handled
  // Stay dates set by hand, for requests whose text the parser cannot read.
  if ('checkIn' in body) found.checkIn = isDay(body.checkIn) ? body.checkIn : undefined
  if ('checkOut' in body) found.checkOut = isDay(body.checkOut) ? body.checkOut : undefined
  await writeEnquiries(store)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
  if (!await authed()) return denied()

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const store = await readEnquiries()
  const before = store.enquiries.length
  store.enquiries = store.enquiries.filter(e => e.id !== id)
  if (store.enquiries.length === before) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  await writeEnquiries(store)
  return NextResponse.json({ ok: true })
}
