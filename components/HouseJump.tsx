'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

/**
 * The three houses as buttons above the "Majutusvõimalused" heading, each jumping to its
 * own band (Mikk, 29 Oct). They drift a few pixels apart as the page scrolls — each at its
 * own rate — so the row feels alive without moving enough to be hard to tap.
 */
export default function HouseJump() {
  const { lang } = useLanguage()
  const row = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = row.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const chips = [...el.querySelectorAll<HTMLElement>('.house-jump-btn')]
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      if (r.bottom < -100 || r.top > window.innerHeight + 100) return
      // -1 when the row is at the bottom of the screen, +1 at the top.
      const p = Math.max(-1, Math.min(1, 1 - (2 * (r.top + r.height / 2)) / window.innerHeight))
      chips.forEach((c, i) => { c.style.transform = `translateY(${(p * (i - 1) * 7 - p * 4).toFixed(1)}px)` })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="house-jump" ref={row}>
      {T.feature.houses.map(h => (
        <a
          key={h.slug}
          href={`#maja-${h.slug}`}
          className="house-jump-btn"
          onClick={e => {
            e.preventDefault()
            // Land the band just under the fixed header, not behind it.
            const band = document.getElementById(`maja-${h.slug}`)
            const nav = document.querySelector<HTMLElement>('nav.site-nav')?.getBoundingClientRect().height ?? 0
            if (band) window.scrollTo({ top: band.getBoundingClientRect().top + window.scrollY - nav, behavior: 'instant' })
          }}
        >
          {h.name[lang]}
        </a>
      ))}
    </div>
  )
}
