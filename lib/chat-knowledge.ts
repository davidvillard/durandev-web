/**
 * Conocimiento del chatbot Orballo. Para enseñarle algo nuevo, añade un tema aquí.
 * El asistente habla de David en tercera persona.
 *
 * - `keywords`: palabras o frases que el visitante puede escribir. Se comparan sin tildes ni mayúsculas.
 *   Una palabra suelta también casa por prefijo ("tienda" casa con "tiendas") y con una errata.
 * - `answer`: respuesta a una pregunta.
 * - `lead`: respuesta cuando el visitante dice que lo necesita ("necesito una tienda…"). `{asunto}` se
 *   sustituye por lo que haya dicho ("de bicis"), o por nada.
 * - `more`: respuesta a un "¿cómo?" o "cuéntame más" sobre este tema.
 * - `chip`: si aparece como botón sugerido (usa `question` como texto).
 */
export type Topic = {
  id: string
  question: string
  keywords: string[]
  answer: string
  lead?: string
  more?: string
  chip?: true
}

export const TOPICS: Topic[] = [
  {
    id: 'servicios',
    question: '¿Qué servicios ofreces?',
    keywords: ['servicio', 'ofreces', 'que haces', 'a que te dedicas', 'que ofreces', 'trabajas con'],
    answer: 'David hace páginas web, tiendas online, SEO y mantenimiento web. Nada más: se centra en eso para hacerlo bien.',
    more: 'Si me dices qué necesitas (una web nueva, vender online, salir en Google o cuidar la que ya tienes), te cuento cómo lo haría.',
    chip: true,
  },
  {
    id: 'web',
    question: '¿Haces páginas web?',
    keywords: ['pagina web', 'paginas web', 'web nueva', 'sitio web', 'crear una web', 'hacer una web', 'web corporativa', 'landing', 'web para mi negocio', 'quiero una web', 'necesito una web', 'busco una web', 'quisiera una web'],
    answer: 'Sí, es lo principal. David diseña y programa webs rápidas, claras y pensadas para que te traigan clientes.',
    lead: '¡Genial! Una web{asunto} es justo lo que hace David. Cuéntale a qué se dedica tu negocio y qué quieres conseguir, y te prepara una propuesta.',
    more: 'Sus webs cargan rápido, se ven bien en el móvil y salen preparadas para que Google las encuentre. Para decirte cómo sería la tuya necesita saber a qué se dedica tu negocio.',
  },
  {
    id: 'precio',
    question: '¿Cuánto cuesta una web?',
    keywords: ['precio', 'cuanto cuesta', 'cuanto vale', 'cuanto cobras', 'coste', 'costo', 'presupuesto', 'tarifa', 'caro', 'barato', 'euros'],
    answer: 'Depende de lo que necesites: número de páginas, si lleva tienda, funciones extra… Cuéntale tu proyecto a David y te pasa una propuesta con el precio.',
    more: 'No hay una tarifa fija porque cada proyecto es distinto. Con tres respuestas rápidas en el formulario David se hace una idea y te da el precio sin compromiso.',
    chip: true,
  },
  {
    id: 'plazos',
    question: '¿Cuánto se tarda?',
    keywords: ['tarda', 'cuanto se tarda', 'cuanto tarda', 'cuanto tardas', 'plazo', 'cuanto tiempo', 'cuando estara', 'entrega', 'semanas', 'rapido', 'urgente', 'duracion'],
    answer: 'Depende del tamaño del proyecto. En la propuesta te indica los plazos antes de empezar.',
    more: 'Una web sencilla lleva menos que una tienda con muchos productos. Si tienes prisa, dilo en el formulario y David lo tiene en cuenta.',
    chip: true,
  },
  {
    id: 'tiendas',
    question: '¿Haces tiendas online?',
    keywords: ['tienda', 'ecommerce', 'e commerce', 'vender online', 'vender por internet', 'comprar', 'productos', 'woocommerce', 'shopify', 'carrito'],
    answer: 'Sí. David monta tiendas online listas para vender y para que puedas gestionar tus productos tú mismo.',
    lead: '¡Genial! Una tienda online{asunto} es justo lo que hace David. Cuéntale qué vendes y más o menos cuántos productos tienes, y te prepara una propuesta.',
    more: 'La tienda lleva catálogo, carrito y pago online, y David te enseña a gestionar tus productos sin depender de nadie. Para decirte el plan exacto necesita saber qué vendes y cuántos productos tienes.',
    chip: true,
  },
  {
    id: 'seo',
    question: '¿Me ayudas a salir en Google?',
    keywords: ['seo', 'google', 'posicionar', 'posicionamiento', 'buscador', 'aparecer', 'visibilidad', 'me encuentren', 'trafico', 'indexar'],
    answer: 'Sí. David cuida la estructura, la velocidad y el SEO técnico de tu web, con foco en las búsquedas locales. El alcance exacto se define en la propuesta.',
    lead: 'Perfecto. Cuéntale a David qué web tienes y a qué zona quieres llegar, y te propone qué hacer.',
    more: 'Lo primero es que tu web cargue rápido y esté bien estructurada; después se trabaja que aparezca cuando alguien busca lo tuyo en tu zona. Para concretar necesita ver tu web y saber en qué sitio quieres salir.',
    chip: true,
  },
  {
    id: 'mantenimiento',
    question: '¿Te encargas del mantenimiento?',
    keywords: ['mantenimiento', 'mantener', 'mantengas', 'actualizar', 'actualizaciones', 'soporte', 'arreglar', 'despues de la entrega', 'errores', 'se ha caido'],
    answer: 'Sí. David mantiene tu web al día y resuelve los cambios que necesites. Cuéntale qué web tienes y lo ven.',
    lead: 'Perfecto. Cuéntale a David qué web tienes y qué necesitas cambiar o vigilar, y lo ve.',
    more: 'Se ocupa de mantenerla actualizada y de los cambios que vayan saliendo. Para decirte cómo, necesita saber qué web tienes y qué necesitas.',
    chip: true,
  },
  {
    id: 'ubicacion',
    question: '¿Trabajas fuera de Vigo?',
    keywords: ['fuera de vigo', 'galicia', 'espana', 'remoto', 'otra ciudad', 'madrid', 'barcelona', 'pontevedra', 'coruna', 'ourense', 'lugo', 'donde trabajas'],
    answer: 'Sí. David trabaja en toda Galicia y en remoto para cualquier punto de España.',
    more: 'Todo se puede llevar a distancia: reuniones por videollamada y seguimiento online.',
    chip: true,
  },
  {
    id: 'empezar',
    question: '¿Cómo empezamos?',
    keywords: ['empezar', 'empezamos', 'comenzar', 'contactar', 'contacto', 'hablar', 'llamar', 'formulario', 'tengo un proyecto'],
    answer: 'Es fácil: responde tres preguntas rápidas en el formulario de abajo y David te contesta en menos de 24 horas, sin compromiso.',
    more: 'Eliges qué necesitas, para cuándo y dónde está tu negocio, y dejas tu nombre y correo. Con eso David te escribe con una primera idea.',
    chip: true,
  },
  {
    id: 'dominio',
    question: '¿Qué pasa con el dominio y el hosting?',
    keywords: ['dominio', 'hosting', 'alojamiento', 'servidor', 'url', 'publicar la web', 'subir la web'],
    answer: 'David te orienta con el dominio y dónde alojar la web, y lo deja todo publicado. Los detalles se acuerdan en la propuesta.',
    more: 'Si ya tienes dominio, se usa el tuyo; si no, te ayuda a elegir uno. Lo concretan en la propuesta.',
  },
  {
    id: 'incluye',
    question: '¿Qué incluye una web?',
    keywords: ['incluye', 'incluido', 'que recibo', 'que me das', 'responsive', 'se vea bien en movil', 'adaptada', 'diseno'],
    answer: 'Cada proyecto es distinto, pero siempre busca una web clara, rápida y que se vea bien en móvil. Lo que incluye la tuya queda por escrito en la propuesta.',
    more: 'La propuesta detalla páginas, funciones y plazos antes de empezar, para que sepas qué recibes. Pídela en el formulario.',
  },
  {
    id: 'pago',
    question: '¿Cómo se paga?',
    keywords: ['pago', 'pagar', 'factura', 'iva', 'forma de pago', 'adelanto', 'senal', 'financiar'],
    answer: 'Las condiciones de pago y la facturación se acuerdan en la propuesta, antes de empezar.',
    more: 'Antes de nada tendrás la propuesta por escrito. Pregúntale por el pago en el formulario y David te lo detalla.',
  },
  {
    id: 'tecnologia',
    question: '¿WordPress o Next.js?',
    keywords: ['wordpress', 'nextjs', 'next js', 'tecnologia', 'programar', 'react', 'cms', 'editar yo', 'editarla yo'],
    answer: 'Depende de tu objetivo. David elige la tecnología que encaje con tu equipo, tu presupuesto y lo que necesites editar tú.',
    more: 'Si quieres cambiar textos e imágenes tú mismo, se elige algo pensado para eso. Cuéntale qué necesitas editar y te lo recomienda.',
  },
  {
    id: 'rehacer',
    question: 'Ya tengo una web, ¿la puedes mejorar?',
    keywords: ['web antigua', 'rehacer', 'redisenar', 'renovar', 'migrar', 'ya tengo una web', 'mejorar mi web', 'mi web actual'],
    answer: 'Sí. David puede renovar tu web actual o rehacerla, cuidando que no pierdas posiciones en Google. Cuéntale cuál es y lo ve.',
    lead: 'Claro. Cuéntale a David cuál es tu web y qué no te convence, y te dice si conviene mejorarla o rehacerla.',
    more: 'Primero revisa tu web actual y decide si basta con mejorarla o conviene rehacerla. En los dos casos cuida que no pierdas posiciones en Google.',
  },
  {
    id: 'david',
    question: '¿Quién es David?',
    keywords: ['quien eres', 'quien es david', 'david', 'experiencia', 'sobre ti', 'portfolio', 'ejemplos', 'trabajos anteriores'],
    answer: 'David es desarrollador web freelance en Vigo. Puedes ver algunos de sus trabajos más abajo, en la sección «Trabajos».',
    more: 'Trabaja directamente contigo, sin intermediarios. En la sección «Sobre mí» de la web puedes conocerlo mejor.',
  },
  {
    id: 'fuera-de-ambito',
    question: '',
    keywords: ['app', 'apps', 'aplicacion', 'logo', 'automatizar', 'automatizacion', 'whatsapp', 'redes sociales', 'marketing', 'fotos', 'video'],
    answer: 'Eso no lo hace David: se centra en webs, tiendas online, SEO y mantenimiento. Si es otra cosa, cuéntaselo en el formulario y te dirá si puede ayudarte.',
  },
]

const FALLBACK = 'Eso no lo tengo claro. Prueba a preguntarlo de otra forma, elige una de las preguntas de abajo o cuéntaselo a David en el formulario y te contesta en menos de 24 horas.'
const NUDGE = 'Para afinar más, lo mejor es que David lo vea contigo: cuéntale tu proyecto en el formulario y te contesta en menos de 24 horas.'
const GREETING = '¡Hola! Pregúntame lo que quieras sobre webs, tiendas online, SEO o mantenimiento.'
const SMALLTALK = '¡Muy bien, gracias! ¿En qué te puedo ayudar? Te cuento de webs, tiendas online, SEO o mantenimiento.'
const THANKS = '¡De nada! Si quieres seguir, cuéntale tu proyecto a David en el formulario y te contesta en menos de 24 horas.'
const OK = 'Perfecto. ¿Quieres saber algo más o prefieres contarle tu proyecto a David?'

const GREETINGS = ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'hey', 'ey', 'saludos']
const SMALLTALK_PHRASES = ['que tal', 'como estas', 'como va']
const THANKS_WORDS = ['gracias', 'te agradezco']
const OK_WORDS = ['vale', 'ok', 'si', 'claro', 'perfecto', 'genial', 'estupendo', 'entendido', 'de acuerdo']
const FOLLOW_UPS = [
  'como', 'y como', 'como es eso', 'como funciona', 'como se hace', 'y eso', 'por que', 'mas info', 'mas informacion',
  'mas detalles', 'cuentame mas', 'explicame', 'explica', 'detalles', 'de que depende', 'en que consiste', 'y entonces',
]
const NEEDS = ['necesito', 'quiero', 'busco', 'me gustaria', 'estoy buscando', 'quisiera', 'me hace falta', 'tengo que', 'voy a abrir']

/** Lo que el asistente recuerda de la conversación. */
export type Memory = { last: string | null; expanded: string[] }
export type Reply = { topicId: string | null; text: string }

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

const has = (text: string, words: string[], phrases: string[]) =>
  phrases.some((p) => (p.includes(' ') ? text.includes(p) : words.includes(p)))

/** "una tienda online de bicis" -> " de bicis" */
function subject(input: string) {
  const m = input.match(/\b(?:tienda|web|p[aá]gina)(?: online| web)? (de|para) ([\p{L}\d ]{2,30}?)(?=[.,;:!?¿¡]|$| y | que | con | porque )/iu)
  return m ? ` ${m[1].toLowerCase()} ${m[2].trim().toLowerCase()}` : ''
}

/** Segunda respuesta sobre el mismo tema; a la tercera, remite al formulario. */
function more(topic: Topic, memory: Memory): Reply {
  if (!topic.more || memory.expanded.includes(topic.id)) return { topicId: topic.id, text: NUDGE }
  return { topicId: topic.id, text: topic.more }
}

/** Busca la mejor respuesta para lo que ha escrito el visitante. */
export function reply(input: string, memory: Memory): Reply {
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

  const short = words.length <= 5
  const followUp = short && FOLLOW_UPS.some((p) => text === p || text.startsWith(`${p} `) || text.endsWith(` ${p}`))
  const smalltalk = short && has(text, words, SMALLTALK_PHRASES)
  const greets = words.length <= 4 && has(text, words, GREETINGS)
  const thanks = words.length <= 4 && has(text, words, THANKS_WORDS)
  const ok = words.length <= 3 && has(text, words, OK_WORDS)
  const weak = smalltalk || greets || thanks || ok || followUp

  // Un saludo o un "¿cómo?" gana a una coincidencia débil ("hola David" no es una pregunta sobre David).
  if (best && bestScore >= (weak ? 3 : 2)) {
    if (best.lead && has(text, words, NEEDS)) return { topicId: best.id, text: best.lead.replace('{asunto}', subject(input)) }
    if (followUp && best.id === memory.last) return more(best, memory)
    return { topicId: best.id, text: best.answer }
  }

  if (followUp && memory.last) {
    const topic = TOPICS.find((t) => t.id === memory.last)
    if (topic) return more(topic, memory)
  }
  if (smalltalk) return { topicId: 'charla', text: SMALLTALK }
  if (greets) return { topicId: 'saludo', text: GREETING }
  if (thanks) return { topicId: 'gracias', text: THANKS }
  if (ok) return { topicId: 'ok', text: memory.last ? OK : GREETING }
  return { topicId: null, text: FALLBACK }
}
