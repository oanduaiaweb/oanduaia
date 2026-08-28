'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import { T } from '@/lib/translations'
import { SERVICE_IMAGES } from '@/lib/services'
import PhotoStrip from '@/components/PhotoStrip'
import { FOOD_STRIP } from '@/lib/strips'

export default function Services() {
  const { lang } = useLanguage()
  const t = T.services
  const cards = [t.s1, t.s2]
  return (
    <section className="services-section" id="toit">
      <p className="section-label">{t.label[lang]}</p>
      <div className="services-grid services-grid--two">
        {cards.map((s, i) => (
          <div key={i} className={`service-card reveal${i > 0 ? ' reveal-delay-1' : ''}`}>
            {SERVICE_IMAGES[i] && (
              <div className="service-image">
                <Image
                  src={SERVICE_IMAGES[i].src}
                  alt={SERVICE_IMAGES[i].alt[lang]}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  quality={75}
                  style={{ objectFit: 'cover', objectPosition: SERVICE_IMAGES[i].focus ?? 'center' }}
                />
              </div>
            )}
            <h3 className="service-title">
              {s.t1[lang]}{s.t2[lang] ? <> <em>&amp; {s.t2[lang]}</em></> : null}
            </h3>
            <p className="service-desc">{s.desc[lang]}</p>
            {s.price && (
              <p className="service-price">
                <span className="service-price-line">{s.price.line[lang]}</span>
                <span className="service-price-detail">{s.price.detail[lang]}</span>
                <span className="service-price-note">{s.price.note[lang]}</span>
              </p>
            )}
            <a href="mailto:info@oanduaia.ee" className="service-arrow">{t.arrow[lang]}</a>
          </div>
        ))}
      </div>

      {/*
        The rest of the table, under the two cards rather than behind them: the cards
        have a solid ground, so a background strip would only show in the margins.
      */}
      <div className="food-band">
        <PhotoStrip photos={FOOD_STRIP} reverse variant="plain" />
      </div>
    </section>
  )
}
