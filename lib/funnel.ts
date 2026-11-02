export const LEAD_EVENT = 'lead:answer'

/** Answers the funnel's first question from anywhere on the page (e.g. a service row). */
export function startFunnel(value: string) {
  window.dispatchEvent(new CustomEvent(LEAD_EVENT, { detail: { key: 'necesidad', value } }))
}
