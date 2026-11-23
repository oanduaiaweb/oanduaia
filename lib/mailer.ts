import { Resend } from 'resend'

type Message = Parameters<Resend['emails']['send']>[0]

/*
 * resend v6 does not throw on a rejected send: it returns { error }. Every caller wraps the send
 * in try/catch and records "sent" when nothing is thrown, so without this a refused or bounced
 * request was logged as delivered. Built per call, never at module scope: module-scope
 * construction runs during the build's page-data collection and fails wherever the key isn't set.
 */
export function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not configured')
  const client = new Resend(key)
  return {
    emails: {
      async send(message: Message) {
        const { data, error } = await client.emails.send(message)
        if (error) throw new Error(`Resend refused the message: ${error.name}: ${error.message}`)
        return data
      },
    },
  }
}
