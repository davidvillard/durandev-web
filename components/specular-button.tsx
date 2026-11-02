'use client'

import { type ButtonHTMLAttributes, type CSSProperties, type PointerEvent as ReactPointerEvent, useRef } from 'react'

type SpecularButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> & {
  size?: 'sm' | 'md' | 'lg'
  radius?: number
  tint?: string
  tintOpacity?: number
  textColor?: string
  lineColor?: string
  baseColor?: string
  intensity?: number
  idleIntensity?: number
  shineSize?: number
  shineFade?: number
  thickness?: number
  glow?: number
  followMouse?: boolean
  proximity?: number
}

type SpecularStyle = CSSProperties & { [key: `--${string}`]: string | number }

export function SpecularButton({
  className = '',
  children,
  size = 'md',
  radius = 9,
  tint = '#ffffff',
  tintOpacity = 0.04,
  textColor = '#101317',
  lineColor = 'rgba(255,154,77,.9)',
  baseColor = '#ff7a1a',
  intensity = 0.8,
  idleIntensity = 0.25,
  shineSize = 10,
  shineFade = 34,
  thickness = 1,
  glow = 0.8,
  followMouse = true,
  proximity = 250,
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}: SpecularButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    onPointerMove?.(event)
    if (!followMouse) return

    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const distance = Math.hypot(x - rect.width / 2, y - rect.height / 2)
    const proximityIntensity = proximity > 0 ? Math.max(0, 1 - distance / proximity) : 1

    button.style.setProperty('--pointer-x', `${(x / rect.width) * 100}%`)
    button.style.setProperty('--pointer-y', `${(y / rect.height) * 100}%`)
    button.style.setProperty('--shine-current-opacity', `${intensity * proximityIntensity}`)
  }

  const handlePointerLeave = (event: ReactPointerEvent<HTMLButtonElement>) => {
    onPointerLeave?.(event)
    event.currentTarget.style.setProperty('--shine-current-opacity', `${idleIntensity}`)
  }

  const buttonStyle: SpecularStyle = {
    ...style,
    '--button-radius': `${radius}px`,
    '--button-tint': tint,
    '--button-tint-opacity': tintOpacity,
    '--button-text': textColor,
    '--button-line': lineColor,
    '--button-base': baseColor,
    '--shine-size': `${shineSize}%`,
    '--shine-fade': `${shineFade}%`,
    '--shine-current-opacity': idleIntensity,
    '--button-thickness': `${thickness}px`,
    '--button-glow': `${glow * 24}px`,
  }

  return (
    <button
      ref={ref}
      className={`specular-button specular-button--${size} ${className}`}
      style={buttonStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      <span className="specular-button__shine" aria-hidden="true" />
      <span className="specular-button__label">{children}</span>
    </button>
  )
}
