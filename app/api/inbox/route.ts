import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'node:crypto'
import { readEnquiries, writeEnquiries } from '@/lib/enquiries'
import { mergeMail, type MailThread } from '@/lib/inbox'

export const dynamic = 'force-dynamic'

const str = (v: unknown, n: number) => (typeof v === 'string' ? v.slice(0, n) : '')
const when = (v: unknown) => (typeof v === 'string' && !Number.isNaN(Date.parse(v)) ? new Date(v).toISOString() : '')

/** Called every few minutes by the Apps Script that lives in the info@ mailbox. */
export async function POST(req: Request) {
  const secret = process.env.INBOX_SECRET
  const given = (req.headers.get('authorization') ?? '').replace(/^Bearer /, '')
  if (!secret || given.length !== secret.length || !timingSafeEqual(Buffer.from(given), Buffer.from(secret))) {
    return NextResponse.json({ error: 'Not authorised' }, { status: 401 })
  }
  const body = await req.json().catch(() => null)
  const raw: unknown[] = Array.isArray(body?.threads) ? body.threads.slice(0, 300) : []
  const threads: MailThread[] = raw.flatMap(r => {
    const t = r as Record<string, unknown>
    const id = str(t.id, 40), guestEmail = str(t.guestEmail, 200), firstAt = when(t.firstAt)
    if (!/^[0-9a-f]{8,40}$/i.test(id) || !guestEmail.includes('@') || !firstAt) return []
    return [{
      id, guestEmail, firstAt,
      subject: str(t.subject, 200),
      guestName: str(t.guestName, 120),
      lastGuestAt: when(t.lastGuestAt) || firstAt,
      lastFromUs: !!t.lastFromUs,
      viaForm: !!t.viaForm,
      text: str(t.text, 4000),
    }]
  })
  if (!threads.length) return NextResponse.json({ ok: true, added: 0, updated: 0 })

  const store = await readEnquiries()
  const result = mergeMail(store, threads)
  if (result.added || result.updated) await writeEnquiries(store)
  return NextResponse.json({ ok: true, ...result })
}
