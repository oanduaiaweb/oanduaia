import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import House from '@/components/House'
import Availability from '@/components/Availability'
import Booking from '@/components/Booking'
import Footer from '@/components/Footer'
import ScrollRevealInit from '@/components/ScrollReveal'
import { LOCALES, SITE, alternates, houseJsonLd, houseMeta, isLocale } from '@/lib/i18n'
import { HOUSE_SLUGS, type HouseSlug } from '@/lib/availability'
import { HOUSE_IMAGES } from '@/lib/houses'

export function generateStaticParams() {
  return LOCALES.flatMap(lang => HOUSE_SLUGS.map(slug => ({ lang, slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang)) return {}
  const m = houseMeta(lang, slug)
  if (!m) return {}
  const img = HOUSE_IMAGES[slug]

  return {
    metadataBase: new URL(SITE),
    title: m.title,
    description: m.description,
    alternates: alternates(lang, `/majad/${slug}`),
    openGraph: {
      type: 'website',
      siteName: 'Oanduaia',
      title: m.title,
      description: m.description,
      url: `${SITE}/${lang}/majad/${slug}`,
      images: img ? [{ url: img.src, alt: img.alt[lang] }] : undefined,
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description },
    robots: { index: true, follow: true },
  }
}

export default async function HousePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!isLocale(lang) || !(HOUSE_SLUGS as readonly string[]).includes(slug)) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(houseJsonLd(lang, slug)) }}
      />
      <ScrollRevealInit />
      <Nav />
      <House slug={slug} />
      {/* The guest arrived asking about this house, so its calendar opens on it. */}
      <Availability initialHouse={slug as HouseSlug} />
      <Booking />
      <Footer />
    </>
  )
}
