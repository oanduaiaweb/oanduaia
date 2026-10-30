'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Lightbox from '@/components/Lightbox'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { GALLERY_SECTIONS } from '@/lib/gallery'

/** Every photograph in page order, so the lightbox steps straight from one section into the next. */
const FLAT = GALLERY_SECTIONS.flatMap(s => s.photos.map(p => ({ ...p, section: s })))
const START = GALLERY_SECTIONS.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + GALLERY_SECTIONS[i - 1].photos.length)
  return acc
}, [])

/**
 * The gallery in sections — the three houses, the outdoor kitchen and stage, food, nature
 * and the grounds — with a bar of the sections that stays under the header and marks the
 * one being looked at (Mikk, 29 Oct: "more systemised").
 */
export default function Gallery() {
  const { lang } = useLanguage()
  const t = T.gallery

  const [open, setOpen] = useState<number | null>(null)
  const [current, setCurrent] = useState(GALLERY_SECTIONS[0].id)
  const bar = useRef<HTMLElement>(null)

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d: number) => {
    setOpen(o => (o === null ? o : (o + d + FLAT.length) % FLAT.length))
  }, [])

  useEffect(() => {
    document.body.classList.add('gallery-page')
    // The section bar sticks right under the fixed header, whatever height it has here.
    const nav = document.querySelector<HTMLElement>('nav.site-nav')
    const fit = () => { if (nav) document.documentElement.style.setProperty('--gallery-nav-h', `${Math.round(nav.getBoundingClientRect().bottom)}px`) }
    fit()
    // The header condenses once scrolled; follow its real height so no photo shows between.
    const ro = new ResizeObserver(fit)
    if (nav) ro.observe(nav, { box: 'border-box' })
    return () => {
      document.body.classList.remove('gallery-page')
      ro.disconnect()
    }
  }, [])

  // The section nearest the top of the screen is the current one.
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        const hit = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setCurrent(hit.target.id as typeof current)
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    GALLERY_SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  // Keep the current chip in view in the bar, which scrolls sideways on a phone.
  useEffect(() => {
    const chip = bar.current?.querySelector<HTMLElement>(`[data-id="${current}"]`)
    const b = bar.current
    if (!chip || !b) return
    const left = chip.offsetLeft - (b.clientWidth - chip.clientWidth) / 2
    b.scrollTo({ left, behavior: 'smooth' })
  }, [current])

  // Lands the section heading just under the header and the bar, which both cover the top.
  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const nav = document.querySelector<HTMLElement>('nav.site-nav')?.offsetHeight ?? 0
    const b = bar.current?.offsetHeight ?? 0
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - nav - b + 8, behavior: 'instant' })
  }

  return (
    <>
      <Nav />
      <div className="gallery-photos">
        <div className="gallery-header">
          <Link href={`/${lang}`} className="gallery-back">{t.back[lang]}</Link>
          <h1 className="gallery-title">{t.title[lang]}</h1>
        </div>

        <nav className="gallery-bar" ref={bar} aria-label={t.title[lang]}>
          {GALLERY_SECTIONS.map(s => (
            <a
              key={s.id}
              data-id={s.id}
              href={`#${s.id}`}
              className={`gallery-chip${current === s.id ? ' is-current' : ''}`}
              aria-current={current === s.id ? 'true' : undefined}
              onClick={e => { e.preventDefault(); goTo(s.id); history.replaceState(history.state, '', `#${s.id}`) }}
            >
              {s.label[lang]}
              <span className="gallery-chip-n">{s.photos.length}</span>
            </a>
          ))}
        </nav>

        {GALLERY_SECTIONS.map((s, si) => (
          <section key={s.id} id={s.id} className="gallery-section" aria-labelledby={`${s.id}-h`}>
            <h2 className="gallery-section-h" id={`${s.id}-h`}>
              {s.label[lang]}
              <span className="gallery-section-n">{s.photos.length}</span>
            </h2>
            <div className="gallery-grid">
              {s.photos.map((p, i) => (
                <button
                  key={p.src}
                  className="gallery-item"
                  onClick={() => setOpen(START[si] + i)}
                  aria-label={p.alt[lang]}
                >
                  <Image
                    src={p.src}
                    alt={p.alt[lang]}
                    fill
                    sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
                    quality={75}
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          photos={FLAT.map(p => ({ src: p.src, alt: p.alt[lang], label: p.section.label[lang] }))}
          index={open}
          onClose={close}
          onStep={step}
        />
      )}
    </>
  )
}
