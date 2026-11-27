/**
 * The Christmas greeting sent from /admin to past guests and people who wrote to us.
 *
 * Plain text and no links, for the same reason as the enquiry receipt: a greeting that lands in
 * spam does more harm than none. Two versions per language — thanks for staying, or thanks for
 * writing — so nobody is thanked for a visit they never made.
 */

type Copy = { subject: string; hello: (n: string) => string; stayed: string; wrote: string; body: string; bye: string }

const SIGN = (lang: string) => `${lang === 'et' ? 'Toomas ja Aigi' : 'Toomas & Aigi'}
Oanduaia
+372 520 2044 · www.oanduaia.ee`

const COPY: Record<string, Copy> = {
  et: {
    subject: 'Häid jõule Oanduaiast',
    hello: n => (n ? `Tere, ${n}!` : 'Tere!'),
    stayed: 'Aitäh, et olite sel aastal meie külaline.',
    wrote: 'Aitäh, et sel aastal meiega ühendust võtsite.',
    body: 'Lahemaa metsas on praegu vaikne, saun on soe ja mõtleme kõigile, kes on meil käinud. Soovime teile rahulikke jõule ja head uut aastat!',
    bye: 'Ootame teid alati tagasi.\n\nSoojade soovidega',
  },
  en: {
    subject: 'Merry Christmas from Oanduaia',
    hello: n => (n ? `Hello ${n},` : 'Hello,'),
    stayed: 'Thank you for being our guest this year.',
    wrote: 'Thank you for getting in touch with us this year.',
    body: 'The forest in Lahemaa is quiet now, the sauna is warm, and we are thinking of everyone who has found their way to us. We wish you a peaceful Christmas and a happy New Year!',
    bye: 'You are always welcome back.\n\nWarm wishes,',
  },
  de: {
    subject: 'Frohe Weihnachten aus Oanduaia',
    hello: n => (n ? `Hallo ${n},` : 'Hallo,'),
    stayed: 'vielen Dank, dass Sie in diesem Jahr unser Gast waren.',
    wrote: 'vielen Dank, dass Sie sich in diesem Jahr bei uns gemeldet haben.',
    body: 'Im Wald von Lahemaa ist es jetzt still, die Sauna ist warm, und wir denken an alle, die zu uns gefunden haben. Wir wünschen Ihnen ein friedliches Weihnachtsfest und ein gutes neues Jahr!',
    bye: 'Sie sind jederzeit wieder herzlich willkommen.\n\nHerzliche Grüße',
  },
  ru: {
    subject: 'С Рождеством от Oanduaia',
    hello: n => (n ? `Здравствуйте, ${n}!` : 'Здравствуйте!'),
    stayed: 'Спасибо, что были нашим гостем в этом году.',
    wrote: 'Спасибо, что связались с нами в этом году.',
    body: 'В лесу Лахемаа сейчас тихо, баня натоплена, и мы вспоминаем всех, кто к нам приезжал. Желаем вам спокойного Рождества и счастливого Нового года!',
    bye: 'Будем рады видеть вас снова.\n\nС тёплыми пожеланиями,',
  },
  fi: {
    subject: 'Hyvää joulua Oanduaiasta',
    hello: n => (n ? `Hei ${n},` : 'Hei,'),
    stayed: 'kiitos, että olit tänä vuonna vieraanamme.',
    wrote: 'kiitos, että otit meihin tänä vuonna yhteyttä.',
    body: 'Lahemaan metsässä on nyt hiljaista, sauna on lämmin ja ajattelemme kaikkia, jotka ovat löytäneet luoksemme. Toivotamme rauhallista joulua ja onnellista uutta vuotta!',
    bye: 'Olet aina tervetullut takaisin.\n\nLämpimin terveisin',
  },
  lv: {
    subject: 'Priecīgus Ziemassvētkus no Oanduaia',
    hello: n => (n ? `Labdien, ${n}!` : 'Labdien!'),
    stayed: 'Paldies, ka šogad bijāt mūsu viesis.',
    wrote: 'Paldies, ka šogad sazinājāties ar mums.',
    body: 'Lahemā mežā tagad ir kluss, pirts ir silta, un mēs domājam par visiem, kas pie mums ir ciemojušies. Novēlam mierīgus Ziemassvētkus un laimīgu Jauno gadu!',
    bye: 'Vienmēr gaidīsim jūs atpakaļ.\n\nAr siltiem sveicieniem',
  },
  sv: {
    subject: 'God jul från Oanduaia',
    hello: n => (n ? `Hej ${n},` : 'Hej,'),
    stayed: 'tack för att du var vår gäst i år.',
    wrote: 'tack för att du hörde av dig till oss i år.',
    body: 'I skogen i Lahemaa är det stilla nu, bastun är varm och vi tänker på alla som har hittat hit. Vi önskar dig en fridfull jul och ett gott nytt år!',
    bye: 'Du är alltid välkommen tillbaka.\n\nVarma hälsningar',
  },
  es: {
    subject: 'Feliz Navidad desde Oanduaia',
    hello: n => (n ? `Hola, ${n}:` : 'Hola:'),
    stayed: 'Gracias por alojarte con nosotros este año.',
    wrote: 'Gracias por ponerte en contacto con nosotros este año.',
    body: 'En el bosque de Lahemaa reina ahora la calma, la sauna está caliente y pensamos en todos los que han llegado hasta nosotros. ¡Te deseamos una Navidad tranquila y un feliz Año Nuevo!',
    bye: 'Aquí siempre tendrás las puertas abiertas.\n\nUn cordial saludo,',
  },
  fr: {
    subject: 'Joyeux Noël de la part d’Oanduaia',
    hello: n => (n ? `Bonjour ${n},` : 'Bonjour,'),
    stayed: 'Merci d’avoir été notre hôte cette année.',
    wrote: 'Merci de nous avoir contactés cette année.',
    body: 'Dans la forêt de Lahemaa, tout est calme, le sauna est chaud et nous pensons à tous ceux qui sont venus jusqu’à nous. Nous vous souhaitons un Noël paisible et une très bonne année !',
    bye: 'Vous serez toujours le bienvenu.\n\nChaleureusement,',
  },
}

export const CHRISTMAS_LANGS = Object.keys(COPY)

/** First name only — "Hello Justin", not "Hello Justin Hüsges". */
const firstName = (name: string) => (name.includes('@') ? '' : name.trim().split(/\s+/)[0] ?? '')

export function christmasLetter(name: string, lang: string | undefined, stayed: boolean): { subject: string; text: string } {
  const l = lang && COPY[lang] ? lang : 'en'
  const c = COPY[l]
  const text = [c.hello(firstName(name)), '', `${stayed ? c.stayed : c.wrote} ${c.body}`, '', c.bye, SIGN(l)].join('\n')
  return { subject: c.subject, text }
}
