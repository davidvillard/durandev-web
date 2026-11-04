import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { SITE_URL } from '@/lib/site'
import './globals.css'
import './component-styles.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Desarrollador web freelance en Vigo | durandev',
    template: '%s | durandev',
  },
  description: 'Desarrollo web, tiendas online y SEO local para negocios de Vigo y Galicia. Trato directo, tecnología moderna y resultados medibles.',
  generator: 'Next.js',
  keywords: ['desarrollador web Vigo', 'diseño web Vigo', 'SEO local Vigo', 'tiendas online Vigo'],
  openGraph: {
    title: 'Desarrollador web freelance en Vigo | durandev',
    description: 'Webs y soluciones digitales para negocios de Vigo y Galicia.',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  appleWebApp: { title: 'durandev' },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
