'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { LANDINGS } from '@/lib/landing'
import { scrollToId } from '@/lib/scrollToId'
import { track } from '@/lib/analytics'
import { winterSaunaOn } from '@/lib/winterSauna'

/**
 * The homepage's winter band for the Sauna House, straight under the hero, in the same
 * layout as the old "before winter" band. Static page, so the season is checked again in
 * the browser and that answer wins.
 */
export default function WinterSauna() {
  const { lang } = useLanguage()
  const t = T.winterSauna
  const [on, setOn] = useState(() => winterSaunaOn())
  useEffect(() => { setOn(winterSaunaOn(new Date(), window.location.search)) }, [])
  if (!on) return null

  const house = T.feature.houses.find(h => h.slug === 'saunamaja')
  const landing = LANDINGS.find(l => l.id === 'winter-sauna')
  if (!house) return null
  const from = Math.min(...house.prices.map(p => p.eur))

  return (
    <section className="lastchance" aria-labelledby="wintersauna-h">
      <div className="lastchance-head">
        <p className="section-label lastchance-label">{t.label[lang]}</p>
        <h2 className="lastchance-h" id="wintersauna-h">
          {t.h1[lang]}<br /><em>{t.h2[lang]}</em>
        </h2>
        <p className="lastchance-text">{t.text[lang]}</p>
      </div>

      <div className="lastchance-cards">
        <Link
          href={`/${lang}/majad/saunamaja`}
          className="lastchance-card"
          onClick={() => track('wintersauna_house', { lang })}
        >
          <div className="lastchance-photo">
            <Image src="/galerii/saunamaja/jaaauk-talvel.webp" alt="" fill sizes="(max-width: 700px) 92vw, 40vw" quality={72} style={{ objectFit: 'cover' }} />
          </div>
          <div className="lastchance-card-body">
            <span className="lastchance-name">{house.name[lang]}</span>
            <span className="lastchance-meta">
              {t.forSaunamaja[lang]} · {T.lastChance.from[lang].replace('{p}', String(from))}
            </span>
          </div>
        </Link>
        {landing && (
          <Link
            href={`/${lang}/${landing.slug[lang]}`}
            className="lastchance-card"
            onClick={() => track('wintersauna_landing', { lang })}
          >
            <div className="lastchance-photo">
              <Image src="/galerii/064.jpeg" alt="" fill sizes="(max-width: 700px) 92vw, 40vw" quality={72} style={{ objectFit: 'cover' }} />
            </div>
            <div className="lastchance-card-body">
              <span className="lastchance-name">{T.footer.landingWinter[lang]}</span>
              <span className="lastchance-meta">{t.readMore[lang]}</span>
            </div>
          </Link>
        )}
      </div>

      <a
        href="#broneeri"
        className="btn-primary lastchance-cta"
        onClick={e => {
          e.preventDefault()
          track('booking_cta', { location: 'wintersauna', lang })
          scrollToId('broneeri')
        }}
      >
        {T.lastChance.cta[lang]}
      </a>
    </section>
  )
}
