'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { REVIEW_SOURCES } from '@/lib/reviews'

const score = (n: number, lang: string) => (lang === 'en' ? n.toFixed(1) : n.toFixed(1).replace('.', ','))

/** The reassurance under a booking button: free to ask, quick reply, free cancellation, ratings. */
export default function TrustLine() {
  const { lang } = useLanguage()
  const google = REVIEW_SOURCES.find(r => r.id === 'google')
  const booking = REVIEW_SOURCES.filter(r => r.channel === 'Booking.com').sort((a, b) => b.score - a.score)[0]
  return (
    <div className="trust-line">
      <p className="trust-points">
        {T.availability.trust[lang].split(' · ').map(p => <span key={p}>{p}</span>)}
      </p>
      <p className="trust-rating">
        {google && <span>★ {score(google.score, lang)} Google</span>}
        {booking && <span>{score(booking.score, lang)} Booking.com</span>}
      </p>
    </div>
  )
}
