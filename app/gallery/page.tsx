'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

const photos = [
  { src: '/images/saunamaja.jpg', alt: 'Saunamaja', id: 'saunamaja', label: { et: 'Saunamaja', en: 'Sauna House', ru: 'Банный дом' } },
  { src: '/images/tiigimaja.jpg', alt: 'Tiigimaja', id: 'tiigimaja', label: { et: 'Tiigimaja', en: 'Pond House', ru: 'Прудовой дом' } },
  { src: '/images/metsamaja.jpg', alt: 'Metsamaja', id: 'metsamaja', label: { et: 'Metsamaja', en: 'Forest House', ru: 'Лесной дом' } },
]

export default function Gallery() {
  const { lang } = useLanguage()
  const t = T.gallery

  useEffect(() => {
    document.body.classList.add('gallery-page')
    return () => document.body.classList.remove('gallery-page')
  }, [])

  return (
    <>
      <Nav />
      <section className="gallery-photos">
        <div className="gallery-header">
          <Link href="/" className="gallery-back">{t.back[lang]}</Link>
          <h1 className="gallery-title">{t.title[lang]}</h1>
        </div>
        <div className="gallery-grid">
          {photos.map((p) => (
            <div key={p.id} id={p.id} className="gallery-item">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                quality={80}
                style={{ objectFit: 'cover' }}
              />
              <span className="gallery-item-label">{p.label[lang]}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
