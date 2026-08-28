'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import PhotoStrip from '@/components/PhotoStrip'
import { DETAIL_STRIP } from '@/lib/strips'

export default function Intro() {
  const { lang } = useLanguage()
  const t = T.intro
  return (
    // The band exists only to be full-bleed: the section itself is capped at --max-w
    // and centred, so a strip inside it would stop short of both edges.
    <div className="intro-band">
      <PhotoStrip photos={DETAIL_STRIP} reverse variant="light" />
      <section className="intro-section" id="lugu">
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
            <p>{t.p3[lang]}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
