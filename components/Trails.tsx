'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import { T } from '@/lib/translations'
import { TRAIL_LINKS } from '@/lib/trails'
import { SOCIAL } from '@/lib/social'

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
          {t.items.map((trail, i) => {
            const link = TRAIL_LINKS[trail.name.et]
            return (
              <div key={trail.name.et} className={`trail-item reveal${delays[i % 3]}`}>
                <p className="trail-distance">{trail.dist[lang]}</p>
                <h3 className="trail-name">{trail.name[lang]}</h3>
                <p className="trail-desc">{trail.desc[lang]}</p>
                {/*
                  On the trail it belongs to, not under the list. The booklet is the map
                  for Oandu–Ikla specifically; a button under six trails would imply it
                  covered all of them.
                */}
                {link && (
                  <a
                    className="trail-link"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label[lang]}
                    <span className="trail-link-meta">{link.meta}</span>
                  </a>
                )}
              </div>
            )
          })}
        </div>

        {/*
          The Maa- ja Ruumiamet base map, the same one RMK draws the trails on, built to a
          single PNG by scripts/build-map.py. Static on purpose: the map answers "where is
          this" once, and a tile client would cost 46KB of JavaScript, a third-party request
          on every view and a layout shift to add panning nobody asked for.

          NOT captioned "Andmed: Eesti Looduse Infosüsteem". That line on RMK's map credits
          the nature data they overlay on top; we show no EELIS data, so claiming it would
          credit a source we do not use.
        */}
        <div className="trails-map-block reveal">
          <p className="section-label">{t.mapLabel[lang]}</p>
          <a
            className="trails-map"
            href={SOCIAL.maps}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/map-oandu.png"
              alt={t.mapAlt[lang]}
              width={1280}
              height={700}
              sizes="(max-width: 900px) 94vw, 1200px"
              quality={84}
              style={{ width: '100%', height: 'auto' }}
            />
            <span className="trails-map-credit">{t.mapCredit}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
