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
 * The homepage's winter band for the Sauna House, straight under the hero. Static page,
 * so the season is checked again in the browser and that answer wins.
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
    <section className="wcool" aria-labelledby="wintersauna-h">
      <div className="wcool-photo">
        <Image src="/galerii/saunamaja/jaaauk-talvel.webp" alt="" fill sizes="(max-width: 900px) 100vw, 55vw" quality={78} style={{ objectFit: 'cover', objectPosition: '50% 65%' }} />
      </div>
      <div className="wcool-snow" aria-hidden="true" />
      <div className="wcool-inner">
        <p className="wcool-label"><span className="wcool-date">{t.label[lang]}</span><span className="wcool-dot">·</span><span className="wcool-date">{t.open[lang]}</span></p>
        <h2 className="wcool-h" id="wintersauna-h">
          {t.h1[lang]}<em>{t.h2[lang]}</em>
        </h2>
        <p className="wcool-text">{t.text[lang]}</p>
        <div className="wcool-actions">
          <a
            href="#broneeri"
            className="btn-primary wcool-cta"
            onClick={e => {
              e.preventDefault()
              track('booking_cta', { location: 'wintersauna', lang })
              scrollToId('broneeri')
            }}
          >
            {T.lastChance.cta[lang]}
          </a>
          <Link href={`/${lang}/majad/saunamaja`} className="wcool-link" onClick={() => track('wintersauna_house', { lang })}>
            {house.name[lang]} · {T.lastChance.from[lang].replace('{p}', String(from))} →
          </Link>
          {landing && (
            <Link href={`/${lang}/${landing.slug[lang]}`} className="wcool-link wcool-link--quiet" onClick={() => track('wintersauna_landing', { lang })}>
              {T.footer.landingWinter[lang]} →
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
