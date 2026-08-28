'use client'

import { useEffect, useRef, useState } from 'react'
// Statically, not with a runtime import(): bundlers resolve CSS at build time, and
// `await import('leaflet/dist/leaflet.css')` throws in the browser, which left the map
// container mounted and permanently empty with nothing in the console.
import 'leaflet/dist/leaflet.css'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { SOCIAL } from '@/lib/social'

const LAT = 59.5601919
const LON = 26.1067858

/**
 * A real, pannable map on the Maa- ja Ruumiamet base layer — the same one RMK draws its
 * routes on.
 *
 * The Leaflet library is imported inside an effect, so the 42KB is fetched only when
 * someone actually scrolls to the map. On a page that already carries three photograph
 * strips and a hundred images, a map library nobody has looked at is not worth a byte of
 * the initial load. Its stylesheet has to come in statically — see the import above.
 *
 * The tiles are TMS: Maa-amet counts Y from the bottom, and plain XYZ coordinates 404.
 * Leaflet has `tms: true` for exactly this. Their tiles stop at zoom 18.
 *
 * Attribution is Leaflet's own control rather than a bar across the picture. It is still
 * constantly visible, which is what the terms require, but it sits in the corner like a
 * source credit instead of like a watermark.
 */
export default function LocationMap() {
  const { lang } = useLanguage()
  const t = T.trails
  const holder = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  /*
   * Deferred to idle rather than gated on scrolling into view. An IntersectionObserver
   * gate was tried first and never fired, leaving a correctly sized, permanently empty
   * box and nothing in the console — a silent failure is worse than an early fetch.
   * requestIdleCallback keeps the 42KB off the critical path without depending on an
   * event that might not arrive.
   */
  useEffect(() => {
    const go = () => setReady(true)
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number }
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(go)
      return () => (window as Window & { cancelIdleCallback?: (h: number) => void })
        .cancelIdleCallback?.(id)
    }
    const t = setTimeout(go, 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!ready || !holder.current) return
    let map: import('leaflet').Map | undefined
    let cancelled = false

    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled || !holder.current) return

      map = L.map(holder.current, {
        center: [LAT, LON],
        zoom: 15,
        minZoom: 9,
        maxZoom: 18,
        // The page scrolls; a wheel over the map should scroll it too, not zoom by
        // surprise. Ctrl/⌘+wheel and the +/- buttons still zoom, and so does a pinch.
        scrollWheelZoom: false,
        attributionControl: true,
      })

      L.tileLayer('https://tiles.maaamet.ee/tm/tms/1.0.0/kaart@GMC/{z}/{x}/{y}.png', {
        tms: true,
        minZoom: 9,
        maxZoom: 18,
        attribution:
          'Aluskaart: <a href="https://maaamet.ee" target="_blank" rel="noopener noreferrer">Maa- ja Ruumiamet</a>',
      }).addTo(map)

      // A ring, not a pin — Leaflet's default marker needs image assets we would
      // otherwise have to ship and path-fix, and the ring matches the static map.
      L.circleMarker([LAT, LON], {
        radius: 13,
        color: '#3a4a35',
        weight: 3,
        fillColor: '#f0ebe0',
        fillOpacity: 0.25,
      })
        .addTo(map)
        .bindPopup('<strong>Oanduaia</strong><br>Oandu, Lääne-Virumaa')
    })()

    return () => { cancelled = true; map?.remove() }
  }, [ready])

  return (
    /*
     * Deliberately not a `.reveal`. The fade-in and the lazy map init are two async
     * behaviours on one element, and together they left the block stuck at opacity 0
     * with the `.visible` class already applied and the winning rule saying 1 — a map
     * that had loaded its tiles perfectly and could not be seen. A map should just be
     * there.
     */
    <div className="trails-map-block">
      <p className="section-label">{t.mapLabel[lang]}</p>
      <div className="trails-map" ref={holder} role="application" aria-label={t.mapAlt[lang]} />
      <div className="trails-map-links">
        <a className="trail-link" href={SOCIAL.maps} target="_blank" rel="noopener noreferrer">
          {t.mapOpen[lang]}
        </a>
        <a className="trail-link" href="/images/map-oandu.png" download="oanduaia-kaart.png">
          {t.mapDownload[lang]}
          <span className="trail-link-meta">PNG</span>
        </a>
      </div>
    </div>
  )
}
