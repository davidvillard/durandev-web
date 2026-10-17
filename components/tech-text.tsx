'use client'

import { useEffect, useRef, useState } from 'react'
import ReactBitsTechText from './TechText'

type TextFont = {
  fontFamily: string
  fontWeight: number
  fontSize: number
  letterSpacing: number
}

export function TechText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [animated, setAnimated] = useState(false)
  const [font, setFont] = useState<TextFont | null>(null)

  useEffect(() => {
    const word = ref.current
    if (!word) return

    const updateFont = () => {
      const style = getComputedStyle(word)
      const fontSize = parseFloat(style.fontSize)
      const nextFont = {
        fontFamily: style.fontFamily,
        fontWeight: parseInt(style.fontWeight, 10) || 600,
        fontSize,
        letterSpacing: (parseFloat(style.letterSpacing) || 0) / fontSize,
      }
      setFont(current =>
        current && Object.entries(nextFont).every(([key, value]) => current[key as keyof TextFont] === value)
          ? current
          : nextFont,
      )
    }
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setAnimated(!preference.matches)
    const observer = new ResizeObserver(updateFont)

    updateFont()
    updateMotion()
    observer.observe(word)
    preference.addEventListener('change', updateMotion)

    return () => {
      observer.disconnect()
      preference.removeEventListener('change', updateMotion)
    }
  }, [])

  return (
    <span ref={ref} className="hero-tech-word" data-animated={animated && font !== null}>
      <span className="hero-tech-fallback">{text}</span>
      {animated && font && (
        <span className="hero-tech-canvas" aria-hidden="true">
          <ReactBitsTechText
            text={text}
            {...font}
            color="currentColor"
            accentColor="#f0f1ed"
            reach={120}
            labels={false}
            selection={false}
            draggable={false}
            clickKick={false}
            specks={5}
            intro="none"
            style={{ display: 'block' }}
          />
        </span>
      )}
    </span>
  )
}
