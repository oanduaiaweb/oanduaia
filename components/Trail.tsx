'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { TRAILS, trailKm } from '@/lib/trails'

/**
 * One trail, one page.
 *
 * Every figure here is RMK's, taken from their page for that trail — the distances on
 * this site were all wrong until they were checked against it, and a trail length is
 * something people set out on. The one number that is ours is the walking time, and it
 * is written as an estimate because that is what it is.
 *
 * The photographs are Lahemaa, not necessarily that trail, and the captions say so.
 * Putting an unlabelled photograph on a trail page implies it is that trail, and we do
 * not have photographs of all six.
 */
export default function Trail({ slug }: { slug: string }) {
  const { lang } = useLanguage()
  const t = T.trailPage
  const trail = TRAILS.find(x => x.slug === slug)
  if (!trail) return null
  const others = TRAILS.filter(x => x.slug !== slug)

  return (
    <article className="trail-page">
      <header className="trail-hero">
        <Image
          src={trail.photo}
          alt={trail.photoAlt[lang]}
          fill
          priority
          sizes="100vw"
          quality={78}
          style={{ objectFit: 'cover' }}
        />
        <div className="trail-hero-scrim" aria-hidden="true" />
        <div className="trail-hero-text">
          <p className="trail-hero-eyebrow">{t.eyebrow[lang]}</p>
          <h1 className="trail-hero-name">{trail.name[lang]}</h1>
        </div>
      </header>

      <div className="trail-body">
        <div className="trail-main">
          {trail.body.map(p => <p key={p.et}>{p[lang]}</p>)}

          <div className="trail-links">
            <a className="trail-link" href={trail.rmk} target="_blank" rel="noopener noreferrer">
              {t.rmkLink[lang]}
            </a>
            {trail.link && (
              <a className="trail-link" href={trail.link.href} target="_blank" rel="noopener noreferrer">
                {trail.link.label[lang]}
                <span className="trail-link-meta">{trail.link.meta}</span>
              </a>
            )}
          </div>
        </div>

        <aside className="trail-facts">
          <dl className="trail-facts-list">
            <div><dt>{t.length[lang]}</dt><dd>{trailKm(trail, lang)} {t.km[lang]}</dd></div>
            <div><dt>{t.difficulty[lang]}</dt><dd>{trail.difficulty[lang]}</dd></div>
            <div><dt>{t.duration[lang]}</dt><dd>{trail.hours[lang]}</dd></div>
            <div><dt>{t.startPoint[lang]}</dt><dd>{trail.start[lang]}</dd></div>
            <div><dt>{t.season[lang]}</dt><dd>{trail.season[lang]}</dd></div>
          </dl>
          <p className="trail-facts-note">{t.source[lang]}</p>
        </aside>
      </div>

      {/*
        The reason this page exists commercially. Someone planning a walk in Lahemaa is
        earlier in the trip than someone searching for accommodation, and this is where
        the two meet.
      */}
      <section className="trail-stay">
        <p className="trail-stay-text">{t.stay[lang]}</p>
        <Link href={`/${lang}#majad`} className="trail-stay-cta">{t.stayCta[lang]}</Link>
      </section>

      <nav className="trail-others" aria-label={t.otherTrails[lang]}>
        <p className="trail-others-label">{t.otherTrails[lang]}</p>
        <div className="trail-others-links">
          {others.map(o => (
            <Link key={o.slug} href={`/${lang}/rajad/${o.slug}`} className="trail-others-link">
              <span className="trail-others-km">{trailKm(o, lang)} {t.km[lang]}</span>
              <span className="trail-others-name">{o.name[lang]}</span>
            </Link>
          ))}
        </div>
        <Link href={`/${lang}#loodus`} className="trail-back">{t.back[lang]}</Link>
      </nav>
    </article>
  )
}
