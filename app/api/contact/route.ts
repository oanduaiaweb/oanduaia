import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Instantiated per request, not at module scope — module-scope construction runs
// during the build's page-data collection and fails wherever the key isn't set.
function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not configured')
  return new Resend(key)
}

export async function POST(req: Request) {
  try {
    const { name, email, dates, message, subject } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await getResend().emails.send({
      from: 'Kontaktivorm <noreply@oanduaia.ee>',
      to: 'info@oanduaia.ee',
      replyTo: email,
      subject: subject || `Inquiry – Oanduaia`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        dates ? `Dates: ${dates}` : '',
        '',
        message,
      ].filter(Boolean).join('\n'),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
