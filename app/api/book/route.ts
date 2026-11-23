import { NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { HOUSE_SLUGS, liveNights, type HouseSlug } from '@/lib/availability'
import { readBookings, writeBookings, overlaps, validateBlock, type Block } from '@/lib/bookings'
import { addPayment } from '@/lib/payments'
import { quote, maxGuests, breakfastMornings, house, formatDate } from '@/lib/pricing'
import { getStripe } from '@/lib/stripe'
import { createCheckout, SESSION_MINUTES, HOLD_MINUTES } from '@/lib/checkout'
import { LOCALES } from '@/lib/i18n'
import { addDays, nightsBetween } from '@/lib/ical'
import { MIN_NOTICE_DAYS, MAX_ONLINE_NIGHTS, todayTallinn } from '@/lib/instantBooking'
import { T, type Lang } from '@/lib/translations'

export const dynamic = 'force-dynamic'

const DATE = /^\d{4}-\d{2}-\d{2}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Book and pay on the website, with nobody in between.
 *
 * Everything the browser sends is re-derived here: the price comes from the published rates via
 * `quote()`, never from the request; the nights are re-checked against our store AND every
 * channel feed fetched fresh, not the half-hour cache the calendar shows. Only then is a short
 * hold written and the guest sent to Stripe. The webhook does the rest.
 */
export async function POST(req: Request) {
  const b = await req.json().catch(() => null)
  if (!b || typeof b !== 'object') return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  if (b.company) return NextResponse.json({ error: 'bad_request' }, { status: 400 })

  const slug = String(b.house ?? '') as HouseSlug
  const checkIn = String(b.checkIn ?? '')
  const checkOut = String(b.checkOut ?? '')
  const guests = Math.floor(Number(b.guests))
  const name = String(b.name ?? '').trim().slice(0, 120)
  const email = String(b.email ?? '').trim().slice(0, 200)
  const phone = String(b.phone ?? '').trim().slice(0, 40)
  const lang: Lang = (LOCALES as readonly string[]).includes(String(b.lang)) ? b.lang : 'en'
  const pet = b.pet === true

  if (!(HOUSE_SLUGS as readonly string[]).includes(slug) || !DATE.test(checkIn) || !DATE.test(checkOut)) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }
  if (validateBlock(slug, checkIn, checkOut)) return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  if (!name || !EMAIL.test(email) || phone.replace(/\D/g, '').length < 5) {
    return NextResponse.json({ error: 'contact' }, { status: 400 })
  }
  if (!(guests >= 1 && guests <= maxGuests(slug))) return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  if (nightsBetween(checkIn, checkOut) > MAX_ONLINE_NIGHTS) return NextResponse.json({ error: 'too_long' }, { status: 400 })
  // Aigi needs time to prepare the house. Closer arrivals go by phone, WhatsApp or e-mail.
  if (checkIn < addDays(todayTallinn(), MIN_NOTICE_DAYS)) return NextResponse.json({ error: 'too_soon' }, { status: 409 })

  // Breakfast mornings are only ever ones that belong to this stay.
  const valid = new Set(breakfastMornings(checkIn, checkOut))
  const breakfastDates: string[] = Array.isArray(b.breakfastDates)
    ? [...new Set<string>(b.breakfastDates.map(String))].filter(d => valid.has(d)).sort()
    : []
  const breakfastPeople = breakfastDates.length
    ? Math.min(guests, Math.max(1, Math.floor(Number(b.breakfastPeople) || guests)))
    : 0

  const q = quote(slug, guests, checkIn, checkOut, pet, breakfastDates.length, breakfastPeople)
  if (!q) return NextResponse.json({ error: 'bad_request' }, { status: 400 })

  const stripe = getStripe()
  if (!stripe) return NextResponse.json({ error: 'not_configured' }, { status: 503 })

  // Fresh, not cached: this is the last look before money changes hands.
  const live = await liveNights(slug, checkIn, checkOut)
  if (!live.ok || !live.trusted) return NextResponse.json({ error: 'unknown' }, { status: 503 })
  if (live.taken.some(n => n >= checkIn && n < checkOut)) {
    return NextResponse.json({ error: 'taken' }, { status: 409 })
  }

  const now = Date.now()
  const holdUntil = new Date(now + HOLD_MINUTES * 60_000).toISOString()
  const bookings = await readBookings()
  if (overlaps(bookings, slug, checkIn, checkOut)) return NextResponse.json({ error: 'taken' }, { status: 409 })
  const block: Block = {
    id: randomUUID(),
    from: checkIn,
    to: checkOut,
    guest: name.slice(0, 80),
    note: 'Online booking – awaiting payment',
    created: new Date(now).toISOString(),
    holdUntil,
  }
  bookings.blocks[slug] = [...(bookings.blocks[slug] ?? []), block]
  await writeBookings(bookings)

  const a = T.availability
  const reference = [
    `${house(slug).name[lang]}, ${formatDate(checkIn, lang)} – ${formatDate(checkOut, lang)}`,
    `${a.mGuests[lang]}: ${guests}`,
    breakfastDates.length ? `${a.mBreakfast[lang]}: ${breakfastPeople} × ${breakfastDates.length}` : '',
    pet ? `${a.mPet[lang]}: ${a.mYes[lang]}` : '',
  ].filter(Boolean).join(' · ')

  const payment = await addPayment({
    name,
    email,
    phone,
    reference: reference.slice(0, 400),
    lang,
    amount: q.total * 100,
    currency: 'eur',
    source: 'online',
    guests,
    pet,
    house: slug,
    checkIn,
    checkOut,
    // The cron's second lock: an online checkout never paid is expired the next morning.
    dueAt: todayTallinn(),
    blockId: block.id,
    holdUntil,
    ...(breakfastDates.length ? { meals: { breakfastDates, breakfastPeople } } : {}),
  })

  try {
    const url = await createCheckout(stripe, payment, Math.floor(now / 1000) + SESSION_MINUTES * 60)
    return NextResponse.json({ url })
  } catch (err) {
    console.error('[book] checkout failed:', err)
    // Let the nights go straight away rather than holding them for a checkout that never opened.
    const again = await readBookings()
    again.blocks[slug] = (again.blocks[slug] ?? []).filter(x => x.id !== block.id)
    await writeBookings(again)
    return NextResponse.json({ error: 'stripe_failed' }, { status: 502 })
  }
}
