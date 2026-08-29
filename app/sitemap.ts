import type { MetadataRoute } from 'next'
import { LOCALES, SITE, HREFLANG, DEFAULT_LOCALE } from '@/lib/i18n'
import { ALL_PHOTOS } from '@/lib/gallery'
import { HERO_SLIDES } from '@/lib/hero'
import { HOUSE_SLUGS } from '@/lib/availability'
import { HOUSE_IMAGES } from '@/lib/houses'
import { HOUSE_GALLERIES } from '@/lib/housePhotos'
import { TRAILS } from '@/lib/trails'
import { LANDINGS } from '@/lib/landing'

const PAGES = ['', '/gallery']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const suffix of PAGES) {
    const languages: Record<string, string> = {}
    for (const l of LOCALES) languages[HREFLANG[l]] = `${SITE}/${l}${suffix}`
    languages['x-default'] = `${SITE}/${DEFAULT_LOCALE}${suffix}`

    for (const lang of LOCALES) {
      // Declaring the images lets them be indexed by image search, which matters
      // when the photographs are the product.
      const images =
        suffix === '/gallery'
          ? ALL_PHOTOS.map(p => `${SITE}${p.src}`)
          : HERO_SLIDES.map(h => `${SITE}${h.src}`)

      entries.push({
        url: `${SITE}/${lang}${suffix}`,
        lastModified: new Date(),
        changeFrequency: suffix === '' ? 'monthly' : 'yearly',
        priority: suffix === '' ? 1 : 0.8,
        alternates: { languages },
        images,
      })
    }
  }

  // One page per house per locale. The houses are the sellable product, so they rank
  // just under the homepage and above the gallery.
  for (const slug of HOUSE_SLUGS) {
    const suffix = `/majad/${slug}`
    const languages: Record<string, string> = {}
    for (const l of LOCALES) languages[HREFLANG[l]] = `${SITE}/${l}${suffix}`
    languages['x-default'] = `${SITE}/${DEFAULT_LOCALE}${suffix}`

    const img = HOUSE_IMAGES[slug]
    // The cover photo plus whatever hangs in that house's own gallery.
    const shots = [
      ...(img ? [`${SITE}${img.src}`] : []),
      ...(HOUSE_GALLERIES[slug] ?? []).map(p => `${SITE}${p.src}`),
    ]
    for (const lang of LOCALES) {
      entries.push({
        url: `${SITE}/${lang}${suffix}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
        alternates: { languages },
        images: shots.length ? shots : undefined,
      })
    }
  }

  /*
   * A page per trail per locale. These sit below the houses: they are what brings
   * someone in who has never heard of Oanduaia, but the houses are what is sold.
   */
  for (const t of TRAILS) {
    const suffix = `/rajad/${t.slug}`
    const languages: Record<string, string> = {}
    for (const l of LOCALES) languages[HREFLANG[l]] = `${SITE}/${l}${suffix}`
    languages['x-default'] = `${SITE}/${DEFAULT_LOCALE}${suffix}`
    for (const lang of LOCALES) {
      entries.push({
        url: `${SITE}/${lang}${suffix}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.7,
        alternates: { languages },
        images: [`${SITE}${t.photo}`],
      })
    }
  }

  /*
   * Topic landing pages. Their slug differs per language, so the alternates are built
   * from each locale's own slug rather than from one shared suffix.
   */
  for (const l of LANDINGS) {
    const languages: Record<string, string> = {}
    for (const x of LOCALES) languages[HREFLANG[x]] = `${SITE}/${x}/${l.slug[x]}`
    languages['x-default'] = `${SITE}/${DEFAULT_LOCALE}/${l.slug[DEFAULT_LOCALE]}`
    for (const lang of LOCALES) {
      entries.push({
        url: `${SITE}/${lang}/${l.slug[lang]}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.85,
        alternates: { languages },
        images: [`${SITE}${l.photo}`],
      })
    }
  }

  return entries
}
