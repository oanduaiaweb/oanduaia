'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { SOCIAL_ICONS, estoniaOutline } from '@/components/SocialRow'
import { useLanguage } from '@/contexts/LanguageContext'
import { T, type Lang } from '@/lib/translations'
import { scrollToId } from '@/lib/scrollToId'

const MAPS_URL =
  'https://www.google.com/maps/place/Oanduaia/@59.5602003,26.1040144,17.51z/data=!4m9!3m8!1s0x4693a5e9eb2501f1:0x882b2ee86711e7c4!5m2!4m1!1i2!8m2!3d59.5601919!4d26.1067858!16s%2Fg%2F11c1p2zn4s?entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D'

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: 'et', flag: '🇪🇪', label: 'ET' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'ru', flag: '🇷🇺', label: 'RU' },
]

const links = [
  { key: 'meist',    id: 'lugu' },
  { key: 'majutus',  id: 'majad' },
  { key: 'teenused', id: 'toit' },
  { key: 'matkad',   id: 'loodus' },
  { key: 'broneeri', id: 'broneeri' },
] as const

/** Scrolls to the section without changing the URL. See lib/scrollToId. */
function smoothScroll(id: string, then?: () => void) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToId(id)
    then?.()
  }
}

export default function Nav() {
  const { lang, setLang } = useLanguage()
  const pathname = usePathname()
  const isHome = pathname === `/${lang}`
  const home = `/${lang}`
  const onGallery = pathname === `/${lang}/gallery`
  /*
   * A house page is a page about the houses, so Majad stays lit while you are on one —
   * otherwise following a house from the menu unlights the thing you just followed.
   */
  const onHouse = pathname.startsWith(`/${lang}/majad/`)

  const [scrolled, setScrolled] = useState(false)
  /** Which section the reader is in, on the home page. Null in the hero, and off it. */
  const [activeId, setActiveId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  /**
   * One scroll listener does both jobs: condensing the bar, and working out which
   * section the reader is actually in so its name can be boxed.
   *
   * The test is which section has crossed a line at 45% of the viewport, not which is
   * merely visible — with tall sections two are on screen at once for most of a scroll,
   * and "topmost visible" flickers between them at every boundary.
   *
   * `getBoundingClientRect`, not `offsetTop`: #lugu now sits inside the positioned
   * .intro-band, so its offsetTop is a few pixels, not its position on the page.
   */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      if (!isHome) return
      const line = window.scrollY + window.innerHeight * 0.45
      let current: string | null = null
      for (const l of links) {
        const el = document.getElementById(l.id)
        if (el && el.getBoundingClientRect().top + window.scrollY <= line) current = l.id
      }
      setActiveId(current)
    }
    /*
     * Three times, not once. Landing on /et#toit, the browser performs its jump after
     * mount, so a single check on mount reads scrollY 0 — which left the bar in its
     * transparent hero state, linen text on a linen section, and nothing boxed.
     */
    onScroll()
    const raf = requestAnimationFrame(onScroll)
    const t = setTimeout(onScroll, 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('hashchange', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('hashchange', onScroll)
    }
  }, [isHome])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); setLangOpen(false) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])


  const close = () => setMenuOpen(false)
  const current = LANGS.find(l => l.code === lang)!

  return (
    <>
      <nav className={`site-nav${scrolled ? ' nav-scrolled' : ''}`}>
        {/*
          The wordmark and, under it, Estonia. A sibling of the logo link rather than a
          child of it, so it can be a link in its own right, and absolutely positioned so
          it cannot change the height of a fixed header.
        */}
        <div className="nav-brand">
          <a href={home} className="nav-logo">Oanduaia</a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-mark"
            aria-label="Google Maps"
          >
            {estoniaOutline(46)}
          </a>
        </div>

        <div className="nav-right">
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.key}>
                <a
                  href={isHome ? `#${l.id}` : `${home}#${l.id}`}
                  onClick={isHome ? smoothScroll(l.id) : undefined}
                  className={
                    (isHome && activeId === l.id) || (onHouse && l.id === 'majad')
                      ? 'is-active'
                      : undefined
                  }
                  aria-current={
                    (isHome && activeId === l.id) || (onHouse && l.id === 'majad')
                      ? 'true'
                      : undefined
                  }
                >
                  {T.nav[l.key][lang]}
                </a>
              </li>
            ))}
          </ul>

          <Link
            href={`${home}/gallery`}
            className={`nav-gallery-btn${onGallery ? ' is-active' : ''}`}
            aria-current={onGallery ? 'page' : undefined}
          >
            {T.nav.galerii[lang]}
          </Link>

          <div className="nav-socials">
            <a href="https://www.instagram.com/oanduaia/" target="_blank" rel="noopener noreferrer" className="nav-social" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/Oanduaia/" target="_blank" rel="noopener noreferrer" className="nav-social" aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 8.5V6.9c0-.7.2-1.1 1.2-1.1H16.6V3.1A17 17 0 0 0 14.7 3C12.6 3 11.1 4.3 11.1 6.6V8.5H8.8V11.3h2.3V21h2.9V11.3h2.3l.4-2.8H14z"/>
              </svg>
            </a>
            <a href="https://www.booking.com/hotel/ee/oanduaia-saunamaja.en-gb.html" target="_blank" rel="noopener noreferrer" className="nav-social" aria-label="Booking.com">
              <svg width="22" height="22" viewBox="-0.34 -0.5 4.05 4.05" fill="currentColor">
                <path d="M1.113 2.524h-.51v-.61c0-.13.05-.2.162-.214h.35a.38.38 0 0 1 .41.411c0 .26-.157.415-.41.415zM.602.875v-.16c0-.14.06-.208.19-.216h.262c.224 0 .36.134.36.36 0 .17-.092.37-.35.37h-.46zm1.164.61l-.092-.052.08-.07c.094-.08.25-.262.25-.575 0-.48-.372-.79-.947-.79h-.73a.32.32 0 0 0-.309.317v2.72H1.07c.64 0 1.052-.348 1.052-.888 0-.29-.133-.54-.358-.665"/>
                <path d="M2.288 2.67c0-.203.163-.367.365-.367s.367.164.367.367-.164.367-.367.367-.365-.164-.365-.367"/>
              </svg>
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="nav-social" aria-label="Google Maps">
              {SOCIAL_ICONS.maps(22)}
            </a>
          </div>

          <div className="nav-lang" ref={langRef}>
            <button
              className="nav-lang-trigger"
              onClick={() => setLangOpen(o => !o)}
              aria-label="Change language"
            >
              <span>{current.flag}</span>
              <span>{current.label}</span>
              <span className={`nav-lang-arrow${langOpen ? ' open' : ''}`}>▾</span>
            </button>
            {langOpen && (
              <div className="nav-lang-dropdown">
                {LANGS.filter(l => l.code !== lang).map(l => (
                  <button
                    key={l.code}
                    className="nav-lang-option"
                    onClick={() => { setLang(l.code); setLangOpen(false) }}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className={`nav-burger${menuOpen ? ' nav-burger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menüü"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div
        className={`nav-overlay${menuOpen ? ' nav-overlay--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className="nav-overlay-links">
          {links.map((l, i) => (
            <li key={l.key} style={{ '--i': i } as React.CSSProperties}>
              <a
                href={isHome ? `#${l.id}` : `${home}#${l.id}`}
                onClick={isHome ? smoothScroll(l.id, close) : close}
              >
                {T.nav[l.key][lang]}
              </a>
            </li>
          ))}
          <li style={{ '--i': links.length } as React.CSSProperties}>
            <Link href={`${home}/gallery`} onClick={close}>
              {T.nav.galerii[lang]}
            </Link>
          </li>
        </ul>
        <div className="nav-overlay-langs">
          {LANGS.map(l => (
            <button
              key={l.code}
              className={`nav-overlay-lang${lang === l.code ? ' active' : ''}`}
              onClick={() => { setLang(l.code); close() }}
            >
              {l.flag} {l.label}
            </button>
          ))}
        </div>
        <div className="nav-overlay-socials">
          <a href="https://www.instagram.com/oanduaia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Instagram
          </a>
          <a href="https://www.facebook.com/Oanduaia/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 8.5V6.9c0-.7.2-1.1 1.2-1.1H16.6V3.1A17 17 0 0 0 14.7 3C12.6 3 11.1 4.3 11.1 6.6V8.5H8.8V11.3h2.3V21h2.9V11.3h2.3l.4-2.8H14z"/>
              </svg>
            Facebook
          </a>
          <a href="https://www.booking.com/hotel/ee/oanduaia-saunamaja.en-gb.html" target="_blank" rel="noopener noreferrer" aria-label="Booking.com">
            <svg width="20" height="20" viewBox="-0.34 -0.5 4.05 4.05" fill="currentColor">
              <path d="M1.113 2.524h-.51v-.61c0-.13.05-.2.162-.214h.35a.38.38 0 0 1 .41.411c0 .26-.157.415-.41.415zM.602.875v-.16c0-.14.06-.208.19-.216h.262c.224 0 .36.134.36.36 0 .17-.092.37-.35.37h-.46zm1.164.61l-.092-.052.08-.07c.094-.08.25-.262.25-.575 0-.48-.372-.79-.947-.79h-.73a.32.32 0 0 0-.309.317v2.72H1.07c.64 0 1.052-.348 1.052-.888 0-.29-.133-.54-.358-.665"/>
              <path d="M2.288 2.67c0-.203.163-.367.365-.367s.367.164.367.367-.164.367-.367.367-.365-.164-.365-.367"/>
            </svg>
            Booking.com
          </a>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" aria-label="Google Maps">
            {SOCIAL_ICONS.maps(20)}
            Google Maps
          </a>
        </div>
      </div>
    </>
  )
}
