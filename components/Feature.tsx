'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { HOUSE_IMAGES } from '@/lib/houses'

function scrollTo(id: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Feature() {
  const { lang } = useLanguage()
  const t = T.feature

  return (
    <section className="feature-section" id="majad">
      <div className="feature-intro">
        <p className="section-label">{t.label[lang]}</p>
        <h2 className="feature-heading">
          {t.h1[lang]}<br />
          <em>{t.h2[lang]}</em>
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
              <span className="feature-house-name">{house.name[lang]}</span>
              <span className="feature-house-tag">{house.tag[lang]}</span>
              <ul className="feature-list">
                {house.items.map(item => (
                  <li key={item.et}>{item[lang].replace(/ · /g, ', ')}</li>
                ))}
              </ul>
              <Link href={`/${lang}/gallery#${house.slug}`} className="feature-gallery-link">
                {t.galleryLink[lang]}
              </Link>
            </div>
          </article>
        )
      })}

      <div className="feature-outro">
        <a href="#broneeri" className="feature-cta" onClick={scrollTo('broneeri')}>{t.cta[lang]}</a>
      </div>
    </section>
  )
}
