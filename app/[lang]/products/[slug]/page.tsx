import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProductClient from '@/components/ProductClient'
import { isLocale } from '@/lib/i18n'
import { productBySlug } from '@/lib/products'
import { liveProducts } from '@/lib/productStore'

export const dynamic = 'force-dynamic'

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
  if (!isLocale(lang)) notFound()
  const product = (await liveProducts()).find(p => p.slug === slug && !p.hidden)
  if (!product) notFound()
  return (
    <>
      <Nav />
      <main id="main">
        <ProductClient product={product} />
      </main>
      <Footer />
    </>
  )
}
