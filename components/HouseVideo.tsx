'use client'

import { useEffect, useRef, useState } from 'react'
import type { HouseVideo as Clip } from '@/lib/housePhotos'

/**
 * Keeps playing for as long as the page is open (Mikk, 29 Oct): it starts when first
 * scrolled near, so nothing is downloaded by visitors who never get that far, and from
 * then on it never pauses — not off screen, not while open full-screen, not after.
 *
 * iPhones refuse autoplay in Low Power Mode, and with reduced motion asked for we do not
 * try. Either way the tile shows a play button rather than a still frame that looks broken.
 * A tap anywhere opens it full-screen, and that tap is also what lets the tile itself play.
 */
export default function HouseVideo({ clip, label, onOpen }: {
  clip: Clip
  label: string
  /** Opens the clip full-screen in the shared lightbox, like a tap on a photograph. */
  onOpen: () => void
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    // Set as a property too: iOS checks the property, and React does not always set it.
    v.muted = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBlocked(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        v.play().catch(() => setBlocked(true))
      },
      { rootMargin: '200px 0px' }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const open = () => {
    // Inside the tap, so a phone that refused autoplay lets it start now.
    ref.current?.play().then(() => setBlocked(false)).catch(() => {})
    onOpen()
  }

  return (
    <div className="house-video-wrap">
      <video
        ref={ref}
        className="house-video"
        src={clip.src}
        poster={clip.poster}
        width={clip.width}
        height={clip.height}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
      <button type="button" className="house-video-open" onClick={open} aria-label={label}>
        {blocked && (
          <span className="house-video-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
          </span>
        )}
      </button>
    </div>
  )
}
