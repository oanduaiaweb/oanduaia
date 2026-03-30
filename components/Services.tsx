'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

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
            <h3 className="service-title">
              {s.t1[lang]}{s.t2[lang] ? <> <em>&amp; {s.t2[lang]}</em></> : null}
            </h3>
            <p className="service-desc">{s.desc[lang]}</p>
            <a href="mailto:info@oanduaia.ee" className="service-arrow">{t.arrow[lang]}</a>
          </div>
        ))}
      </div>
    </section>
  )
}
