import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { LEGAL } from '@/lib/legal'

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="legal">
      <div className="legal-inner">
        <Link href="/" className="legal-back"><ArrowLeft size={16} aria-hidden="true" /> Volver al inicio</Link>
        <h1>{title}</h1>
        <p className="legal-date">Última actualización: {LEGAL.actualizado}</p>
        {children}
      </div>
    </main>
  )
}
