import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/site'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const LABELS: Record<string, string> = { necesidad: 'Qué necesita', plazo: 'Para cuándo', zona: 'Dónde está' }

/** Escapa el texto del visitante antes de meterlo en el HTML del correo. */
const esc = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

function leadHtml(name: string, email: string, answers: [string, string][]) {
  const mail = esc(email)
  const rows = answers
    .map(
      ([key, value]) =>
        `<tr><td style="padding:14px 0;border-top:1px solid #282d2f;color:#969c9a;font-size:13px;width:42%">${esc(LABELS[key] ?? key)}</td><td style="padding:14px 0;border-top:1px solid #282d2f;color:#ffffff;font-size:15px;font-weight:600">${esc(value)}</td></tr>`,
    )
    .join('')
  return `<!doctype html><html lang="es"><body style="margin:0;padding:32px 16px;background:#0b0e10;font-family:Inter,Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;margin:0 auto">
<tr><td style="padding:0 4px 20px"><table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="vertical-align:middle"><img src="${SITE_URL}/logo.png" alt="" width="26" height="30" style="display:block;border:0"></td>
<td style="vertical-align:middle;padding-left:10px;color:#ffffff;font-size:20px;font-weight:700">durandev<span style="color:#7aa2ff">.</span></td>
</tr></table></td></tr>
<tr><td style="background:#171b1e;border:1px solid #282d2f;border-radius:20px;padding:32px">
<p style="margin:0 0 14px"><span style="display:inline-block;background:#1b2745;color:#7aa2ff;font-size:12px;font-weight:700;letter-spacing:.04em;padding:5px 12px;border-radius:999px">NUEVO CONTACTO</span></p>
<h1 style="margin:0 0 6px;font-size:26px;line-height:1.2;color:#ffffff">${esc(name)}</h1>
<p style="margin:0 0 26px;font-size:15px"><a href="mailto:${mail}" style="color:#7aa2ff;text-decoration:none">${mail}</a></p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
<p style="margin:28px 0 0"><a href="mailto:${mail}" style="display:inline-block;background:#f97316;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:13px 26px;border-radius:999px">Responder ahora</a></p>
</td></tr>
<tr><td style="padding:18px 4px 0;color:#969c9a;font-size:12px">Enviado desde el formulario de ${esc(SITE_URL.replace(/^https?:\/\//, ''))}</td></tr>
</table></body></html>`
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  // Honeypot: real users never fill this hidden field.
  if (body.website) return NextResponse.json({ ok: true })

  const name = String(body.name ?? '').trim().slice(0, 80)
  const email = String(body.email ?? '').trim().slice(0, 200)
  if (!name || !EMAIL.test(email) || body.consent !== true) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  const answers = typeof body.answers === 'object' && body.answers ? (body.answers as Record<string, unknown>) : {}
  const pairs = Object.entries(answers)
    .slice(0, 6)
    .map(([key, value]): [string, string] => [String(key).slice(0, 40), String(value).slice(0, 80)])
  const lines = pairs.map(([key, value]) => `${key}: ${value}`)
  const text = `Nuevo contacto desde la web\n\nNombre: ${name}\nEmail: ${email}\n${lines.join('\n')}`

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_TO_EMAIL
  if (apiKey && to) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL ?? 'onboarding@resend.dev',
        to,
        reply_to: email,
        subject: 'Nuevo contacto desde la web',
        text,
        html: leadHtml(name, email, pairs),
      }),
    })
    if (!res.ok) return NextResponse.json({ error: 'send_failed' }, { status: 502 })
  } else if (process.env.NODE_ENV === 'production') {
    // Never accept leads we can't deliver.
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  } else {
    console.log('[lead]', text)
  }

  return NextResponse.json({ ok: true })
}
