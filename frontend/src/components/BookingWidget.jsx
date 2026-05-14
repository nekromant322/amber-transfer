'use client'

import { useState } from 'react'
import styles from './BookingWidget.module.css'
import CityInput from './CityInput'

export default function BookingWidget() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <p className={styles.label}>Рассчитать поездку</p>
        <div className={styles.badge}>Бесплатный расчёт</div>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>
            <span className={styles.fieldIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="5" r="3" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7 13C7 13 2 9.5 2 5.5C2 2.91 4.24 1 7 1C9.76 1 12 2.91 12 5.5C12 9.5 7 13 7 13Z" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            </span>
            Откуда
          </label>
          <CityInput placeholder="Введите город" value={from} onChange={setFrom} />
        </div>

        <div className={styles.swapWrap} aria-hidden="true">
          <div className={styles.swapLine} />
          <button
            className={styles.swapBtn}
            tabIndex="-1"
            aria-hidden="true"
            onClick={() => { const t = from; setFrom(to); setTo(t) }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 4.5H12M9.5 2L12 4.5L9.5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 9.5H2M4.5 7L2 9.5L4.5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className={styles.swapLine} />
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>
            <span className={styles.fieldIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L7 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            </span>
            Куда
          </label>
          <CityInput placeholder="Введите город" value={to} onChange={setTo} />
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>
            <span className={styles.fieldIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="2.5" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M1 6H13" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M4 1V4M10 1V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </span>
            Дата отправления
          </label>
          <input
            type="date"
            className={styles.dateInput}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <button className={styles.submitBtn}>
        <span>Узнать стоимость</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <p className={styles.footnote}>
        Менеджер свяжется с вами в течение 15 минут
      </p>
    </div>
  )
}
