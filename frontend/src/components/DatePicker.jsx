'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './DatePicker.module.css'

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MONTHS = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']

function formatDisplay(date) {
  if (!date) return null
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}.${m}.${y}`
}

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export default function DatePicker({ value, onChange, min }) {
  const today = startOfDay(new Date())
  const minDay = min ? startOfDay(min) : today

  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(() => {
    const base = value || new Date()
    return { year: base.getFullYear(), month: base.getMonth() }
  })
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (value) setCursor({ year: value.getFullYear(), month: value.getMonth() })
  }, [value])

  const getDays = () => {
    const { year, month } = cursor
    const first = new Date(year, month, 1)
    const last = new Date(year, month + 1, 0)
    // Monday-based: 0=Mon..6=Sun
    const startDow = (first.getDay() + 6) % 7
    const days = []
    for (let i = 0; i < startDow; i++) days.push(null)
    for (let d = 1; d <= last.getDate(); d++) days.push(new Date(year, month, d))
    return days
  }

  const prevMonth = () => {
    setCursor(c => {
      const m = c.month === 0 ? 11 : c.month - 1
      const y = c.month === 0 ? c.year - 1 : c.year
      return { year: y, month: m }
    })
  }

  const nextMonth = () => {
    setCursor(c => {
      const m = c.month === 11 ? 0 : c.month + 1
      const y = c.month === 11 ? c.year + 1 : c.year
      return { year: y, month: m }
    })
  }

  const select = (day) => {
    if (!day) return
    if (startOfDay(day) < minDay) return
    onChange(day)
    setOpen(false)
  }

  const isToday = (day) => day && startOfDay(day).getTime() === today.getTime()
  const isSelected = (day) => day && value && startOfDay(day).getTime() === startOfDay(value).getTime()
  const isPast = (day) => day && startOfDay(day) < minDay

  const days = getDays()

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.display} onClick={() => setOpen(o => !o)}>
        {value
          ? <span className={styles.value}>{formatDisplay(value)}</span>
          : <span className={styles.placeholder}>ДД.ММ.ГГГГ</span>
        }
      </div>

      {open && (
        <div className={styles.calendar}>
          <div className={styles.header}>
            <button className={styles.navBtn} onClick={prevMonth}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className={styles.monthYear}>{MONTHS[cursor.month]} {cursor.year}</span>
            <button className={styles.navBtn} onClick={nextMonth}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className={styles.grid}>
            {DAYS.map(d => (
              <div key={d} className={styles.dayName}>{d}</div>
            ))}
            {days.map((day, i) => (
              <div
                key={i}
                className={[
                  styles.day,
                  !day ? styles.empty : '',
                  day && isPast(day) ? styles.past : '',
                  day && isToday(day) ? styles.today : '',
                  day && isSelected(day) ? styles.selected : '',
                ].join(' ')}
                onClick={() => select(day)}
              >
                {day ? day.getDate() : ''}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
