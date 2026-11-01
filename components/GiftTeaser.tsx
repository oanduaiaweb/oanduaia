'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { track } from '@/lib/analytics'
import { G } from '@/lib/gift'

/** A quiet band on the homepage pointing to /gift — placed after the reviews, where trust is highest. */
export default function GiftTeaser() {
  const { lang } = useLanguage()
  return (
    <section className="gift-teaser" aria-labelledby="gift-teaser-h">
      <div>
        <p className="section-label">{G.label[lang]}</p>
        <h2 id="gift-teaser-h" className="gift-teaser-h">{G.title[lang]}</h2>
        <p className="gift-teaser-text">{G.teaser[lang]}</p>
      </div>
      <Link href={`/${lang}/gift`} className="btn-primary gift-teaser-cta"
        onClick={() => track('gift_teaser', { lang })}>{G.cta[lang]}</Link>
    </section>
  )
}
