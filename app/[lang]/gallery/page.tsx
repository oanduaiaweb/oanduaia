import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GalleryClient from '@/components/GalleryClient'
import { LOCALES, GALLERY_META, SITE, alternates, isLocale, META } from '@/lib/i18n'

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const m = GALLERY_META[lang]

  return {
    title: m.title,
    description: m.description,
    alternates: alternates(lang, '/gallery'),
    openGraph: {
      type: 'website',
      siteName: 'Oanduaia',
      locale: META[lang].ogLocale,
      alternateLocale: LOCALES.filter(l => l !== lang).map(l => META[l].ogLocale),
      title: m.title,
      description: m.description,
      url: `${SITE}/${lang}/gallery`,
      images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: 'Oanduaia' }],
    },
  }
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  return <GalleryClient />
}
