import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SESSION_COOKIE, verifySession } from '@/lib/adminAuth'
import { readEnquiries, writeEnquiries } from '@/lib/enquiries'

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

/** Ticks one off, or puts it back. */
export async function PATCH(req: Request) {
  if (!await authed()) return denied()

  const body = await req.json().catch(() => null)
  if (!body?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const store = await readEnquiries()
  const found = store.enquiries.find(e => e.id === body.id)
  if (!found) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  found.handled = !!body.handled
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
