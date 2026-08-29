import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Trail from '@/components/Trail'
import Booking from '@/components/Booking'
import Footer from '@/components/Footer'
import ScrollRevealInit from '@/components/ScrollReveal'
import { LOCALES, SITE, alternates, isLocale, trailJsonLd, trailBreadcrumb, trailMeta } from '@/lib/i18n'
import { TRAILS } from '@/lib/trails'

export function generateStaticParams() {
  return LOCALES.flatMap(lang => TRAILS.map(t => ({ lang, slug: t.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang)) return {}
  const m = trailMeta(lang, slug)
  if (!m) return {}
  const trail = TRAILS.find(t => t.slug === slug)!

  return {
    metadataBase: new URL(SITE),
    title: m.title,
    description: m.description,
    alternates: alternates(lang, `/rajad/${slug}`),
    openGraph: {
      type: 'article',
      siteName: 'Oanduaia',
      title: m.title,
      description: m.description,
      url: `${SITE}/${lang}/rajad/${slug}`,
      images: [{ url: trail.photo, alt: trail.photoAlt[lang] }],
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description },
    robots: { index: true, follow: true },
  }
}

export default async function TrailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!isLocale(lang) || !TRAILS.some(t => t.slug === slug)) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([trailJsonLd(lang, slug), trailBreadcrumb(lang, slug)]),
        }}
      />
      <ScrollRevealInit />
      <Nav />
      <Trail slug={slug} />
      <Booking />
      <Footer />
    </>
  )
}
