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

const SRC = 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1200&q=85&auto=format&fit=crop'

export default function Feature() {
  const { lang } = useLanguage()
  const t = T.feature
  const items = [t.i1, t.i2, t.i3, t.i4, t.i5, t.i6]
  return (
    <section className="feature-section" id="majutus">
      <div className="feature-image">
        <Image src={SRC} alt="Oandu mets" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
        <div className="feature-image-overlay" aria-hidden="true" />
        <span className="feature-image-label">{t.imgLabel[lang]}</span>
      </div>
      <div className="feature-content">
        <p className="section-label">{t.label[lang]}</p>
        <h2 className="feature-heading">
          {t.h1[lang]}<br />
          <em>{t.h2[lang]}</em>
        </h2>
        <ul className="feature-list">
          {items.map(item => (
            <li key={item.et}>{item[lang]}</li>
          ))}
        </ul>
        <a href="#broneeri" className="feature-cta" onClick={scrollTo('broneeri')}>{t.cta[lang]}</a>
      </div>
    </section>
  )
}
