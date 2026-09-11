import { put, get, BlobNotFoundError } from '@vercel/blob'

/**
 * Every enquiry the website has ever taken, kept on our own side.
 *
 * Until now the contact form only ever emailed info@oanduaia.ee and kept nothing. That made the
 * inbox the single copy of the record: an enquiry lost to spam filtering, a full mailbox, or a
 * Resend outage was simply gone, and there was no way to answer "has anyone booked?" without
 * opening the mail. This is the copy we control.
 *
 * Private blob, exactly like the bookings store — these are real people's names, addresses and
 * travel dates, and a public blob URL is readable by anyone who learns it.
 */
const PATH = 'enquiries/log.json'

/** Kept bounded so one blob stays small and fast to read on every submission. */
const MAX = 500

export type Enquiry = {
  id: string
  received: string
  name: string
  email: string
  dates?: string
  message: string
  /** Which language the site was in — tells us who to answer in. */
  lang?: string
  /**
   * Whether the email actually went out. An enquiry recorded with `mailed: false` is one the
   * guest believes was sent and which never reached the inbox — the single most important
   * thing this store can tell us, and invisible before it existed.
   */
  mailed: boolean
  /** Ticked off in the admin once it has been dealt with. */
  handled?: boolean
}

export type EnquiryStore = { version: 1; enquiries: Enquiry[] }

const empty = (): EnquiryStore => ({ version: 1, enquiries: [] })

export async function readEnquiries(): Promise<EnquiryStore> {
  try {
    const res = await get(PATH, { access: 'private', useCache: false })
    if (!res || res.statusCode !== 200) return empty()
    const parsed = JSON.parse(await new Response(res.stream).text()) as EnquiryStore
    parsed.enquiries ??= []
    return parsed
  } catch (err) {
    if (err instanceof BlobNotFoundError) return empty()
    console.error('[enquiries] read failed:', err)
    throw err
  }
}

export async function writeEnquiries(store: EnquiryStore): Promise<void> {
  await put(PATH, JSON.stringify(store, null, 2), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 0,
  })
}

/**
 * Adds one enquiry, newest first.
 *
 * Deliberately swallows its own failures and reports them rather than throwing: this is called
 * from the contact route, and a guest must never see "failed to send" because our log was
 * briefly unavailable. Losing the copy is bad; losing the enquiry is worse.
 */
export async function recordEnquiry(e: Enquiry): Promise<boolean> {
  try {
    const store = await readEnquiries()
    store.enquiries.unshift(e)
    if (store.enquiries.length > MAX) store.enquiries.length = MAX
    await writeEnquiries(store)
    return true
  } catch (err) {
    console.error('[enquiries] record failed:', err)
    return false
  }
}
