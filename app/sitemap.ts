import type { MetadataRoute } from 'next'
import { LOCALES, SITE, HREFLANG, DEFAULT_LOCALE } from '@/lib/i18n'

const PAGES = ['', '/gallery']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const suffix of PAGES) {
    const languages: Record<string, string> = {}
    for (const l of LOCALES) languages[HREFLANG[l]] = `${SITE}/${l}${suffix}`
    languages['x-default'] = `${SITE}/${DEFAULT_LOCALE}${suffix}`

    for (const lang of LOCALES) {
      entries.push({
        url: `${SITE}/${lang}${suffix}`,
        lastModified: new Date(),
        changeFrequency: suffix === '' ? 'monthly' : 'yearly',
        priority: suffix === '' ? 1 : 0.8,
        alternates: { languages },
      })
    }
  }

  return entries
}
