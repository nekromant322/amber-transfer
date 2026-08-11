'use client'

import { useEffect } from 'react'
import { YANDEX_METRIKA_ID, trackGoal } from '../lib/analytics'

// The counter init script itself is injected by nginx (see nginx.conf sub_filter),
// not rendered here - every attempt at rendering it via React (next/script, or a
// plain <script dangerouslySetInnerHTML>) ended up not fully initializing on this
// page even though the exact same snippet worked fine on a plain static HTML page,
// so nginx now serves byte-identical markup to what's proven to work.
//
// This component only wires up goal tracking: a single delegated click listener so
// phone/Telegram links work as goals no matter which component renders them
// (Footer, Nav, contacts page, FAQ, ...) - no need to wire an onClick into every
// place a tel:/t.me link could ever appear.
export default function YandexMetrika() {
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

  return null
}
