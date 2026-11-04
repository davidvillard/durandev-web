import Link from 'next/link'
import { LegalPage } from '@/components/legal-page'
import { LEGAL } from '@/lib/legal'

export const metadata = { title: 'Política de privacidad', alternates: { canonical: '/politica-de-privacidad' } }

export default function Page() {
  return (
    <LegalPage title="Política de privacidad">
      <h2>Responsable del tratamiento</h2>
      <ul>
        <li>Responsable: {LEGAL.titular}</li>
        <li>NIF: {LEGAL.nif}</li>
        <li>Domicilio: {LEGAL.domicilio}</li>
        <li>Correo electrónico: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a></li>
      </ul>

      <h2>Qué datos trato y para qué</h2>
      <p>
        Cuando rellenas el formulario de contacto me envías tu nombre, tu correo electrónico y las respuestas que eliges
        (qué necesitas, para cuándo y dónde está tu negocio). Uso estos datos únicamente para responder a tu consulta
        y prepararte una propuesta. No los uso para enviarte publicidad ni los cedo para otros fines.
      </p>

      <h2>Base legal</h2>
      <p>
        Tu consentimiento (art. 6.1.a del RGPD), que das al marcar la casilla del formulario. Puedes retirarlo en
        cualquier momento escribiéndome, sin que afecte a lo ya realizado.
      </p>

      <h2>Destinatarios</h2>
      <p>Para prestar el servicio utilizo proveedores que tratan datos en mi nombre:</p>
      <ul>
        <li>Resend, para enviarme por correo electrónico los mensajes del formulario.</li>
        <li>Vercel, que aloja la web y ofrece estadísticas de uso sin cookies.</li>
      </ul>
      <p>
        Estos proveedores pueden tratar datos fuera del Espacio Económico Europeo, amparados por las garantías del RGPD
        (por ejemplo, cláusulas contractuales tipo). No cedo tus datos a nadie más salvo obligación legal.
      </p>

      <h2>Cuánto tiempo los conservo</h2>
      <p>
        Mientras atiendo tu consulta y, después, el tiempo necesario para atender posibles responsabilidades. Si no
        llegamos a trabajar juntos, los elimino cuando ya no sean necesarios.
      </p>

      <h2>Estadísticas</h2>
      <p>
        Para saber qué partes de la web funcionan, mido de forma anónima las visitas y los pasos del formulario
        (por ejemplo, qué pregunta se responde). Estos datos no incluyen tu nombre ni tu correo y no te identifican.
        Más información en la <Link href="/politica-de-cookies">política de cookies</Link>.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo
        a <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. Si crees que no se han respetado, puedes presentar una
        reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" rel="noreferrer">aepd.es</a>).
      </p>
    </LegalPage>
  )
}
