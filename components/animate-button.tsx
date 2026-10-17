'use client'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type SharedProps = {
  variant?: 'default' | 'accent' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  hoverScale?: number
  tapScale?: number
  className?: string
  children: React.ReactNode
}

type AnimateButtonProps = SharedProps & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>)

export function AnimateButton({ variant = 'default', size = 'default', hoverScale = 1.04, tapScale = 0.97, className, children, ...props }: AnimateButtonProps) {
  const classes = cn('animate-button', `animate-button-${variant}`, `animate-button-${size}`, className)
  if ('href' in props) {
    return <motion.a {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes} whileHover={{ scale: hoverScale }} whileTap={{ scale: tapScale }}>{children}</motion.a>
  }
  return <motion.button {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes} whileHover={{ scale: hoverScale }} whileTap={{ scale: tapScale }}>{children}</motion.button>
}
