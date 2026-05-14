'use client'

import { useState, useEffect } from 'react'
import styles from './BookingWidget.module.css'
import CityInput from './CityInput'

function formatDate(val) {
  if (!val) return null
  const [y, m, d] = val.split('-')
  return `${d}.${m}.${y}`
}

export default function BookingWidget() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [passport, setPassport] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [price, setPrice] = useState(null)
  const [priceLoading, setPriceLoading] = useState(false)

  useEffect(() => {
    if (!from || !to) {
      setPrice(null)
      return
    }
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? ''
    const params = new URLSearchParams({ from, to })
    if (passport) params.set('passport', passport)

    setPriceLoading(true)
    fetch(`${apiBase}/api/price?${params}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setPrice(data?.price ?? null))
      .catch(() => setPrice(null))
      .finally(() => setPriceLoading(false))
  }, [from, to, passport])

  async function handleSubmit() {
    setError('')
    if (!from || !to || !date || !phone) {
      setError('Пожалуйста, заполните все поля')
      return
    }
    if (!passport) {
      setError('Пожалуйста, выберите тип паспорта')
      return
    }
    setLoading(true)
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL ?? ''
      const res = await fetch(`${apiBase}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to, date, passport, phone }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Что-то пошло не так')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Ошибка соединения с сервером')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className={styles.widget}>
        <div className={styles.successMessage}>
          <p className={styles.successTitle}>Заявка принята!</p>
          <p className={styles.footnote}>Менеджер свяжется с вами в течение 15 минут</p>
        </div>
      </div>
    )
  }

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
          <CityInput placeholder="Введите город" value={from} onChange={setFrom} exclude={to} />
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
          <CityInput placeholder="Введите город" value={to} onChange={setTo} exclude={from} />
        </div>

        {from && to && (
          <div className={styles.pricePreview}>
            <span className={styles.priceLabel}>Ориентировочная стоимость</span>
            <span className={styles.priceValue}>
              {priceLoading ? '...' : price != null ? `~ ${price} €` : '—'}
            </span>
          </div>
        )}

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
          <div className={styles.dateWrap}>
            <span className={styles.dateFakeText}>
              {formatDate(date) || <span className={styles.datePlaceholder}>ДД.ММ.ГГГГ</span>}
            </span>
            <input
              type="date"
              className={styles.dateInput}
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
      </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>
            <span className={styles.fieldIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="2" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="5" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M8 5h3M8 7.5h2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
            </span>
            Паспорт
            <span className={styles.requiredMark}>*</span>
          </label>
          <div className={styles.passportToggle}>
            <button
              className={`${styles.passportBtn} ${passport === 'eu' ? styles.passportBtnActive : ''}`}
              onClick={() => setPassport(passport === 'eu' ? '' : 'eu')}
              type="button"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg">
                <rect width="18" height="12" rx="1" fill="#003399"/>
                <g fill="#FFCC00">
                  <circle cx="9" cy="2" r="0.7"/>
                  <circle cx="11.6" cy="2.8" r="0.7"/>
                  <circle cx="13" cy="5" r="0.7"/>
                  <circle cx="12.2" cy="7.5" r="0.7"/>
                  <circle cx="9.9" cy="9.3" r="0.7"/>
                  <circle cx="8.1" cy="9.3" r="0.7"/>
                  <circle cx="5.8" cy="7.5" r="0.7"/>
                  <circle cx="5" cy="5" r="0.7"/>
                  <circle cx="6.4" cy="2.8" r="0.7"/>
                </g>
              </svg>
              ЕС
            </button>
            <button
              className={`${styles.passportBtn} ${passport === 'other' ? styles.passportBtnActive : ''}`}
              onClick={() => setPassport(passport === 'other' ? '' : 'other')}
              type="button"
            >
              Другой
            </button>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.fieldLabel}>
            <span className={styles.fieldIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5.5 1H3C2 1 1 2 1 3C1 9 5 13 11 13C12 13 13 12 13 11V8.5L10 7.5L9 9C9 9 7.5 8.5 6.5 7.5C5.5 6.5 5 5 5 5L6.5 4L5.5 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>
            </span>
            Телефон
          </label>
          <input
            className={styles.phoneInput}
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <button className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
        <span>{loading ? 'Отправка...' : 'Отправить заявку'}</span>
        {!loading && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <p className={styles.footnote}>
        Менеджер свяжется с вами в течение 15 минут
      </p>
    </div>
  )
}
