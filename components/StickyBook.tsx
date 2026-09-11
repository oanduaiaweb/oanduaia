'use client'

import { useEffect, useState } from 'react'
import { track } from '@/lib/analytics'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { scrollToId } from '@/lib/scrollToId'

/**
 * A booking button that follows the page, bottom right, on every screen size.
 *
 * It stays hidden until the hero's own button has scrolled away — two identical calls to
 * action on screen at once is noise rather than emphasis — and hides again while the
 * calendar is in view, where a floating "book now" would sit on top of the very thing it
 * is asking someone to use.
 *
 * Pages that have no calendar (gallery, trails, landing pages) have no `#broneeri` to
 * scroll to. There the href does the work and takes the visitor to the home page's
 * calendar; the click handler only intercepts when the section is actually on this page.
 */
export default function StickyBook() {
  const { lang } = useLanguage()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const cta = document.querySelector('.hero-cta')
    const booking = document.getElementById('broneeri')

    // Two independent reasons to stay hidden, tracked apart and combined on every change.
    let pastHero = !cta
    let overBooking = false
    const apply = () => setShown(pastHero && !overBooking)

    const cleanups: Array<() => void> = []

    if (cta) {
      const o = new IntersectionObserver(([e]) => {
        pastHero = !e.isIntersecting
        apply()
      })
      o.observe(cta)
      cleanups.push(() => o.disconnect())
    } else {
      // No hero on this page, so fall back to a plain scroll threshold.
      const onScroll = () => {
        pastHero = window.scrollY > 240
        apply()
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      cleanups.push(() => window.removeEventListener('scroll', onScroll))
    }

    if (booking) {
      const o = new IntersectionObserver(([e]) => {
        overBooking = e.isIntersecting
        apply()
      })
      o.observe(booking)
      cleanups.push(() => o.disconnect())
    }

    return () => cleanups.forEach(fn => fn())
  }, [])

  return (
    <a
      href={`/${lang}#broneeri`}
      className={`sticky-book${shown ? ' is-on' : ''}`}
      aria-hidden={!shown}
      tabIndex={shown ? undefined : -1}
      onClick={e => {
        track('booking_cta', { location: 'sticky', lang })
        if (document.getElementById('broneeri')) {
          e.preventDefault()
          scrollToId('broneeri')
        }
      }}
    >
      {T.hero.cta[lang]}
    </a>
  )
}
