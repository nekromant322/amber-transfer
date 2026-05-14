'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './CityInput.module.css'

const DEFAULTS = [
  'Калининград', 'Вильнюс', 'Варшава', 'Гданьск',
  'Берлин', 'Вроцлав', 'Рига', 'Таллин', 'Краков', 'Познань',
]

export default function CityInput({ placeholder, value, onChange, exclude }) {
  const [query, setQuery] = useState(value || '')
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [allCities, setAllCities] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    fetch('/api/cities')
      .then(r => r.json())
      .then(data => setAllCities(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    setQuery(value || '')
  }, [value])

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filter = (list) => exclude ? list.filter(c => c !== exclude) : list

  useEffect(() => {
    setSuggestions(prev => prev.filter(c => c !== exclude))
  }, [exclude])

  const handleFocus = () => {
    if (!query) setSuggestions(filter(DEFAULTS))
    setOpen(true)
  }

  const handleChange = (e) => {
    const val = e.target.value
    setQuery(val)
    onChange(val)
    if (!val) {
      setSuggestions(filter(DEFAULTS))
      setOpen(true)
      return
    }
    const lower = val.toLowerCase()
    const matched = allCities
      .filter(c => c.ru.toLowerCase().includes(lower) || c.lat.toLowerCase().includes(lower))
      .filter(c => c.ru !== exclude)
      .slice(0, 8)
      .map(c => c.ru)
    setSuggestions(matched)
    setOpen(matched.length > 0)
  }

  const handleSelect = (city) => {
    setQuery(city)
    onChange(city)
    setOpen(false)
  }

  return (
    <div className={styles.wrap} ref={containerRef}>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        autoComplete="off"
      />
      {open && suggestions.length > 0 && (
        <ul className={styles.dropdown}>
          {suggestions.map(city => (
            <li
              key={city}
              className={styles.item}
              onMouseDown={() => handleSelect(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
