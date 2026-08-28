import { T, type Lang } from './translations'
import { HOUSE_IMAGES } from './houses'

export const LOCALES: Lang[] = ['et', 'en', 'ru']
export const DEFAULT_LOCALE: Lang = 'et'

export const SITE = 'https://www.oanduaia.ee'

/** BCP-47 tags used for hreflang. */
export const HREFLANG: Record<Lang, string> = {
  et: 'et-EE',
  en: 'en',
  ru: 'ru',
}

export function isLocale(v: string | undefined): v is Lang {
  return !!v && (LOCALES as string[]).includes(v)
}

/** Per-locale metadata. Kept here rather than in translations.ts so it stays SEO-shaped. */
export const META: Record<Lang, { title: string; description: string; ogLocale: string }> = {
  et: {
    title: 'Oanduaia — metsaspaa ja majutus Lahemaal',
    description:
      'Saun, majutus ja loodus Lahemaa rahvuspargi südames. Kolm maja — Saunamaja, Tiigimaja ja Metsamaja — Oandu külas, metsa ja mere vahel. Booking.com hinnang 9.6/10.',
    ogLocale: 'et_EE',
  },
  en: {
    title: 'Oanduaia — forest spa and lodging in Lahemaa, Estonia',
    description:
      'Sauna, lodging and nature in the heart of Lahemaa National Park, Estonia. Three houses — Sauna House, Pond House and Forest House — in Oandu village, between forest and sea. Rated 9.6/10 on Booking.com.',
    ogLocale: 'en_GB',
  },
  ru: {
    title: 'Oanduaia — лесной спа-отдых и проживание в Лахемаа',
    description:
      'Сауна, проживание и природа в сердце национального парка Лахемаа, Эстония. Три дома — Банный, Прудовой и Лесной — в деревне Оанду, между лесом и морем. Оценка 9.6/10 на Booking.com.',
    ogLocale: 'ru_RU',
  },
}

export const GALLERY_META: Record<Lang, { title: string; description: string }> = {
  et: {
    title: 'Galerii — Oanduaia metsaspaa Lahemaal',
    description:
      'Fotod Oanduaia majadest, saunast, tiigist ja Lahemaa loodusest igal aastaajal.',
  },
  en: {
    title: 'Gallery — Oanduaia forest spa in Lahemaa',
    description:
      'Photographs of the Oanduaia houses, sauna, pond and the surrounding Lahemaa forest through the seasons.',
  },
  ru: {
    title: 'Галерея — лесной спа Oanduaia в Лахемаа',
    description:
      'Фотографии домов Oanduaia, сауны, пруда и природы Лахемаа в разные времена года.',
  },
}

/** Builds the canonical + hreflang alternates block for a given path suffix ('' or '/gallery'). */
export function alternates(lang: Lang, suffix = '') {
  const languages: Record<string, string> = {}
  for (const l of LOCALES) languages[HREFLANG[l]] = `${SITE}/${l}${suffix}`
  languages['x-default'] = `${SITE}/${DEFAULT_LOCALE}${suffix}`
  return { canonical: `${SITE}/${lang}${suffix}`, languages }
}

/**
 * Per-house metadata and structured data for /{lang}/majad/{slug}.
 *
 * Everything is composed from copy already published on the site — the house name, its
 * tagline, its first detail line and its lowest published rate. The three houses are the
 * sellable product and until now had no page of their own to rank.
 */
export function houseMeta(lang: Lang, slug: string) {
  const h = T.feature.houses.find(x => x.slug === slug)
  if (!h) return null
  const p = T.housePage
  const from = Math.min(...h.prices.map(x => x.eur))
  return {
    title: `${h.name[lang]} — ${p.titleSuffix[lang]}`,
    /*
     * No tagline here any more. That is a gain, not a loss: "Saun, köök, seltskond — kõik
     * olemas" was occupying the front of a 155-character description with nothing anyone
     * searches for, ahead of the bed count, the capacity and the price, which are what
     * people actually type. The interpuncts become commas because this is read as a
     * sentence in a search result, not scanned as a list on a page.
     */
    description: `${h.name[lang]} — ${h.items[0][lang].replace(/ · /g, ', ')}. ${p.descFrom[lang]} ${from} ${p.descUnit[lang]}`,
  }
}

/** Accommodation markup for one house, tied back to the property by `containedInPlace`. */
export function houseJsonLd(lang: Lang, slug: string) {
  const h = T.feature.houses.find(x => x.slug === slug)
  if (!h) return null
  const img = HOUSE_IMAGES[slug]
  const from = Math.min(...h.prices.map(x => x.eur))
  const to = Math.max(...h.prices.map(x => x.eur))

  return {
    '@context': 'https://schema.org',
    '@type': 'Accommodation',
    '@id': `${SITE}/${lang}/majad/${slug}#accommodation`,
    name: h.name[lang],
    description: h.items.map(i => i[lang].replace(/ · /g, ', ')).join('. ') + '.',
    url: `${SITE}/${lang}/majad/${slug}`,
    image: img ? `${SITE}${img.src}` : undefined,
    // The priced tiers cap at 4; Saunamaja sleeps 5, which the page says in its own words.
    occupancy: {
      '@type': 'QuantitativeValue',
      value: Math.max(...h.prices.map(x => x.upTo)),
      unitText: 'guests',
    },
    numberOfBedrooms: slug === 'metsamaja' ? 2 : undefined,
    containedInPlace: { '@id': `${SITE}/#lodging` },
    amenityFeature: (lang === 'et'
      ? ['Saun', 'Tiik', 'Mets', 'Matkarajad']
      : lang === 'ru'
        ? ['Сауна', 'Пруд', 'Лес', 'Туристические тропы']
        : ['Sauna', 'Pond', 'Forest', 'Hiking trails']
    ).map(n => ({ '@type': 'LocationFeatureSpecification', name: n, value: true })),
    potentialAction: {
      '@type': 'ReserveAction',
      target: `${SITE}/${lang}/majad/${slug}#broneeri`,
    },
    priceRange: from === to ? `€${from}` : `€${from}–€${to}`,
  }
}

/**
 * LodgingBusiness structured data. Only facts verifiable from the site itself are
 * included — no invented phone number, price band or rating. Third-party review
 * scores are deliberately not marked up as aggregateRating.
 */
export function jsonLd(lang: Lang) {
  const houses: Record<Lang, string[]> = {
    et: ['Saunamaja', 'Tiigimaja', 'Metsamaja'],
    en: ['Sauna House', 'Pond House', 'Forest House'],
    ru: ['Банный дом', 'Прудовой дом', 'Лесной дом'],
  }
  const amenities: Record<Lang, string[]> = {
    et: ['Saun', 'Tiik', 'Mets', 'Matkarajad'],
    en: ['Sauna', 'Pond', 'Forest', 'Hiking trails'],
    ru: ['Сауна', 'Пруд', 'Лес', 'Туристические тропы'],
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${SITE}/#lodging`,
    name: 'Oanduaia',
    url: `${SITE}/${lang}`,
    description: META[lang].description,
    email: 'info@oanduaia.ee',
    image: [`${SITE}/images/tiik.jpg`, `${SITE}/images/saunamaja.jpg`, `${SITE}/images/metsamaja.jpg`],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Oandu',
      addressRegion: 'Lääne-Virumaa',
      addressCountry: 'EE',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 59.5601919, longitude: 26.1067858 },
    containedInPlace: {
      '@type': 'Place',
      name: lang === 'ru' ? 'Национальный парк Лахемаа' : lang === 'en' ? 'Lahemaa National Park' : 'Lahemaa rahvuspark',
    },
    numberOfRooms: 3,
    maximumAttendeeCapacity: 11,
    // Published nightly rates for the whole house: 150 € (Tiigimaja, Metsamaja 1–2)
    // to 300 € (Saunamaja 3–4). Nothing inferred beyond the numbers on the page.
    priceRange: '€150–€300',
    currenciesAccepted: 'EUR',
    checkinTime: '14:00',
    checkoutTime: '12:00',
    // Published on the booking section: pets welcome, 20 € fee. Do not assert
    // any policy here that is not stated on the page.
    petsAllowed: true,
    amenityFeature: amenities[lang].map(name => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    containsPlace: houses[lang].map((name, i) => ({
      '@type': 'Accommodation',
      name,
      // Occupancy figures are the ones stated in the site copy, nothing inferred.
      occupancy: { '@type': 'QuantitativeValue', value: [5, 2, 4][i], unitText: 'guests' },
      numberOfBedrooms: [undefined, undefined, 2][i],
      amenityFeature: amenities[lang].map(n => ({
        '@type': 'LocationFeatureSpecification', name: n, value: true,
      })),
    })),
    sameAs: [
      'https://www.instagram.com/oanduaia/',
      'https://www.booking.com/hotel/ee/oanduaia-saunamaja.html',
    ],
    inLanguage: LOCALES.map(l => HREFLANG[l]),
  }
}

/**
 * WebSite + Organization block. Tells search and AI assistants that the three locale
 * URLs are one site, and which social profiles are authoritative.
 */
export function siteJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    name: 'Oanduaia',
    url: `${SITE}/${lang}`,
    description: META[lang].description,
    inLanguage: HREFLANG[lang],
    publisher: { '@id': `${SITE}/#lodging` },
    sameAs: [
      'https://www.instagram.com/oanduaia/',
      'https://www.facebook.com/Oanduaia/',
      'https://www.booking.com/hotel/ee/oanduaia-saunamaja.html',
    ],
  }
}
