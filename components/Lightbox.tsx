'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export type LightboxPhoto = {
  src: string
  alt: string
  label?: string
  /** Set for a clip: `src` is then the video file and this the still shown while it loads. */
  poster?: string
  video?: boolean
}

/**
 * The full-screen viewer, shared by the gallery and the house pages (Mikk, 24 Oct: the
 * house photographs should open big too, not only the gallery's). Arrow keys and swipe
 * step through; Escape, the × or a click on the backdrop closes.
 */
export default function Lightbox({ photos, index, onClose, onStep }: {
  photos: LightboxPhoto[]
  index: number
  onClose: () => void
  onStep: (d: number) => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onStep(1)
      else if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onStep])

  const p = photos[index]
  const clip = useRef<HTMLVideoElement>(null)

  // Started from here as well as by autoPlay: iOS honours an explicit play() after a tap
  // more readily than the attribute on an element that has just been created.
  useEffect(() => {
    clip.current?.play().catch(() => {})
  }, [index])

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={p.alt}
      onClick={onClose}
      onTouchStart={e => {
        // Not on the clip: a sideways drag there is scrubbing its timeline, not a swipe.
        (window as unknown as { __x?: number }).__x =
          (e.target as HTMLElement).tagName === 'VIDEO' ? undefined : e.touches[0].clientX
      }}
      onTouchEnd={e => {
        const sx = (window as unknown as { __x?: number }).__x
        if (sx === undefined) return
        const dx = e.changedTouches[0].clientX - sx
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1)
      }}
    >
      <button className="lb-close" onClick={onClose} aria-label="Close">&times;</button>
      <button
        className="lb-nav lb-prev"
        onClick={e => { e.stopPropagation(); onStep(-1) }}
        aria-label="Previous"
      >&#8249;</button>

      <div className="lb-stage" onClick={e => e.stopPropagation()}>
        {p.video ? (
          <video
            key={p.src}
            ref={clip}
            className="lb-video"
            src={p.src}
            poster={p.poster}
            aria-label={p.alt}
            autoPlay
            muted
            loop
            playsInline
            controls
          />
        ) : (
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="100vw"
            quality={90}
            priority
            style={{ objectFit: 'contain' }}
          />
        )}
      </div>

      <button
        className="lb-nav lb-next"
        onClick={e => { e.stopPropagation(); onStep(1) }}
        aria-label="Next"
      >&#8250;</button>

      <div className="lb-meta">
        {p.label ? p.label + ' · ' : ''}
        {index + 1} / {photos.length}
      </div>
    </div>
  )
}
