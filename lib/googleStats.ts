import { createSign } from 'node:crypto'

/**
 * Website statistics for /admin, read from Google Analytics 4 and Search Console with a
 * service account — no Google library, just a signed JWT swapped for an access token.
 *
 * Needs three env vars: GOOGLE_SA_EMAIL, GOOGLE_SA_KEY (the private_key from the JSON key,
 * \n escapes allowed) and GA4_PROPERTY_ID. The service account must be added as a Viewer in
 * GA4 and as a (restricted) user in Search Console, or Google answers 403.
 */

const GSC_SITE = 'sc-domain:oanduaia.ee'
const SCOPES = 'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly'

export function statsConfigured(): boolean {
  return Boolean(process.env.GOOGLE_SA_EMAIL && process.env.GOOGLE_SA_KEY && process.env.GA4_PROPERTY_ID)
}

let token: { value: string; expires: number } | null = null

async function accessToken(): Promise<string> {
  if (token && token.expires > Date.now() + 60_000) return token.value
  const email = process.env.GOOGLE_SA_EMAIL!
  const key = process.env.GOOGLE_SA_KEY!.replace(/\\n/g, '\n')
  const now = Math.floor(Date.now() / 1000)
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: email, scope: SCOPES, aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600,
  })}`
  const signature = createSign('RSA-SHA256').update(unsigned).sign(key, 'base64url')
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  })
  if (!res.ok) throw new Error(`Google token ${res.status}: ${await res.text()}`)
  const json = await res.json() as { access_token: string; expires_in: number }
  token = { value: json.access_token, expires: Date.now() + json.expires_in * 1000 }
  return token.value
}

async function google<T>(url: string, body: object): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${new URL(url).host} ${res.status}: ${(await res.text()).slice(0, 300)}`)
  return res.json() as Promise<T>
}

type GaRow = { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] }
type GaReport = { rows?: GaRow[] }
type Pair = { label: string; value: number }

const ga = (path: string, body: object) =>
  google<GaReport>(`https://analyticsdata.googleapis.com/v1beta/properties/${process.env.GA4_PROPERTY_ID}:${path}`, body)

const pairs = (r: GaReport): Pair[] =>
  (r.rows ?? []).map(row => ({ label: row.dimensionValues?.[0]?.value ?? '', value: Number(row.metricValues?.[0]?.value ?? 0) }))

const total = (r: GaReport, i = 0) => Number(r.rows?.[0]?.metricValues?.[i]?.value ?? 0)

export type Stats = {
  days: number
  liveNow: number
  users: number
  sessions: number
  pageViews: number
  enquiries: number
  dateChecks: number
  bookClicks: number
  channels: Pair[]
  countries: Pair[]
  pages: Pair[]
  daily: Pair[]
  search: { clicks: number; impressions: number; position: number; queries: Pair[] } | null
  fetched: string
}

const cache = new Map<number, { at: number; stats: Stats }>()

/** Ten minutes of cache: the page can be reloaded freely without spending Google quota. */
export async function readStats(days: number): Promise<Stats> {
  const hit = cache.get(days)
  if (hit && Date.now() - hit.at < 10 * 60_000) return hit.stats

  const dateRanges = [{ startDate: `${days}daysAgo`, endDate: 'today' }]
  const top = (dimension: string, metric: string, limit: number) => ga('runReport', {
    dateRanges, dimensions: [{ name: dimension }], metrics: [{ name: metric }],
    orderBys: [{ metric: { metricName: metric }, desc: true }], limit,
  })
  const event = (name: string) => ga('runReport', {
    dateRanges, metrics: [{ name: 'eventCount' }],
    dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { value: name } } },
  })

  const [live, totals, enquiries, dateChecks, bookClicks, channels, countries, pages, daily, search] = await Promise.all([
    ga('runRealtimeReport', { metrics: [{ name: 'activeUsers' }] }).catch(() => ({} as GaReport)),
    ga('runReport', { dateRanges, metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }] }),
    event('enquiry_sent'),
    event('dates_requested'),
    event('booking_cta'),
    top('sessionDefaultChannelGroup', 'sessions', 8),
    top('country', 'activeUsers', 10),
    top('pagePath', 'screenPageViews', 10),
    ga('runReport', {
      dateRanges, dimensions: [{ name: 'date' }], metrics: [{ name: 'activeUsers' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    }),
    searchConsole(days).catch(() => null),
  ])

  const stats: Stats = {
    days,
    liveNow: total(live),
    users: total(totals, 0),
    sessions: total(totals, 1),
    pageViews: total(totals, 2),
    enquiries: total(enquiries),
    dateChecks: total(dateChecks),
    bookClicks: total(bookClicks),
    channels: pairs(channels),
    countries: pairs(countries),
    pages: pairs(pages),
    daily: pairs(daily),
    search,
    fetched: new Date().toISOString(),
  }
  cache.set(days, { at: Date.now(), stats })
  return stats
}

async function searchConsole(days: number): Promise<Stats['search']> {
  const end = new Date()
  const start = new Date(end.getTime() - days * 86_400_000)
  const d = (x: Date) => x.toISOString().slice(0, 10)
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`
  type Gsc = { rows?: { keys?: string[]; clicks: number; impressions: number; position: number }[] }
  const [sum, queries] = await Promise.all([
    google<Gsc>(url, { startDate: d(start), endDate: d(end) }),
    google<Gsc>(url, { startDate: d(start), endDate: d(end), dimensions: ['query'], rowLimit: 10 }),
  ])
  const s = sum.rows?.[0]
  return {
    clicks: s?.clicks ?? 0,
    impressions: s?.impressions ?? 0,
    position: Math.round((s?.position ?? 0) * 10) / 10,
    queries: (queries.rows ?? []).map(r => ({ label: r.keys?.[0] ?? '', value: r.clicks })),
  }
}
