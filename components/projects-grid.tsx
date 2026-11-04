import { ArrowUpRight } from 'lucide-react'

type Project = {
  slug: string
  name: string
  blurb: string
  stack: string[]
  url: string
  href?: string
  zoom?: number
  label: string
}

const projects: Project[] = [
  {
    slug: 'anden',
    name: 'Andén',
    blurb: 'Retrasos de Renfe y Cercanías en directo.',
    stack: ['Web app', 'Datos en directo'],
    url: 'andentren.es',
    zoom: 165,
    href: 'https://andentren.es',
    label: 'Ver la web',
  },
  {
    slug: 'quecochees',
    name: '¿Qué coche es?',
    blurb: 'Identifica un coche por foto, con ficha técnica y precio.',
    stack: ['Next.js', 'React'],
    url: 'quecochees.es',
    zoom: 165,
    href: 'https://quecochees.es',
    label: 'Ver la web',
  },
  {
    slug: 'stackhub',
    name: 'StackHub',
    blurb: 'Recursos gratis para diseño web, en un solo sitio.',
    stack: ['React', 'Tailwind'],
    url: 'stackhub.netlify.app',
    href: 'https://stackhub.netlify.app',
    label: 'Ver la web',
  },
  {
    slug: 'huella-de-puri',
    name: 'La Huella de Puri',
    blurb: 'Tienda online de piezas hechas a mano.',
    stack: ['Tienda online', 'Artesanía'],
    url: 'La Huella de Puri',
    label: 'Proyecto de cliente',
  },
]

export function ProjectsGrid() {
  return (
    <div className="pj-grid">
      {projects.map((p) => {
        const body = (
          <>
            <div className="pj-frame" aria-hidden="true">
              <div className="pj-bar"><i /><i /><i /><span>{p.url}</span></div>
              <div className="pj-view">
                <div className="pj-shot" style={{ backgroundImage: `url(/proyectos/${p.slug}.webp)`, backgroundSize: `${p.zoom ?? 100}% auto` }} />
              </div>
            </div>
            <div className="pj-meta">
              <div>
                <h3>{p.name}</h3>
                <p className="pj-blurb">{p.blurb}</p>
                <ul className="pj-stack">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
              {p.href && <span className="pj-go" aria-hidden="true"><ArrowUpRight size={20} /></span>}
            </div>
          </>
        )
        return p.href ? (
          <a key={p.slug} className="pj-card" href={p.href} target="_blank" rel="noreferrer" aria-label={`${p.name}: ${p.label}`} data-track={`proyecto:${p.slug}`}>{body}</a>
        ) : (
          <div key={p.slug} className="pj-card">{body}</div>
        )
      })}
    </div>
  )
}
