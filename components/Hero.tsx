import Image from 'next/image'

interface Props {
  imageSrc?: string
  imageAlt?: string
}

export default function Hero({
  imageSrc = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&q=85&auto=format&fit=crop',
  imageAlt = 'Lahemaa mets',
}: Props) {
  return (
    <section className="hero">
      <div className="hero-bg">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="hero-bg-img"
        />
        <div className="hero-bg-overlay" />
      </div>

      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="line"><span>Mets</span></span>
          <span className="line"><span>hingab</span></span>
          <span className="line"><span>siin.</span></span>
        </h1>

        <p className="hero-eyebrow">Lahemaa rahvuspark · Oandu · Est</p>

        <div className="hero-bottom">
          <p className="hero-desc">
            Metsaspaa ja majutus Lahemaa südames.<br />
            Oandu-Ikla matkatee alguspunktis.
          </p>
          <a href="#broneeri" className="btn-primary">Küsi pakkumist</a>
        </div>
      </div>
    </section>
  )
}
