import { HomePage } from '@/components/home-page'
import { SITE_URL } from '@/lib/site'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'durandev · Desarrollador web freelance',
  url: SITE_URL,
  image: `${SITE_URL}/web-app-manifest-512x512.png`,
  email: 'davidvillard6@gmail.com',
  description: 'Páginas web, tiendas online, SEO y mantenimiento web para negocios de Vigo y Galicia.',
  areaServed: [{ '@type': 'City', name: 'Vigo' }, { '@type': 'AdministrativeArea', name: 'Galicia' }],
  address: { '@type': 'PostalAddress', addressLocality: 'Vigo', addressRegion: 'Galicia', addressCountry: 'ES' },
  sameAs: ['https://www.instagram.com/durandev/', 'https://github.com/davidvillard', 'https://www.linkedin.com/in/davidvillard/'],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <HomePage />
    </>
  )
}

export const metadata = {
  title: 'Desarrollador web freelance en Vigo | durandev',
  description: 'Desarrollo webs rápidas y tiendas online para negocios de Vigo y Galicia. Páginas web, tiendas online, SEO y mantenimiento web.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Desarrollador web freelance en Vigo', description: 'Webs que ayudan a negocios locales a crecer.', type: 'website', url: '/', siteName: 'durandev', locale: 'es_ES' },
}

export const revalidate = 3600

export function generateStaticParams() { return [] }

