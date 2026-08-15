import styles from './Footer.module.css'

const navLinks = [
  { label: 'Как это работает', href: '/#how' },
  { label: 'Услуги', href: '/#services' },
  { label: 'Тарифы', href: '/#tariffs' },
  { label: 'Вопросы и ответы', href: '/#faq' },
  { label: 'Статьи', href: '/articles' },
  { label: 'Контакты', href: '/contacts' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.topLine} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <a href="/" className={styles.logo}>
              <span className={styles.logoIcon}>◆</span>
              <span>Амбер <em>Трансфер</em></span>
            </a>
            <p className={styles.tagline}>
              Персональные трансферы<br />
              Калининград · Европа
            </p>
          </div>

          <nav className={styles.nav}>
            <p className={styles.navTitle}>Навигация</p>
            <ul className={styles.navList}>
              {navLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contact}>
            <p className={styles.navTitle}>Связь</p>
            <p className={styles.contactItem}>
              <span>Телефон</span>
              <a href="tel:+79500084457">+7 950 008 4457</a>
              <a href="tel:+37369140940">+373 69 140 940</a>
            </p>
            <p className={styles.contactItem}>
              <span>Telegram</span>
              <a href="https://t.me/amber_transfer">@amber_transfer</a>
            </p>
          </div>

          <div className={styles.cta}>
            <p className={styles.ctaText}>Готовы к поездке?</p>
            <a href="/#booking" className={styles.ctaBtn}>
              Забронировать сейчас
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© {year} Амбер Трансфер. Все права защищены.</p>
          <p className={styles.seo}>
            Трансфер Калининград – Гданьск · Варшава · Вильнюс · Рига · Берлин
          </p>
        </div>
      </div>
    </footer>
  )
}
