'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { eur } from '@/lib/products'
import type { LiveProduct } from '@/lib/productStore'

type Draft = { price: string; options: Record<string, string>; hidden: boolean }

const toDraft = (p: LiveProduct): Draft => ({
  price: String(p.price),
  options: Object.fromEntries(p.options.map(o => [o.id, String(o.price)])),
  hidden: p.hidden,
})

/** What the site sells besides nights — with the prices and visibility Mikk can change himself. */
export default function AdminProducts() {
  const [products, setProducts] = useState<LiveProduct[] | null>(null)
  const [drafts, setDrafts] = useState<Record<string, Draft>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [msg, setMsg] = useState<Record<string, string>>({})

  const load = (list: LiveProduct[]) => {
    setProducts(list)
    setDrafts(Object.fromEntries(list.map(p => [p.slug, toDraft(p)])))
  }

  useEffect(() => {
    fetch('/api/admin/products', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(j => j && load(j.products))
      .catch(() => {})
  }, [])

  const edit = (slug: string, change: Partial<Draft>) =>
    setDrafts(d => ({ ...d, [slug]: { ...d[slug], ...change } }))

  const save = async (p: LiveProduct) => {
    const d = drafts[p.slug]
    setSaving(p.slug); setMsg(m => ({ ...m, [p.slug]: '' }))
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: p.slug,
          price: Number(d.price),
          options: Object.fromEntries(Object.entries(d.options).map(([k, v]) => [k, Number(v)])),
          hidden: d.hidden,
        }),
      })
      const j = await res.json()
      if (!res.ok) throw new Error(j.error || 'Saving failed')
      load(j.products)
      setMsg(m => ({ ...m, [p.slug]: 'Saved – the site shows it now.' }))
    } catch (e) {
      setMsg(m => ({ ...m, [p.slug]: e instanceof Error ? e.message : 'Saving failed' }))
    } finally {
      setSaving(null)
    }
  }

  return (
    <section className="adm-section">
      <h2 className="adm-h2">
        Products
        <span className="adm-badge adm-badge--warn">not published</span>
        <a className="adm-chip" href="/et/products" target="_blank" rel="noreferrer">Open the products page</a>
      </h2>
      <p className="adm-muted">
        Hidden from Google and not linked from the site yet. Change a price here and press Save – no deploy needed.
        Orders arrive as requests above, subject “Tellimus”.
      </p>
      {!products ? <p className="adm-muted">Loading…</p> : (
        <ul className="adm-products">
          {products.map(p => {
            const d = drafts[p.slug]
            if (!d) return null
            const dirty = JSON.stringify(d) !== JSON.stringify(toDraft(p))
            return (
              <li className={`adm-product${p.hidden ? ' is-hidden' : ''}`} key={p.slug}>
                <a className="adm-product-img" href={`/et/products/${p.slug}`} target="_blank" rel="noreferrer">
                  <Image src={p.photos[0].src} alt="" fill sizes="96px" style={{ objectFit: 'cover' }} />
                </a>
                <div className="adm-product-body">
                  <b>{p.name.et}</b>
                  <span className="adm-muted"> · now {eur(p.price)}{p.hidden ? ' · hidden' : ''}</span>
                  <div className="adm-product-fields">
                    <label>Price €
                      <input className="adm-input" inputMode="numeric" value={d.price}
                        onChange={e => edit(p.slug, { price: e.target.value.replace(/\D/g, '') })} />
                    </label>
                    {p.options.filter(o => o.id !== 'none' && p.options.length > 1).map(o => (
                      <label key={o.id}>{o.name.et} +€
                        <input className="adm-input" inputMode="numeric" value={d.options[o.id] ?? ''}
                          onChange={e => edit(p.slug, { options: { ...d.options, [o.id]: e.target.value.replace(/\D/g, '') } })} />
                      </label>
                    ))}
                    <label className="adm-product-check">
                      <input type="checkbox" checked={!d.hidden} onChange={e => edit(p.slug, { hidden: !e.target.checked })} />
                      Show on the site
                    </label>
                    <button type="button" className="adm-btn" disabled={!dirty || saving === p.slug || d.price === ''}
                      onClick={() => save(p)}>{saving === p.slug ? 'Saving…' : 'Save'}</button>
                  </div>
                  {msg[p.slug] && <p className="adm-muted">{msg[p.slug]}</p>}
                  <a className="adm-link" href={`/et/products/${p.slug}`} target="_blank" rel="noreferrer">Eesti</a>{' '}
                  <a className="adm-link" href={`/en/products/${p.slug}`} target="_blank" rel="noreferrer">English</a>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
