'use client'

import { useEffect } from 'react'
import { restoring } from '@/components/ScrollMemory'

/**
 * Arriving on the homepage at a section ("/et#loodus", from the footer or the menu on any
 * other page). The browser jumps once, on first paint — and then the photographs, the map
 * and the calendar above the section load and push it a screen or more further down, so
 * the visitor landed in the wrong place (Mikk, 29 Oct). Re-align a few times while the
 * page settles, and stop the moment the visitor scrolls on their own.
 */
export default function HashLanding() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    // Coming back to this URL: ScrollMemory puts the visitor where they were, not at the section.
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    if (nav?.type === 'back_forward' || restoring.active) return
    let stopped = false
    const stop = () => { stopped = true }
    const align = () => {
      if (stopped || restoring.active) return
      const el = document.getElementById(id)
      if (!el) return
      const off = el.getBoundingClientRect().top - (parseFloat(getComputedStyle(el).scrollMarginTop) || 0)
      if (Math.abs(off) > 8) window.scrollTo({ top: window.scrollY + off, behavior: 'instant' })
    }
    const opts = { passive: true, once: true } as const
    window.addEventListener('wheel', stop, opts)
    window.addEventListener('touchstart', stop, opts)
    window.addEventListener('keydown', stop, { once: true })
    const timers = [0, 150, 500, 1000, 1800, 3000].map(ms => window.setTimeout(align, ms))
    window.addEventListener('load', align, { once: true })
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('load', align)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
    }
  }, [])
  return null
}
