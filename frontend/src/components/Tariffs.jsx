'use client'

import { useState, useEffect } from 'react'
import styles from './Tariffs.module.css'

// Минивэн крупнее и дороже в обслуживании — наценка к базовой (легковой) цене из PriceRegistry.
const MINIVAN_PRICE_MULTIPLIER = 1.5

const routes = [
  { from: 'Калининград', fromLat: 'Kaliningrad', to: 'Гданьск',  toLat: 'Gdansk',    distance: '150 км', time: '2–2.5 ч' },
  { from: 'Калининград', fromLat: 'Kaliningrad', to: 'Варшава',  toLat: 'Warsaw',    distance: '430 км', time: '5–6 ч'   },
  { from: 'Калининград', fromLat: 'Kaliningrad', to: 'Каунас',   toLat: 'Kaunas',    distance: '300 км', time: '3.5–4 ч' },
  { from: 'Калининград', fromLat: 'Kaliningrad', to: 'Вильнюс',  toLat: 'Vilnius',   distance: '360 км', time: '4–5 ч'   },
  { from: 'Калининград', fromLat: 'Kaliningrad', to: 'Рига',     toLat: 'Riga',      distance: '460 км', time: '5.5–6.5 ч' },
  { from: 'Калининград', fromLat: 'Kaliningrad', to: 'Берлин',   toLat: 'Berlin',    distance: '680 км', time: '7–8 ч'   },
]

const classes = ['Легковой авто', 'Минивэн']

const classDetails = {
  'Легковой авто': { pax: '4', icon: '◎', hint: 'Skoda Kodiaq, Kia Sportage и аналоги' },
  'Минивэн':       { pax: '6–8', icon: '◆', hint: 'Kia Carnival, Mercedes V-Class и аналоги' },
}

export default function Tariffs() {
  const [activeClass, setActiveClass] = useState('Легковой авто')
  const [prices, setPrices] = useState({})

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? ''

    routes.forEach(r => {
      const params = new URLSearchParams({ from: r.fromLat, to: r.toLat })
      fetch(`${apiBase}/api/price?${params}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data?.price == null) return
          setPrices(prev => ({ ...prev, [r.toLat]: data.price }))
        })
        .catch(() => {})
    })
  }, [])

  return (
    <section className={styles.section} id="tariffs">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Стоимость</p>
          <h2 className={styles.title}>Тарифы</h2>
          <p className={styles.desc}>
            Итоговая стоимость зависит от маршрута и класса автомобиля.<br />
            Уточняйте цену у менеджера.
          </p>
        </div>

        <div className={styles.tabs}>
          {classes.map(cl => (
            <button
              key={cl}
              className={`${styles.tab} ${activeClass === cl ? styles.tabActive : ''}`}
              onClick={() => setActiveClass(cl)}
            >
              <span className={styles.tabIcon}>{classDetails[cl].icon}</span>
              {cl}
            </button>
          ))}
        </div>

        <div className={styles.classInfo}>
          <span className={styles.classHint}>
            {classDetails[activeClass].hint} · до {classDetails[activeClass].pax} пасс.
          </span>
        </div>

        <div className={styles.grid}>
          {routes.map(r => {
            const basePrice = prices[r.toLat]
            const price = basePrice == null
              ? null
              : activeClass === 'Минивэн'
                ? Math.round(basePrice * MINIVAN_PRICE_MULTIPLIER)
                : basePrice

            return (
            <div key={r.to} className={styles.card}>
              <div className={styles.route}>
                <span className={styles.city}>{r.from}</span>
                <span className={styles.routeArrow}>→</span>
                <span className={`${styles.city} ${styles.cityDest}`}>{r.to}</span>
              </div>

              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                  </svg>
                  {r.distance}
                </span>
                <span className={styles.metaDot} />
                <span className={styles.metaItem}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M6 3V6.5L8.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  {r.time}
                </span>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>Стоимость</span>
                <span className={styles.price}>
                  {price != null ? `от ${price} €` : 'Цена уточняется'}
                </span>
              </div>

              <a href="#booking" className={styles.bookBtn}>Забронировать</a>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
