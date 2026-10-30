import { formatEur } from './payments'
import { formatDate } from './pricing'
import type { DateStr } from './ical'

/**
 * The letter that carries a payment link to a guest.
 *
 * Written here rather than typed into Gmail each time, because the thing that kept going wrong
 * was not the wording — it was that the link never got sent at all. Janine was told "I'll send
 * you the payment link shortly" on 10 September and it had still not gone two weeks later.
 *
 * Four languages, because the guest already told us which one they write in and being answered
 * in it is the cheapest courtesy we have.
 */

export type LinkLetter = {
  guest: string
  /** Prose: which house, which nights, what is included. Shown back to them as confirmation. */
  reference: string
  amountCents: number
  payUrl: string
  /** The day the money is due — 14 days before arrival, or sooner for a late booking. */
  dueAt: DateStr
  lang: string
}

const DAYS_TO_PAY = 4

type Copy = {
  /**
   * Names the booking, not the payment. "Payment link" from a young domain is the exact shape
   * of a phishing mail, and Yahoo and Outlook filed ours with the spam.
   */
  subject: (v: { reference: string }) => string
  body: (v: { guest: string; reference: string; amount: string; url: string; due: string }) => string
}

const COPY: Record<string, Copy> = {
  et: {
    subject: v => `Teie broneering: ${v.reference}`,
    body: v => `Tere ${v.guest},

Aitäh! Kinnitame teie broneeringu:

${v.reference}

Kokku: ${v.amount} €

Makselink:
${v.url}

Palun tasuge ${v.due}. Makse toimub Stripe'i turvalisel lehel — kaart, Apple Pay ja Google Pay kõik töötavad ning kaardiandmed ei jõua kunagi meie serverisse.

Kuupäevad on teile broneeritud. Kui makse selleks ajaks ei laeku, vabastame kuupäevad.

Tühistamine on tasuta kuni 7 päeva enne saabumist, hiljem raha ei tagastata.

Kohtumiseni Oandus!

Parimate soovidega
Oanduaia`,
  },
  en: {
    subject: v => `Your booking: ${v.reference}`,
    body: v => `Hello ${v.guest},

Thank you — your stay is confirmed:

${v.reference}

Total: ${v.amount} €

Payment link:
${v.url}

Please pay by ${v.due}. The payment happens on Stripe's secure page — card, Apple Pay and Google Pay all work, and your card details never reach our server.

The dates are held for you. If the payment has not arrived by then, the dates are released again.

Cancellation is free up to 7 days before arrival; after that, there is no refund.

We look forward to welcoming you to Oandu.

Best regards,
Oanduaia`,
  },
  ru: {
    subject: v => `Ваше бронирование: ${v.reference}`,
    body: v => `Здравствуйте, ${v.guest}!

Спасибо — ваше бронирование подтверждено:

${v.reference}

Итого: ${v.amount} €

Ссылка на оплату:
${v.url}

Просим оплатить до ${v.due}. Оплата проходит на защищённой странице Stripe — принимаются карта, Apple Pay и Google Pay, данные карты никогда не попадают на наш сервер.

Даты забронированы за вами. Если оплата не поступит к этому сроку, даты снова освободятся.

Отмена бесплатна не позднее чем за 7 дней до заезда; позже оплата не возвращается.

Будем рады видеть вас в Оанду!

С наилучшими пожеланиями,
Oanduaia`,
  },
  de: {
    subject: v => `Ihre Buchung: ${v.reference}`,
    body: v => `Hallo ${v.guest},

vielen Dank — Ihr Aufenthalt ist bestätigt:

${v.reference}

Gesamt: ${v.amount} €

Zahlungslink:
${v.url}

Bitte zahlen Sie bis zum ${v.due}. Die Zahlung erfolgt auf der sicheren Seite von Stripe — Karte, Apple Pay und Google Pay funktionieren alle, und Ihre Kartendaten erreichen unseren Server nie.

Die Termine sind für Sie reserviert. Geht die Zahlung bis dahin nicht ein, werden die Termine wieder freigegeben.

Die Stornierung ist bis 7 Tage vor Anreise kostenlos; danach gibt es keine Erstattung.

Wir freuen uns auf Sie in Oandu.

Mit freundlichen Grüßen
Oanduaia`,
  },
  es: {
    subject: v => `Tu reserva: ${v.reference}`,
    body: v => `Hola, ${v.guest}:

Muchas gracias — su estancia está confirmada:

${v.reference}

Total: ${v.amount} €

Enlace de pago:
${v.url}

Le rogamos que pague antes del ${v.due}. El pago se realiza en la página segura de Stripe — funcionan tarjeta, Apple Pay y Google Pay, y los datos de su tarjeta nunca llegan a nuestro servidor.

Las fechas quedan reservadas para usted. Si el pago no llega a tiempo, las fechas vuelven a quedar libres.

La cancelación es gratuita hasta 7 días antes de la llegada; después no hay reembolso.

Le esperamos en Oandu.

Un cordial saludo,
Oanduaia`,
  },
  sv: {
    subject: v => `Din bokning: ${v.reference}`,
    body: v => `Hej ${v.guest},

Tack! Din vistelse är bekräftad:

${v.reference}

Totalt: ${v.amount} €

Betalningslänk:
${v.url}

Vänligen betala senast ${v.due}. Betalningen sker på Stripes säkra sida — kort, Apple Pay och Google Pay fungerar, och dina kortuppgifter når aldrig vår server.

Datumen är reserverade för dig. Om betalningen inte har kommit in till dess frigörs datumen igen.

Avbokning är kostnadsfri fram till 7 dagar före ankomst; därefter sker ingen återbetalning.

Välkommen till Oandu!

Vänliga hälsningar
Oanduaia`,
  },
  fi: {
    subject: v => `Varauksesi: ${v.reference}`,
    body: v => `Hei ${v.guest},

Kiitos! Varauksenne on vahvistettu:

${v.reference}

Yhteensä: ${v.amount} €

Maksulinkki:
${v.url}

Pyydämme maksamaan viimeistään ${v.due}. Maksu tehdään Stripen suojatulla sivulla — kortti, Apple Pay ja Google Pay toimivat, eivätkä korttitietonne koskaan päädy palvelimellemme.

Päivämäärät on varattu teille. Jos maksua ei ole saapunut siihen mennessä, päivämäärät vapautetaan uudelleen.

Peruutus on maksuton 7 päivään asti ennen saapumista; sen jälkeen maksua ei palauteta.

Tervetuloa Oanduun!

Ystävällisin terveisin
Oanduaia`,
  },
  lv: {
    subject: v => `Jūsu rezervācija: ${v.reference}`,
    body: v => `Labdien, ${v.guest}!

Paldies! Jūsu uzturēšanās ir apstiprināta:

${v.reference}

Kopā: ${v.amount} €

Maksājuma saite:
${v.url}

Lūdzam samaksāt līdz ${v.due}. Maksājums notiek Stripe drošajā lapā — darbojas karte, Apple Pay un Google Pay, un jūsu kartes dati nekad nenonāk mūsu serverī.

Datumi ir rezervēti jums. Ja maksājums līdz tam netiks saņemts, datumi atkal tiks atbrīvoti.

Atcelšana ir bez maksas līdz 7 dienām pirms ierašanās; pēc tam nauda netiek atmaksāta.

Gaidīsim jūs Oandu!

Ar cieņu
Oanduaia`,
  },
}

/** The deadline: `DAYS_TO_PAY` from today, but never later than the day before arrival. */
export function dueDate(today: DateStr, checkIn: DateStr): DateStr {
  const plus = new Date(`${today}T00:00:00Z`)
  plus.setUTCDate(plus.getUTCDate() + DAYS_TO_PAY)
  const deadline = plus.toISOString().slice(0, 10)

  const before = new Date(`${checkIn}T00:00:00Z`)
  before.setUTCDate(before.getUTCDate() - 1)
  const dayBefore = before.toISOString().slice(0, 10)

  // Nobody arrives unpaid: a booking made inside the window pays sooner, not later.
  return deadline < dayBefore ? deadline : dayBefore
}

export function linkLetter(v: LinkLetter): { subject: string; text: string } {
  const copy = COPY[v.lang] ?? COPY.en
  return {
    subject: copy.subject({ reference: v.reference }).slice(0, 140),
    text: copy.body({
      guest: v.guest,
      reference: v.reference,
      amount: formatEur(v.amountCents),
      url: v.payUrl,
      due: formatDate(v.dueAt, (v.lang === 'ru' || v.lang === 'de' || v.lang === 'et' || v.lang === 'es' || v.lang === 'sv' || v.lang === 'fi' || v.lang === 'lv' ? v.lang : 'en')),
    }),
  }
}

export { DAYS_TO_PAY }
