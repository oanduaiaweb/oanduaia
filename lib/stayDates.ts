/**
 * Arrival and departure read out of an enquiry's free-text dates, in any of the site's eight
 * languages ("24. oktoober 2026 – 25. oktoober 2026", "2027. gada 2. janvāris", "16.okt-17.okt",
 * "13.–16. august 2027"). Used only for enquiries that predate the structured checkIn/checkOut.
 */

const LOCALES = ['et', 'en-GB', 'ru', 'de-DE', 'es-ES', 'sv-SE', 'fi-FI', 'lv-LV']

const MONTHS: [string, number][] = (() => {
  const seen = new Map<string, number>()
  for (const locale of LOCALES) {
    for (let m = 0; m < 12; m++) {
      const d = new Date(Date.UTC(2027, m, 2, 12))
      const forms = [
        new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', timeZone: 'UTC' })
          .formatToParts(d).find(p => p.type === 'month')?.value,
        new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' }).format(d),
        new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' }).format(d),
      ]
      for (const f of forms) {
        const k = f?.toLowerCase().replace(/\.$/, '')
        if (k && k.length >= 3 && !seen.has(k)) seen.set(k, m)
      }
    }
  }
  // Longest first, so "septembril" wins over "sept" and "jaanuar" over "jaan".
  return [...seen.entries()].sort((a, b) => b[0].length - a[0].length)
})()

const pad = (n: number) => String(n).padStart(2, '0')
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`

export function parseStay(text: string | undefined, received: string): { checkIn?: string; checkOut?: string } {
  if (!text) return {}
  const s = text.toLowerCase()
  const found: { at: number; y?: number; m: number; d: number }[] = []
  const taken = new Array(s.length).fill(false)

  for (const [name, m] of MONTHS) {
    let from = 0
    for (;;) {
      const at = s.indexOf(name, from)
      if (at < 0) break
      from = at + name.length
      if (taken[at] || /\p{L}/u.test(s[at - 1] ?? '')) continue
      for (let i = at; i < at + name.length; i++) taken[i] = true
      const before = s.slice(Math.max(0, at - 16), at)
      const after = s.slice(at + name.length, at + name.length + 14)
      const day = before.match(/(\d{1,2})\.?\s*(?:de\s+)?$/)?.[1]
      if (!day) continue
      const year = after.match(/^\.?\s*(?:de\s+)?(\d{4})/)?.[1] ?? before.match(/(\d{4})\.\s*gada\s+\d{1,2}\.?\s*$/)?.[1]
      const y = year ? Number(year) : undefined
      // "13.–16. august": the first day shares the month that follows the second.
      const range = before.match(/(?<!\d)(\d{1,2})\.?\s*[–-]\s*\d{1,2}\.?\s*(?:de\s+)?$/)?.[1]
      if (range) found.push({ at: at - 1, m, d: Number(range), y })
      found.push({ at, m, d: Number(day), y })
    }
  }
  for (const x of s.matchAll(/\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b/g)) {
    found.push({ at: x.index ?? 0, d: Number(x[1]), m: Number(x[2]) - 1, y: Number(x[3]) })
  }
  if (!found.length) return {}
  found.sort((a, b) => a.at - b.at)

  const got = new Date(received)
  const known = found.find(f => f.y)?.y
  const dates = found
    .filter(f => f.d >= 1 && f.d <= 31 && f.m >= 0 && f.m <= 11)
    .map(f => {
      let y = f.y ?? known ?? got.getUTCFullYear()
      // A year-less date that would fall well before the enquiry means the following year.
      if (!f.y && !known && Date.UTC(y, f.m, f.d) < got.getTime() - 30 * 86_400_000) y += 1
      return iso(y, f.m, f.d)
    })
  if (!dates.length) return {}
  return { checkIn: dates[0], checkOut: dates[dates.length - 1] }
}
