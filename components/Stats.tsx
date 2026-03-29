'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

const nums = ['9.6', '822', '6', '4']

export default function Stats() {
  const { lang } = useLanguage()
  const t = T.stats
  const labels = [t.l1, t.l2, t.l3, t.l4]
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
