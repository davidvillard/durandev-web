'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/track'

const SECTIONS = ['servicios', 'trabajos', 'proceso', 'sobre-mi', 'preguntas', 'contacto']

/** Reports which sections each visitor reaches and which marked buttons they click. */
export function SectionTracker() {
  useEffect(() => {
    const seen = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !seen.has(entry.target.id)) {
            seen.add(entry.target.id)
            trackEvent('section_view', { section: entry.target.id })
          }
        }
      },
      { threshold: 0.35 },
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })

    const onClick = (event: MouseEvent) => {
      const el = (event.target as Element).closest<HTMLElement>('[data-track]')
      if (el?.dataset.track) trackEvent('cta_click', { origin: el.dataset.track })
    }
    document.addEventListener('click', onClick)

    return () => {
      io.disconnect()
      document.removeEventListener('click', onClick)
    }
  }, [])

  return null
}
