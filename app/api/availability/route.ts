import { NextResponse } from 'next/server'
import { getAvailability, REVALIDATE_SECONDS } from '@/lib/availability'

/**
 * Blocked nights per house. Only dates cross the wire — the feed URLs carry access
 * tokens and stay on the server.
 */
export const revalidate = 1800

export async function GET() {
  const data = await getAvailability()
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
    },
  })
}
