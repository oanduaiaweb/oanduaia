'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { LANDINGS } from '@/lib/landing'
import HouseCompare from '@/components/HouseCompare'

/**
 * A topic landing page: lead, a few sections, the three houses side by side, then the
 * questions people actually ask an assistant, answered in a sentence or two each.
 *
 * The comparison table is shared with the home page rather than restated. A landing page
 * that repeats the front page in different words is a doorway page; one that gathers the
 * scattered answer to a single question is a page.
 */
export default function LandingPage({ id }: { id: string }) {
  const { lang } = useLanguage()
  const t = T.landing
  const l = LANDINGS.find(x => x.id === id)
  if (!l) return null

  return (
    <article className="landing">
      <header className="landing-hero">
        <Image src={l.photo} alt={l.photoAlt[lang]} fill priority sizes="100vw" quality={78}
          style={{ objectFit: 'cover' }} />
        <div className="landing-hero-scrim" aria-hidden="true" />
        <div className="landing-hero-text">
          <h1 className="landing-h1">{l.h1[lang]}</h1>
        </div>
      </header>

      <div className="landing-body">
        <p className="landing-lead">{l.lead[lang]}</p>

        {l.sections.map(sec => (
          <section className="landing-section reveal" key={sec.h.et}>
            <h2 className="landing-h2">{sec.h[lang]}</h2>
            {sec.p.map(par => <p key={par.et}>{par[lang]}</p>)}
          </section>
        ))}
      </div>

      <section className="landing-compare">
        <HouseCompare />
        <Link href={`/${lang}#broneeri`} className="landing-cta">{t.cta[lang]}</Link>
      </section>

      {/*
        Questions phrased the way someone types them into an assistant, each answered in
        a couple of sentences. That shape — question, then a short self-contained factual
        answer — is what gets extracted and quoted.
        
        Collapsed by default, like the FAQ on the home page: five open answers is a wall
        of text where a reader wants a list of questions to pick from. `<details>` keeps
        every answer in the DOM whether it is open or not, so nothing is hidden from a
        crawler — only from the eye.
      */}
      <section className="landing-qa">
        <div className="landing-qa-inner">
          <p className="section-label">{t.qaLabel[lang]}</p>
          <div className="faq-list">
            {l.qa.map(item => (
              <details className="faq-item" key={item.q.et}>
                <summary className="faq-q">{item.q[lang]}</summary>
                <p className="faq-a">{item.a[lang]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
