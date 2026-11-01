import { Resend } from 'resend'
import { G } from '@/lib/gift'
import { SITE } from '@/lib/i18n'
import type { Payment } from '@/lib/payments'
import type { Lang } from '@/lib/translations'

const fmtDate = (d: string, lang: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString(lang === 'en' ? 'en-GB' : lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

/**
 * The voucher by e-mail to the buyer, plain text like every guest mail (deliverability), with a
 * link to the printable page; and a short note to info@ so the hosts know one was sold.
 */
export async function sendGiftVoucher(p: Payment): Promise<void> {
  const key = process.env.RESEND_API_KEY
  if (!key || !p.voucher?.validUntil) return
  const lang = (p.lang in G.name ? p.lang : 'en') as Lang
  const t = (k: string) => G[k][lang]
  const euros = `${p.amount / 100} €`
  const lines = [
    `${t('hello')}, ${p.name.split(' ')[0]}!`,
    '',
    t('mailThanks'),
    '',
    `${t('name')}: ${euros}`,
    `${t('code')}: ${p.voucher.code}`,
    `${t('valid')}: ${fmtDate(p.voucher.validUntil, lang)}`,
    p.voucher.recipient ? `${t('for')}: ${p.voucher.recipient}` : null,
    p.voucher.message ? `\n"${p.voucher.message}"` : null,
    '',
    `${t('mailOpen')}: ${SITE}/${lang}/gift/${p.id}`,
    '',
    t('howTo'),
    '',
    t('regards'),
    'Oanduaia',
    '+372 520 2044 · www.oanduaia.ee',
  ].filter((l): l is string => l !== null)
  const resend = new Resend(key)
  await resend.emails.send({
    from: 'Oanduaia <info@oanduaia.ee>',
    to: p.email,
    replyTo: 'info@oanduaia.ee',
    subject: `${t('mailSubject')} – ${p.voucher.code}`,
    text: lines.join('\n'),
  })
  await resend.emails.send({
    from: 'Kontaktivorm <noreply@oanduaia.ee>',
    to: 'info@oanduaia.ee',
    subject: `Kinkekaart müüdud – ${p.voucher.code} – ${euros}`,
    text: [
      `Ostja: ${p.name} <${p.email}>`,
      `Summa: ${euros}`,
      `Kood: ${p.voucher.code}`,
      `Kehtib kuni: ${p.voucher.validUntil}`,
      p.voucher.recipient ? `Kellele: ${p.voucher.recipient}` : '',
      p.voucher.message ? `Tervitus: ${p.voucher.message}` : '',
      `Kaart: ${SITE}/et/gift/${p.id}`,
    ].filter(Boolean).join('\n'),
  })
}
