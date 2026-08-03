import styles from './SeoLinks.module.css'

const links = [
  [
    { label: 'Такси Калининград - Варшава', href: '/transfer-kaliningrad-varshava' },
    { label: 'Такси Калининград – Янтарный', href: '#' },
    { label: 'Такси Калининград – Вроцлав', href: '#' },
    { label: 'Калининград – Друскининкай', href: '#' },
    { label: 'Такси Калининград – Гамбург', href: '#' },
    { label: 'Такси Калининград – Зеленоградск', href: '#' },
    { label: 'Аэропорт Храброво – Балтийск', href: '#' },
    { label: 'Такси Калининград – Пионерский', href: '#' },
  ],
  [
    { label: 'Трансфер Калининград – Гданьск', href: '#' },
    { label: 'Калининград – Литва', href: '#' },
    { label: 'Такси Калининград – Познань', href: '#' },
    { label: 'Такси Калининград – Каунас', href: '#' },
    { label: 'Трансфер Калининград – Латвия', href: '#' },
    { label: 'Такси Калининград – Вильнюс', href: '#' },
    { label: 'Такси из аэропорта Храброво (Калининград)', href: '#' },
  ],
  [
    { label: 'Такси Калининград – Светлогорск', href: '#' },
    { label: 'Калининград – Паланга', href: '#' },
    { label: 'Калининград – Краков', href: '#' },
    { label: 'Такси Калининград – Клайпеда', href: '#' },
    { label: 'Трансфер Калининград – Польша', href: '#' },
    { label: 'Трансфер для моряков', href: '#' },
    { label: 'Калининград – Вильнюс', href: '#' },
  ],
]

export default function SeoLinks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>
            Организация трансфера в Калининграде и других городах
          </h2>

          <div className={styles.grid}>
            {links.map((column, i) => (
              <ul className={styles.column} key={i}>
                {column.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>
                      <span className={styles.pin} aria-hidden="true">◈</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
