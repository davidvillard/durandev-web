# Cambios

Versionado `MAJOR.MINOR.PATCH`:

- **MAJOR** (2.0.0): rediseño o cambio que rompe lo anterior.
- **MINOR** (1.1.0): funcionalidad o sección nueva.
- **PATCH** (1.0.1): arreglo, texto, color o ajuste pequeño.

Cada versión se publica con una etiqueta de git `vX.Y.Z`.

## 1.2.0

Chatbot con memoria e intención.

- Recuerda de qué se hablaba: "¿cómo?", "cuéntame más" o "por qué" amplían el último tema; a la tercera remite al formulario
- Distingue preguntar de necesitar: "necesito una tienda de bicis" responde con una propuesta de siguiente paso y repite lo que ha pedido
- Charla básica: "qué tal", saludos, "gracias", "vale"
- Respuestas en tercera persona (habla de David, no como David) y tema nuevo "¿Haces páginas web?"
- Quita la mención a Odoo de la sección "Sobre mí" (ya no se ofrece)
- Corrige que "cuánto se tarda en hacer una web" se tomara como pregunta sobre webs

## 1.1.0

Chatbot que entiende lo que se escribe.

- Caja de texto en Orballo: responde sin IA, buscando palabras clave en `lib/chat-knowledge.ts`
- Entiende tildes, mayúsculas, plurales y erratas pequeñas
- 15 temas nuevos o ampliados: dominio, qué incluye, pago, tecnología, renovar una web, quién es David
- Si no sabe, lo dice y remite al formulario; no inventa
- Evento `chat_message` en analítica (solo el tema, nunca el texto escrito)

## 1.0.0

Lanzamiento de la web.

- Recorrido guiado con formulario en pasos y aviso por correo (Resend) en HTML
- Servicios: web nueva, tienda online, SEO local y mantenimiento
- Proyectos con capturas reales
- Chatbot Orballo de preguntas frecuentes
- Marca durandev: logo, favicons, Open Graph
- SEO: sitemap, robots, canonical, datos estructurados, Search Console
- Aviso legal, política de privacidad y de cookies
- Google Analytics 4 con aviso de consentimiento
- Paleta 60/30/10: negro, grafito y naranja
- Next.js 16.4.6, pnpm 10
