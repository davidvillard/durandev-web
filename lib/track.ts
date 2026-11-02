import { track } from '@vercel/analytics'

type Props = Record<string, string | number | boolean>

/** Anonymous id for this visit (sessionStorage), so every event of one person can be joined. */
function visitId(): string {
  try {
    let id = sessionStorage.getItem('vid')
    if (!id) {
      id = Math.random().toString(36).slice(2, 10)
      sessionStorage.setItem('vid', id)
    }
    return id
  } catch {
    return 'na'
  }
}

/** Sends a custom analytics event; never throws so tracking can't break the UI. */
export function trackEvent(name: string, props?: Props) {
  try {
    track(name, { vid: visitId(), ...props })
  } catch {
    // analytics unavailable (blocked, dev): ignore
  }
}
