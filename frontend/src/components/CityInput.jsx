'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './CityInput.module.css'

const DEFAULTS = [
  { ru: 'Калининград', lat: 'Kaliningrad' },
  { ru: 'Вильнюс',     lat: 'Vilnius'     },
  { ru: 'Варшава',     lat: 'Warsaw'      },
  { ru: 'Гданьск',     lat: 'Gdansk'      },
  { ru: 'Берлин',      lat: 'Berlin'      },
  { ru: 'Вроцлав',     lat: 'Wroclaw'     },
  { ru: 'Рига',        lat: 'Riga'        },
  { ru: 'Таллин',      lat: 'Tallinn'     },
  { ru: 'Краков',      lat: 'Krakow'      },
  { ru: 'Познань',     lat: 'Poznan'      },
]

export default function CityInput({ placeholder, value, onChange, exclude }) {
  const [query, setQuery] = useState(value || '')
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [allCities, setAllCities] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? ''
    fetch(`${apiBase}/api/cities`)
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

  function filterCities(list, q) {
    const lower = q.toLowerCase()
    return list
      .filter(c => c.ru !== exclude && c.lat !== exclude)
      .filter(c => c.ru.toLowerCase().includes(lower) || c.lat.toLowerCase().includes(lower))
      .slice(0, 8)
  }

  function getDefaults() {
    return exclude
      ? DEFAULTS.filter(c => c.ru !== exclude && c.lat !== exclude)
      : DEFAULTS
  }

  const handleFocus = () => {
    if (!query) setSuggestions(getDefaults())
    setOpen(true)
  }

  const handleChange = (e) => {
    const val = e.target.value
    setQuery(val)
    onChange(val)
    if (!val) {
      setSuggestions(getDefaults())
      setOpen(true)
      return
    }
    const matched = filterCities(allCities, val)
    setSuggestions(matched)
    setOpen(matched.length > 0)
  }

  const handleSelect = (city) => {
    setQuery(city.lat)
    onChange(city.lat)
    setOpen(false)
  }

  // detect if query looks like Latin input
  const isLatinQuery = query && /^[a-zA-Z]/.test(query)

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
              key={city.ru}
              className={styles.item}
              onMouseDown={() => handleSelect(city)}
            >
              <span className={styles.itemPrimary}>
                {isLatinQuery ? city.lat : city.ru}
              </span>
              <span className={styles.itemSecondary}>
                {isLatinQuery ? city.ru : city.lat}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
