# durandev

**[durandev.vercel.app](https://durandev.vercel.app)** · Web de durandev, mi marca de desarrollo web freelance en Vigo: páginas web, tiendas online, SEO y mantenimiento para negocios de Vigo y Galicia.

## Qué incluye

- Home con servicios, proyectos, preguntas frecuentes y cierre con llamada a la acción
- Formulario de contacto en pasos que envía el aviso por correo con [Resend](https://resend.com) (`app/api/lead`)
- Asistente de preguntas frecuentes (`components/chatbot.tsx`)
- Aviso legal, política de privacidad y de cookies, con analítica solo tras el consentimiento
- SEO técnico: `sitemap.ts`, `robots.ts`, imágenes Open Graph y verificación de Search Console

## Tecnología

**Next.js** (App Router) · **React 19** · **TypeScript** · **Tailwind CSS 4** · componentes de **shadcn/ui** y Base UI · animaciones con **Motion** · iconos de `lucide-react` · Vercel Analytics. Publicada en **Vercel**.

## Arrancar

```bash
pnpm install
pnpm dev
```

Abre http://localhost:3000.

### Variables de entorno

| Variable | Para qué |
|---|---|
| `RESEND_API_KEY` | Envío del formulario de contacto |
| `LEAD_TO_EMAIL` | Correo que recibe los contactos |
| `LEAD_FROM_EMAIL` | Remitente de los correos (por defecto `onboarding@resend.dev`) |
| `NEXT_PUBLIC_SITE_URL` | URL pública, para el sitemap y las etiquetas canónicas |
