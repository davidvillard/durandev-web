'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { AnimatePresence, MotionConfig, motion, useInView } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/track'
import { LEAD_EVENT } from '@/lib/funnel'

const questions = [
  { key: 'necesidad', title: '¿Qué necesitas?', options: ['Una web nueva', 'Una tienda online', 'Salir en Google', 'Mantenimiento web', 'Aún no lo sé'] },
  { key: 'plazo', title: '¿Para cuándo lo quieres?', options: ['Lo antes posible', 'En 1–3 meses', 'Solo estoy mirando'] },
  { key: 'zona', title: '¿Dónde está tu negocio?', options: ['En Vigo', 'En Galicia', 'Fuera de Galicia'] },
] as const

const EMAIL_STEP = questions.length

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function LeadFunnel() {
  const ref = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const seenView = useRef(false)
  const inView = useInView(ref, { amount: 0.35 })
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    if (inView && !seenView.current) {
      seenView.current = true
      trackEvent('cta_view')
    }
  }, [inView])

  useEffect(() => {
    if (step === EMAIL_STEP) trackEvent('cta_email_step_view')
    if (step > 0) headingRef.current?.focus({ preventScroll: true })
  }, [step])

  // A service row elsewhere on the page can answer question 1 for the visitor.
  useEffect(() => {
    const onPick = (event: Event) => {
      const { key, value } = (event as CustomEvent<{ key: string; value: string }>).detail
      trackEvent('cta_answer', { step: 1, question: key, answer: value, origin: 'servicio' })
      setAnswers((prev) => ({ ...prev, [key]: value }))
      setStep((s) => (s === 0 ? 1 : s))
    }
    window.addEventListener(LEAD_EVENT, onPick)
    return () => window.removeEventListener(LEAD_EVENT, onPick)
  }, [])

  const choose = (key: string, option: string) => {
    trackEvent('cta_answer', { step: step + 1, question: key, answer: option })
    setAnswers((prev) => ({ ...prev, [key]: option }))
    window.setTimeout(() => setStep((s) => Math.min(s + 1, EMAIL_STEP)), 220)
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, consent, website, answers }),
      })
      if (!res.ok) throw new Error(String(res.status))
      trackEvent('cta_submit', { ok: true })
      setStatus('sent')
    } catch {
      trackEvent('cta_submit', { ok: false })
      setStatus('error')
    }
  }

  const done = status === 'sent'
  const label = done ? 'Enviado' : step < EMAIL_STEP ? `${step + 1} / ${questions.length}` : 'Último paso'
  const summary = questions.map((q) => answers[q.key]).filter(Boolean)

  return (
    <MotionConfig reducedMotion="user">
      <section className="closing-cta lf" id="contacto" ref={ref}>
        <div className="container">
          <div className="lf-meta" role="progressbar" aria-label="Progreso" aria-valuemin={1} aria-valuemax={questions.length + 1} aria-valuenow={done ? questions.length + 1 : step + 1} aria-valuetext={label}>
            <span className="lf-dots" aria-hidden="true">
              {questions.map((q, i) => (
                <i key={q.key} data-on={done || i <= step} />
              ))}
            </span>
            <span className="lf-count">{label}</span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={done ? 'done' : step} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }}>
              {done ? (
                <>
                  <h2 ref={headingRef} tabIndex={-1} className="lf-q">Recibido, {name.trim().split(' ')[0]}.</h2>
                  <p className="lf-sub">Te escribo en menos de 24 horas.</p>
                </>
              ) : step < EMAIL_STEP ? (
                <>
                  <h2 ref={headingRef} tabIndex={-1} className="lf-q">{questions[step].title}</h2>
                  <div className="lf-options" role="group" aria-label={questions[step].title}>
                    {questions[step].options.map((option) => (
                      <button key={option} type="button" className="lf-opt" data-selected={answers[questions[step].key] === option} onClick={() => choose(questions[step].key, option)}>
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <form className="lf-form" onSubmit={submit}>
                  <h2 ref={headingRef} tabIndex={-1} className="lf-q">¿Dónde te envío la propuesta?</h2>
                  {summary.length > 0 && (
                    <ul className="lf-chips" aria-label="Tus respuestas">
                      {summary.map((a) => <li key={a}>{a}</li>)}
                    </ul>
                  )}
                  <input className="lf-email" type="text" name="name" required maxLength={80} autoComplete="given-name" placeholder="Tu nombre" aria-label="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
                  <input className="lf-email" type="email" name="email" required autoComplete="email" inputMode="email" placeholder="tu@email.com" aria-label="Tu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input className="lf-trap" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  <label className="lf-consent">
                    <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                    <span>
                      Acepto que me escribas y la <Link href="/politica-de-privacidad">política de privacidad</Link>.
                    </span>
                  </label>
                  <button type="submit" className="lf-submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Enviando…' : <>Quiero mi propuesta <ArrowRight size={22} aria-hidden="true" /></>}
                  </button>
                  <p className="lf-note">Te respondo en menos de 24 horas.</p>
                  <p className="lf-error" role="alert">{status === 'error' ? 'No se ha podido enviar. Inténtalo de nuevo o escríbeme a davidvillard6@gmail.com.' : ''}</p>
                </form>
              )}
            </motion.div>
          </AnimatePresence>

          {!done && step > 0 && (
            <button type="button" className="lf-back" onClick={() => setStep((s) => Math.max(0, s - 1))}>
              <ArrowLeft size={18} aria-hidden="true" /> Atrás
            </button>
          )}
        </div>
      </section>
    </MotionConfig>
  )
}
