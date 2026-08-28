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
        // 13 rather than 15: this is a map of where the trails go, and at 15 you are
        // inside the garden with nothing marked around you.
        zoom: 13,
        // Maa-amet serves down to zoom 4. The old floor of 9 was mine, not theirs, and
        // it stopped the map zooming out — the first thing anyone tries on a trail map.
        minZoom: 6,
        maxZoom: 18,
        // The page scrolls; a wheel over the map should scroll it too, not zoom by
        // surprise. Ctrl/⌘+wheel and the +/- buttons still zoom, and so does a pinch.
        scrollWheelZoom: false,
        attributionControl: true,
        /*
         * The zoom TWEEN is off. With it on, zooming did not merely look wrong — it did
         * not happen: `map.setZoom(11)` left the zoom at 13, from the buttons, the
         * keyboard and the API alike. The same call with `{animate: false}` moves
         * instantly and correctly, so the map was fine and its animation was not.
         *
         * This page has form for exactly that. Chrome silently drops every smooth scroll
         * here too — see lib/scrollToId, where the fix is the same shape: stop asking the
         * browser to animate, and just move. What is lost is a 250ms tween; what is
         * gained is a zoom button that works.
         */
        zoomAnimation: false,
      })

      L.tileLayer('https://tiles.maaamet.ee/tm/tms/1.0.0/kaart@GMC/{z}/{x}/{y}.png', {
        tms: true,
        minZoom: 6,
        maxZoom: 18,
        attribution:
          'Aluskaart: <a href="https://maaamet.ee" target="_blank" rel="noopener noreferrer">Maa- ja Ruumiamet</a>',
      }).addTo(map)

      /*
       * The marked routes, drawn over the Estonian base map: E11 through Oandu, the RMK
       * Oandu loops, the Sagadi link. This is the layer that makes it a hiking map rather
       * than a pin on a field.
       *
       * Rendered by Waymarked Trails from OpenStreetMap data. It is a free community
       * service with no guarantee behind it — if it ever stops answering, the tiles
       * simply do not draw and the Maa-amet base map underneath is unaffected. The OSM
       * attribution below is required by that project's licence.
       */
      L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
        maxZoom: 18,
        opacity: 0.85,
        attribution:
          'Rajad: <a href="https://hiking.waymarkedtrails.org" target="_blank" rel="noopener noreferrer">Waymarked Trails</a>, © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
      }).addTo(map)

      /*
       * A divIcon — an HTML ring — rather than L.circleMarker.
       *
       * circleMarker is an SVG vector layer, and with it on the map every zoom threw
       * "Cannot read properties of undefined (reading 'baseVal')" out of Leaflet's SVG
       * renderer. The exception aborted the zoom, so the map sat at one level however
       * many times you pressed + or −, with nothing visibly wrong. That is the bug Mikk
       * hit. No SVG layer, no SVG renderer, no zoom to break — and a div takes the ring
       * styling from our own stylesheet.
       */
      L.marker([LAT, LON], {
        icon: L.divIcon({ className: 'oa-map-pin', html: '', iconSize: [26, 26] }),
        keyboard: false,
        title: 'Oanduaia',
      })
        .addTo(map)
        .bindPopup('<strong>Oanduaia</strong><br>Oandu, Lääne-Virumaa')

      /*
       * Leaflet measures its container once, at construction. Here that happens after an
       * idle callback on a page still settling fonts and images, so it can measure the
       * wrong size and leave grey where tiles were never requested. One invalidateSize
       * on the next frame makes it measure again.
       *
       * Deliberately NOT a ResizeObserver on the container. That was tried and it broke
       * zooming outright: Leaflet resizes its own panes while a zoom animates, the
       * observer fired, invalidateSize reset the animation, and the map sat at one zoom
       * level however many times you pressed + or -. Leaflet tracks window resize itself
       * (`trackResize`, on by default), which is the case that actually matters.
       */
      requestAnimationFrame(() => map?.invalidateSize())
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
      </div>
    </div>
  )
}
