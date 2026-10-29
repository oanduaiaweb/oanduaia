'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Back (and forward) returns to the exact place on the page (Mikk, 29 Oct).
 *
 * The browser's own restoration cannot do it here: half the links are Next client
 * navigations, where the old page is rebuilt after the browser has already tried to
 * scroll, and the photographs, calendar and map above any given point load late and push
 * it down. So the position is kept per URL in sessionStorage while the visitor scrolls,
 * and on a back/forward arrival it is put back — several times as the page settles,
 * stopping the moment the visitor scrolls on their own.
 */
const KEY = 'oa-scroll'
const here = () => location.pathname + location.search + location.hash

function load(): Record<string, number> {
  try { return JSON.parse(sessionStorage.getItem(KEY) || '{}') } catch { return {} }
}
function save(url: string, y: number) {
  try {
    const all = load()
    all[url] = y
    sessionStorage.setItem(KEY, JSON.stringify(all))
  } catch {}
}

/** Set while a back/forward navigation is being restored; HashLanding stands down for it. */
export const restoring = { active: false }

function restore(url: string) {
  const y = load()[url]
  if (y === undefined) return
  restoring.active = true
  let stopped = false
  const stop = () => { stopped = true; restoring.active = false }
  const opts = { passive: true, once: true } as const
  window.addEventListener('wheel', stop, opts)
  window.addEventListener('touchstart', stop, opts)
  window.addEventListener('keydown', stop, { once: true })
  const put = () => { if (!stopped && Math.abs(window.scrollY - y) > 4) window.scrollTo({ top: y, behavior: 'instant' }) }
  ;[0, 50, 150, 350, 700, 1200, 2000, 3000].forEach(ms => window.setTimeout(put, ms))
  window.setTimeout(() => { restoring.active = false }, 3100)
}

export default function ScrollMemory() {
  const pathname = usePathname()

  useEffect(() => {
    history.scrollRestoration = 'manual'
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => { raf = 0; if (!restoring.active) save(here(), window.scrollY) })
    }
    const onHide = () => save(here(), window.scrollY)
    // Stop saving at once: until the old page is rebuilt, scroll events belong to neither page.
    const onPop = () => { popped = true; restoring.active = true }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pagehide', onHide)
    window.addEventListener('popstate', onPop)
    // A whole-page arrival by back/forward (or a bfcache return).
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    if (nav?.type === 'back_forward') restore(here())
    const onShow = (e: PageTransitionEvent) => { if (e.persisted) restore(here()) }
    window.addEventListener('pageshow', onShow)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pagehide', onHide)
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('pageshow', onShow)
    }
  }, [])

  // A client-side back/forward: the URL changed through popstate, so put the old place back.
  useEffect(() => {
    if (!popped) return
    popped = false
    restore(here())
  }, [pathname])

  return null
}

let popped = false
