/**
 * What is booked, and what has CHANGED since the last time this was run.
 *
 * "Do we have any bookings?" could not be answered properly before this existed: the live feed
 * says what is blocked today, but with nothing to compare against, a night blocked six weeks ago
 * looks exactly like one booked this morning. Every run therefore writes a dated snapshot and
 * diffs against the newest earlier one.
 *
 *   node scripts/bookings.mjs
 *
 * Snapshots live outside the repo, in ~/.oanduaia-bookings — this is operational data about
 * real guests, not source, and it must not end up in a commit or a deployment.
 *
 * IMPORTANT, and the reason nothing here is called a "booking" without qualification:
 * Booking.com's iCal export gives a manually CLOSED date and a real RESERVATION the identical
 * summary, `CLOSED - Not available`. Nothing downstream can tell them apart, so neither can
 * this. A long run over winter is almost certainly the seasonal closure; a one- or three-night
 * run appearing out of nowhere is almost certainly a guest — but "almost certainly" is as far
 * as the data goes, and the extranet is the only place to confirm it.
 */
import { mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { homedir } from 'node:os'

const DIR = join(homedir(), '.oanduaia-bookings')
const API = 'https://www.oanduaia.ee/api/availability'

const res = await fetch(API)
if (!res.ok) { console.error(`feed returned ${res.status}`); process.exit(1) }
const feed = await res.json()

const today = new Date().toISOString().slice(0, 10)
mkdirSync(DIR, { recursive: true })

const prior = readdirSync(DIR).filter(f => f.endsWith('.json')).sort()
const previousName = prior.filter(f => f < `${today}.json`).pop()
const previous = previousName
  ? JSON.parse(readFileSync(join(DIR, previousName), 'utf8'))
  : null

const runs = nights => {
  const out = []
  for (const n of [...nights].sort()) {
    const last = out.at(-1)
    const prevDay = last && new Date(`${last.to}T00:00:00Z`)
    if (prevDay) prevDay.setUTCDate(prevDay.getUTCDate() + 1)
    if (last && prevDay.toISOString().slice(0, 10) === n) last.to = n
    else out.push({ from: n, to: n })
  }
  return out.map(r => ({ ...r, n: Math.round((Date.parse(r.to) - Date.parse(r.from)) / 864e5) + 1 }))
}

const label = r =>
  `${r.from}${r.n > 1 ? ` → ${r.to}` : ''}  ${String(r.n).padStart(3)} night${r.n > 1 ? 's' : ''}` +
  (r.n > 60 ? '   (a run this long is a seasonal closure, not a guest)' : '')

console.log(`Feed window ${feed.from} → ${feed.to}`)
console.log(previous
  ? `Comparing against ${previousName.replace('.json', '')}\n`
  : `No earlier snapshot — this run only records today's state.\n`)

let anyChange = false
for (const h of feed.houses) {
  const now = new Set(h.blocked)
  const was = new Set(previous?.houses.find(p => p.slug === h.slug)?.blocked ?? [])
  const added = [...now].filter(d => !was.has(d))
  const gone = [...was].filter(d => !now.has(d))

  console.log(`── ${h.slug.toUpperCase()}  ${now.size} nights blocked` +
    (h.feedConnected && h.trusted ? '' : `   ⚠ feed=${h.feedConnected} trusted=${h.trusted}`))

  if (previous && added.length) {
    anyChange = true
    console.log('   NEW since last check:')
    for (const r of runs(added)) console.log(`     + ${label(r)}`)
  }
  if (previous && gone.length) {
    anyChange = true
    console.log('   RELEASED since last check (cancellation, or a date reopened):')
    for (const r of runs(gone)) console.log(`     - ${label(r)}`)
  }
  if (!previous || (!added.length && !gone.length)) {
    for (const r of runs([...now])) console.log(`     ${label(r)}`)
  }
  console.log()
}

if (previous && !anyChange) console.log('Nothing has changed on any house since the last check.')

writeFileSync(join(DIR, `${today}.json`), JSON.stringify({ checked: new Date().toISOString(), ...feed }, null, 2))
console.log(`Snapshot saved: ${join(DIR, `${today}.json`)}`)
