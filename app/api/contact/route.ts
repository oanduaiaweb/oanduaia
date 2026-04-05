import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, dates, message, subject } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Oanduaia <info@oanduaia.ee>',
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
