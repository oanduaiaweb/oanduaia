import type { Lang } from './translations'

export const LOCALES: Lang[] = ['et', 'en', 'ru']
export const DEFAULT_LOCALE: Lang = 'et'

export const SITE = 'https://oanduaia.ee'

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
    petsAllowed: false,
    amenityFeature: amenities[lang].map(name => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
    containsPlace: houses[lang].map(name => ({ '@type': 'Accommodation', name })),
    sameAs: [
      'https://www.instagram.com/oanduaia/',
      'https://www.booking.com/hotel/ee/oanduaia-saunamaja.html',
    ],
    inLanguage: LOCALES.map(l => HREFLANG[l]),
  }
}
