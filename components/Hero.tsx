'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { scrollToId } from '@/lib/scrollToId'
import { HERO_SLIDES, HERO_HOLD, HERO_FADE, slideSizes } from '@/lib/hero'

function scrollTo(id: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToId(id)
  }
}

export default function Hero() {
  const { lang } = useLanguage()
  const h = T.hero

  const [index, setIndex] = useState(0)
  // The non-LCP slides are held back until after first paint so they do not
  // compete with the hero image for bandwidth.
  const [mounted, setMounted] = useState(false)
  /**
   * The furthest slide reached. Only this one and the next are in the DOM, so the
   * carousel loads a slide at a time instead of all nine at once — on a phone that was
   * nearly eight megabytes before anyone had scrolled. A visitor who leaves after a few
   * seconds pays for two or three pictures, not the whole set.
   */
  const [reached, setReached] = useState(0)

  useEffect(() => {
    setMounted(true)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches || HERO_SLIDES.length < 2) return

    const id = setInterval(
      () => setIndex(i => (i + 1) % HERO_SLIDES.length),
      HERO_HOLD + HERO_FADE
    )
    return () => clearInterval(id)
  }, [])

  useEffect(() => { setReached(r => Math.max(r, index)) }, [index])

  return (
    <section className="hero">
      <div
        className="hero-bg"
        style={{
          ['--hero-fade' as string]: `${HERO_FADE}ms`,
          ['--hero-ken' as string]: `${HERO_HOLD + HERO_FADE * 2}ms`,
        }}
      >
        {HERO_SLIDES.map((slide, i) => {
          if (i > 0 && (!mounted || i > reached + 1)) return null
          return (
            <div
              key={slide.src}
              className={`hero-slide${i === index ? ' is-active' : ''}`}
              aria-hidden={i === index ? undefined : true}
              style={{
                ['--focus-d' as string]: slide.focus?.desktop ?? 'center',
                ['--focus-m' as string]: slide.focus?.mobile ?? 'center',
              }}
            >
              <Image
                src={slide.src}
                alt={i === index ? slide.alt[lang] : ''}
                fill
                priority={i === 0}
                sizes={slideSizes(slide)}
                quality={88}
                className="hero-bg-img"
              />
            </div>
          )
        })}
        <div className="hero-bg-overlay" />
      </div>
      <div className="hero-grain" aria-hidden="true" />
      {/*
        Four flat children, deliberately. On a phone they stack in this order and read top
        to bottom. On desktop a grid places them instead: the small lines up under the
        logo, the headline bottom-left, the button bottom-right on the headline's own
        baseline. Same markup, same reading order, two different compositions.
      */}
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="line"><span>{h.line1[lang]}</span></span>
          <span className="line"><span>{h.line2[lang]}</span></span>
          <span className="line"><span>{h.line3[lang]}</span></span>
        </h1>
        <p className="hero-eyebrow">{h.eyebrow[lang]}</p>
        <p className="hero-desc">{h.desc[lang]}</p>
        <a href="#broneeri" className="btn-primary hero-cta" onClick={scrollTo('broneeri')}>
          {h.cta[lang]}
        </a>
      </div>
    </section>
  )
}
