'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

/**
 * Six reasons, between the houses and the questions.
 *
 * Every line here is a fact stated elsewhere on the site — the whole-house rental, the
 * wood-fired sauna, the trails, the absent WiFi. Nothing new is promised. It exists
 * because someone skimming will never read three paragraphs of story, and a search
 * engine reads a heading and a definition list far more easily than prose.
 *
 * The icons are drawn inline rather than pulled from a set: six shapes at one stroke
 * weight, in the site's own line, and no icon font to load for six glyphs.
 */
const ICONS: Record<string, React.ReactNode> = {
  house: <><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9.5h13V10" /></>,
  flame: <><path d="M12 3s4.5 4.2 4.5 8a4.5 4.5 0 0 1-9 0c0-1.6.8-3 1.6-4" /><path d="M12 20.5c-1.7 0-3-1.1-3-2.6 0-1.9 3-4.4 3-4.4s3 2.5 3 4.4c0 1.5-1.3 2.6-3 2.6z" /></>,
  tree: <><path d="M12 3 6.5 11h3L5 17h14l-4.5-6h3L12 3z" /><path d="M12 17v4" /></>,
  trail: <><path d="M4 20c3-1.5 3.5-5 1.5-7S3 8 5 5.5" /><path d="M13 20c2.5-2 2-5.5 0-7.5s-1.5-4 1-6" /><path d="M19 20c1.5-1.5 1.5-3.5.5-4.5" /></>,
  bowl: <><path d="M3.5 11h17a8.5 8.5 0 0 1-17 0z" /><path d="M12 8V5" /><path d="M2 20h20" /></>,
  quiet: <><path d="M3 3l18 18" /><path d="M5.5 9.5a11 11 0 0 1 3.2-2" /><path d="M2 6.5a15 15 0 0 1 5-3.2" /><path d="M9 13a6 6 0 0 1 2-1.3" /><path d="M12 18h.01" /></>,
}

export default function Why() {
  const { lang } = useLanguage()
  const t = T.why

  return (
    <section className="why-section" id="miks">
      {/*
        The outdoor kitchen behind the six reasons, so the section is not a flat panel
        of linen. A still photograph rather than one of the drifting strips: six items
        of reading text is more to read than the story block, not less, and that one
        already had to be slowed to half speed to stop it pulling the eye off the line.
      */}
      <div className="why-bg" aria-hidden="true">
        <Image
          src="/galerii/kasvuhoone-valikook.jpeg"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          style={{ objectFit: 'cover', objectPosition: '50% 58%' }}
        />
        <div className="why-scrim" />
      </div>
      <div className="why-inner">
        <div className="why-head reveal">
          <p className="section-label">{t.label[lang]}</p>
          <h2 className="why-heading">
            {t.h1[lang]}<br /><em>{t.h2em[lang]}</em>
          </h2>
        </div>

        <ul className="why-grid">
          {t.items.map((it, i) => (
            <li key={it.icon} className={`why-item reveal${i % 3 ? ` reveal-delay-${i % 3}` : ''}`}>
              <svg
                className="why-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICONS[it.icon]}
              </svg>
              <h3 className="why-item-title">{it.t[lang]}</h3>
              <p className="why-item-desc">{it.d[lang]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
