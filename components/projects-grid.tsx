import { ArrowUpRight } from 'lucide-react'

type Project = {
  theme: 'anden' | 'cars' | 'interstellar' | 'stackhub' | 'horarios'
  name: string
  blurb?: string
  stack: string[]
  url: string
  href: string
  label: string
}

const projects: Project[] = [
  {
    theme: 'anden',
    name: 'Andén',
    blurb: 'Retrasos de Renfe y Cercanías en directo.',
    stack: ['Web app', 'Datos en directo'],
    url: 'andentren.es',
    href: 'https://andentren.es',
    label: 'Ver la web',
  },
  {
    theme: 'cars',
    name: '¿Qué coche es?',
    blurb: 'Identifica un coche por foto, con ficha técnica y precio.',
    stack: ['Next.js', 'React'],
    url: 'quecochees.es',
    href: 'https://quecochees.es',
    label: 'Ver la web',
  },
  {
    theme: 'interstellar',
    name: 'Interstellar Fan Page',
    stack: ['HTML', 'CSS', 'JS', 'Tailwind'],
    url: 'interstellarfanpage.netlify.app',
    href: 'https://interstellarfanpage.netlify.app',
    label: 'Ver la web',
  },
  {
    theme: 'stackhub',
    name: 'StackHub',
    stack: ['React', 'Tailwind'],
    url: 'stackhub.netlify.app',
    href: 'https://stackhub.netlify.app',
    label: 'Ver la web',
  },
  {
    theme: 'horarios',
    name: 'Gestión de Horarios',
    stack: ['React', 'PHP', 'Tailwind', 'Proyecto colaborativo'],
    url: 'github.com/sempereluismi/modular',
    href: 'https://github.com/sempereluismi/modular',
    label: 'Ver el repositorio',
  },
]

const delays = [
  ['C-3', '+12'],
  ['C-1', '+4'],
  ['R-11', '+25'],
]

function Mock({ theme }: { theme: Project['theme'] }) {
  if (theme === 'anden') {
    return (
      <>
        <div className="pj-screen pj-a-hero">
          {delays.map(([line, min]) => (
            <p key={line}><b>{line}</b><i /><u>{min} min</u></p>
          ))}
        </div>
        <div className="pj-screen pj-a-body">
          {delays.map(([line]) => (
            <p key={line}><b>{line}</b><i /></p>
          ))}
        </div>
      </>
    )
  }
  if (theme === 'cars') {
    return (
      <>
        <div className="pj-screen pj-c-hero"><div className="pj-c-frame"><span /></div></div>
        <div className="pj-screen pj-c-body"><b /><b /><b /><b /></div>
      </>
    )
  }
  if (theme === 'interstellar') {
    return (
      <>
        <div className="pj-screen pj-i-hero"><span>INTERSTELLAR</span></div>
        <div className="pj-screen pj-i-body"><i /><i /><i /><b /><b /></div>
      </>
    )
  }
  if (theme === 'stackhub') {
    return (
      <>
        <div className="pj-screen pj-s-hero"><span>stack<em>hub</em></span><small /></div>
        <div className="pj-screen pj-s-body">{Array.from({ length: 6 }, (_, n) => <i key={n} />)}</div>
      </>
    )
  }
  return (
    <>
      <div className="pj-screen pj-h-hero">
        {Array.from({ length: 15 }, (_, n) => <i key={n} data-on={[1, 2, 6, 8, 9, 12, 13].includes(n)} />)}
      </div>
      <div className="pj-screen pj-h-body"><b /><b /><b /><b /></div>
    </>
  )
}

export function ProjectsGrid() {
  return (
    <div className="pj-grid">
      {projects.map((p) => (
        <a key={p.name} className="pj-card" href={p.href} target="_blank" rel="noreferrer" aria-label={`${p.name}: ${p.label}`} data-track={`proyecto:${p.theme}`}>
          <div className="pj-frame" aria-hidden="true">
            <div className="pj-bar"><i /><i /><i /><span>{p.url}</span></div>
            <div className="pj-view">
              <div className={`pj-scroll pj-t-${p.theme}`}><Mock theme={p.theme} /></div>
            </div>
          </div>
          <div className="pj-meta">
            <div>
              <h3>{p.name}</h3>
              {p.blurb && <p className="pj-blurb">{p.blurb}</p>}
              <ul className="pj-stack">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <span className="pj-go" aria-hidden="true"><ArrowUpRight size={20} /></span>
          </div>
        </a>
      ))}
    </div>
  )
}
