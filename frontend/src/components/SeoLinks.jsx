import styles from './SeoLinks.module.css'

const links = [
  [
    'Такси Калининград - Варшава',
    'Такси Калининград – Янтарный',
    'Такси Калининград – Вроцлав',
    'Калининград – Друскининкай',
    'Такси Калининград – Гамбург',
    'Такси Калининград – Зеленоградск',
    'Аэропорт Храброво – Балтийск',
    'Такси Калининград – Пионерский',
  ],
  [
    'Трансфер Калининград – Гданьск',
    'Калининград – Литва',
    'Такси Калининград – Познань',
    'Такси Калининград – Каунас',
    'Трансфер Калининград – Латвия',
    'Такси Калининград – Вильнюс',
    'Такси из аэропорта Храброво (Калининград)',
  ],
  [
    'Такси Калининград – Светлогорск',
    'Калининград – Паланга',
    'Калининград – Краков',
    'Такси Калининград – Клайпеда',
    'Трансфер Калининград – Польша',
    'Трансфер для моряков',
    'Калининград – Вильнюс',
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
                {column.map((label) => (
                  <li key={label}>
                    <a href="#">
                      <span className={styles.pin} aria-hidden="true">◈</span>
                      {label}
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
