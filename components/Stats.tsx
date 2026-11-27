'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { REVIEW_SOURCES, formatScore } from '@/lib/reviews'

/* The Booking.com score is read from lib/reviews.ts, so the weekly update moves it too. It said 9.6 after both listings reached 9.7. */
const booking = Math.max(...REVIEW_SOURCES.filter(r => r.channel === 'Booking.com').map(r => r.score))

export default function Stats() {
  const { lang } = useLanguage()
  const t = T.stats
  const labels = [t.l1, t.l2, t.l3, t.l4]
  const nums = [formatScore(booking, lang), '3', '370', '100']
  return (
    <section className="stats-section">
      {nums.map((num, i) => (
        <div key={num} className={`stat-item reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}>
          <p className="stat-num">{num}</p>
          <p className="stat-label">{labels[i][lang]}</p>
        </div>
      ))}
    </section>
  )
}
