'use client'

import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const GA_ID = 'G-T3EJZDM4RY'
const KEY = 'consent-analytics'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/** Google Analytics 4 con Consent Mode: sin cookies hasta que el visitante acepta. */
export function AnalyticsConsent() {
  const [asking, setAsking] = useState(false)

  useEffect(() => {
    try {
      setAsking(!localStorage.getItem(KEY))
    } catch {
      setAsking(true)
    }
  }, [])

  function choose(granted: boolean) {
    try {
      localStorage.setItem(KEY, granted ? 'granted' : 'denied')
    } catch {
      // sin almacenamiento: se volverá a preguntar
    }
    window.gtag?.('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' })
    setAsking(false)
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
try{if(localStorage.getItem('${KEY}')==='granted')gtag('consent','update',{analytics_storage:'granted'});}catch(e){}
gtag('js',new Date());
gtag('config','${GA_ID}');`}
      </Script>
      {asking && (
        <div className="consent" role="dialog" aria-label="Cookies de estadísticas">
          <p>
            Uso Google Analytics para medir las visitas. Solo se activa si aceptas.{' '}
            <Link href="/politica-de-cookies">Más información</Link>
          </p>
          <div className="consent-actions">
            <button type="button" onClick={() => choose(false)}>Rechazar</button>
            <button type="button" className="is-primary" onClick={() => choose(true)}>Aceptar</button>
          </div>
        </div>
      )}
    </>
  )
}
