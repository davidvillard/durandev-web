'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUp, ArrowUpRight, X } from 'lucide-react'
import { reply, TOPICS } from '@/lib/chat-knowledge'
import { trackEvent } from '@/lib/track'

const NAME = 'Orballo'

type Message = { id: number; from: 'bot' | 'user'; text: string }

const greeting: Message = {
  id: 0,
  from: 'bot',
  text: `Hola, soy ${NAME}, el asistente de David. Pregúntame lo que quieras sobre webs, tiendas online, SEO o mantenimiento.`,
}

export function Chatbot() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([greeting])
  const [asked, setAsked] = useState<string[]>([])
  const [draft, setDraft] = useState('')
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

  function send(question: string, answer: { topicId: string | null; text: string }) {
    if (typing) return
    trackEvent('chat_message', { topic: answer.topicId ?? 'none' })
    if (answer.topicId) setAsked((prev) => (prev.includes(answer.topicId!) ? prev : [...prev, answer.topicId!]))
    setMessages((prev) => [...prev, { id: nextId.current++, from: 'user', text: question }])
    setTyping(true)
    timer.current = setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextId.current++, from: 'bot', text: answer.text }])
      setTyping(false)
    }, reduce ? 0 : Math.min(500 + answer.text.length * 6, 1300))
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const text = draft.trim().slice(0, 200)
    if (!text || typing) return
    setDraft('')
    send(text, reply(text))
  }

  const remaining = TOPICS.filter((t) => t.chip && !asked.includes(t.id))
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
                {!typing && remaining.slice(0, 3).map((t) => (
                  <motion.button
                    key={t.id}
                    type="button"
                    className="orb-chip"
                    layout={!reduce}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: reduce ? 0 : 0.3, ease }}
                    onClick={() => send(t.question, { topicId: t.id, text: t.answer })}
                  >
                    {t.question}
                  </motion.button>
                ))}
              </AnimatePresence>
              <form className="orb-form" onSubmit={submit}>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  maxLength={200}
                  placeholder="Escribe tu pregunta…"
                  aria-label="Escribe tu pregunta"
                  autoComplete="off"
                />
                <button type="submit" aria-label="Enviar" disabled={!draft.trim() || typing}><ArrowUp size={16} aria-hidden="true" /></button>
              </form>
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
