import { house, formatDate } from './pricing'
import { freeCancelUntil } from './instantBooking'
import { formatEur, type Payment } from './payments'
import { SITE } from './i18n'
import type { Lang } from './translations'

/**
 * The letters for a booking made and paid on the website.
 *
 * Plain text, one link at most, a specific subject naming the house and dates — the rules that
 * keep guest mail out of spam (see the deliverability notes). Ends with a question, so the guest
 * replies, which is what teaches their provider that our address is wanted.
 */

type Facts = {
  first: string
  house: string
  checkIn: string
  checkOut: string
  guests: number
  pet: boolean
  breakfast: string
  amount: string
  cancel: string
}

type Copy = {
  subject: (house: string, dates: string) => string
  body: (f: Facts) => string
  breakfast: (people: number, mornings: number) => string
  cancelFree: (date: string) => string
  cancelNone: string
}

const L: Record<Lang, Copy> = {
  et: {
    subject: (h, d) => `Broneering kinnitatud – ${h}, ${d}`,
    breakfast: (p, m) => `${p} inimest × ${m} hommikut`,
    cancelFree: d => `Tasuta tühistamise tähtaeg: ${d}. Hiljem makset ei tagastata.`,
    cancelNone: 'Broneering on tehtud vähem kui 7 päeva enne saabumist, seega makset ei tagastata.',
    body: f => `Tere, ${f.first}!

Aitäh! Teie broneering on tasutud ja kinnitatud.

Maja: ${f.house}
Saabumine: ${f.checkIn}, alates kell 14.00
Lahkumine: ${f.checkOut}, hiljemalt kell 12.00
Külalisi: ${f.guests}${f.pet ? '\nLemmikloom: jah' : ''}${f.breakfast ? `\nHommikusöök: ${f.breakfast}` : ''}
Tasutud: ${f.amount}

Aadress: Oandu küla, 45432 Lääne-Virumaa.
${f.cancel}

Palun lisage info@oanduaia.ee oma kontaktidesse, et meie kirjad teieni jõuaksid. Küsimuste korral vastake sellele kirjale või helistage / kirjutage WhatsAppis +372 520 2044.

Mis kellaajal plaanite saabuda?

Parimate soovidega
Toomas ja Aigi
Oanduaia`,
  },
  en: {
    subject: (h, d) => `Booking confirmed – ${h}, ${d}`,
    breakfast: (p, m) => `${p} ${p === 1 ? 'person' : 'people'} × ${m} ${m === 1 ? 'morning' : 'mornings'}`,
    cancelFree: d => `Cancellation is free until ${d}. After that the payment is not refunded.`,
    cancelNone: 'This booking was made less than 7 days before arrival, so the payment is not refundable.',
    body: f => `Hello ${f.first},

Thank you – your booking is paid and confirmed.

House: ${f.house}
Arrival: ${f.checkIn}, from 14:00
Departure: ${f.checkOut}, by 12:00
Guests: ${f.guests}${f.pet ? '\nPet: yes' : ''}${f.breakfast ? `\nBreakfast: ${f.breakfast}` : ''}
Paid: ${f.amount}

Address: Oandu village, 45432 Lääne-Virumaa, Estonia.
${f.cancel}

Please add info@oanduaia.ee to your contacts so our messages reach you. For anything at all, reply to this email or call / WhatsApp +372 520 2044.

What time do you expect to arrive?

Warm regards,
Toomas & Aigi
Oanduaia`,
  },
  ru: {
    subject: (h, d) => `Бронирование подтверждено – ${h}, ${d}`,
    breakfast: (p, m) => `${p} чел. × ${m} утр.`,
    cancelFree: d => `Бесплатная отмена до ${d}. После этого оплата не возвращается.`,
    cancelNone: 'Бронирование сделано менее чем за 7 дней до заезда, поэтому оплата не возвращается.',
    body: f => `Здравствуйте, ${f.first}!

Спасибо! Ваше бронирование оплачено и подтверждено.

Дом: ${f.house}
Заезд: ${f.checkIn}, с 14:00
Выезд: ${f.checkOut}, до 12:00
Гостей: ${f.guests}${f.pet ? '\nПитомец: да' : ''}${f.breakfast ? `\nЗавтрак: ${f.breakfast}` : ''}
Оплачено: ${f.amount}

Адрес: деревня Оанду, 45432 Ляэне-Вирумаа, Эстония.
${f.cancel}

Пожалуйста, добавьте info@oanduaia.ee в контакты, чтобы наши письма до вас доходили. По любым вопросам ответьте на это письмо или позвоните / напишите в WhatsApp +372 520 2044.

Во сколько вы планируете приехать?

С уважением,
Toomas & Aigi
Oanduaia`,
  },
  de: {
    subject: (h, d) => `Buchung bestätigt – ${h}, ${d}`,
    breakfast: (p, m) => `${p} ${p === 1 ? 'Person' : 'Personen'} × ${m} ${m === 1 ? 'Morgen' : 'Morgen'}`,
    cancelFree: d => `Die Stornierung ist bis zum ${d} kostenlos. Danach wird die Zahlung nicht erstattet.`,
    cancelNone: 'Diese Buchung wurde weniger als 7 Tage vor der Anreise gemacht, daher ist die Zahlung nicht erstattungsfähig.',
    body: f => `Hallo ${f.first},

vielen Dank – Ihre Buchung ist bezahlt und bestätigt.

Haus: ${f.house}
Anreise: ${f.checkIn}, ab 14:00 Uhr
Abreise: ${f.checkOut}, bis 12:00 Uhr
Gäste: ${f.guests}${f.pet ? '\nHaustier: ja' : ''}${f.breakfast ? `\nFrühstück: ${f.breakfast}` : ''}
Bezahlt: ${f.amount}

Adresse: Dorf Oandu, 45432 Lääne-Virumaa, Estland.
${f.cancel}

Bitte fügen Sie info@oanduaia.ee zu Ihren Kontakten hinzu, damit unsere Nachrichten Sie erreichen. Bei Fragen antworten Sie einfach auf diese E-Mail oder rufen Sie an / schreiben Sie per WhatsApp: +372 520 2044.

Um wie viel Uhr planen Sie anzukommen?

Herzliche Grüße
Toomas & Aigi
Oanduaia`,
  },
  es: {
    subject: (h, d) => `Reserva confirmada – ${h}, ${d}`,
    breakfast: (p, m) => `${p} ${p === 1 ? 'persona' : 'personas'} × ${m} ${m === 1 ? 'mañana' : 'mañanas'}`,
    cancelFree: d => `La cancelación es gratuita hasta el ${d}. Después, el pago no se reembolsa.`,
    cancelNone: 'Esta reserva se hizo con menos de 7 días de antelación, por lo que el pago no es reembolsable.',
    body: f => `Hola, ${f.first}:

Gracias: su reserva está pagada y confirmada.

Casa: ${f.house}
Llegada: ${f.checkIn}, a partir de las 14:00
Salida: ${f.checkOut}, antes de las 12:00
Huéspedes: ${f.guests}${f.pet ? '\nMascota: sí' : ''}${f.breakfast ? `\nDesayuno: ${f.breakfast}` : ''}
Pagado: ${f.amount}

Dirección: Pueblo de Oandu, 45432 Lääne-Virumaa, Estonia.
${f.cancel}

Añada info@oanduaia.ee a sus contactos para que nuestros mensajes le lleguen. Para cualquier cosa, responda a este correo o llame / escriba por WhatsApp al +372 520 2044.

¿A qué hora piensa llegar?

Un cordial saludo,
Toomas & Aigi
Oanduaia`,
  },
  sv: {
    subject: (h, d) => `Bokningen är bekräftad – ${h}, ${d}`,
    breakfast: (p, m) => `${p} ${p === 1 ? 'person' : 'personer'} × ${m} ${m === 1 ? 'morgon' : 'morgnar'}`,
    cancelFree: d => `Avbokning är kostnadsfri till och med ${d}. Därefter återbetalas inte betalningen.`,
    cancelNone: 'Bokningen gjordes mindre än 7 dagar före ankomst, så betalningen återbetalas inte.',
    body: f => `Hej ${f.first},

tack – din bokning är betald och bekräftad.

Hus: ${f.house}
Ankomst: ${f.checkIn}, från kl. 14.00
Avresa: ${f.checkOut}, senast kl. 12.00
Gäster: ${f.guests}${f.pet ? '\nHusdjur: ja' : ''}${f.breakfast ? `\nFrukost: ${f.breakfast}` : ''}
Betalt: ${f.amount}

Adress: Byn Oandu, 45432 Lääne-Virumaa, Estland.
${f.cancel}

Lägg gärna till info@oanduaia.ee bland dina kontakter så att våra meddelanden når fram. Har du frågor, svara på det här mejlet eller ring / skriv på WhatsApp: +372 520 2044.

Vilken tid räknar du med att komma fram?

Varma hälsningar
Toomas & Aigi
Oanduaia`,
  },
  fi: {
    subject: (h, d) => `Varaus vahvistettu – ${h}, ${d}`,
    breakfast: (p, m) => `${p} hlö × ${m} ${m === 1 ? 'aamu' : 'aamua'}`,
    cancelFree: d => `Peruutus on maksuton ${d} asti. Sen jälkeen maksua ei palauteta.`,
    cancelNone: 'Varaus tehtiin alle 7 päivää ennen saapumista, joten maksua ei palauteta.',
    body: f => `Hei ${f.first},

kiitos – varauksesi on maksettu ja vahvistettu.

Talo: ${f.house}
Saapuminen: ${f.checkIn}, klo 14.00 alkaen
Lähtö: ${f.checkOut}, viimeistään klo 12.00
Vieraita: ${f.guests}${f.pet ? '\nLemmikki: kyllä' : ''}${f.breakfast ? `\nAamiainen: ${f.breakfast}` : ''}
Maksettu: ${f.amount}

Osoite: Oandun kylä, 45432 Länsi-Virumaa, Viro.
${f.cancel}

Lisää info@oanduaia.ee yhteystietoihisi, jotta viestimme tavoittavat sinut. Kysymyksissä vastaa tähän viestiin tai soita / kirjoita WhatsAppissa +372 520 2044.

Mihin aikaan arvelet saapuvasi?

Lämpimin terveisin
Toomas & Aigi
Oanduaia`,
  },
  lv: {
    subject: (h, d) => `Rezervācija apstiprināta – ${h}, ${d}`,
    breakfast: (p, m) => `${p} pers. × ${m} rīti`,
    cancelFree: d => `Bezmaksas atcelšanas termiņš: ${d}. Pēc tam maksājums netiek atmaksāts.`,
    cancelNone: 'Rezervācija veikta mazāk nekā 7 dienas pirms ierašanās, tāpēc maksājums netiek atmaksāts.',
    body: f => `Labdien, ${f.first}!

Paldies – jūsu rezervācija ir apmaksāta un apstiprināta.

Māja: ${f.house}
Ierašanās: ${f.checkIn}, no plkst. 14.00
Izbraukšana: ${f.checkOut}, līdz plkst. 12.00
Viesi: ${f.guests}${f.pet ? '\nMājdzīvnieks: jā' : ''}${f.breakfast ? `\nBrokastis: ${f.breakfast}` : ''}
Samaksāts: ${f.amount}

Adrese: Oandu ciems, 45432 Lääne-Virumaa, Igaunija.
${f.cancel}

Lūdzu, pievienojiet info@oanduaia.ee saviem kontaktiem, lai mūsu ziņas jūs sasniegtu. Ja ir jautājumi, atbildiet uz šo e-pastu vai zvaniet / rakstiet WhatsApp: +372 520 2044.

Cikos plānojat ierasties?

Ar sirsnīgiem sveicieniem
Toomas & Aigi
Oanduaia`,
  },
}

const langOf = (l: string): Lang => (l in L ? l : 'en') as Lang

const firstName = (name: string) => name.trim().split(/\s+/)[0] || name

/** The confirmation the guest gets once Stripe says the money arrived. */
export function confirmationLetter(p: Payment, today: string): { subject: string; text: string } {
  const lang = langOf(p.lang)
  const c = L[lang]
  const houseName = house(p.house!).name[lang]
  const inDate = formatDate(p.checkIn!, lang)
  const outDate = formatDate(p.checkOut!, lang)
  const freeUntil = freeCancelUntil(p.checkIn!)
  const mornings = p.meals?.breakfastDates?.length ?? 0
  const people = p.meals?.breakfastPeople ?? 0
  return {
    subject: c.subject(houseName, `${inDate} – ${outDate}`),
    text: c.body({
      first: firstName(p.name),
      house: houseName,
      checkIn: inDate,
      checkOut: outDate,
      guests: p.guests ?? 0,
      pet: !!p.pet,
      breakfast: mornings && people ? c.breakfast(people, mornings) : '',
      amount: `${formatEur(p.amount)} €`,
      cancel: freeUntil >= today ? c.cancelFree(formatDate(freeUntil, lang)) : c.cancelNone,
    }),
  }
}

/** The note to info@, in Estonian. Loud in the subject when the stay collided with a channel. */
export function hostNotice(p: Payment): { subject: string; text: string } {
  const houseName = house(p.house!).name.et
  const dates = `${formatDate(p.checkIn!, 'et')} – ${formatDate(p.checkOut!, 'et')}`
  const b = p.meals?.breakfastDates ?? []
  return {
    subject: `${p.clash ? 'KATTUVUS! ' : ''}Uus makstud broneering: ${houseName}, ${dates} – ${`${formatEur(p.amount)} €`}`,
    text: [
      p.clash
        ? `TÄHELEPANU: samad ööd on kinni ka Booking.com kalendris (${p.clash}). Mõlemad broneeringud on alles – otsusta, kumb ümber paigutada või kellele raha tagastada (Stripe).\n`
        : '',
      'Külaline broneeris ja maksis veebilehel. Kinnitus on talle saadetud.',
      '',
      `Maja: ${houseName}`,
      `Kuupäevad: ${dates}`,
      `Külalisi: ${p.guests ?? '?'}`,
      p.pet ? 'Lemmikloom: jah' : '',
      b.length ? `Hommikusöök: ${p.meals?.breakfastPeople} inimest, ${b.map(d => formatDate(d, 'et')).join(', ')}` : '',
      `Makstud: ${`${formatEur(p.amount)} €`}`,
      '',
      `Nimi: ${p.name}`,
      `E-post: ${p.email}`,
      p.phone ? `Telefon: ${p.phone}` : '',
      p.lang ? `Keel: ${p.lang}` : '',
      '',
      `${SITE}/admin`,
    ].filter((l, i, a) => l !== '' || (a[i - 1] ?? '') !== '').join('\n'),
  }
}
