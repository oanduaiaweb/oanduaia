import Image from 'next/image'
import { PRODUCTS, eur } from '@/lib/products'

/** What the site sells besides nights: each product with its price, options and a link to its page. */
export default function AdminProducts() {
  return (
    <section className="adm-section">
      <h2 className="adm-h2">
        Products
        <span className="adm-badge adm-badge--warn">not published</span>
        <a className="adm-chip" href="/et/products" target="_blank" rel="noreferrer">Open the products page</a>
      </h2>
      <p className="adm-muted">Hidden from Google and not linked from the site yet. Orders arrive as requests above, subject “Tellimus”.</p>
      <ul className="adm-products">
        {PRODUCTS.map(p => (
          <li className="adm-product" key={p.slug}>
            <a className="adm-product-img" href={`/et/products/${p.slug}`} target="_blank" rel="noreferrer">
              <Image src={p.photos[0].src} alt="" fill sizes="96px" style={{ objectFit: 'cover' }} />
            </a>
            <div>
              <b>{p.name.et}</b> · {eur(p.price)}
              <div className="adm-muted">
                {p.options.filter(o => o.price).map(o => `${o.name.et} +${eur(o.price)}`).join(' · ')}
              </div>
              <a className="adm-link" href={`/et/products/${p.slug}`} target="_blank" rel="noreferrer">Eesti</a>{' '}
              <a className="adm-link" href={`/en/products/${p.slug}`} target="_blank" rel="noreferrer">English</a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
