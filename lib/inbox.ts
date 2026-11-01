import { randomUUID } from 'node:crypto'
import type { Enquiry, EnquiryStore } from './enquiries'

/** One Gmail conversation as the info@ mailbox script reports it. */
export type MailThread = {
  id: string
  subject: string
  guestName: string
  guestEmail: string
  firstAt: string
  lastGuestAt: string
  lastFromUs: boolean
  /** Started by the website form's notification — the request is already in the store. */
  viaForm: boolean
  text: string
}

const DAY = 86_400_000
const near = (a: string, b: string, ms: number) => Math.abs(Date.parse(a) - Date.parse(b)) <= ms
const same = (a?: string, b?: string) => !!a && !!b && a.trim().toLowerCase() === b.trim().toLowerCase()

/**
 * Folds the mailbox into the enquiry list. Form requests get their conversation attached, so a
 * reply sent from Gmail turns them from red to answered; mail that never went through the form
 * becomes a request of its own. A guest writing again after we answered makes it red again.
 */
export function mergeMail(store: EnquiryStore, threads: MailThread[]): { added: number; updated: number } {
  let added = 0, updated = 0
  for (const t of threads) {
    let e = store.enquiries.find(x => x.threadId === t.id)
    // A form request, or one typed in by hand, that this conversation belongs to.
    if (!e) {
      e = store.enquiries.find(x => !x.threadId && x.source !== 'mail' && same(x.email, t.guestEmail) &&
        near(x.received, t.firstAt, (t.viaForm ? 2 : 30) * DAY))
      if (e) e.threadId = t.id
    }
    if (!e) {
      store.enquiries.unshift({
        id: randomUUID(),
        received: t.firstAt,
        name: t.guestName.slice(0, 120) || t.guestEmail,
        email: t.guestEmail.slice(0, 200),
        message: [t.subject, t.text].filter(Boolean).join('\n\n').slice(0, 4000),
        mailed: true,
        source: 'mail',
        threadId: t.id,
        subject: t.subject.slice(0, 200),
        answered: t.lastFromUs,
        lastGuestAt: t.lastGuestAt,
      })
      added++
      continue
    }
    const wroteAgain = !!e.lastGuestAt && t.lastGuestAt > e.lastGuestAt && !t.lastFromUs
    if (e.answered !== t.lastFromUs || e.lastGuestAt !== t.lastGuestAt || (wroteAgain && e.handled)) {
      e.answered = t.lastFromUs
      e.lastGuestAt = t.lastGuestAt
      if (wroteAgain) e.handled = false
      updated++
    }
  }
  if (store.enquiries.length > 500) store.enquiries.length = 500
  return { added, updated }
}
