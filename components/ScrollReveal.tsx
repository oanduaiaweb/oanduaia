'use client'

import { useEffect } from 'react'

/**
 * Drop this once anywhere in the tree. It finds every element with
 * className "reveal" and fires the IntersectionObserver — mirroring
 * the original inline script without wrapping each element in a div.
 */
export default function ScrollRevealInit() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
