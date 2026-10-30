/**
 * The receipt a guest gets the moment the booking form goes through.
 *
 * Its real job is deliverability. Our answer comes later, by hand, from info@ — and on a young
 * domain Yahoo and Outlook tend to file it as spam. A guest who has just had a short, expected
 * mail from info@, and replied to it or added it to contacts, makes the next one far more likely
 * to land in the inbox. So it is plain text, has no links, and never repeats what the guest typed
 * (that would let anyone use the form to send their own words to a stranger from our address).
 */

type Copy = { subject: string; body: (name: string) => string }

const SIGN = `Oanduaia
+372 520 2044 · www.oanduaia.ee`

const COPY: Record<string, Copy> = {
  et: {
    subject: 'Saime teie päringu kätte – Oanduaia',
    body: n => `Tere, ${n}!

Aitäh, saime teie päringu kätte. Vastame 24 tunni jooksul sellelt aadressilt: info@oanduaia.ee.

Et meie vastus ei satuks rämpsposti, lisage palun info@oanduaia.ee oma kontaktidesse. Kui soovite midagi lisada, vastake lihtsalt sellele kirjale.

Parimate soovidega
${SIGN}`,
  },
  en: {
    subject: 'We have received your enquiry – Oanduaia',
    body: n => `Hello ${n},

Thank you, we have received your enquiry. We will reply within 24 hours from this address: info@oanduaia.ee.

To make sure our reply does not end up in spam, please add info@oanduaia.ee to your contacts. If you would like to add anything, simply reply to this email.

Best regards,
${SIGN}`,
  },
  ru: {
    subject: 'Мы получили ваш запрос – Oanduaia',
    body: n => `Здравствуйте, ${n}!

Спасибо, мы получили ваш запрос. Мы ответим в течение 24 часов с этого адреса: info@oanduaia.ee.

Чтобы наш ответ не попал в спам, пожалуйста, добавьте info@oanduaia.ee в свои контакты. Если хотите что-то добавить, просто ответьте на это письмо.

С наилучшими пожеланиями,
${SIGN}`,
  },
  de: {
    subject: 'Wir haben Ihre Anfrage erhalten – Oanduaia',
    body: n => `Hallo ${n},

vielen Dank, wir haben Ihre Anfrage erhalten. Wir antworten innerhalb von 24 Stunden von dieser Adresse: info@oanduaia.ee.

Damit unsere Antwort nicht im Spam landet, fügen Sie info@oanduaia.ee bitte Ihren Kontakten hinzu. Wenn Sie etwas ergänzen möchten, antworten Sie einfach auf diese E-Mail.

Viele Grüße
${SIGN}`,
  },
  es: {
    subject: 'Hemos recibido tu consulta – Oanduaia',
    body: n => `Hola, ${n}:

Gracias, hemos recibido tu consulta. Te responderemos en menos de 24 horas desde esta dirección: info@oanduaia.ee.

Para que nuestra respuesta no acabe en spam, añade info@oanduaia.ee a tus contactos. Si quieres añadir algo, simplemente responde a este correo.

Un saludo,
${SIGN}`,
  },
  sv: {
    subject: 'Vi har tagit emot din förfrågan – Oanduaia',
    body: n => `Hej ${n},

tack, vi har tagit emot din förfrågan. Vi svarar inom 24 timmar från den här adressen: info@oanduaia.ee.

Lägg gärna till info@oanduaia.ee bland dina kontakter så att vårt svar inte hamnar i skräpposten. Vill du lägga till något kan du bara svara på det här mejlet.

Vänliga hälsningar
${SIGN}`,
  },
  fi: {
    subject: 'Olemme vastaanottaneet tiedustelusi – Oanduaia',
    body: n => `Hei ${n},

kiitos, olemme vastaanottaneet tiedustelusi. Vastaamme 24 tunnin kuluessa tästä osoitteesta: info@oanduaia.ee.

Jotta vastauksemme ei päätyisi roskapostiin, lisää info@oanduaia.ee yhteystietoihisi. Jos haluat lisätä jotain, vastaa vain tähän viestiin.

Ystävällisin terveisin
${SIGN}`,
  },
  lv: {
    subject: 'Esam saņēmuši jūsu pieprasījumu – Oanduaia',
    body: n => `Labdien, ${n}!

Paldies, esam saņēmuši jūsu pieprasījumu. Atbildēsim 24 stundu laikā no šīs adreses: info@oanduaia.ee.

Lai mūsu atbilde nenonāktu surogātpastā, lūdzu, pievienojiet info@oanduaia.ee savām kontaktpersonām. Ja vēlaties ko piebilst, vienkārši atbildiet uz šo e-pastu.

Ar cieņu
${SIGN}`,
  },
}

export function receiptLetter(name: string, lang?: string): { subject: string; text: string } {
  const copy = COPY[lang ?? ''] ?? COPY.en
  // A name is all of the guest's input that goes back out, and only a short, single-line one.
  const n = name.replace(/[\r\n<>]+/g, ' ').replace(/https?:\/\/\S+/gi, '').trim().slice(0, 60)
  return { subject: copy.subject, text: copy.body(n) }
}
