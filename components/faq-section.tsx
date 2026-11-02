'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { trackEvent } from '@/lib/track'

export function FaqSection({ faqs }: { faqs: string[][] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section faq-section" id="preguntas">
      <div className="container faq2">
        <div className="faq2-aside">
          <div className="section-kicker">// preguntas frecuentes</div>
          <h2>
            Resuelvo tus
            <br />
            <span>dudas.</span>
          </h2>
          <p className="section-intro">¿No encuentras tu respuesta? Escríbeme y lo resolvemos.</p>
          <Link href="#contacto" className="text-link" data-track="puente:faq">
            Hacer una pregunta <ArrowUpRight size={16} />
          </Link>
        </div>

        <ul className="faq2-list">
          {faqs.map(([question, answer], i) => {
            const isOpen = open === i
            return (
              <li key={question} className="faq2-item" data-open={isOpen}>
                <button type="button" className="faq2-q" aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => {
                    if (!isOpen) trackEvent('faq_open', { question: i + 1 })
                    setOpen(isOpen ? null : i)
                  }}>
                  <span>{question}</span>
                  <span className="faq2-icon" aria-hidden="true"><Plus size={20} /></span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      className="faq2-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
