'use client'

import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

const photos = [
  { src: '/images/tiik.jpg',    alt: 'Oandu tiik' },
  { src: '/images/hero.jpg',    alt: 'Lahemaa mets' },
  { src: '/images/feature.jpg', alt: 'Oanduaia' },
]

export default function Gallery() {
  const { lang } = useLanguage()
  const t = T.gallery
  return (
    <>
      <Nav />
      <main className="gallery-page">
        <div className="gallery-header">
          <Link href="/" className="gallery-back">{t.back[lang]}</Link>
          <h1 className="gallery-title">{t.title[lang]}</h1>
        </div>
        <div className="gallery-grid">
          {photos.map((p, i) => (
            <div key={i} className="gallery-item">
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" quality={80} style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
