import { LegalPage } from '@/components/legal-page'
import { LEGAL } from '@/lib/legal'

export const metadata = { title: 'Política de cookies', alternates: { canonical: '/politica-de-cookies' } }

export default function Page() {
  return (
    <LegalPage title="Política de cookies">
      <h2>Qué cookies usa esta web</h2>
      <p>
        No instalo cookies publicitarias ni de perfilado. La única cookie opcional es la de estadísticas de Google
        Analytics 4 (por ejemplo, <code>_ga</code>), que mide las visitas de forma agregada. Solo se activa si pulsas
        «Aceptar» en el aviso; si pulsas «Rechazar» o no eliges, no se guarda ninguna cookie de Analytics. Puedes cambiar
        tu elección borrando los datos del sitio en tu navegador y volviendo a entrar.
      </p>

      <h2>Qué sí se utiliza</h2>
      <ul>
        <li>
          Google Analytics 4 (Google Ireland Limited): estadísticas de uso, solo con tu consentimiento. Tu elección se
          guarda en el almacenamiento local del navegador.
        </li>
        <li>
          Estadísticas de Vercel Analytics: miden visitas y eventos de forma agregada y anónima, sin cookies y sin
          identificarte.
        </li>
        <li>
          Un identificador anónimo de visita, guardado en el almacenamiento de sesión de tu navegador (sessionStorage).
          Sirve para relacionar los pasos de una misma visita (por ejemplo, el recorrido por el formulario) y se borra
          al cerrar la pestaña. No contiene datos personales.
        </li>
        <li>Las fuentes y los recursos se sirven desde esta misma web.</li>
      </ul>

      <h2>Cómo borrarlo</h2>
      <p>
        Puedes eliminar el almacenamiento de sesión cerrando la pestaña o desde los ajustes de tu navegador. Si tienes
        dudas, escríbeme a <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.
      </p>
    </LegalPage>
  )
}
