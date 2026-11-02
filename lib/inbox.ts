import { randomUUID } from 'node:crypto'
import type { Enquiry, EnquiryStore } from './enquiries'

/** One Gmail conversation as the info@ mailbox script reports it. */
export type MailThread = {
  id: string
  subject: string
  guestName: string
  guestEmail: string
  firstAt: string
  /** Last message from the guest; empty when the thread only holds our own mail to them. */
  lastGuestAt: string
  /** Last message from us; empty when we have not written in this thread. */
  lastUsAt: string
  /** Started by the website form's notification — the request is already in the store. */
  viaForm: boolean
  text: string
}

const DAY = 86_400_000
const near = (a: string, b: string, ms: number) => Math.abs(Date.parse(a) - Date.parse(b)) <= ms
const same = (a?: string, b?: string) => !!a && !!b && a.trim().toLowerCase() === b.trim().toLowerCase()
const latest = (xs: (string | undefined)[]) => xs.filter(Boolean).sort().pop()

/**
 * Folds the mailbox into the enquiry list, one row per guest: every conversation with the same
 * address in the same season lands on the same request, whether it started on the form, by hand
 * or straight in the mailbox. "Answered" means our message is the latest one with that guest in
 * any of those conversations; a guest writing after that turns the request red again.
 */
export function mergeMail(store: EnquiryStore, threads: MailThread[]): { added: number; updated: number } {
  let added = 0, updated = 0
  // What each request looked like before this batch: catching up on old threads must not reopen one.
  const before = new Map<Enquiry, string | undefined>()
  for (const t of [...threads].sort((a, b) => a.firstAt.localeCompare(b.firstAt))) {
    let e = store.enquiries.find(x => x.threadId === t.id || x.mail?.[t.id])
    if (!e) {
      e = store.enquiries
        .filter(x => same(x.email, t.guestEmail) && near(x.received, t.firstAt, 90 * DAY))
        .sort((a, b) => b.received.localeCompare(a.received))[0]
    }
    if (!e) {
      if (!t.lastGuestAt) continue
      e = {
        id: randomUUID(),
        received: t.firstAt,
        name: t.guestName.slice(0, 120) || t.guestEmail,
        email: t.guestEmail.slice(0, 200),
        message: [t.subject, t.text].filter(Boolean).join('\n\n').slice(0, 4000),
        mailed: true,
        source: 'mail',
        subject: t.subject.slice(0, 200),
      }
      store.enquiries.unshift(e)
      added++
    }
    if (!before.has(e)) before.set(e, e.lastGuestAt)
    if (e.name.includes('@') && t.guestName) e.name = t.guestName.slice(0, 120)
    e.threadId ??= t.id
    e.mail = { ...e.mail, [t.id]: { g: t.lastGuestAt || undefined, u: t.lastUsAt || undefined } }

    // A request typed in by hand carries the time it was typed, not the time the guest wrote.
    const guestAt = latest(Object.values(e.mail).map(m => m.g)) ?? (e.source || e.manual ? undefined : e.received)
    const usAt = latest(Object.values(e.mail).map(m => m.u))
    const answered = !!usAt && (!guestAt || usAt > guestAt)
    if (e.answered !== answered || e.lastGuestAt !== guestAt) {
      e.answered = answered
      e.lastGuestAt = guestAt
      updated++
    }
  }
  for (const [e, prev] of before) {
    if (e.handled && prev && e.lastGuestAt && e.lastGuestAt > prev && !e.answered) e.handled = false
  }
  if (store.enquiries.length > 500) store.enquiries.length = 500
  return { added, updated }
}
