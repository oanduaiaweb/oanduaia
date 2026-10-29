'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Lightbox from '@/components/Lightbox'
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


  return (
    <>
      <Nav />
      <section className="gallery-photos">
        <div className="gallery-header">
          <Link href={`/${lang}`} className="gallery-back">{t.back[lang]}</Link>
          <h1 className="gallery-title">{t.title[lang]}</h1>
          {/*
            One sentence, because the page was 43 indexable words — a hundred photographs
            and almost no text. It names the houses, the sauna, the park and the village,
            which is what someone would have to type to find a picture of any of them.
          */}
          <p className="gallery-intro">{T.gallery.intro[lang]}</p>
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
        <Lightbox
          photos={photos.map(p => ({ src: p.src, alt: p.alt[lang], label: p.label?.[lang] }))}
          index={open}
          onClose={close}
          onStep={step}
        />
      )}
    </>
  )
}
