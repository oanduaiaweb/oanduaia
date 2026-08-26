import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GalleryClient from '@/components/GalleryClient'
import { LOCALES, GALLERY_META, SITE, alternates, isLocale } from '@/lib/i18n'

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
      title: m.title,
      description: m.description,
      url: `${SITE}/${lang}/gallery`,
      images: [{ url: '/images/tiik.jpg', width: 1200, height: 630, alt: 'Oanduaia' }],
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
