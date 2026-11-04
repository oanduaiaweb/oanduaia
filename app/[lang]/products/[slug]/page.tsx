import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProductClient from '@/components/ProductClient'
import { LOCALES, isLocale } from '@/lib/i18n'
import { PRODUCTS, productBySlug } from '@/lib/products'

export function generateStaticParams() {
  return LOCALES.flatMap(lang => PRODUCTS.map(p => ({ lang, slug: p.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const p = productBySlug(slug)
  if (!isLocale(lang) || !p) return {}
  return {
    title: `${p.name[lang]} – Oanduaia`,
    description: p.tagline[lang],
    robots: { index: false, follow: false },
    openGraph: { title: p.name[lang], description: p.tagline[lang], images: [{ url: p.photos[0].src }] },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!isLocale(lang) || !productBySlug(slug)) notFound()
  return (
    <>
      <Nav />
      <main id="main">
        <ProductClient slug={slug} />
      </main>
      <Footer />
    </>
  )
}
