import { HomePage } from '@/components/home-page'

export default function Page() {
  return <HomePage />
}

export const metadata = {
  title: 'Desarrollador web freelance en Vigo | David Villar',
  description: 'Desarrollo webs rápidas y tiendas online para negocios de Vigo y Galicia. Next.js, WordPress, WooCommerce, Odoo y SEO técnico.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Desarrollador web freelance en Vigo', description: 'Webs que ayudan a negocios locales a crecer.', type: 'website' },
}

export const revalidate = 3600

export function generateStaticParams() { return [] }

