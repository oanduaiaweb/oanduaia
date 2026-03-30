'use client'

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

/** Smooth-scrolls to section without changing the URL (so refresh always goes to top) */
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
      </div>
    </>
  )
}
