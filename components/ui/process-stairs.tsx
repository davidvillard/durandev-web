'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

const STEP_MS = 2200

const steps = [
  { title: 'Cuéntame', text: 'Dime qué necesitas, qué quieres conseguir y qué te preocupa.' },
  { title: 'Te propongo', text: 'Defino una solución clara, con alcance y prioridades.' },
  { title: 'Construyo', text: 'Diseño y desarrollo, con revisiones contigo en cada paso.' },
  { title: 'Publico', text: 'Lanzo, mido y dejo todo listo para que sigas creciendo.' },
]

export function ProcessStairs() {
  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { margin: '-15% 0px' })
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [autoplay, setAutoplay] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setAutoplay(!query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!autoplay || paused || !inView) return
    const id = setInterval(() => setActive((i) => (i + 1) % steps.length), STEP_MS)
    return () => clearInterval(id)
  }, [autoplay, paused, inView])

  return (
    <section className="section process-section" id="proceso">
      <div className="container">
        <div className="section-kicker">// cómo trabajo</div>
        <h2>
          Sin sorpresas,
          <br />
          <span>paso a paso.</span>
        </h2>

        <ol className="st-grid" ref={ref}>
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="st-step"
              data-active={i === active}
              onMouseEnter={() => {
                setPaused(true)
                setActive(i)
              }}
              onMouseLeave={() => setPaused(false)}
            >
              {i === active && (
                <motion.span
                  layoutId="st-walker"
                  className="st-walker"
                  aria-hidden="true"
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                />
              )}
              {i === steps.length - 1 && active === i && (
                <motion.span
                  className="st-flag"
                  aria-hidden="true"
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.25, type: 'spring', stiffness: 300, damping: 16 }}
                >
                  ¡En línea!
                </motion.span>
              )}
              <span className="st-no" aria-hidden="true">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="bridge">
          <p>¿Empezamos por el paso 1?</p>
          <a className="button" href="#contacto" data-track="puente:proceso">Cuéntame tu proyecto</a>
        </div>

        <p className="todo-note">TODO: definir plazos habituales y condiciones de pago.</p>
      </div>
    </section>
  )
}
