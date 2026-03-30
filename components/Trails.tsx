'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

const delays = ['', ' reveal-delay-1', ' reveal-delay-2']

export default function Trails() {
  const { lang } = useLanguage()
  const t = T.trails
  return (
    <section className="trails-section" id="loodus">
      <div className="trails-inner">
        <div className="trails-header reveal">
          <p className="section-label">{t.label[lang]}</p>
          <h2 className="trails-heading">
            {t.h1[lang]}<br />
            {t.h2[lang]}<em>{t.h2em[lang]}</em>
          </h2>
        </div>
        <div className="trails-grid">
          {t.items.map((trail, i) => (
            <div key={trail.name.et} className={`trail-item reveal${delays[i % 3]}`}>
              <p className="trail-distance">{trail.dist[lang]}</p>
              <h3 className="trail-name">{trail.name[lang]}</h3>
              <p className="trail-desc">{trail.desc[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
