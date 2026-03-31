'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { T, type Lang } from '@/lib/translations'

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

/** Smooth-scrolls to section without changing the URL */
function smoothScroll(id: string, then?: () => void) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    then?.()
  }
}

export default function Nav() {
  const { lang, setLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      <nav className={scrolled ? 'nav-scrolled' : ''}>
        <a href="/" className="nav-logo">Oanduaia</a>

        <div className="nav-right">
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.key}>
                <a href={`#${l.id}`} onClick={smoothScroll(l.id)}>
                  {T.nav[l.key][lang]}
                </a>
              </li>
            ))}
          </ul>

          <Link href="/gallery" className="nav-gallery-btn">
            {T.nav.galerii[lang]}
          </Link>

          <div className="nav-socials">
            <a href="#" target="_blank" rel="noopener noreferrer" className="nav-social" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="nav-social" aria-label="Booking.com">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.003 0C5.376 0 0 5.373 0 12c0 6.625 5.376 12 12.003 12C18.625 24 24 18.625 24 12c0-6.627-5.375-12-11.997-12zm2.14 17.025H8.078V6.975h6.064c1.549 0 2.795 1.218 2.795 2.717 0 .81-.365 1.54-.95 2.041.892.498 1.492 1.44 1.492 2.52 0 1.81-1.498 2.772-3.335 2.772zm-.609-7.436H9.97v2.123h3.563c.574 0 1.04-.476 1.04-1.063 0-.586-.466-1.06-1.04-1.06zm.3 3.873H9.97v2.189h3.864c.66 0 1.196-.533 1.196-1.092 0-.56-.536-1.097-1.196-1.097z"/>
              </svg>
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
              <a href={`#${l.id}`} onClick={smoothScroll(l.id, close)}>
                {T.nav[l.key][lang]}
              </a>
            </li>
          ))}
          <li style={{ '--i': links.length } as React.CSSProperties}>
            <Link href="/gallery" onClick={close}>
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
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Instagram
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Booking.com">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.003 0C5.376 0 0 5.373 0 12c0 6.625 5.376 12 12.003 12C18.625 24 24 18.625 24 12c0-6.627-5.375-12-11.997-12zm2.14 17.025H8.078V6.975h6.064c1.549 0 2.795 1.218 2.795 2.717 0 .81-.365 1.54-.95 2.041.892.498 1.492 1.44 1.492 2.52 0 1.81-1.498 2.772-3.335 2.772zm-.609-7.436H9.97v2.123h3.563c.574 0 1.04-.476 1.04-1.063 0-.586-.466-1.06-1.04-1.06zm.3 3.873H9.97v2.189h3.864c.66 0 1.196-.533 1.196-1.092 0-.56-.536-1.097-1.196-1.097z"/>
            </svg>
            Booking.com
          </a>
        </div>
      </div>
    </>
  )
}
