'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { REVIEW_SOURCES, WRITE_REVIEW_URL, formatScore, reviewCount } from '@/lib/reviews'

/**
 * Replaces the single pulled quote that used to sit here. One flattering line, chosen by
 * us, says less than three scores a guest can go and check — and it left the other two
 * listings invisible.
 */
export default function Reviews() {
  const { lang } = useLanguage()
  const t = T.reviews

  return (
    <section className="reviews-section" id="arvustused">
      <p className="reviews-eyebrow">{t.label[lang]}</p>
      <h2 className="reviews-heading reveal">
        {t.h1[lang]} <em>{t.h2em[lang]}</em>
      </h2>
      <p className="reviews-sub reveal reveal-delay-1">{t.sub[lang]}</p>

      <div className="reviews-grid reveal reveal-delay-2">
        {REVIEW_SOURCES.map(src => (
          <a
            key={src.id}
            className="review-card"
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="review-channel">
              {src.channel}
              {src.place && <span className="review-place">{src.place}</span>}
            </span>
            <span className="review-score">
              {formatScore(src.score, lang)}
              <span className="review-outof">{` / ${src.outOf}`}</span>
            </span>
            <span className="review-count">{reviewCount(src.count, lang)}</span>
            <span className="review-go">{t.read[lang]}</span>
          </a>
        ))}
      </div>

      <div className="reviews-write reveal reveal-delay-3">
        <p className="reviews-write-h">{t.writeH[lang]}</p>
        <p className="reviews-write-sub">{t.writeSub[lang]}</p>
        <a
          className="reviews-write-btn"
          href={WRITE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.write[lang]}
        </a>
      </div>
    </section>
  )
}
