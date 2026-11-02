import { NextResponse } from 'next/server'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

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
  const lines = Object.entries(answers)
    .slice(0, 6)
    .map(([key, value]) => `${String(key).slice(0, 40)}: ${String(value).slice(0, 80)}`)
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
