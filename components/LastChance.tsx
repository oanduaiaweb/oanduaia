'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { scrollToId } from '@/lib/scrollToId'
import { track } from '@/lib/analytics'
import { LAST_CHANCE_HOUSES, nightsBeforeWinter, nightsLeftLabel } from '@/lib/lastChance'
import { HOUSE_VIDEOS } from '@/lib/housePhotos'

/**
 * The Pond House clip in its card (Mikk, 31 Oct), playing on a loop like on the house page.
 * Nothing loads until the card is near the screen; a phone that refuses autoplay simply shows
 * the poster, and the card stays one link to the house.
 */
function CardVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    /*
     * Only once the page has loaded and the card is actually on screen: on a phone this card
     * sits right under the hero, and a 4 MB clip fetched at once took the homepage from 87
     * to 57 in Lighthouse by competing with the hero photograph.
     */
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      v.play().catch(() => {})
    }, { threshold: 0.25 })
    const watch = () => io.observe(v)
    if (document.readyState === 'complete') watch()
    else window.addEventListener('load', watch, { once: true })
    return () => { io.disconnect(); window.removeEventListener('load', watch) }
  }, [])
  // The still is an optimised, lazy image underneath; the clip fades in over it once it runs.
  return (
    <>
      <Image src={poster} alt="" fill sizes="(max-width: 700px) 92vw, 40vw" quality={72} style={{ objectFit: 'cover' }} />
      <video ref={ref} className={`lastchance-video${playing ? ' is-playing' : ''}`} src={src}
        muted loop playsInline preload="none" aria-hidden="true" onPlaying={() => setPlaying(true)} />
    </>
  )
}

const PHOTO: Record<string, string> = {
  tiigimaja: '/galerii/tiigimaja/elutuba-kamin-tiik.jpeg',
  metsamaja: '/galerii/metsamaja/kamin.jpeg',
}

/**
 * The homepage's "before winter" band, straight under the hero. It runs for the two months
 * before the Pond House and the Forest House close, then takes itself down: the page is
 * static, so the build-time answer is checked again in the browser and wins.
 */
export default function LastChance() {
  const { lang } = useLanguage()
  const t = T.lastChance
  // Whether to show is decided at build and re-checked here; the count itself is only
  // ever rendered in the browser, so a page built yesterday cannot hydrate a stale number.
  const [on, setOn] = useState(() => nightsBeforeWinter() !== null)
  const [nights, setNights] = useState<number | null>(null)
  useEffect(() => {
    const n = nightsBeforeWinter()
    setOn(n !== null)
    setNights(n)
  }, [])
  if (!on) return null

  return (
    <section className="lastchance" aria-labelledby="lastchance-h">
      <div className="lastchance-head">
        <p className="section-label lastchance-label">{t.label[lang]}</p>
        <h2 className="lastchance-h" id="lastchance-h">
          {t.h1[lang]}<br /><em>{t.h2[lang]}</em>
        </h2>
        <p className="lastchance-text">{t.text[lang]}</p>
        <p className="lastchance-count" aria-live="polite">
          {nights !== null && (
            <>
              <span className="lastchance-count-n">{nights}</span>
              <span className="lastchance-count-l">{nightsLeftLabel(nights, lang).replace(/^\d+ /, '')}</span>
            </>
          )}
        </p>
      </div>

      <div className="lastchance-cards">
        {LAST_CHANCE_HOUSES.map(slug => {
          const house = T.feature.houses.find(h => h.slug === slug)
          if (!house) return null
          const from = Math.min(...house.prices.map(p => p.eur))
          const who = slug === 'tiigimaja' ? t.forTiigimaja : t.forMetsamaja
          const clip = HOUSE_VIDEOS[slug as keyof typeof HOUSE_VIDEOS]
          return (
            <Link
              key={slug}
              href={`/${lang}/majad/${slug}`}
              className="lastchance-card"
              onClick={() => track('lastchance_house', { house: slug, lang })}
            >
              <div className="lastchance-photo">
                {clip
                  ? <CardVideo src={clip.src} poster={clip.poster} />
                  : <Image src={PHOTO[slug]} alt="" fill sizes="(max-width: 700px) 92vw, 40vw" quality={72} style={{ objectFit: 'cover' }} />}
              </div>
              <div className="lastchance-card-body">
                <span className="lastchance-name">{house.name[lang]}</span>
                <span className="lastchance-meta">
                  {who[lang]} · {t.from[lang].replace('{p}', String(from))}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      <a
        href="#broneeri"
        className="btn-primary lastchance-cta"
        onClick={e => {
          e.preventDefault()
          track('booking_cta', { location: 'lastchance', lang })
          scrollToId('broneeri')
        }}
      >
        {t.cta[lang]}
      </a>
    </section>
  )
}

/** One line on the house page itself, for the two houses that close. */
export function LastChanceNotice({ slug }: { slug: string }) {
  const { lang } = useLanguage()
  const [on, setOn] = useState(() => nightsBeforeWinter() !== null)
  const [nights, setNights] = useState<number | null>(null)
  useEffect(() => {
    const n = nightsBeforeWinter()
    setOn(n !== null)
    setNights(n)
  }, [])
  if (!on || !LAST_CHANCE_HOUSES.includes(slug as never)) return null
  return (
    <p className="lastchance-notice">
      <span>{T.lastChance.notice[lang]}</span>
      {nights !== null && <strong>{nightsLeftLabel(nights, lang)}</strong>}
    </p>
  )
}
