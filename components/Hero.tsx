import Image from 'next/image'

interface Props {
  /** Swap for your own forest image */
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
        <p className="hero-eyebrow">Lahemaa rahvuspark · Oandu · Est</p>

        <h1 className="hero-title">
          <span className="line"><span>Mets</span></span>
          <span className="line"><span>hingab</span></span>
          <span className="line"><span>siin.</span></span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-desc">
            Metsaspaa ja majutus Lahemaa südames.<br />
            Oandu-Ikla matkatee alguspunktis.
          </p>
          <div className="hero-cta">
            <a href="#broneeri" className="btn-primary">Küsi pakkumist</a>
            <span className="scroll-hint">Keri alla</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-line" aria-hidden="true" />
    </section>
  )
}
