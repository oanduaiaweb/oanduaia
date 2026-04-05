'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

type Photo = { src: string; alt: string; id?: string; label?: Record<string, string> }

const housePhotos: Photo[] = [
  { src: '/images/saunamaja.jpg', alt: 'Saunamaja', id: 'saunamaja', label: { et: 'Saunamaja', en: 'Sauna House', ru: 'Банный дом' } },
  { src: '/images/tiigimaja.jpg', alt: 'Tiigimaja', id: 'tiigimaja', label: { et: 'Tiigimaja', en: 'Pond House', ru: 'Прудовой дом' } },
  { src: '/images/metsamaja.jpg', alt: 'Metsamaja', id: 'metsamaja', label: { et: 'Metsamaja', en: 'Forest House', ru: 'Лесной дом' } },
]

const galleryPhotos: Photo[] = [
  '/galerii/01.JPG', '/galerii/02.JPG', '/galerii/03.JPG', '/galerii/04.JPG',
  '/galerii/05.JPG', '/galerii/06.JPG', '/galerii/07.JPG', '/galerii/08.JPG',
  '/galerii/09.JPG', '/galerii/010.JPG', '/galerii/011.JPG', '/galerii/012.JPG',
  '/galerii/013.JPG', '/galerii/014.JPG', '/galerii/015.JPG', '/galerii/016.JPG',
  '/galerii/017.JPG', '/galerii/018.JPG', '/galerii/019.JPG', '/galerii/020.JPG',
  '/galerii/021.JPG', '/galerii/022.JPG', '/galerii/023.JPG', '/galerii/024.JPG',
  '/galerii/025.JPG', '/galerii/026.JPG', '/galerii/027.JPG', '/galerii/028.JPG',
  '/galerii/029.JPG', '/galerii/030.JPG', '/galerii/031.JPG', '/galerii/032.JPG',
  '/galerii/033.jpeg', '/galerii/034.jpeg', '/galerii/035.jpeg', '/galerii/036.jpeg',
  '/galerii/037.jpeg', '/galerii/038.jpeg', '/galerii/039.jpeg', '/galerii/040.jpeg',
  '/galerii/041.jpeg', '/galerii/042.jpeg', '/galerii/043.jpeg', '/galerii/044.jpeg',
  '/galerii/045.jpeg', '/galerii/046.jpeg', '/galerii/047.jpeg', '/galerii/048.jpeg',
  '/galerii/049.jpeg', '/galerii/050.jpeg', '/galerii/051.jpeg', '/galerii/052.jpeg',
  '/galerii/053.jpeg', '/galerii/054.jpeg', '/galerii/055.jpeg', '/galerii/056.jpeg',
  '/galerii/057.jpeg', '/galerii/058.jpeg', '/galerii/059.jpeg', '/galerii/060.jpeg',
  '/galerii/061.jpeg', '/galerii/062.jpeg', '/galerii/063.jpeg', '/galerii/064.jpeg',
  '/galerii/065.jpeg', '/galerii/066.jpeg', '/galerii/067.jpeg', '/galerii/068.jpeg',
  '/galerii/069.jpeg', '/galerii/070.jpeg', '/galerii/071.jpeg', '/galerii/072.jpeg',
  '/galerii/073.jpeg', '/galerii/074.jpeg', '/galerii/075.jpeg', '/galerii/076.jpeg',
  '/galerii/077.jpeg', '/galerii/078.jpeg', '/galerii/079.jpeg', '/galerii/080.jpeg',
  '/galerii/081.jpeg', '/galerii/082.jpeg', '/galerii/083.jpeg', '/galerii/084.jpeg',
  '/galerii/086.jpeg', '/galerii/087.jpeg', '/galerii/088.jpeg', '/galerii/089.jpeg',
  '/galerii/090.jpeg', '/galerii/091.jpeg', '/galerii/092.jpeg', '/galerii/093.jpeg',
  '/galerii/094.jpeg',
].map((src, i) => ({ src, alt: `Oanduaia ${i + 1}` }))

const photos = [...housePhotos, ...galleryPhotos]

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
          {photos.map((p, i) => (
            <div key={p.id || i} id={p.id} className="gallery-item">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                quality={80}
                style={{ objectFit: 'cover' }}
              />
              {p.label && <span className="gallery-item-label">{p.label[lang]}</span>}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
