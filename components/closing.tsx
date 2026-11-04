import BeamWordmarkFooter from '@/components/ui/beam-wordmark-footer'

const mailIcon = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="m4.5 7.5 7.5 6 7.5-6" />
  </g>
)

export function SiteFooter() {
  return (
    <BeamWordmarkFooter
      brand="durandev."
      company="David Villar Durán"
      year={2026}
      socials={[
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/davidvillard/', icon: 'linkedin' },
        { label: 'Instagram', href: 'https://www.instagram.com/durandev/', icon: 'instagram' },
        { label: 'GitHub', href: 'https://github.com/davidvillard', icon: 'github' },
        { label: 'Email', href: 'mailto:davidvillard6@gmail.com', icon: mailIcon },
      ]}
      credits={[
        { lead: 'Desarrollador web freelance en ', label: 'Vigo y Galicia' },
        { label: 'davidvillard6@gmail.com', href: 'mailto:davidvillard6@gmail.com' },
      ]}
      columns={[
        {
          title: 'Enlaces',
          links: [
            { label: 'Servicios', href: '#servicios' },
            { label: 'Sobre mí', href: '#sobre-mi' },
            { label: 'Proyectos', href: '#trabajos' },
            { label: 'Contacto', href: '#contacto' },
          ],
        },
        {
          title: 'Legal',
          links: [
            { label: 'Aviso legal', href: '/aviso-legal' },
            { label: 'Privacidad', href: '/politica-de-privacidad' },
            { label: 'Cookies', href: '/politica-de-cookies' },
          ],
        },
      ]}
      background="#0c0f11"
      ink="#f0f1ed"
      muted="#8b9490"
      accent="#5b8cff"
      wordTop="#2347a8"
      wordFoot="#070b1a"
      fontSans="var(--font-inter), Arial, sans-serif"
      wordWeight={700}
    />
  )
}
