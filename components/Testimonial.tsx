'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

export default function Testimonial() {
  const { lang } = useLanguage()
  const t = T.testimonial
  return (
    <section className="testimonial-section">
      <p className="testimonial-rating">{t.rating[lang]}</p>
      <blockquote className="testimonial-quote reveal">
        &ldquo;{t.quote[lang]}&rdquo;
      </blockquote>
      <p className="testimonial-author">{t.author[lang]}</p>
    </section>
  )
}
