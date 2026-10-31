'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { HOUSE_IMAGES } from '@/lib/houses'
import { HOUSE_GALLERIES, HOUSE_VIDEOS } from '@/lib/housePhotos'
import HouseVideo from '@/components/HouseVideo'
import Lightbox from '@/components/Lightbox'
import { LastChanceNotice } from '@/components/LastChance'

/**
 * One house, on its own page. The three houses are what is actually sold, and until now
 * they lived only as bands on the homepage with nowhere of their own to rank.
 *
 * Every fact here already exists in `translations.ts` — this page re-presents published
 * copy rather than introducing new claims about the houses.
 */
export default function House({ slug }: { slug: string }) {
  const { lang } = useLanguage()
  const [open, setOpen] = useState<number | null>(null)
  const t = T.housePage
  const f = T.feature
  const house = f.houses.find(h => h.slug === slug)
  const photos = HOUSE_GALLERIES[slug as keyof typeof HOUSE_GALLERIES] ?? []
  const clip = HOUSE_VIDEOS[slug as keyof typeof HOUSE_VIDEOS]
  // Hooks before the early return below.
  const close = useCallback(() => setOpen(null), [])
  // The clip, when there is one, opens in the same viewer as item 0, ahead of the photographs.
  const offset = clip ? 1 : 0
  const total = photos.length + offset
  const step = useCallback((d: number) => {
    setOpen(o => (o === null ? o : (o + d + total) % total))
  }, [total])
  if (!house) return null

  const img = HOUSE_IMAGES[slug]
  const others = f.houses.filter(h => h.slug !== slug)

  return (
    <article className="house-page">
      <header className="house-hero">
        {img && (
          <Image
            src={img.src}
            alt={img.alt[lang]}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={80}
            style={{ objectFit: 'cover', objectPosition: img.focus ?? 'center' }}
          />
        )}
        <div className="house-hero-scrim" aria-hidden="true" />
        <div className="house-hero-text">
          <p className="house-hero-eyebrow">{t.eyebrow[lang]}</p>
          <h1 className="house-hero-name">{house.name[lang]}</h1>
        </div>
      </header>

      <LastChanceNotice slug={slug} />

      <div className="house-body">
        <div className="house-main">
          <p className="house-facts-label">{t.facts[lang]}</p>
          <ul className="house-facts">
            {house.items.map(item => (
              <li key={item.et}>{item[lang].replace(/ · /g, ', ')}</li>
            ))}
          </ul>
          {house.build && <p className="house-build">{house.build[lang]}</p>}

          {/*
            Prose, because a photograph is not indexable and this is the page that has to
            rank for "sauna cabin Lahemaa". What the house is, who it suits, what is
            around it — all of it already true elsewhere on the site.
          */}
          {house.body && (
            <div className="house-body-copy">
              {house.body.map(par => <p key={par.et}>{par[lang]}</p>)}
            </div>
          )}

          {/*
            No "Vaata pilte" here. It used to send you to the whole-property gallery, then
            to #pildid once each house had its own photographs — but #pildid is now the
            next thing on the page. A button whose only job is to scroll you to what you
            were about to reach anyway is furniture. The home-page cards keep theirs:
            there it crosses a page boundary and earns its place.
          */}
        </div>

        <aside className="house-rates">
          <p className="hp-label">{f.priceLabel[lang]}</p>
          <dl className="hp-list">
            {house.prices.map(p => (
              <div className="hp-row" key={p.guests.et}>
                <dt>{p.guests[lang]}</dt>
                <dd>
                  {`${p.eur} €`}
                  <span className="hp-unit">{` / ${f.priceUnit[lang]}`}</span>
                </dd>
              </div>
            ))}
          </dl>
          {house.priceExtra && <p className="hp-extra">{house.priceExtra[lang]}</p>}
          <p className="hp-note">{f.priceNote[lang]}</p>
        </aside>
      </div>

      {/*
        Laid out in columns rather than a grid of equal tiles: these are portraits and
        landscapes mixed, and a fixed tile would crop the height out of the standing ones.
        Every photograph is shown whole.
      */}
      {photos.length > 0 && (
        <section className="house-photos" id="pildid" aria-label={t.photos[lang]}>
          <p className="house-photos-label">{t.photos[lang]}</p>
          <div className="house-photos-grid">
            {clip && (
              <figure className="house-photo house-photo--video">
                <HouseVideo clip={clip} label={clip.label[lang]} onOpen={() => setOpen(0)} />
              </figure>
            )}
            {photos.map((ph, i) => (
              <figure className="house-photo" key={ph.src}>
                <button
                  type="button"
                  className="house-photo-open"
                  onClick={() => setOpen(i + offset)}
                  aria-label={ph.alt[lang]}
                >
                <Image
                  src={ph.src}
                  /*
                   * Prefixed with the house name. On the page the context is obvious, but
                   * an alt attribute is read context-free by image search, where "the
                   * kitchen island on a brick base" belongs to no particular building.
                   * Skipped where the description already names the house, so nothing
                   * reads "Sauna House — the Sauna House on an autumn evening".
                   */
                  alt={
                    ph.alt[lang].toLowerCase().includes(house.name[lang].toLowerCase())
                      ? ph.alt[lang]
                      : `${house.name[lang]} — ${ph.alt[lang].charAt(0).toLowerCase()}${ph.alt[lang].slice(1)}`
                  }
                  width={800}
                  height={1000}
                  sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 30vw"
                  quality={82}
                  style={{ width: '100%', height: 'auto' }}
                />
                </button>
              </figure>
            ))}
          </div>
        </section>
      )}

      {open !== null && (
        <Lightbox
          photos={[
            ...(clip
              ? [{ src: clip.src, poster: clip.poster, video: true, alt: clip.label[lang], label: house.name[lang] }]
              : []),
            ...photos.map(ph => ({ src: ph.src, alt: ph.alt[lang], label: house.name[lang] })),
          ]}
          index={open}
          onClose={close}
          onStep={step}
        />
      )}

      <nav className="house-others" aria-label={t.otherH[lang]}>
        <p className="house-others-label">{t.otherH[lang]}</p>
        <div className="house-others-links">
          {others.map(o => (
            <Link key={o.slug} href={`/${lang}/majad/${o.slug}`} className="house-others-link">
              <span className="house-others-name">{o.name[lang]}</span>
            </Link>
          ))}
        </div>
        <Link href={`/${lang}#majad`} className="house-back">{t.back[lang]}</Link>
      </nav>
    </article>
  )
}
