/**
 * The WhatsApp nudge after an important e-mail: "we have written to you, look in spam".
 *
 * Our mail passes every check, yet a young domain still lands in junk now and then — Sylvie's did.
 * A short WhatsApp message is the backup that always arrives. wa.me opens the chat with this text
 * typed in; nothing is sent until Mikk presses send himself.
 */

const TEXT: Record<string, (n: string) => string> = {
  et: n => `Tere${n ? `, ${n}` : ''}! Saatsime teile e-kirja aadressilt info@oanduaia.ee. Kui te seda ei leia, vaadake palun rämpsposti kausta. Toomas, Oanduaia`,
  en: n => `Hello${n ? ` ${n}` : ''}, we have sent you an email from info@oanduaia.ee. If you can't find it, please check your spam folder. Toomas, Oanduaia`,
  de: n => `Hallo${n ? ` ${n}` : ''}, wir haben Ihnen eine E-Mail von info@oanduaia.ee geschickt. Falls Sie sie nicht finden, schauen Sie bitte im Spam-Ordner nach. Toomas, Oanduaia`,
  ru: n => `Здравствуйте${n ? `, ${n}` : ''}! Мы отправили вам письмо с адреса info@oanduaia.ee. Если вы его не видите, пожалуйста, проверьте папку «Спам». Toomas, Oanduaia`,
  fi: n => `Hei${n ? ` ${n}` : ''}, lähetimme sinulle sähköpostin osoitteesta info@oanduaia.ee. Jos et löydä sitä, katso roskapostikansio. Toomas, Oanduaia`,
  lv: n => `Labdien${n ? `, ${n}` : ''}! Mēs nosūtījām jums e-pastu no info@oanduaia.ee. Ja to neatrodat, lūdzu, pārbaudiet surogātpasta mapi. Toomas, Oanduaia`,
  sv: n => `Hej${n ? ` ${n}` : ''}, vi har skickat ett mejl till dig från info@oanduaia.ee. Om du inte hittar det, titta i skräppostmappen. Toomas, Oanduaia`,
  es: n => `Hola${n ? `, ${n}` : ''}: le hemos enviado un correo desde info@oanduaia.ee. Si no lo encuentra, revise la carpeta de spam. Toomas, Oanduaia`,
  fr: n => `Bonjour${n ? ` ${n}` : ''}, nous vous avons envoyé un e-mail depuis info@oanduaia.ee. Si vous ne le trouvez pas, merci de vérifier vos spams. Toomas, Oanduaia`,
}

/** International digits for wa.me. An 8-digit number with no country code is taken as Estonian. */
export function waNumber(phone: string): string {
  const t = phone.trim()
  let d = t.replace(/\D/g, '')
  if (d.startsWith('00')) d = d.slice(2)
  else if (!t.startsWith('+') && d.length <= 8 && !d.startsWith('372')) d = `372${d}`
  return d
}

/** A chat with the guest, the "check your spam" message already typed in their language. */
export function waNudge(phone: string, name?: string, lang?: string): string {
  const first = name && !name.includes('@') ? name.trim().split(/\s+/)[0] : ''
  const text = (TEXT[lang ?? ''] ?? TEXT.en)(first)
  return `https://wa.me/${waNumber(phone)}?text=${encodeURIComponent(text)}`
}
