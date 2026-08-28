import Image from 'next/image'

/**
 * A slow drift of photographs behind a section heading.
 *
 * Decorative, so `aria-hidden` and empty alt — everything shown here is named and
 * linked elsewhere on the page, and a screen reader gaining a dozen unlabelled
 * photographs would only be reading the same things twice.
 *
 * The list is rendered twice: the track animates between -50% and 0, and at -50% the
 * second copy stands exactly where the first began, so the seam never lands.
 */
export default function PhotoStrip({
  photos,
  reverse = false,
  variant = 'dark',
}: {
  photos: string[]
  /** Right to left instead of left to right. */
  reverse?: boolean
  /**
   * Which section colour the strip has to disappear into at its edges. `plain` also
   * drops the veil: use it where the photographs are the point rather than the ground.
   */
  variant?: 'dark' | 'light' | 'plain'
}) {
  const frames = [...photos, ...photos]

  return (
    <div
      className={`photo-strip photo-strip--${variant}${reverse ? ' photo-strip--reverse' : ''}`}
      aria-hidden="true"
    >
      <div className="photo-strip-track">
        {frames.map((src, i) => (
          <div className="photo-strip-frame" key={`${src}-${i}`}>
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
      <div className="photo-strip-scrim" />
    </div>
  )
}
