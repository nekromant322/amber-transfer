'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { YANDEX_METRIKA_ID, trackGoal } from '../lib/analytics'

// Delegated click listener so phone/Telegram links work as goals no matter which
// component renders them (Footer, Nav, contacts page, FAQ, ...) - no need to wire
// an onClick into every place a tel:/t.me link could ever appear.
function useLinkGoals() {
  useEffect(() => {
    if (!YANDEX_METRIKA_ID) return

    const onClick = (e) => {
      const link = e.target.closest('a[href]')
      if (!link) return

      if (link.href.startsWith('tel:')) {
        trackGoal('phone_click')
      } else if (link.href.includes('t.me/')) {
        trackGoal('telegram_click')
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}

export default function YandexMetrika() {
  useLinkGoals()

  if (process.env.NODE_ENV !== 'production' || !YANDEX_METRIKA_ID) {
    return null
  }

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${YANDEX_METRIKA_ID}, "init", {
               ssr:true,
               webvisor:true,
               clickmap:true,
               ecommerce:"dataLayer",
               referrer: document.referrer,
               url: location.href,
               accurateTrackBounce:true,
               trackLinks:true
          });
        `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  )
}
