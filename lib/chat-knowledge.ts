/**
 * Conocimiento del chatbot Orballo. Para enseñarle algo nuevo, añade un tema aquí.
 *
 * - `keywords`: palabras o frases que el visitante puede escribir. Se comparan sin tildes ni mayúsculas.
 *   Una palabra suelta también casa por prefijo ("tienda" casa con "tiendas") y con una errata.
 * - `chip`: si aparece como botón sugerido (usa `question` como texto).
 */
export type Topic = { id: string; question: string; keywords: string[]; answer: string; chip?: true }

export const TOPICS: Topic[] = [
  {
    id: 'servicios',
    question: '¿Qué servicios ofreces?',
    keywords: ['servicio', 'ofreces', 'que haces', 'a que te dedicas', 'que ofreces', 'trabajas con'],
    answer: 'Hago páginas web, tiendas online, SEO y mantenimiento web. Nada más: me centro en eso para hacerlo bien.',
    chip: true,
  },
  {
    id: 'precio',
    question: '¿Cuánto cuesta una web?',
    keywords: ['precio', 'cuanto cuesta', 'cuanto vale', 'cuanto cobras', 'coste', 'costo', 'presupuesto', 'tarifa', 'caro', 'barato', 'euros'],
    answer: 'Depende de lo que necesites: número de páginas, si lleva tienda, funciones extra… Cuéntale tu proyecto a David y te pasa una propuesta con el precio.',
    chip: true,
  },
  {
    id: 'plazos',
    question: '¿Cuánto se tarda?',
    keywords: ['tarda', 'plazo', 'cuanto tiempo', 'cuando estara', 'entrega', 'semanas', 'rapido', 'urgente', 'duracion'],
    answer: 'Depende del tamaño del proyecto. En la propuesta te indica los plazos antes de empezar.',
    chip: true,
  },
  {
    id: 'tiendas',
    question: '¿Haces tiendas online?',
    keywords: ['tienda', 'ecommerce', 'e commerce', 'vender online', 'vender por internet', 'comprar', 'productos', 'woocommerce', 'shopify', 'carrito'],
    answer: 'Sí. Monta tiendas online listas para vender y para que puedas gestionar tus productos tú mismo.',
    chip: true,
  },
  {
    id: 'seo',
    question: '¿Me ayudas a salir en Google?',
    keywords: ['seo', 'google', 'posicionar', 'posicionamiento', 'buscador', 'aparecer', 'visibilidad', 'me encuentren', 'trafico', 'indexar'],
    answer: 'Sí. Cuida la estructura, la velocidad y el SEO técnico de tu web, con foco en las búsquedas locales. El alcance exacto se define en la propuesta.',
    chip: true,
  },
  {
    id: 'mantenimiento',
    question: '¿Te encargas del mantenimiento?',
    keywords: ['mantenimiento', 'mantener', 'mantengas', 'actualizar', 'actualizaciones', 'soporte', 'arreglar', 'despues de la entrega', 'errores', 'se ha caido'],
    answer: 'Sí. Mantiene tu web al día y resuelve los cambios que necesites. Cuéntale qué web tienes y lo vemos.',
    chip: true,
  },
  {
    id: 'ubicacion',
    question: '¿Trabajas fuera de Vigo?',
    keywords: ['fuera de vigo', 'galicia', 'espana', 'remoto', 'otra ciudad', 'madrid', 'barcelona', 'pontevedra', 'coruna', 'ourense', 'lugo', 'donde trabajas'],
    answer: 'Sí. Trabaja en toda Galicia y en remoto para cualquier punto de España.',
    chip: true,
  },
  {
    id: 'empezar',
    question: '¿Cómo empezamos?',
    keywords: ['empezar', 'empezamos', 'comenzar', 'contactar', 'contacto', 'hablar', 'llamar', 'formulario', 'quiero una web', 'necesito una web', 'tengo un proyecto'],
    answer: 'Es fácil: responde tres preguntas rápidas en el formulario de abajo y David te contesta en menos de 24 horas, sin compromiso.',
    chip: true,
  },
  {
    id: 'dominio',
    question: '¿Qué pasa con el dominio y el hosting?',
    keywords: ['dominio', 'hosting', 'alojamiento', 'servidor', 'url', 'publicar la web', 'subir la web'],
    answer: 'David te orienta con el dominio y dónde alojar la web, y lo deja todo publicado. Los detalles se acuerdan en la propuesta.',
  },
  {
    id: 'incluye',
    question: '¿Qué incluye una web?',
    keywords: ['incluye', 'incluido', 'que recibo', 'que me das', 'responsive', 'se vea bien en movil', 'adaptada', 'diseno'],
    answer: 'Cada proyecto es distinto, pero siempre busca una web clara, rápida y que se vea bien en móvil. Lo que incluye el tuyo queda por escrito en la propuesta.',
  },
  {
    id: 'pago',
    question: '¿Cómo se paga?',
    keywords: ['pago', 'pagar', 'factura', 'iva', 'forma de pago', 'adelanto', 'senal', 'financiar'],
    answer: 'Las condiciones de pago y la facturación se acuerdan en la propuesta, antes de empezar.',
  },
  {
    id: 'tecnologia',
    question: '¿WordPress o Next.js?',
    keywords: ['wordpress', 'nextjs', 'next js', 'tecnologia', 'programar', 'react', 'cms', 'editar yo', 'editarla yo'],
    answer: 'Depende de tu objetivo. David elige la tecnología que encaje con tu equipo, tu presupuesto y lo que necesites editar tú.',
  },
  {
    id: 'rehacer',
    question: 'Ya tengo una web, ¿la puedes mejorar?',
    keywords: ['web antigua', 'rehacer', 'redisenar', 'renovar', 'migrar', 'ya tengo una web', 'mejorar mi web', 'mi web actual'],
    answer: 'Sí. Puede renovar tu web actual o rehacerla, cuidando que no pierdas posiciones en Google. Cuéntale cuál es y lo ve.',
  },
  {
    id: 'david',
    question: '¿Quién es David?',
    keywords: ['quien eres', 'quien es david', 'david', 'experiencia', 'sobre ti', 'portfolio', 'ejemplos', 'trabajos anteriores'],
    answer: 'David es desarrollador web freelance en Vigo. Puedes ver algunos de sus trabajos más abajo, en la sección «Trabajos».',
  },
  {
    id: 'fuera-de-ambito',
    question: '',
    keywords: ['app', 'apps', 'aplicacion', 'logo', 'automatizar', 'automatizacion', 'whatsapp', 'redes sociales', 'marketing', 'fotos', 'video'],
    answer: 'Eso no lo hago: me centro en webs, tiendas online, SEO y mantenimiento. Si es otra cosa, cuéntaselo a David en el formulario y te dirá si puede ayudarte.',
  },
]

export const GREETING = '¡Hola! Pregúntame lo que quieras sobre webs, tiendas online, SEO o mantenimiento.'
export const THANKS = '¡De nada! Si quieres seguir, cuéntale tu proyecto a David en el formulario y te contesta en menos de 24 horas.'
export const FALLBACK = 'Eso no lo tengo claro. Prueba a preguntarlo de otra forma o cuéntaselo a David en el formulario y te contesta en menos de 24 horas.'

const GREETINGS = ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'hey', 'ey', 'saludos']
const THANKS_WORDS = ['gracias', 'genial', 'perfecto', 'vale', 'ok', 'estupendo']

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/** Distancia de edición entre dos palabras, para tolerar erratas. */
function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0]
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = tmp
    }
  }
  return row[b.length]
}

function score(topic: Topic, text: string, words: string[]) {
  let total = 0
  for (const raw of topic.keywords) {
    const keyword = normalize(raw)
    if (keyword.includes(' ')) {
      if (text.includes(keyword)) total += 3
    } else if (words.some((w) => w === keyword)) {
      total += 2
    } else if (keyword.length >= 4 && words.some((w) => w.length >= 4 && (w.startsWith(keyword) || keyword.startsWith(w)))) {
      total += 2
    } else if (keyword.length >= 5 && words.some((w) => w.length >= 5 && distance(w, keyword) === 1)) {
      total += 2
    }
  }
  return total
}

export type Reply = { topicId: string | null; text: string }

/** Busca la mejor respuesta para lo que ha escrito el visitante. */
export function reply(input: string): Reply {
  const text = normalize(input)
  const words = text.split(' ').filter(Boolean)
  if (!words.length) return { topicId: null, text: FALLBACK }

  let best: Topic | null = null
  let bestScore = 0
  for (const topic of TOPICS) {
    const s = score(topic, text, words)
    if (s > bestScore) {
      best = topic
      bestScore = s
    }
  }
  const greets = words.length <= 4 && words.some((w) => GREETINGS.includes(w))
  const thanks = words.length <= 4 && words.some((w) => THANKS_WORDS.includes(w))
  // "hola David" no es una pregunta sobre David: un saludo gana a una coincidencia débil.
  if (best && bestScore >= (greets || thanks ? 3 : 2)) return { topicId: best.id, text: best.answer }
  if (greets) return { topicId: 'saludo', text: GREETING }
  if (thanks) return { topicId: 'gracias', text: THANKS }
  return { topicId: null, text: FALLBACK }
}
