import { readBookings } from '@/lib/bookings'
import { HOUSE_SLUGS, type HouseSlug } from '@/lib/availability'

/**
 * Our calendar, published as an iCal feed so the channels can import it.
 *
 * This is the direction Mikk actually wants: Booking.com subscribes to us, so a direct
 * booking closes those nights there without anyone remembering to do it by hand.
 *
 * Guest names are deliberately absent. Whoever imports this feed shows the SUMMARY to
 * their own staff, and a name is not theirs to hold.
 */
export const dynamic = 'force-dynamic'

const stamp = (d: string) => d.replace(/-/g, '')

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const token = process.env.ICAL_EXPORT_TOKEN
  // No token configured means no feed — never an open one.
  if (!token) return new Response('Not found', { status: 404 })
  if (new URL(req.url).searchParams.get('t') !== token) {
    return new Response('Not found', { status: 404 })
  }

  const { slug } = await params
  if (!(HOUSE_SLUGS as readonly string[]).includes(slug)) {
    return new Response('Not found', { status: 404 })
  }

  const store = await readBookings()
  const blocks = store.blocks[slug as HouseSlug] ?? []

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Oanduaia//Availability//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:Oanduaia ${slug}`,
  ]
  for (const b of blocks) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${b.id}@oanduaia.ee`,
      `DTSTAMP:${stamp(b.created.slice(0, 10))}T000000Z`,
      `DTSTART;VALUE=DATE:${stamp(b.from)}`,
      // Exclusive, matching how every channel reads it: the guest leaves on this day.
      `DTEND;VALUE=DATE:${stamp(b.to)}`,
      'SUMMARY:CLOSED - Not available',
      'TRANSP:OPAQUE',
      'END:VEVENT',
    )
  }
  lines.push('END:VCALENDAR')

  return new Response(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  })
}
