'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { HOUSE_IMAGES } from '@/lib/houses'

/**
 * One house, on its own page. The three houses are what is actually sold, and until now
 * they lived only as bands on the homepage with nowhere of their own to rank.
 *
 * Every fact here already exists in `translations.ts` — this page re-presents published
 * copy rather than introducing new claims about the houses.
 */
export default function House({ slug }: { slug: string }) {
  const { lang } = useLanguage()
  const t = T.housePage
  const f = T.feature
  const house = f.houses.find(h => h.slug === slug)
  if (!house) return null

  const img = HOUSE_IMAGES[slug]
  const others = f.houses.filter(h => h.slug !== slug)

  return (
    <article className="house-page">
      <header className="house-hero">
        {img && (
          <Image
            src={img.src}
            alt={img.alt[lang]}
            fill
            priority
            sizes="100vw"
            quality={80}
            style={{ objectFit: 'cover', objectPosition: img.focus ?? 'center' }}
          />
        )}
        <div className="house-hero-scrim" aria-hidden="true" />
        <div className="house-hero-text">
          <p className="house-hero-eyebrow">{t.eyebrow[lang]}</p>
          <h1 className="house-hero-name">{house.name[lang]}</h1>
        </div>
      </header>

      <div className="house-body">
        <div className="house-main">
          <p className="house-facts-label">{t.facts[lang]}</p>
          <ul className="house-facts">
            {house.items.map(item => (
              <li key={item.et}>{item[lang].replace(/ · /g, ', ')}</li>
            ))}
          </ul>
          <Link href={`/${lang}/gallery#${slug}`} className="house-gallery-link">
            {f.galleryLink[lang]}
          </Link>
        </div>

        <aside className="house-rates">
          <p className="hp-label">{f.priceLabel[lang]}</p>
          <dl className="hp-list">
            {house.prices.map(p => (
              <div className="hp-row" key={p.guests.et}>
                <dt>{p.guests[lang]}</dt>
                <dd>
                  {`${p.eur} €`}
                  <span className="hp-unit">{` / ${f.priceUnit[lang]}`}</span>
                </dd>
              </div>
            ))}
          </dl>
          {house.priceExtra && <p className="hp-extra">{house.priceExtra[lang]}</p>}
          <p className="hp-note">{f.priceNote[lang]}</p>
        </aside>
      </div>

      <nav className="house-others" aria-label={t.otherH[lang]}>
        <p className="house-others-label">{t.otherH[lang]}</p>
        <div className="house-others-links">
          {others.map(o => (
            <Link key={o.slug} href={`/${lang}/majad/${o.slug}`} className="house-others-link">
              <span className="house-others-name">{o.name[lang]}</span>
            </Link>
          ))}
        </div>
        <Link href={`/${lang}#majad`} className="house-back">{t.back[lang]}</Link>
      </nav>
    </article>
  )
}
