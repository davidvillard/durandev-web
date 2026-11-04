import { LegalPage } from '@/components/legal-page'
import { LEGAL } from '@/lib/legal'

export const metadata = { title: 'Aviso legal', alternates: { canonical: '/aviso-legal' } }

export default function Page() {
  return (
    <LegalPage title="Aviso legal">
      <h2>Titular del sitio web</h2>
      <p>
        En cumplimiento de la Ley 34/2002 de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE),
        se informa de que este sitio web es titularidad de:
      </p>
      <ul>
        <li>Titular: {LEGAL.titular}</li>
        <li>Nombre comercial: {LEGAL.comercial}</li>
        <li>NIF: {LEGAL.nif}</li>
        <li>Domicilio: {LEGAL.domicilio}</li>
        <li>Correo electrónico: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></li>
        <li>Actividad: desarrollo de páginas web, tiendas online, SEO y mantenimiento web.</li>
      </ul>

      <h2>Condiciones de uso</h2>
      <p>
        El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación de este aviso legal.
        El usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas
        ni contrarias a la buena fe.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, diseños, imágenes, logotipos y el código de este sitio son propiedad del titular o se usan con
        autorización, y no pueden reproducirse ni distribuirse sin permiso. Los nombres y capturas de proyectos de
        terceros mostrados en la sección de trabajos pertenecen a sus respectivos propietarios.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        El titular procura que la información sea correcta y esté actualizada, pero no garantiza la ausencia de errores
        ni se hace responsable de los daños derivados del uso del sitio. Los enlaces a webs de terceros se ofrecen como
        información y el titular no responde de sus contenidos.
      </p>

      <h2>Legislación aplicable</h2>
      <p>
        Este aviso se rige por la legislación española. Para cualquier controversia, las partes se someten a los
        juzgados y tribunales que correspondan conforme a la normativa vigente.
      </p>
    </LegalPage>
  )
}
