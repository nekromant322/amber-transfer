import { useState } from 'react'
import styles from './Tariffs.module.css'

const routes = [
  { from: 'Калининград', to: 'Гданьск',  distance: '150 км', time: '2–2.5 ч' },
  { from: 'Калининград', to: 'Варшава',  distance: '430 км', time: '5–6 ч'   },
  { from: 'Калининград', to: 'Каунас',   distance: '300 км', time: '3.5–4 ч' },
  { from: 'Калининград', to: 'Вильнюс',  distance: '360 км', time: '4–5 ч'   },
  { from: 'Калининград', to: 'Рига',     distance: '460 км', time: '5.5–6.5 ч' },
  { from: 'Калининград', to: 'Берлин',   distance: '680 км', time: '7–8 ч'   },
]

const classes = ['Комфорт', 'Бизнес', 'Премиум']

const classDetails = {
  'Комфорт': { pax: '1–3', icon: '◎', hint: 'Volkswagen Passat, Skoda Superb и аналоги' },
  'Бизнес':  { pax: '1–4', icon: '◆', hint: 'Mercedes E-Class, BMW 5-Series и аналоги' },
  'Премиум': { pax: '1–3', icon: '✦', hint: 'Mercedes S-Class, BMW 7-Series и аналоги' },
}

export default function Tariffs() {
  const [activeClass, setActiveClass] = useState('Бизнес')

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
          {routes.map(r => (
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
                <span className={styles.price}>Цена уточняется</span>
              </div>

              <a href="#booking" className={styles.bookBtn}>Забронировать</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
