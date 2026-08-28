import { SOCIAL } from '@/lib/social'

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export const SOCIAL_ICONS = {
  instagram: (s: number) => (
    <svg width={s} height={s} viewBox="0 0 24 24" {...S}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  facebook: (s: number) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 8.5V6.9c0-.7.2-1.1 1.2-1.1H16.6V3.1A17 17 0 0 0 14.7 3C12.6 3 11.1 4.3 11.1 6.6V8.5H8.8V11.3h2.3V21h2.9V11.3h2.3l.4-2.8H14z" />
    </svg>
  ),
  booking: (s: number) => (
    <svg width={s} height={s} viewBox="0 0 3.036 3.037" fill="currentColor">
      <path d="M1.113 2.524h-.51v-.61c0-.13.05-.2.162-.214h.35a.38.38 0 0 1 .41.411c0 .26-.157.415-.41.415zM.602.875v-.16c0-.14.06-.208.19-.216h.262c.224 0 .36.134.36.36 0 .17-.092.37-.35.37h-.46zm1.164.61l-.092-.052.08-.07c.094-.08.25-.262.25-.575 0-.48-.372-.79-.947-.79h-.73a.32.32 0 0 0-.309.317v2.72H1.07c.64 0 1.052-.348 1.052-.888 0-.29-.133-.54-.358-.665" />
      <path d="M2.288 2.67c0-.203.163-.367.365-.367s.367.164.367.367-.164.367-.367.367-.365-.164-.365-.367" />
    </svg>
  ),
  /**
   * Estonia, rather than a generic pin. Filled rather than stroked: at 22px a country
   * outline in a 1.8px stroke reads as noise, while the silhouette still reads as a map.
   *
   * The mainland traces the real coast — the north shore, the Narva corner, the western
   * bite of Lake Peipus, the southern border, the Gulf of Riga — and Saaremaa and Hiiumaa
   * sit off the west coast where they belong. Longitude is scaled against latitude by the
   * cosine of 58.7°N, so the country keeps its true proportions instead of being stretched
   * flat by an equirectangular projection.
   */
  maps: (s: number) => (
    <svg width={s} height={s} viewBox="-1 -1 26 18" fill="currentColor" aria-hidden="true">
      <path d="M6.4 5.4 6.7 3.4 10.9 2.3 14.2 1.4 17.5 2.1 22.9 2.3 23.6 3.6 21.2 7.0 20.8 11.2 21.5 13.3 17.4 15.3 13.2 13.4 10.6 14.1 10.5 10.6 7.8 9.9 6.7 7.6Z" />
      <ellipse cx="3.6" cy="9.9" rx="2.6" ry="1.7" />
      <ellipse cx="4.1" cy="5.9" rx="1.5" ry="0.85" />
    </svg>
  ),
} as const

const ORDER = [
  ['instagram', 'Instagram', SOCIAL.instagram],
  ['facebook', 'Facebook', SOCIAL.facebook],
  ['booking', 'Booking.com', SOCIAL.booking],
  ['maps', 'Google Maps', SOCIAL.maps],
] as const

export default function SocialRow({ className = '', itemClassName = '', size = 22 }) {
  return (
    <div className={className}>
      {ORDER.map(([key, label, href]) => (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={itemClassName} aria-label={label}>
          {SOCIAL_ICONS[key](size)}
        </a>
      ))}
    </div>
  )
}
