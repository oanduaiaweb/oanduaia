import type { Lang } from './translations'
import { SOCIAL } from './social'

/**
 * Where the reviews actually live.
 *
 * Oanduaia is reviewed in three places and had been showing one hand-picked quote from
 * one of them. These are the real scores, read off each listing — Booking.com runs the
 * two houses as separate properties, so they carry separate scores and separate review
 * counts. Update them here when they move; nothing else needs touching.
 *
 * Deliberately NOT marked up as `aggregateRating` in the structured data. Marking up
 * someone else's review score as your own is exactly the sort of thing Google penalises.
 */
export type ReviewSource = {
  id: string
  channel: string
  /** Which house, where a channel splits them. Omitted for whole-property listings. */
  place?: string
  /** A number, not a string, so each language prints its own decimal mark. */
  score: number
  outOf: number
  count: number
  url: string
}

export const REVIEW_SOURCES: ReviewSource[] = [
  {
    id: 'booking-saunamaja',
    channel: 'Booking.com',
    place: 'Saunamaja',
    score: 9.7,
    outOf: 10,
    count: 27,
    url: SOCIAL.booking,
  },
  {
    id: 'booking-metsamaja',
    channel: 'Booking.com',
    place: 'Metsamaja',
    score: 9.6,
    outOf: 10,
    count: 31,
    url: 'https://www.booking.com/hotel/ee/metsamaja.html',
  },
  {
    id: 'google',
    channel: 'Google',
    score: 5,
    outOf: 5,
    count: 32,
    url: SOCIAL.mapsPlace,
  },
]

/**
 * Where "write a review" goes — now the real one-tap composer.
 *
 * This was the last knowingly-broken thing on the site. It pointed at the Maps listing,
 * from which leaving a review took several taps, because the proper short link can only
 * be issued from the business profile and the profile was unclaimed. It was claimed on
 * 1 September and the link is now in place.
 *
 * Do NOT swap this back to search.google.com/local/writereview?placeid=… — that URL
 * 404s for this listing while returning 200 to curl, which is how it passed a check once
 * before. See the note beside SOCIAL.mapsReview.
 */
export const WRITE_REVIEW_URL = SOCIAL.mapsReview

/** Estonian, Russian and German write 9,7; English writes 9.7. */
export function formatScore(score: number, lang: Lang): string {
  const locale = lang === 'en' ? 'en-GB' : lang
  return score.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}

/** Estonian keeps one partitive form; German has two; Russian needs three. */
export function reviewCount(n: number, lang: Lang): string {
  if (lang === 'et') return `${n} arvustust`
  if (lang === 'en') return `${n} ${n === 1 ? 'review' : 'reviews'}`
  if (lang === 'de') return `${n} ${n === 1 ? 'Bewertung' : 'Bewertungen'}`
  const mod10 = n % 10
  const mod100 = n % 100
  const word =
    mod10 === 1 && mod100 !== 11 ? 'отзыв'
    : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? 'отзыва'
    : 'отзывов'
  return `${n} ${word}`
}

/**
 * Guest reviews, quoted from the Google listing.
 *
 * Quoted rather than pulled live from the Places API, deliberately. Google forbids caching
 * Places content — reviews have to be fetched on every single page view — which would turn
 * four prerendered locales into a paid API call per visit and cost us the static site.
 * Quoting with attribution is permitted, free, and lands the words in the HTML where search
 * and the assistants can actually read them.
 *
 * RULES, and they are not negotiable:
 * - `et` is the guest's own words, verbatim. Never tidied, never shortened mid-sentence.
 * - The other languages are marked as translations on the page, the way Google marks its own.
 * - Only reviews written natively in Estonian are quoted. Google machine-translates the
 *   English and Russian ones in its UI, and quoting a machine translation as if it were what
 *   somebody wrote is putting words in their mouth.
 * - Nothing here is marked up as `aggregateRating`. Same rule as the scores above.
 */
export type ReviewQuote = {
  id: string
  author: string
  /** As Google shows it, so the age of the review is never hidden. */
  when: Record<Lang, string>
  /**
   * The language the guest actually wrote in. That entry is verbatim; every other language
   * is a translation and is labelled as one on the page. It is not always Estonian — the
   * most recent review here was written in English.
   */
  originalLang: Lang
  text: Record<Lang, string>
}

export const REVIEW_QUOTES: ReviewQuote[] = [
  {
    /*
     * Quoted exactly as written, "bookes" included. It is a guest's own sentence, not our
     * copy, and correcting someone's spelling inside quotation marks is still editing them.
     */
    id: 'rainis',
    author: 'Rainis Venta',
    originalLang: 'en',
    when: { et: 'kuu tagasi', en: 'a month ago', ru: 'месяц назад', de: 'vor einem Monat' },
    text: {
      en: 'Amazing place! Third time here, and again amazed! This time bookes the Forest House (Metsamaja). The evening warmth, the morning mist, the supercool atmosphere inside the cottage. That is just amazing. Wish I could live like that!',
      et: 'Hämmastav koht! Kolmandat korda siin ja jälle hämmastunud! Seekord broneerisin Metsamaja. Õhtune soojus, hommikune udu, ülilahe õhkkond majas. See on lihtsalt hämmastav. Soovin, et saaksin nii elada!',
      ru: 'Потрясающее место! Третий раз здесь и снова в восторге! На этот раз забронировал Лесной дом (Metsamaja). Вечернее тепло, утренний туман, потрясающая атмосфера внутри дома. Это просто потрясающе. Хотел бы я так жить!',
      de: 'Fantastischer Ort! Zum dritten Mal hier und wieder begeistert! Diesmal das Waldhaus (Metsamaja) gebucht. Die Wärme am Abend, der Nebel am Morgen, die großartige Atmosphäre im Haus. Das ist einfach fantastisch. Ich wünschte, ich könnte so leben!',
    },
  },
  {
    id: 'janek',
    originalLang: 'et',
    author: 'Janek Hamidzanov',
    when: { et: 'aasta tagasi', en: 'a year ago', ru: 'год назад', de: 'vor einem Jahr' },
    text: {
      et: 'Peale lahke pererahva on ka koht suurepärane. Vaikne, maalähedane ja maitsekalt sisustatud puhkemajad. Ühesõnaga kui vajad linnakärast puhkust on just see koht, mida külastada. Piirkonnas on vaatamisväärsusi ja terviseradu.',
      en: 'Besides the kind hosts, the place itself is wonderful. Quiet, rural and tastefully furnished houses. In a word, if you need a rest from the noise of the city, this is the place to visit. There are sights and trails in the area.',
      ru: 'Помимо приветливых хозяев, и само место прекрасное. Тихие, деревенские и со вкусом обставленные дома. Одним словом, если нужен отдых от городского шума — это то самое место. В округе есть достопримечательности и тропы.',
      de: 'Neben den freundlichen Gastgebern ist auch der Ort selbst großartig. Ruhige, ländliche und geschmackvoll eingerichtete Häuser. Kurz gesagt: Wer Ruhe vom Lärm der Stadt braucht, sollte genau hierher kommen. In der Umgebung gibt es Sehenswürdigkeiten und Wanderwege.',
    },
  },
  {
    id: 'heti-helen',
    originalLang: 'et',
    author: 'Heti-Helen Rohtla',
    when: { et: '2 aastat tagasi', en: '2 years ago', ru: '2 года назад', de: 'vor 2 Jahren' },
    text: {
      et: 'Ideaalne koht, kus võtta aeg maha ja lihtsalt olla. Toidud on maitsvad, hoolega tehtud ja imeilusti serveeritud!',
      en: 'An ideal place to slow down and simply be. The food is delicious, made with care and beautifully served!',
      ru: 'Идеальное место, чтобы сбавить темп и просто быть. Еда вкусная, приготовлена с заботой и красиво подана!',
      de: 'Ein idealer Ort, um herunterzukommen und einfach zu sein. Das Essen ist köstlich, mit Sorgfalt zubereitet und wunderschön angerichtet!',
    },
  },
  {
    /*
     * The closing paragraph only, quoted whole. Her first paragraph states the property
     * "comfortably fits up to 35 people + children, and 12-16 can stay the night" — and our
     * own pages say ten adults, settled 29 Aug 2026. Publishing both would put two different
     * capacities on the same website, and a review cannot be edited to fix that. So the
     * paragraph about service is quoted in full and the reader is linked to the original.
     * Excerpting a whole paragraph is fair; rewriting one is not.
     */
    id: 'aleksandra',
    author: 'Aleksandra Kryzhanovskaya',
    originalLang: 'ru',
    when: { et: '3 aastat tagasi', en: '3 years ago', ru: '3 года назад', de: 'vor 3 Jahren' },
    text: {
      ru: 'В Эстонии мало мест, где обслуживание такое теплое и трепетное, видно, что люди делают свою работу от всего сердца. Спасибо большое, это самый лучший отдых для души!',
      et: 'Eestis on vähe kohti, kus teenindus on nii soe ja hoolik – on näha, et inimesed teevad oma tööd kogu südamest. Suur aitäh, see on hingele parim puhkus!',
      en: 'There are few places in Estonia where the service is this warm and attentive — you can see that these people do their work with all their heart. Thank you so much, this is the best rest there is for the soul!',
      de: 'In Estland gibt es nur wenige Orte, an denen der Service so herzlich und aufmerksam ist – man sieht, dass diese Menschen ihre Arbeit mit ganzem Herzen tun. Vielen Dank, das ist die beste Erholung für die Seele!',
    },
  },
  {
    /*
     * Kept for the second sentence. It is the only review that names a use nobody else
     * mentions — work gatherings — and a quiet house that seats a group off-season is
     * worth saying out loud. Spacing normalised (the original has spaces before commas);
     * not a word is changed.
     */
    id: 'ero',
    author: 'Ero Kukk',
    originalLang: 'et',
    when: { et: '3 aastat tagasi', en: '3 years ago', ru: '3 года назад', de: 'vor 3 Jahren' },
    text: {
      et: 'Super rahul, väga vaikne, ilus, rahulik koht. Perenaine väga külalislahke. Sobib nii tööalasteks kokkusaamisteks kui ka lihtsalt linnajamast puhkamiseks.',
      en: 'Very happy — a very quiet, beautiful, peaceful place. The hostess is very welcoming. It suits work gatherings just as well as simply resting away from the city.',
      ru: 'Очень доволен — очень тихое, красивое, спокойное место. Хозяйка очень гостеприимна. Подходит и для рабочих встреч, и просто для отдыха от городской суеты.',
      de: 'Sehr zufrieden — ein sehr ruhiger, schöner, friedlicher Ort. Die Gastgeberin ist überaus gastfreundlich. Geeignet für Arbeitstreffen ebenso wie zum Ausruhen fern der Stadt.',
    },
  },
  {
    id: 'julia',
    originalLang: 'et',
    author: 'Julia Kudrjavtseva',
    when: { et: '6 aastat tagasi', en: '6 years ago', ru: '6 лет назад', de: 'vor 6 Jahren' },
    text: {
      et: 'Parimat kohta pole olemas. Saunaga maja on meie pere lemmik. Hubane, puhas. Maitsev ja nii ilusasti serveeritud hommikusöök. Südamest soovitan!',
      en: 'There is no better place. The house with the sauna is our family favourite. Cosy, clean. Delicious and so beautifully served breakfast. I recommend it wholeheartedly!',
      ru: 'Лучшего места нет. Дом с баней — любимец нашей семьи. Уютно, чисто. Вкусный и так красиво поданный завтрак. Рекомендую от всего сердца!',
      de: 'Einen besseren Ort gibt es nicht. Das Haus mit der Sauna ist der Liebling unserer Familie. Gemütlich, sauber. Köstliches und so schön angerichtetes Frühstück. Ich empfehle es von Herzen!',
    },
  },
]

/**
 * "Translated from X", the way Google labels its own translations.
 *
 * Keyed both ways rather than written as a ternary, because the original language is not
 * always Estonian and a fallback branch would quietly mislabel the one review that is not.
 */
const LANGUAGE_NAME: Record<Lang, Record<Lang, string>> = {
  et: { et: 'eesti keelest', en: 'Estonian', ru: 'эстонского', de: 'dem Estnischen' },
  en: { et: 'inglise keelest', en: 'English', ru: 'английского', de: 'dem Englischen' },
  ru: { et: 'vene keelest', en: 'Russian', ru: 'русского', de: 'dem Russischen' },
  de: { et: 'saksa keelest', en: 'German', ru: 'немецкого', de: 'dem Deutschen' },
}

const TRANSLATED_TEMPLATE: Record<Lang, (name: string) => string> = {
  et: n => `Tõlgitud ${n}`,
  en: n => `Translated from ${n}`,
  ru: n => `Перевод с ${n}`,
  de: n => `Aus ${n} übersetzt`,
}

/** Empty when the reader is seeing the guest's own words. */
export function translatedNote(original: Lang, display: Lang): string {
  if (original === display) return ''
  return TRANSLATED_TEMPLATE[display](LANGUAGE_NAME[original][display])
}
