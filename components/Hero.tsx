'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

function scrollTo(id: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

const SRC = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&q=85&auto=format&fit=crop'

export default function Hero() {
  const { lang } = useLanguage()
  const h = T.hero
  return (
    <section className="hero">
      <div className="hero-bg">
        <Image src={SRC} alt={h.alt[lang]} fill priority className="hero-bg-img" />
        <div className="hero-bg-overlay" />
      </div>
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="line"><span>{h.line1[lang]}</span></span>
          <span className="line"><span>{h.line2[lang]}</span></span>
          <span className="line"><span>{h.line3[lang]}</span></span>
        </h1>
        <p className="hero-eyebrow">{h.eyebrow[lang]}</p>
        <div className="hero-bottom">
          <p className="hero-desc">{h.desc[lang]}</p>
          <a href="#broneeri" className="btn-primary" onClick={scrollTo('broneeri')}>{h.cta[lang]}</a>
        </div>
      </div>
    </section>
  )
}
