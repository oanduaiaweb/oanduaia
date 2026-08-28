import Image from 'next/image'
import { HOUSE_STRIP } from '@/lib/houseStrip'

/**
 * A slow drift of the houses behind the accommodation heading.
 *
 * Decorative, so `aria-hidden` and empty alt — the houses are named and linked in
 * the bands directly below, and a screen reader gaining six unlabelled photographs
 * here would only be reading the same three buildings twice.
 *
 * The list is rendered twice: the track animates from -50% to 0, and at -50% the
 * second copy sits exactly where the first began, so the seam never lands.
 */
export default function HouseStrip() {
  const frames = [...HOUSE_STRIP, ...HOUSE_STRIP]

  return (
    <div className="house-strip" aria-hidden="true">
      <div className="house-strip-track">
        {frames.map((src, i) => (
          <div className="house-strip-frame" key={`${src}-${i}`}>
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 700px) 60vw, 34vw"
              quality={55}
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
      <div className="house-strip-scrim" />
    </div>
  )
}
