import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { isLocale } from '@/lib/i18n'
import { PT, eur } from '@/lib/products'
import { liveProducts } from '@/lib/productStore'

// Prices and visibility are edited in /admin, so every request reads them fresh.
export const dynamic = 'force-dynamic'

// Not launched: kept out of search until Mikk says go (also absent from the sitemap and the nav).
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return { title: `${PT.title[lang]} – Oanduaia`, description: PT.lead[lang], robots: { index: false, follow: false } }
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const products = (await liveProducts()).filter(p => !p.hidden)
  return (
    <>
      <Nav />
      <main id="main" className="products">
        <header className="products-head">
          <p className="section-label">{PT.label[lang]}</p>
          <h1 className="product-title">{PT.title[lang]}</h1>
          <p className="product-tagline">{PT.lead[lang]}</p>
        </header>
        <ul className="products-grid">
          {products.map(p => (
            <li key={p.slug}>
              <a className="products-card" href={`/${lang}/products/${p.slug}`}>
                <span className="products-card-img">
                  <Image src={p.photos[0].src} alt={p.photos[0].alt[lang]} fill sizes="(max-width: 700px) 100vw, 33vw"
                    quality={70} style={{ objectFit: 'cover' }} />
                </span>
                <span className="products-card-name">{p.name[lang]}</span>
                <span className="products-card-price">{PT.from[lang]} {eur(p.price)}</span>
                <span className="products-card-more">{PT.view[lang]} →</span>
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  )
}
