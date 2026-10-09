import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { SESSION_COOKIE, verifySession } from '@/lib/adminAuth'
import { findPayment, formatEur } from '@/lib/payments'
import { SOCIAL, EMAIL } from '@/lib/social'
import { hasMeals, mealsCost, type Meals } from '@/lib/pricing'

/**
 * An invoice for one payment, as a printable page.
 *
 * Built from the payment record rather than typed again, because every field an invoice needs is
 * already there — guest, what it was for, the house and nights, the amount, the date it was paid
 * and the Stripe payment intent that proves it.
 *
 * HTML rather than a generated PDF on purpose: the browser's own "Save as PDF" produces a better
 * file than a bundled PDF library would, costs the project no dependency, and prints correctly
 * from a phone. The page opens the print dialog itself.
 */
export const dynamic = 'force-dynamic'

/**
 * As the Äriregister holds it, verified on the official register page 14 Sep 2026 — county first,
 * the farm name "Oanduaia" standing in for a street. Written in the register's own order rather
 * than a Western one, because this document carries the registry code next to it.
 */
const COMPANY = {
  name: 'Oanduaia Puhkemaja OÜ',
  reg: '12745194',
  address: 'Lääne-Viru maakond, Haljala vald, Oandu küla, Oanduaia, 45432',
}

const esc = (s: string) =>
  String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))

/** `2026-10-14` → `14 October 2026`. Invoices are read by people, not parsers. */
function pretty(date?: string): string {
  if (!date) return ''
  const d = new Date(`${date}T12:00:00Z`)
  if (Number.isNaN(d.getTime())) return date
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(d)
}

/**
 * The meals, written so the arithmetic can never be read two ways.
 *
 * Meals inside the amount are described, not added — the total above already contains them, and
 * listing them as a second sum would appear to bill twice. Meals settled at the house are the
 * opposite case: they are NOT in the total, so the figure still owed is stated plainly.
 */
function mealLines(m: Meals | undefined): string {
  if (!hasMeals(m)) return ''
  const cost = mealsCost(m)
  const bits: string[] = []
  if (m?.breakfastDates?.length && m.breakfastPeople) {
    bits.push(`breakfast for ${m.breakfastPeople} on ${m.breakfastDates.length} `
      + `morning${m.breakfastDates.length === 1 ? '' : 's'}`)
  }
  if (m?.dinnerDates?.length && m.dinnerPeople) {
    bits.push(`dinner for ${m.dinnerPeople} on ${m.dinnerDates.length} `
      + `evening${m.dinnerDates.length === 1 ? '' : 's'}`)
  }
  const what = esc(bits.join(' and '))
  return m?.atHouse
    ? `<h2>Meals</h2><p>Arranged: ${what}.<br />
       <strong>${cost.total} &euro; to be settled at the house</strong> &mdash; not included in the total above.</p>`
    : `<h2>Meals</h2><p>The total above includes ${what}.</p>`
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!verifySession((await cookies()).get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Not authorised' }, { status: 401 })
  }

  const { id } = await params
  const p = await findPayment(id)
  if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  /*
   * The invoice number is the paid date plus the first six of the token: stable, unique, and
   * traceable back to exactly one payment without exposing the whole link.
   */
  const basis = (p.paidAt ?? p.created).slice(0, 10).replace(/-/g, '')
  const number = `${basis}-${p.id.slice(0, 6).toUpperCase()}`

  const paidLine = p.status === 'paid'
    ? `<p class="paid">PAID${p.paidAt ? ` &middot; ${pretty(p.paidAt.slice(0, 10))}` : ''}</p>`
    : `<p class="due">NOT YET PAID${p.dueAt ? ` &middot; due ${pretty(p.dueAt)}` : ''}</p>`

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<title>Invoice ${esc(number)} — ${esc(p.name)}</title>
<style>
  @page { size: A4; margin: 18mm 16mm; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, "Helvetica Neue", Arial, sans-serif; color: #16181d;
         font-size: 10.5pt; line-height: 1.5; margin: 0; }
  .head { display: flex; justify-content: space-between; gap: 30px;
          border-bottom: 2px solid #16181d; padding-bottom: 12px; }
  .co strong { font-size: 13pt; letter-spacing: .02em; }
  .co { font-size: 9.2pt; line-height: 1.45; max-width: 58%; }
  .meta { text-align: right; font-size: 9.2pt; }
  h1 { font-size: 20pt; letter-spacing: .05em; text-transform: uppercase; margin: 0 0 4px; }
  h2 { font-size: 10pt; text-transform: uppercase; letter-spacing: .09em;
       border-bottom: 1.5px solid #16181d; padding-bottom: 4px; margin: 22px 0 8px; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; font-size: 8pt; text-transform: uppercase; letter-spacing: .06em;
       color: #666; border-bottom: 1px solid #bbb; padding: 5px 6px; }
  td { padding: 7px 6px; border-bottom: 1px solid #eee; vertical-align: top; }
  td.n { text-align: right; white-space: nowrap; }
  .total td { border-top: 2px solid #16181d; font-weight: 700; font-size: 13pt; padding-top: 10px; }
  .paid { display: inline-block; background: #eaf5ec; color: #235c35; border: 1px solid #235c35;
          padding: 5px 12px; letter-spacing: .09em; font-weight: 700; font-size: 10pt; }
  .due  { display: inline-block; background: #fdf3e6; color: #8a5a12; border: 1px solid #8a5a12;
          padding: 5px 12px; letter-spacing: .09em; font-weight: 700; font-size: 10pt; }
  .muted { color: #666; font-size: 8.6pt; }
  footer { margin-top: 26px; padding-top: 8px; border-top: 1px solid #ddd;
           color: #666; font-size: 8.4pt; }
  @media print { .noprint { display: none } }
  .noprint { margin: 14px 0 0; }
  .noprint button { font: inherit; padding: 7px 16px; cursor: pointer; }
</style></head><body>

<div class="head">
  <div class="co"><strong>${esc(COMPANY.name)}</strong><br />
    ${esc(COMPANY.address)}<br />
    Registry code ${esc(COMPANY.reg)}<br />
    ${esc(EMAIL)} &middot; ${esc(SOCIAL.phone)}</div>
  <div class="meta">
    <h1>Invoice</h1>
    <div><strong>No.</strong> ${esc(number)}</div>
    <div><strong>Date</strong> ${esc(pretty((p.paidAt ?? p.created).slice(0, 10)))}</div>
    <div style="margin-top:10px"><strong>Bill to</strong></div>
    <div>${esc(p.name)}</div>
    <div class="muted">${esc(p.email)}</div>
  </div>
</div>

<h2>Stay</h2>
<table>
  <tr><th>Description</th><th class="n">Amount</th></tr>
  <tr>
    <td>${esc(p.reference)}</td>
    <td class="n">${formatEur(p.amount)} &euro;</td>
  </tr>
  <tr class="total"><td>Total</td><td class="n">${formatEur(p.amount)} &euro;</td></tr>
</table>

${mealLines(p.meals)}

<div style="margin-top:18px">${paidLine}</div>

${p.status !== 'paid' ? ''
    : p.method === 'cash'
      ? '<p class="muted">Paid in cash.</p>'
      : `<p class="muted">Paid by card through Stripe.${
          p.paymentIntentId ? ` Reference ${esc(p.paymentIntentId)}.` : ''
        }</p>`}

<footer>
  ${esc(COMPANY.name)} &middot; Registry code ${esc(COMPANY.reg)} &middot; ${esc(EMAIL)}
</footer>

<div class="noprint"><button onclick="window.print()">Save as PDF / Print</button></div>
<script>window.addEventListener('load', () => setTimeout(() => window.print(), 350))</script>
</body></html>`

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}
