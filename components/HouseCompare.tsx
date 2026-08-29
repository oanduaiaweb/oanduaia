'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

/**
 * The three houses in one table, under the three bands that describe them.
 *
 * Transposed on purpose — attributes down the side, houses across — so it is three
 * columns rather than eight, which is the difference between a table that works on a
 * phone and one that has to be scrolled sideways.
 *
 * It is also the densest factual block on the site: an assistant asked "which Oanduaia
 * house suits a couple" or "which one is open in winter" can answer from these rows
 * alone. Every value already appears in prose somewhere; this is where it is comparable.
 */
export default function HouseCompare() {
  const { lang } = useLanguage()
  const f = T.feature
  const r = f.compareRows
  const houses = f.houses

  const rows: [string, (i: number) => string][] = [
    [r.guests[lang],   i => String(houses[i].sleeps)],
    [r.bedrooms[lang], i => houses[i].compare.bedrooms[lang]],
    [r.sauna[lang],    i => houses[i].compare.sauna[lang]],
    [r.kitchen[lang],  i => houses[i].compare.kitchen[lang]],
    [r.winter[lang],   i => houses[i].compare.winter[lang]],
    [r.price[lang],    i => `${Math.min(...houses[i].prices.map(p => p.eur))} €`],
    [r.bestFor[lang],  i => houses[i].compare.bestFor[lang]],
    [r.extra[lang],    i => houses[i].compare.extra[lang]],
  ]

  return (
    <div className="compare reveal">
      <p className="compare-label">{f.compareLabel[lang]}</p>
      <div className="compare-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="col" className="compare-corner"><span className="sr-only">—</span></th>
              {houses.map(h => (
                <th scope="col" key={h.slug}>
                  <Link href={`/${lang}/majad/${h.slug}`}>{h.name[lang]}</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                {houses.map((h, i) => <td key={h.slug}>{value(i)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="compare-note">{f.compareUnit[lang]}</p>
    </div>
  )
}
