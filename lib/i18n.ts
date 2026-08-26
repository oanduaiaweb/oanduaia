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
