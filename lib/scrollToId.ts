/**
 * Scroll to a section, smoothly where the browser will and instantly where it will not.
 *
 * Chrome drops EVERY smooth scroll on this page. Measured on the live site: window
 * .scrollTo, document.scrollingElement.scrollTo and Element.scrollIntoView all return
 * without moving a pixel (3978 -> 3978), while the identical call with behavior
 * 'instant' works (3978 -> 1000). The nav links therefore did nothing at all on the
 * first click, which is exactly what Mikk reported.
 *
 * Rather than chase the cause through the overflow and animation interactions that can
 * cancel a scroll animation, ask for smooth and then check: if the page has not moved a
 * few frames later, jump. A smooth scroll that IS running has always covered far more
 * than four pixels by 260ms, so the fallback never fires on a browser that honours it.
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY
  const from = window.scrollY
  window.scrollTo({ top, behavior: 'smooth' })
  window.setTimeout(() => {
    // 'instant', never 'auto': 'auto' means "use the scroll-behavior property", which
    // on this page is `smooth` — the very thing that does not work. Verified live:
    // behavior 'auto' left scrollY at 0, 'instant' landed on 4066.
    if (Math.abs(window.scrollY - from) < 4) window.scrollTo({ top, behavior: 'instant' })
  }, 260)
}
