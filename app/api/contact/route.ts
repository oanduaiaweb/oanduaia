import { NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { Resend } from 'resend'
import { recordEnquiry } from '@/lib/enquiries'
import { receiptLetter } from '@/lib/enquiryEmail'

// Instantiated per request, not at module scope — module-scope construction runs
// during the build's page-data collection and fails wherever the key isn't set.
function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not configured')
  return new Resend(key)
}

/**
 * An enquiry from the website.
 *
 * The order below is the whole point of this route. It used to send the email and keep nothing,
 * which made the inbox the only copy: anything lost to spam filtering, a full mailbox or a
 * Resend outage was gone, and the route answered the guest with a 500 while keeping no trace of
 * what they had written.
 *
 * Now the enquiry is WRITTEN DOWN FIRST and the mail is attempted second, and the guest is told
 * it worked as long as one of the two succeeded. The two failures are not equal:
 *   · mail sent, log failed   → we have the enquiry, in the inbox. Annoying, not lost.
 *   · log written, mail failed → we still have the enquiry, in the admin, flagged `mailed: false`.
 *   · both failed             → and only then does the guest hear that it did not go through.
 */
export async function POST(req: Request) {
  const { name, email, phone, dates, message, subject, lang, company } = await req.json().catch(() => ({}))

  // A field no person can see. Filled in means a bot; it is told it worked and nothing happens.
  if (company) return NextResponse.json({ ok: true })

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const enquiry = {
    id: randomUUID(),
    received: new Date().toISOString(),
    name: String(name).slice(0, 120),
    email: String(email).slice(0, 200),
    dates: dates ? String(dates).slice(0, 200) : undefined,
    phone: phone ? String(phone).slice(0, 40) : undefined,
    message: String(message).slice(0, 4000),
    lang: lang ? String(lang).slice(0, 5) : undefined,
  }

  let mailed = false
  try {
    await getResend().emails.send({
      from: 'Kontaktivorm <noreply@oanduaia.ee>',
      to: 'info@oanduaia.ee',
      replyTo: enquiry.email,
      subject: subject || `Inquiry – Oanduaia`,
      text: [
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        enquiry.phone ? `Phone: ${enquiry.phone}` : '',
        enquiry.dates ? `Dates: ${enquiry.dates}` : '',
        '',
        enquiry.message,
      ].filter(Boolean).join('\n'),
    })
    mailed = true
  } catch (error) {
    console.error('Contact form — send failed:', error)
  }

  const logged = await recordEnquiry({ ...enquiry, mailed })

  /*
   * The guest's receipt, from info@ itself. Last and best-effort: a guest whose enquiry reached
   * us must not be told it failed because their own copy did not go out.
   */
  if ((mailed || logged) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
    try {
      const letter = receiptLetter(enquiry.name, enquiry.lang)
      await getResend().emails.send({
        from: 'Oanduaia <info@oanduaia.ee>',
        to: enquiry.email,
        replyTo: 'info@oanduaia.ee',
        subject: letter.subject,
        text: letter.text,
      })
    } catch (error) {
      console.error('Contact form — receipt failed:', error)
    }
  }

  if (!mailed && !logged) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
