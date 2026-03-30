'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

export default function Services() {
  const { lang } = useLanguage()
  const t = T.services
  const cards = [t.s1, t.s2, t.s3]
  return (
    <section className="services-section" id="toit">
      <p className="section-label">{t.label[lang]}</p>
      <div className="services-grid">
        {cards.map((s, i) => (
          <div key={i} className={`service-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
            <p className="service-num">0{i + 1}</p>
            <h3 className="service-title">{s.t1[lang]} <em>&amp; {s.t2[lang]}</em></h3>
            <p className="service-desc">{s.desc[lang]}</p>
            <a href="#" className="service-arrow">{t.arrow[lang]}</a>
          </div>
        ))}
      </div>
    </section>
  )
}
