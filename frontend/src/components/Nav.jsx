'use client'

import { useState, useEffect } from 'react'
import styles from './Nav.module.css'

const links = [
  { label: 'Как это работает', href: '/#how' },
  { label: 'Услуги', href: '/#services' },
  { label: 'Тарифы', href: '/#tariffs' },
  { label: 'Вопросы', href: '/#faq' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          <span className={styles.logoIcon}>◆</span>
          <span>Амбер <em>Трансфер</em></span>
        </a>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
          <li>
            <a href="/#booking" className={styles.cta} onClick={() => setMenuOpen(false)}>
              Забронировать
            </a>
          </li>
        </ul>

        <button
          className={`${styles.burger} ${menuOpen ? styles.active : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Меню"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
