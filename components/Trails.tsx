'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import { T } from '@/lib/translations'

const delays = ['', ' reveal-delay-1', ' reveal-delay-2']

export default function Trails() {
  const { lang } = useLanguage()
  const t = T.trails
  return (
    <section className="trails-section" id="loodus">
      {/*
        The heading sits on the forest it is describing. Full-bleed and outside
        .trails-inner, which is capped and centred — inside it the photograph would have
        stopped short of both edges and read as a card rather than as the ground.
      */}
      <div className="trails-band">
        <div className="trails-band-bg" aria-hidden="true">
          <Image
            src="/galerii/metsarada.jpeg"
            alt=""
            fill
            sizes="100vw"
            quality={62}
            style={{ objectFit: 'cover', objectPosition: '50% 62%' }}
          />
          <div className="trails-band-scrim" />
        </div>
        <div className="trails-band-inner">
          <div className="trails-header reveal">
            <p className="section-label">{t.label[lang]}</p>
            <h2 className="trails-heading">
              {t.h1[lang]}<br />
              {t.h2[lang]}<em>{t.h2em[lang]}</em>
            </h2>
            <div className="trails-desc">
              <p>{t.desc1[lang]}</p>
              <p>{t.desc2[lang]}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="trails-inner">
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
