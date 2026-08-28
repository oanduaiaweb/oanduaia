import { NextResponse } from 'next/server'
import {
  SESSION_COOKIE, checkPassword, clearAttempts, isConfigured,
  issueSession, noteFailure, tooManyAttempts,
} from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

function clientIp(req: Request): string {
  return (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
}

export async function POST(req: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: 'Admin is not configured on this deployment.' },
      { status: 503 },
    )
  }

  const ip = clientIp(req)
  if (tooManyAttempts(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
  }

  const { password } = await req.json().catch(() => ({ password: '' }))
  if (!checkPassword(String(password ?? ''))) {
    noteFailure(ip)
    // Deliberately identical whatever went wrong — a distinct message is a hint.
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 })
  }

  const session = issueSession()
  if (!session) return NextResponse.json({ error: 'Admin is not configured.' }, { status: 503 })

  clearAttempts(ip)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: session.maxAge,
  })
  return res
}

/** Logout. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 })
  return res
}
