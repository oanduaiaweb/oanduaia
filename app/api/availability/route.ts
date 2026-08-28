import { NextResponse } from 'next/server'
import { getAvailability } from '@/lib/availability'

/**
 * Blocked nights per house. Only dates cross the wire — the feed URLs carry access
 * tokens and stay on the server.
 *
 * Dynamic, because our own calendar is the master and an edit in /admin has to show up
 * quickly. The CDN still absorbs the traffic for a minute, and the channel feeds keep
 * their own half-hour fetch cache inside `getAvailability`, so this stays cheap.
 */
export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await getAvailability()
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}
