'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import Link from 'next/link'
import { TRAIL_LINKS, TRAIL_BY_KEY } from '@/lib/trails'
import LocationMap from '@/components/LocationMap'

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
            const page = TRAIL_BY_KEY[trail.name.et]
            return (
              <div key={trail.name.et} className={`trail-item reveal${delays[i % 3]}`}>
                <p className="trail-distance">{trail.dist[lang]}</p>
                {/*
                  Each row is now a door. A trail page is where someone planning a walk
                  in Lahemaa arrives — earlier in their trip than anyone searching for a
                  bed — and this list is the only thing linking to them.
                */}
                <h3 className="trail-name">
                  {page
                    ? <Link href={`/${lang}/rajad/${page.slug}`}>{trail.name[lang]}</Link>
                    : trail.name[lang]}
                </h3>
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

        <LocationMap />
      </div>
    </section>
  )
}
