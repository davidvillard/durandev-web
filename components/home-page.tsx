'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { ArrowUpRight, Code2, Layers3, Menu, MapPin, MessageCircle, Search, Send, ShoppingCart, X, Zap } from 'lucide-react'
import { SpecularButton } from '@/components/specular-button'
import { TechText } from '@/components/tech-text'
import { SiteFooter } from '@/components/closing'
import { LeadFunnel } from '@/components/lead-funnel'
import { FaqSection } from '@/components/faq-section'
import { SectionTracker } from '@/components/section-tracker'
import { startFunnel } from '@/lib/funnel'
import { trackEvent } from '@/lib/track'
import { ProjectsGrid } from '@/components/projects-grid'
import { ProcessStairs } from '@/components/ui/process-stairs'
import { MinimalistHero } from '@/components/ui/minimalist-hero'

const services = [
  { icon: Code2, option: 'Una web nueva', title: 'Diseño y desarrollo web', text: 'Diseño y programo webs rápidas y claras que convierten visitas en contactos.', href: '/servicios/diseno-web-vigo', tag: 'Next.js · React' },
  { icon: ShoppingCart, option: 'Una tienda online', title: 'Tiendas online', text: 'Monto tu tienda con WooCommerce u Odoo, lista para vender y crecer contigo.', href: '/servicios/tiendas-online-vigo', tag: 'WooCommerce · Odoo' },
  { icon: Search, option: 'Salir en Google', title: 'SEO local', text: 'Optimizo tu web para que te encuentren en Vigo cuando te buscan.', href: '/servicios/seo-local-vigo', tag: 'SEO técnico' },
  { icon: Zap, option: 'Automatizar tareas', title: 'Automatizaciones', text: 'Conecto tus herramientas y elimino las tareas repetitivas.', href: '/servicios/automatizaciones-vigo', tag: 'APIs · Django' },
]
const faqs = [
  ['¿Qué servicios ofreces?', 'Diseño y programo webs, monto tiendas online, implemento Odoo, optimizo tu SEO local, automatizo tareas y mantengo tu web al día. Para negocios y pymes.'],
  ['¿Trabajas con negocios fuera de Vigo?', 'Sí. Trabajo en toda Galicia y en remoto para cualquier punto de España.'],
  ['¿WordPress, Next.js u Odoo?', 'Depende de tu objetivo. Elijo la tecnología que encaje con tu equipo, tu presupuesto y lo que necesites editar tú.'],
  ['¿Haces SEO?', 'Sí: cuido la estructura, el rendimiento, el SEO técnico y las bases locales. El alcance exacto lo defino contigo en la propuesta.'],
  ['¿Cómo empezamos?', 'Cuéntame qué necesitas en el formulario y te respondo para entender tu proyecto, sin compromiso.'],
]
const tools = [
  { name: 'Next.js', logo: 'https://svgl.app/library/nextjs_icon_dark.svg' },
  { name: 'React', logo: 'https://svgl.app/library/react_dark.svg' },
  { name: 'TypeScript', logo: 'https://svgl.app/library/typescript.svg' },
  { name: 'WordPress', logo: 'https://svgl.app/library/wordpress.svg' },
  { name: 'Odoo' },
  { name: 'Figma', logo: 'https://svgl.app/library/figma.svg' },
  { name: 'Django', logo: 'https://svgl.app/library/django.svg' },
  { name: 'Docker', logo: 'https://svgl.app/library/docker.svg' },
]

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .55, delay }} className={className}>{children}</motion.div>
}

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header"><div className="container nav-wrap"><Link href="#top" className="brand"><span className="brand-mark">dv</span><span>David Villar<span className="brand-dot">.</span></span></Link><nav className={open ? 'nav-links open' : 'nav-links'}><Link href="#servicios" onClick={() => setOpen(false)}>Servicios</Link><Link href="#proceso" onClick={() => setOpen(false)}>Proceso</Link><Link href="#trabajos" onClick={() => setOpen(false)}>Trabajos</Link><Link href="#sobre-mi" onClick={() => setOpen(false)}>Sobre mí</Link></nav><div className="nav-actions"><a className="whatsapp-link" href="https://wa.me/[TELÉFONO]" data-track="whatsapp:cabecera" aria-label="Hablar por WhatsApp"><MessageCircle size={16} /> WhatsApp</a><Link className="button button-small" href="#contacto" data-track="cabecera">Pide presupuesto <ArrowUpRight size={16} /></Link><button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>{open ? <X /> : <Menu />}</button></div></div></header>
}

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [answer, setAnswer] = useState<string | null>(null)
  return <motion.div className="chatbot" drag dragElastic={.15} whileDrag={{ scale: 1.03 }}><AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: 10, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} id="faq-chat-panel" className="chat-panel" role="dialog" aria-label="Preguntas frecuentes"><div className="chat-head"><div><strong>Hola, soy DV Bot</strong><span>Respuestas rápidas, sin IA.</span></div><button onClick={() => { setOpen(false); setAnswer(null) }} aria-label="Cerrar chat"><X size={16} /></button></div>{answer ? <div className="chat-answer"><p>{answer}</p><button className="back-question" onClick={() => setAnswer(null)}>← Volver a preguntas</button></div> : <div className="chat-questions">{faqs.slice(0, 5).map(([q, a]) => <button key={q} onClick={() => setAnswer(a)}>{q}<ArrowUpRight size={14} /></button>)}</div>}</motion.div>}</AnimatePresence><button className="bot-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="faq-chat-panel" aria-label={open ? 'Cerrar preguntas frecuentes' : 'Abrir preguntas frecuentes'}><span className="bot-face" aria-hidden="true"><span className="bot-eyes"><i /><i /></span><span className="bot-mouth" /></span><span className="bot-antenna" aria-hidden="true" /></button></motion.div>
}

export function HomePage() {
  const { scrollYProgress } = useScroll(); const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 30 })
  return <><motion.div className="progress" style={{ scaleX }} /><Header /><main id="top"><MinimalistHero words={['WEB', 'VIGO']} eyebrow="Desarrollador web freelance · Vigo" title={<>Desarrollo webs que te traen <em>clientes</em>.</>} imageSrc="/pic-hero-2.png" imageAlt="Retrato de David Villar, desarrollador web freelance en Vigo" socialLinks={[{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/davidvillard/', icon: 'linkedin' }, { label: 'Instagram', href: 'https://www.instagram.com/davidvillardd/', icon: 'instagram' }, { label: 'Enviar correo', href: 'mailto:davidvillard6@gmail.com', icon: 'gmail' }]}><p className="hero-lead">Diseño y programo webs y tiendas online para negocios de Vigo y Galicia. Rápidas, claras y hechas para vender.</p><div className="hero-actions"><SpecularButton size="lg" radius={9} tint="#ffffff" tintOpacity={0.04} textColor="#101317" lineColor="rgba(255,154,77,.9)" baseColor="#ff7a1a" intensity={0.85} idleIntensity={0.25} shineSize={10} shineFade={34} thickness={1} glow={0.8} followMouse proximity={250} type="button" onClick={() => { trackEvent('cta_click', { origin: 'hero' }); window.location.hash = 'contacto' }}>Cuéntame tu proyecto <ArrowUpRight size={18} /></SpecularButton><a href="https://wa.me/[TELÉFONO]" className="button button-ghost" data-track="whatsapp:hero"><MessageCircle size={18} /> Escríbeme por WhatsApp</a></div></MinimalistHero>
  <section className="section services-section" id="servicios"><div className="container"><Reveal><div className="section-kicker">// lo que puedo hacer por ti</div><h2>Resuelvo lo que frena<br /><span>tu negocio online.</span></h2><p className="section-intro">Una web que se vea bien no basta. La hago cargar rápido, explicarse sola y traerte oportunidades.</p></Reveal><ol className="services-list">{services.map((service, i) => { const Icon = service.icon; return <li key={service.title}><Reveal delay={i * .06}><a href="#contacto" className="service-row" data-track={`servicio:${service.option}`} onClick={() => startFunnel(service.option)}><span className="service-no">0{i + 1}</span><div className="service-main"><h3>{service.title}</h3><p>{service.text}</p></div><span className="card-tag"><Icon size={16} aria-hidden="true" /> {service.tag}</span><span className="service-go"><span className="service-cta">Lo necesito</span><ArrowUpRight size={26} aria-hidden="true" /></span></a></Reveal></li> })}</ol></div></section>
    <section className="stack-strip" aria-label="Herramientas y tecnologías"><div className="container stack-inner"><span className="stack-label">HERRAMIENTAS</span><div className="stack-items">{tools.map(({ name, logo }) => <span className="stack-tool" role="img" aria-label={name} title={name} key={name}>{logo ? <img src={logo} alt="" loading="lazy" /> : <Layers3 aria-hidden="true" />}</span>)}</div></div></section>
    <section className="section work-section" id="trabajos"><div className="container"><Reveal><div className="section-kicker">// trabajos seleccionados</div><div className="heading-row"><h2>Proyectos que<br /><span>he construido.</span></h2><Link href="/trabajos" className="text-link">Ver todos los trabajos <ArrowUpRight size={16} /></Link></div></Reveal><ProjectsGrid /><div className="bridge"><p>¿Quieres una web así para tu negocio?</p><a className="button" href="#contacto" data-track="puente:proyectos">Cuéntame tu proyecto</a></div></div></section>
    <ProcessStairs />
    <section className="section about-section" id="sobre-mi"><div className="container"><Reveal><h2 className="about-statement">Desarrollo webs <span className="about-pill about-pill-lime" aria-hidden="true"><Code2 /></span> y tiendas online <span className="about-pill about-pill-cream" aria-hidden="true"><ShoppingCart /></span> para negocios de Vigo. <span className="about-pill about-pill-outline" aria-hidden="true"><MapPin /></span> Resuelvo lo técnico para que tú te ocupes de vender.</h2></Reveal><div className="about-facts"><div><h3>Aparece en Google</h3><p>Cuido el SEO y la velocidad desde el primer día.</p></div><div><h3>Habla conmigo directamente</h3><p>Sin intermediarios, de la idea a la publicación.</p></div><div><h3>Usa lo que te encaje</h3><p>Next.js, WordPress u Odoo: elijo lo que mejor te sirva.</p></div></div><a href="#contacto" className="about-link" data-track="puente:sobre-mi">Cuéntame tu proyecto</a></div></section>
    <FaqSection faqs={faqs} />
    <LeadFunnel /><SectionTracker /></main><SiteFooter /><Chatbot /></>
}
