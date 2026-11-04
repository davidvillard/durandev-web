import { LegalPage } from '@/components/legal-page'
import { LEGAL } from '@/lib/legal'

export const metadata = { title: 'Política de cookies', alternates: { canonical: '/politica-de-cookies' } }

export default function Page() {
  return (
    <LegalPage title="Política de cookies">
      <h2>Esta web no usa cookies</h2>
      <p>
        No instalo cookies propias ni de terceros con fines publicitarios, de seguimiento o de perfilado, por lo que no
        te muestro un banner de cookies.
      </p>

      <h2>Qué sí se utiliza</h2>
      <ul>
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
