import Image from 'next/image'

interface Props {
  imageSrc?: string
  imageAlt?: string
}

export default function Feature({
  imageSrc = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=85&auto=format&fit=crop',
  imageAlt = 'Oandu maastik',
}: Props) {
  return (
    <section className="feature-section" id="majutus">
      <div className="feature-image">
        <Image src={imageSrc} alt={imageAlt} fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
        <div className="feature-image-overlay" aria-hidden="true" />
        <span className="feature-image-label">Oandu · Lahemaa · 59°26′N</span>
      </div>

      <div className="feature-content">
        <p className="section-label">03 — Majutus</p>
        <h2 className="feature-heading">
          Kodu metsas,<br />
          <em>mitte metsa</em><br />
          külge.
        </h2>
        <ul className="feature-list">
          <li>Kuni 6 külalist, 2 magamistuba</li>
          <li>Panoraamaknad metsavaatega</li>
          <li>Täisvarustatud köök &amp; elutuba</li>
          <li>Privaatne sisse/väljachecking</li>
          <li>Hommikusöök, rätikud, hommikumantlid</li>
          <li>Sagadi mõis 2,8 km · Koprarada 1,3 km</li>
        </ul>
        <a href="#broneeri" className="feature-cta">Vaata saadavust</a>
      </div>
    </section>
  )
}
