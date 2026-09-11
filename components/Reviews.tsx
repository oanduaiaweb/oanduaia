'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { track } from '@/lib/analytics'
import { T } from '@/lib/translations'
import {
  REVIEW_SOURCES,
  REVIEW_QUOTES,
  translatedNote,
  WRITE_REVIEW_URL,
  formatScore,
  reviewCount,
} from '@/lib/reviews'
import { SOCIAL } from '@/lib/social'
import Stars from '@/components/Stars'

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
            {/*
              The stars repeat the number above them on purpose: the figure is exact and
              the stars are instant. Anyone scanning the row reads the shape first.
            */}
            {/*
              Wrapped, because the SVG cannot be the flex item itself. On the phone the
              card becomes a wrapping row, and forcing the stars onto their own line needs
              flex-basis:100% — which on the SVG would also stretch it to the card width,
              while clamping it with max-width stops the wrap from happening at all. The
              span takes the flex rules; the SVG inside keeps its own size.
            */}
            <span className="review-stars-line">
              <Stars
                id={src.id}
                score={src.score}
                outOf={src.outOf}
                label={`${formatScore(src.score, lang)} / ${src.outOf} — ${src.channel}`}
              />
            </span>
            <span className="review-count">{reviewCount(src.count, lang)}</span>
            <span className="review-go">{t.read[lang]}</span>
          </a>
        ))}
      </div>

      {/*
        The words, under the scores. A number tells you people were satisfied; a sentence
        tells you what they were satisfied BY — and these three were chosen because they
        answer different questions: the place, the food, and the sauna.
      */}
      <div className="quotes reveal reveal-delay-2">
        {REVIEW_QUOTES.map(q => (
          <figure key={q.id} className="quote">
            <blockquote className="quote-text">{q.text[lang]}</blockquote>
            <figcaption className="quote-by">
              <span className="quote-author">{q.author}</span>
              <span className="quote-meta">
                {q.when[lang]}
                {translatedNote(q.originalLang, lang) &&
                  ` · ${translatedNote(q.originalLang, lang)}`}
              </span>
            </figcaption>
          </figure>
        ))}
        <a
          className="quotes-source"
          href={SOCIAL.mapsPlace}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('review_source_click', { lang })}
        >
          {t.read[lang]} · Google
        </a>
      </div>

      <div className="reviews-write reveal reveal-delay-3">
        <p className="reviews-write-h">{t.writeH[lang]}</p>
        <p className="reviews-write-sub">{t.writeSub[lang]}</p>
        <a
          className="reviews-write-btn"
          href={WRITE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('review_click', { lang })}
        >
          {t.write[lang]}
        </a>
      </div>
    </section>
  )
}
