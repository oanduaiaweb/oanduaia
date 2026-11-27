import { findPayment, updatePayment } from './payments'
import { readBookings, writeBookings, overlaps, type Block } from './bookings'
import { liveNights, type HouseSlug } from './availability'
import { getResend } from './mailer'
import { confirmationLetter, hostNotice } from './bookingEmail'
import { todayTallinn } from './instantBooking'
import { formatDate } from './pricing'

/**
 * A stay has been paid — booked in the calendar, or through a link Mikk sent: make it a real
 * booking and tell everyone. Before 26 Nov 2026 only calendar bookings got this; a guest who paid
 * a link heard nothing back and had to write and ask (Christian Pfeil).
 *
 * 1. The hold becomes a plain block (no `holdUntil`), so it never lapses and the iCal feed keeps
 *    publishing it to Booking.com. If the hold had somehow gone, the block is written again.
 * 2. Booking.com is read once more, fresh. If it sold any of the same nights in the gap before it
 *    last read our feed, both bookings stay and info@ gets a loud warning — Mikk decides
 *    (his call, 22 Nov 2026), nothing is refunded automatically.
 * 3. The guest's confirmation goes out, then the note to info@. `confirmedAt` is written only
 *    after the guest mail, so a retried webhook can still send it if the first attempt failed.
 */
export async function confirmPaidBooking(id: string): Promise<void> {
  const p = await findPayment(id)
  if (!p || p.status !== 'paid' || p.confirmedAt || p.voucher || !p.house || !p.checkIn || !p.checkOut) return
  const paidNote = p.source === 'online' ? 'Paid online' : 'Paid (payment link)'
  const slug = p.house as HouseSlug

  const clashes: string[] = []
  const bookings = await readBookings()
  const list = bookings.blocks[slug] ?? []
  const mine = list.find(b => b.id === p.blockId)
  const others = { ...bookings, blocks: { ...bookings.blocks, [slug]: list.filter(b => b.id !== p.blockId) } }
  if (overlaps(others, slug, p.checkIn, p.checkOut)) clashes.push('meie oma kalender (/admin)')
  if (mine) {
    delete mine.holdUntil
    mine.note = paidNote
  } else {
    const block: Block = {
      id: p.blockId ?? crypto.randomUUID(),
      from: p.checkIn,
      to: p.checkOut,
      guest: p.name.slice(0, 80),
      note: paidNote,
      created: new Date().toISOString(),
    }
    bookings.blocks[slug] = [...list, block]
  }
  await writeBookings(bookings)

  try {
    const live = await liveNights(slug, p.checkIn, p.checkOut, p.blockId)
    const hit = live.channel.filter(n => n >= p.checkIn! && n < p.checkOut!)
    if (hit.length) clashes.push(`Booking.com: ${hit.map(n => formatDate(n, 'et')).join(', ')}`)
  } catch (err) {
    console.error('[confirm] live channel check failed:', err)
  }
  const clash = clashes.join('; ') || undefined
  if (clash) await updatePayment(p.id, r => { r.clash = clash })

  const letter = confirmationLetter(p, todayTallinn())
  await getResend().emails.send({
    from: 'Oanduaia <info@oanduaia.ee>',
    to: p.email,
    replyTo: 'info@oanduaia.ee',
    subject: letter.subject,
    text: letter.text,
  })
  await updatePayment(p.id, r => { r.confirmedAt = new Date().toISOString(); r.mailedAt = r.confirmedAt })

  const note = hostNotice({ ...p, clash })
  await getResend().emails.send({
    from: 'Broneerimine <noreply@oanduaia.ee>',
    to: 'info@oanduaia.ee',
    replyTo: p.email,
    subject: note.subject,
    text: note.text,
  }).catch(err => console.error('[confirm] host notice failed:', err))
}
