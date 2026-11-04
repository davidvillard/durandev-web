'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { trackEvent } from '@/lib/track'

const NAME = 'Orballo'

const questions = [
  ['¿Qué servicios ofreces?', 'Hago páginas web, tiendas online, SEO y mantenimiento web. Nada más: me centro en eso para hacerlo bien.'],
  ['¿Cuánto cuesta una web?', 'Depende de lo que necesites: número de páginas, si lleva tienda, funciones extra… Cuéntale tu proyecto a David y te pasa una propuesta con el precio.'],
  ['¿Cuánto se tarda?', 'Depende del tamaño del proyecto. En la propuesta te indica los plazos antes de empezar.'],
  ['¿Haces tiendas online?', 'Sí. Monta tiendas online listas para vender y para que puedas gestionar tus productos tú mismo.'],
  ['¿Me ayudas a salir en Google?', 'Sí. Cuida la estructura, la velocidad y el SEO técnico de tu web, con foco en las búsquedas locales. El alcance exacto se define en la propuesta.'],
  ['¿Te encargas del mantenimiento?', 'Sí. Mantiene tu web al día y resuelve los cambios que necesites. Cuéntale qué web tienes y lo vemos.'],
  ['¿Trabajas fuera de Vigo?', 'Sí. Trabaja en toda Galicia y en remoto para cualquier punto de España.'],
  ['¿Cómo empezamos?', 'Es fácil: responde tres preguntas rápidas en el formulario de abajo y David te contesta en menos de 24 horas, sin compromiso.'],
] as const

type Message = { id: number; from: 'bot' | 'user'; text: string }

const greeting: Message = {
  id: 0,
  from: 'bot',
  text: `Hola, soy ${NAME}, el asistente de David. Te resuelvo lo básico en un momento. ¿Qué quieres saber?`,
}

export function Chatbot() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([greeting])
  const [asked, setAsked] = useState<number[]>([])
  const [typing, setTyping] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const nextId = useRef(1)

  useEffect(() => () => clearTimeout(timer.current), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [messages, typing, reduce])

  function toggle() {
    if (!open) trackEvent('chat_open')
    setOpen(!open)
  }

  function ask(index: number) {
    if (typing) return
    const [q, a] = questions[index]
    trackEvent('chat_question', { question: index + 1 })
    setAsked((prev) => [...prev, index])
    setMessages((prev) => [...prev, { id: nextId.current++, from: 'user', text: q }])
    setTyping(true)
    timer.current = setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextId.current++, from: 'bot', text: a }])
      setTyping(false)
    }, reduce ? 0 : 900)
  }

  const remaining = questions.map((_, i) => i).filter((i) => !asked.includes(i))
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <div className="orb">
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            id="orb-panel"
            className="orb-panel"
            role="dialog"
            aria-label={`Chat con ${NAME}`}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: reduce ? 0 : 0.35, ease }}
          >
            <header className="orb-head">
              <span className="orb-avatar" aria-hidden="true"><i /><i /></span>
              <div>
                <strong>{NAME}</strong>
                <span><b className="orb-dot" aria-hidden="true" />En línea</span>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar chat"><X size={16} /></button>
            </header>

            <div className="orb-list" ref={listRef} aria-live="polite">
              {messages.map((m) => (
                <motion.p
                  key={m.id}
                  className={`orb-msg orb-${m.from}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease }}
                >
                  {m.text}
                </motion.p>
              ))}
              {typing && (
                <motion.p key="typing" className="orb-msg orb-bot orb-typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-label={`${NAME} está escribiendo`}>
                  <i /><i /><i />
                </motion.p>
              )}
            </div>

            <div className="orb-actions">
              <AnimatePresence initial={false}>
                {!typing && remaining.slice(0, 3).map((i) => (
                  <motion.button
                    key={i}
                    type="button"
                    className="orb-chip"
                    layout={!reduce}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: reduce ? 0 : 0.3, ease }}
                    onClick={() => ask(i)}
                  >
                    {questions[i][0]}
                  </motion.button>
                ))}
              </AnimatePresence>
              <a className="orb-cta" href="#contacto" data-track="chat:contacto" onClick={() => setOpen(false)}>
                Cuéntame tu proyecto <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className={open ? 'orb-launch is-open' : 'orb-launch'}
        onClick={toggle}
        aria-expanded={open}
        aria-controls="orb-panel"
        aria-label={open ? `Cerrar chat con ${NAME}` : `Abrir chat con ${NAME}`}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.95 }}
        transition={{ duration: 0.25, ease }}
      >
        <span className="orb-face" aria-hidden="true"><i /><i /></span>
      </motion.button>
    </div>
  )
}
