'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { scrollToId } from '@/lib/scrollToId'
import { HOUSE_IMAGES } from '@/lib/houses'
import { HOUSE_GALLERIES } from '@/lib/housePhotos'
import PhotoStrip from '@/components/PhotoStrip'
import HouseCompare from '@/components/HouseCompare'
import { HOUSE_STRIP } from '@/lib/strips'

function scrollTo(id: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToId(id)
  }
}

export default function Feature() {
  const { lang } = useLanguage()
  const t = T.feature

  return (
    <section className="feature-section" id="majad">
      <div className="feature-intro">
        <PhotoStrip photos={HOUSE_STRIP} />
        <p className="section-label">{t.label[lang]}</p>
        <h2 className="feature-heading">
          {t.h1[lang]}
          {t.h2[lang] && <><br /><em>{t.h2[lang]}</em></>}
        </h2>
      </div>

      {t.houses.map((house, i) => {
        const img = HOUSE_IMAGES[house.slug]
        return (
          <article
            key={house.slug}
            className={`house-band${i % 2 === 1 ? ' house-band--reversed' : ''}`}
          >
            <div className="house-band-image">
              {img && (
                <Image
                  src={img.src}
                  alt={img.alt[lang]}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  quality={75}
                  style={{ objectFit: 'cover', objectPosition: img.focus ?? 'center' }}
                />
              )}
              <div className="house-band-overlay" aria-hidden="true" />
            </div>

            <div className="house-band-content">
              <Link href={`/${lang}/majad/${house.slug}`} className="feature-house-name">
                {house.name[lang]}
              </Link>
              <ul className="feature-list">
                {house.items.map(item => (
                  <li key={item.et}>{item[lang].replace(/ · /g, ', ')}</li>
                ))}
              </ul>
              <dl className="house-price">
                <dt className="house-price-label">{t.priceLabel[lang]}</dt>
                {house.prices.map(p => (
                  <dd className="house-price-row" key={p.guests.et}>
                    <span className="house-price-guests">{p.guests[lang]}</span>
                    <span className="house-price-amount">
                      {`${p.eur} €`}
                      <span className="house-price-unit">{` / ${t.priceUnit[lang]}`}</span>
                    </span>
                  </dd>
                ))}
                {house.priceExtra && (
                  <dd className="house-price-extra">{house.priceExtra[lang]}</dd>
                )}
              </dl>
              <div className="house-band-links">
                <Link href={`/${lang}/majad/${house.slug}`} className="feature-house-link">
                  {T.housePage.more[lang]}
                </Link>
                <Link
                  href={
                    HOUSE_GALLERIES[house.slug as keyof typeof HOUSE_GALLERIES]?.length
                      ? `/${lang}/majad/${house.slug}#pildid`
                      : `/${lang}/gallery#${house.slug}`
                  }
                  className="feature-gallery-link"
                >
                  {t.galleryLink[lang]}
                </Link>
              </div>
            </div>
          </article>
        )
      })}

      <div className="feature-outro">
        <p className="feature-price-note">{t.priceNote[lang]}</p>
        <HouseCompare />
        <a href="#broneeri" className="feature-cta" onClick={scrollTo('broneeri')}>{t.cta[lang]}</a>
      </div>
    </section>
  )
}
