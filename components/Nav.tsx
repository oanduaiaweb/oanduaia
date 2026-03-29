'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={scrolled ? 'nav-scrolled' : ''}>
      <a href="/" className="nav-logo">Oanduaia</a>
      <ul className="nav-links">
        <li><a href="#teenused">Teenused</a></li>
        <li><a href="#matkad">Matkad</a></li>
        <li><a href="#majutus">Majutus</a></li>
        <li><a href="#broneeri">Broneeri</a></li>
      </ul>
    </nav>
  )
}
