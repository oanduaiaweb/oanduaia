'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

export default function Intro() {
  const { lang } = useLanguage()
  const t = T.intro
  return (
    <section className="intro-section" id="meist">
      <div className="reveal">
        <p className="intro-number">{t.label[lang]}</p>
        <h2 className="intro-heading">
          {t.h1[lang]}<br />
          {t.h2[lang]}<em>{t.h2em[lang]}</em><br />
          {t.h3[lang]}
        </h2>
      </div>
      <div className="reveal reveal-delay-1">
        <div className="intro-text">
          <p>{t.p1[lang]}</p>
          <p>{t.p2[lang]}</p>
        </div>
      </div>
    </section>
  )
}
