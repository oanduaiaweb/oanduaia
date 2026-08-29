import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import LandingPage from '@/components/LandingPage'
import Booking from '@/components/Booking'
import Footer from '@/components/Footer'
import ScrollRevealInit from '@/components/ScrollReveal'
import { LOCALES, SITE, HREFLANG, DEFAULT_LOCALE, isLocale, landingJsonLd, landingFaqJsonLd } from '@/lib/i18n'
import { LANDINGS } from '@/lib/landing'
import type { Lang } from '@/lib/translations'

/*
 * Only the landing slugs. `dynamicParams = false` means anything else 404s rather than
 * being rendered on demand — and the static segments (`gallery`, `majad`, `rajad`) win
 * over this dynamic one, so they are untouched.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return LOCALES.flatMap(lang => LANDINGS.map(l => ({ lang, slug: l.slug[lang] })))
}

function find(lang: Lang, slug: string) {
  return LANDINGS.find(l => l.slug[lang] === slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang)) return {}
  const l = find(lang, slug)
  if (!l) return {}

  // Each language has its own slug, so the alternates cannot be built from one suffix.
  const languages: Record<string, string> = {}
  for (const x of LOCALES) languages[HREFLANG[x]] = `${SITE}/${x}/${l.slug[x]}`
  languages['x-default'] = `${SITE}/${DEFAULT_LOCALE}/${l.slug[DEFAULT_LOCALE]}`

  return {
    metadataBase: new URL(SITE),
    title: l.title[lang],
    description: l.description[lang],
    alternates: { canonical: `${SITE}/${lang}/${slug}`, languages },
    openGraph: {
      type: 'article',
      siteName: 'Oanduaia',
      title: l.title[lang],
      description: l.description[lang],
      url: `${SITE}/${lang}/${slug}`,
      images: [{ url: l.photo, alt: l.photoAlt[lang] }],
    },
    twitter: { card: 'summary_large_image', title: l.title[lang], description: l.description[lang] },
    robots: { index: true, follow: true },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const l = find(lang, slug)
  if (!l) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([landingJsonLd(lang, l.id), landingFaqJsonLd(lang, l.id)]),
        }}
      />
      <ScrollRevealInit />
      <Nav />
      <LandingPage id={l.id} />
      <Booking />
      <Footer />
    </>
  )
}
