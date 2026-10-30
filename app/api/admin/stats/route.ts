import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SESSION_COOKIE, verifySession } from '@/lib/adminAuth'
import { readStats, statsConfigured } from '@/lib/googleStats'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  if (!await verifySession((await cookies()).get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Not authorised' }, { status: 401 })
  }
  if (!statsConfigured()) return NextResponse.json({ configured: false })

  const asked = Number(new URL(req.url).searchParams.get('days'))
  const days = [7, 30, 90].includes(asked) ? asked : 30
  try {
    return NextResponse.json({ configured: true, stats: await readStats(days) })
  } catch (error) {
    console.error('[stats]', error)
    return NextResponse.json({ configured: true, error: String(error).slice(0, 300) }, { status: 502 })
  }
}
