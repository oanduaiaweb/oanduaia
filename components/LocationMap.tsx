'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { SOCIAL } from '@/lib/social'
import { scrollToId } from '@/lib/scrollToId'

function scrollTo(id: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToId(id)
  }
}

const LAT = 59.5601919
const LON = 26.1067858

/**
 * Google Maps, embedded (Mikk, 31 Oct: the Maa-amet map showed up grey). Searching the
 * name puts our own Business Profile pin on the map — reviews, photos and "Directions"
 * one tap away — and it opens in the visitor's language. Loaded lazily, so the iframe
 * costs nothing until someone scrolls down to it.
 */
export default function LocationMap() {
  const { lang } = useLanguage()
  const t = T.trails
  const src = `https://www.google.com/maps?q=Oanduaia,+Oandu,+Estonia&ll=${LAT},${LON}&z=12&hl=${lang}&output=embed`

  return (
    /*
     * Deliberately not a `.reveal`: a map should just be there, not fade in after it.
     */
    <div className="trails-map-block">
      <p className="section-label">{t.mapLabel[lang]}</p>
      <iframe className="trails-map" src={src} title={t.mapAlt[lang]} loading="lazy"
        referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      <p className="trails-nearby">{t.nearby[lang]}</p>
      <div className="trails-map-links">
        <a className="trail-link trail-link--solid" href="#broneeri" onClick={scrollTo('broneeri')}>
          {t.mapBook[lang]}
        </a>
        <a className="trail-link" href={SOCIAL.maps} target="_blank" rel="noopener noreferrer">
          {t.mapOpen[lang]}
        </a>
      </div>
    </div>
  )
}
