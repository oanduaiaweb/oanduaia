'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { FAQ } from '@/lib/i18n'

/**
 * The questions, on the page.
 *
 * Read from the same FAQ list that builds the FAQPage schema, so what a search engine
 * is told and what a visitor reads cannot drift apart — the usual failure of bolted-on
 * structured data is that someone edits the page and forgets the JSON-LD.
 *
 * Native <details>: open/close with no JavaScript, keyboard-operable for free, and the
 * answers are in the DOM whether or not they are expanded, which is what matters for a
 * crawler that does not click.
 */
/** How many questions stand open before the rest go behind the expander. */
const VISIBLE = 5

export default function Faq() {
  const { lang } = useLanguage()
  const t = T.faq

  return (
    <section className="faq-section" id="kkk">
      <div className="faq-inner">
        <div className="faq-head reveal">
          <p className="section-label">{t.label[lang]}</p>
          <h2 className="faq-heading">
            {t.h1[lang]}<br /><em>{t.h2em[lang]}</em>
          </h2>
        </div>

        <div className="faq-list reveal reveal-delay-1">
          {FAQ[lang].slice(0, VISIBLE).map(([q, a]) => (
            <details className="faq-item" key={q}>
              <summary className="faq-q">{q}</summary>
              <p className="faq-a">{a}</p>
            </details>
          ))}

          {/*
            The rest, behind one more <details>. Still native, still no JavaScript, and —
            the part that matters — every answer stays in the DOM whether the expander is
            open or not. A crawler does not click, and the same list builds the FAQPage
            schema, so anything dropped from here would be a promise the markup could not
            keep.
          */}
          {FAQ[lang].length > VISIBLE && (
            <details className="faq-more">
              <summary className="faq-more-q">{t.more[lang]}</summary>
              <div className="faq-more-list">
                {FAQ[lang].slice(VISIBLE).map(([q, a]) => (
                  <details className="faq-item" key={q}>
                    <summary className="faq-q">{q}</summary>
                    <p className="faq-a">{a}</p>
                  </details>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>
    </section>
  )
}
