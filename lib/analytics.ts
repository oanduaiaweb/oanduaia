/**
 * The one place that talks to GA4.
 *
 * Every call is wrapped, because `gtag` may legitimately not be there: an ad blocker, a
 * privacy extension, a consent tool, or simply the script not having loaded yet on a slow
 * connection. **A missing analytics call must never break a booking** — that trade is
 * never worth making on a site whose whole purpose is the enquiry form.
 *
 * Event names are snake_case and stable. Renaming one later breaks the history in GA4,
 * so pick the name once and leave it alone.
 */
type Params = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (command: string, event: string, params?: Params) => void
  }
}

export function track(event: string, params: Params = {}): void {
  try {
    window.gtag?.('event', event, params)
  } catch {
    // Analytics failing is not an error the visitor should ever experience.
  }
}
