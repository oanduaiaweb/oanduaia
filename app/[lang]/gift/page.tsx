import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import GiftClient from '@/components/GiftClient'
import { LOCALES, SITE, alternates, isLocale, META } from '@/lib/i18n'
import { G } from '@/lib/gift'

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const title = `${G.name[lang]} – Oanduaia`
  const description = G.teaser[lang]
  return {
    title,
    description,
    alternates: alternates(lang, '/gift'),
    openGraph: {
      type: 'website',
      siteName: 'Oanduaia',
      locale: META[lang].ogLocale,
      title,
      description,
      url: `${SITE}/${lang}/gift`,
      images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: 'Oanduaia' }],
    },
  }
}

export default async function GiftPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  return (
    <>
      <Nav />
      <main id="main">
        <GiftClient />
      </main>
      <Footer />
    </>
  )
}
