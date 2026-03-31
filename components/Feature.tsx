'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

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
      <div className="feature-image">
        <Image src="/images/tiik.jpg" alt="Oandu tiik" fill sizes="(max-width: 900px) 100vw, 50vw" quality={75} style={{ objectFit: 'cover', objectPosition: 'center' }} />
        <div className="feature-image-overlay" aria-hidden="true" />
        <span className="feature-image-label">{t.imgLabel[lang]}</span>
      </div>
      <div className="feature-content">
        <p className="section-label">{t.label[lang]}</p>
        <h2 className="feature-heading">
          {t.h1[lang]}<br />
          <em>{t.h2[lang]}</em>
        </h2>
        <div className="feature-houses">
          {t.houses.map((house) => (
            <div key={house.name.et} className="feature-house">
              <div className="feature-house-header">
                <span className="feature-house-name">{house.name[lang]}</span>
                <span className="feature-house-tag">{house.tag[lang]}</span>
              </div>
              <ul className="feature-list">
                {house.items.map(item => (
                  <li key={item.et}>{item[lang].replace(/ · /g, ', ')}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <a href="#broneeri" className="feature-cta" onClick={scrollTo('broneeri')}>{t.cta[lang]}</a>
      </div>
    </section>
  )
}
