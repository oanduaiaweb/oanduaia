import 'server-only'
import { unstable_cache } from 'next/cache'
import { readBookings } from './bookings'
import { readEnquiries } from './enquiries'

/*
 * Cached copies of the stores, for readers that only look. Every blob read counts against the
 * plan's monthly operations; on 23 Nov 2026 the public calendar and the inbox poll used them all
 * up and Vercel suspended the store. Every write expires its copy at once (`forget` in
 * lib/bookings.ts), and lapsed holds are judged at read time, so the timers are only backstops.
 * Anything that writes, or decides about money, still reads the blob itself.
 */
export const readBookingsCached = unstable_cache(readBookings, ['bookings-store'], { revalidate: 3600, tags: ['bookings'] })

/** For the inbox poll, which mostly brings nothing new: compare against this before reading the blob. */
export const readEnquiriesCached = unstable_cache(readEnquiries, ['enquiries-store'], { revalidate: 21600, tags: ['enquiries'] })
