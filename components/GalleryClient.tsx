'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { ALL_PHOTOS } from '@/lib/gallery'

const photos = ALL_PHOTOS


export default function Gallery() {
  const { lang } = useLanguage()
  const t = T.gallery

  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d: number) => {
    setOpen(o => (o === null ? o : (o + d + photos.length) % photos.length))
  }, [])

  useEffect(() => {
    document.body.classList.add('gallery-page')
    return () => document.body.classList.remove('gallery-page')
  }, [])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, step])

  return (
    <>
      <Nav />
      <section className="gallery-photos">
        <div className="gallery-header">
          <Link href={`/${lang}`} className="gallery-back">{t.back[lang]}</Link>
          <h1 className="gallery-title">{t.title[lang]}</h1>
        </div>
        <div className="gallery-grid">
          {photos.map((p, i) => (
            <button
              key={p.id || i}
              id={p.id}
              className="gallery-item"
              onClick={() => setOpen(i)}
              aria-label={p.alt[lang]}
            >
              <Image
                src={p.src}
                alt={p.alt[lang]}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                quality={80}
                style={{ objectFit: 'cover' }}
              />
              {p.label && <span className="gallery-item-label">{p.label[lang]}</span>}
            </button>
          ))}
        </div>
      </section>

      {open !== null && (
        <div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label={photos[open].alt[lang]}
          onClick={close}
          onTouchStart={e => { (window as unknown as { __x?: number }).__x = e.touches[0].clientX }}
          onTouchEnd={e => {
            const sx = (window as unknown as { __x?: number }).__x
            if (sx === undefined) return
            const dx = e.changedTouches[0].clientX - sx
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
          }}
        >
          <button className="lb-close" onClick={close} aria-label="Close">&times;</button>
          <button
            className="lb-nav lb-prev"
            onClick={e => { e.stopPropagation(); step(-1) }}
            aria-label="Previous"
          >&#8249;</button>

          <div className="lb-stage" onClick={e => e.stopPropagation()}>
            <Image
              src={photos[open].src}
              alt={photos[open].alt[lang]}
              fill
              sizes="100vw"
              quality={90}
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>

          <button
            className="lb-nav lb-next"
            onClick={e => { e.stopPropagation(); step(1) }}
            aria-label="Next"
          >&#8250;</button>

          <div className="lb-meta">
            {photos[open].label ? photos[open].label![lang] + ' \u00b7 ' : ''}
            {open + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  )
}
