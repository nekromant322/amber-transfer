'use client'

import { useEffect } from 'react'
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

// Plain <script> tags, not next/script - Next.js's Script component (even with
// strategy="beforeInteractive") wraps the code in an internal __next_s bootstrap
// array rather than emitting a literal <script>...</script> block, which Yandex's
// own server-side counter-install checker doesn't recognize (it doesn't execute JS,
// it just looks for the literal tag in the raw HTML response).
export default function YandexMetrika() {
  useLinkGoals()

  if (process.env.NODE_ENV !== 'production' || !YANDEX_METRIKA_ID) {
    return null
  }

  const initScript = `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(${YANDEX_METRIKA_ID}, "init", {
         ssr:true,
         webvisor:true,
         clickmap:true,
         referrer: document.referrer,
         url: location.href,
         accurateTrackBounce:true,
         trackLinks:true
    });
  `

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: initScript }} />
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
