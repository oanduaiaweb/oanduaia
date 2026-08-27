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
  maps: (s: number) => (
    <svg width={s} height={s} viewBox="0 0 24 24" {...S}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
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
