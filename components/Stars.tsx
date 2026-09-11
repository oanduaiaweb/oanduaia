/**
 * Five stars, filled to the fraction a score actually earned.
 *
 * Booking.com scores out of 10 and Google out of 5, so the fill is `score / outOf` — a
 * 9.7 fills 97% of the row, which lands 85% of the way through the fifth star. It is NOT
 * rounded: rounding 9.6 up to five full stars would be a nicer picture and a false one,
 * and the score is not ours to round.
 *
 * HOW THE PARTIAL FILL WORKS, and how it does not:
 * the obvious approach is a linearGradient with two stops at the same offset, and it is
 * wrong here. A `userSpaceOnUse` gradient resolves in the user space of the element that
 * references it, which is AFTER any transform on that element — so with each star in its
 * own `<g transform="translate(…)">`, every star received the whole 0→120 ramp in its own
 * local space and came out solid gold. All three cards rendered identically.
 *
 * So instead: draw five empty stars, then lay ONE rect over them, `width` set to the
 * percentage, clipped to the five star shapes. The rect lives in the root user space and
 * is never transformed, so the cut lands exactly where the arithmetic says.
 *
 * Visual only. These scores stay out of the structured data — presenting someone else's
 * review score as your own `aggregateRating` is what Google issues manual actions for.
 * See the note in lib/reviews.ts.
 */
type Props = {
  /** The score as published by the channel. */
  score: number
  /** The channel's scale — 10 for Booking.com, 5 for Google. */
  outOf: number
  /** Unique per card: SVG clipPath ids are document-global. */
  id: string
  /** Read out instead of the stars, which are decoration to a screen reader. */
  label: string
}

const STAR =
  'M12 2.7l2.88 5.83 6.44.94-4.66 4.54 1.1 6.41L12 17.4l-5.76 3.02 1.1-6.41L2.68 9.47l6.44-.94z'
const OFFSETS = [0, 24, 48, 72, 96]
const ROW = 120

export default function Stars({ score, outOf, id, label }: Props) {
  const frac = Math.max(0, Math.min(1, score / outOf))
  const cid = `starclip-${id}`

  return (
    <svg
      className="review-stars"
      viewBox={`0 0 ${ROW} 24`}
      role="img"
      aria-label={label}
      focusable="false"
    >
      <defs>
        <clipPath id={cid}>
          {OFFSETS.map(x => (
            <path key={x} d={STAR} transform={`translate(${x} 0)`} />
          ))}
        </clipPath>
      </defs>

      {/* The empty state, always drawn, so an unfilled star is still a star. */}
      {OFFSETS.map(x => (
        <path key={x} d={STAR} transform={`translate(${x} 0)`} className="review-star-bg" />
      ))}

      {/* The earned portion, cut to the star shapes. */}
      <rect
        x="0"
        y="0"
        width={ROW * frac}
        height="24"
        className="review-star-fill"
        clipPath={`url(#${cid})`}
      />
    </svg>
  )
}
