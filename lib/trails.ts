import type { Lang } from './translations'

export type TrailLink = {
  href: string
  label: Record<Lang, string>
  /** Shown beside the label. Say the format and the weight before someone taps it. */
  meta: string
}

/**
 * External resources for a trail, keyed by its Estonian name — the same stable key the
 * trail list is already rendered with.
 *
 * Kept out of translations.ts on purpose: adding an optional field to one item of that
 * array would make TypeScript infer a union, and every other item would then need the
 * field spelled out as undefined to be readable.
 *
 * The RMK URL is stored without the `?utm_source=chatgpt.com` it arrived with. That
 * parameter says where the person who found it was standing, not where the file is.
 */
export const TRAIL_LINKS: Record<string, TrailLink> = {
  'Oandu-Ikla matkatee': {
    href: 'https://rmk.ee/wp-content/uploads/2024/10/oanduIklaKaardivihik_20.05.pdf',
    label: {
      et: 'RMK kaardivihik',
      en: 'RMK map booklet',
      ru: 'Карты RMK',
    },
    meta: 'PDF · 0,9 MB',
  },
}
