import styles from './SeoLinks.module.css'

const links = [
  [
    { label: 'Такси Калининград - Варшава', href: '/transfer-kaliningrad-varshava' },
    { label: 'Такси Калининград – Янтарный', href: '/transfer-kaliningrad-yantarny' },
    { label: 'Такси Калининград – Вроцлав', href: '/transfer-kaliningrad-vroclav' },
    { label: 'Калининград – Друскининкай', href: '/transfer-kaliningrad-druskininkai' },
    { label: 'Такси Калининград – Гамбург', href: '/transfer-kaliningrad-gamburg' },
    { label: 'Такси Калининград – Зеленоградск', href: '/transfer-kaliningrad-zelenogradsk' },
    { label: 'Аэропорт Храброво – Балтийск', href: '/transfer-khrabrovo-baltiysk' },
    { label: 'Такси Калининград – Пионерский', href: '/transfer-kaliningrad-pionersky' },
  ],
  [
    { label: 'Трансфер Калининград – Гданьск', href: '/transfer-kaliningrad-gdansk' },
    { label: 'Калининград – Литва', href: '/transfer-kaliningrad-litva' },
    { label: 'Такси Калининград – Познань', href: '/transfer-kaliningrad-poznan' },
    { label: 'Такси Калининград – Каунас', href: '/transfer-kaliningrad-kaunas' },
    { label: 'Трансфер Калининград – Латвия', href: '/transfer-kaliningrad-latvia' },
    { label: 'Такси Калининград – Вильнюс', href: '/transfer-kaliningrad-vilnius' },
    { label: 'Такси из аэропорта Храброво (Калининград)', href: '/transfer-iz-aeroporta-khrabrovo' },
  ],
  [
    { label: 'Такси Калининград – Светлогорск', href: '/transfer-kaliningrad-svetlogorsk' },
    { label: 'Калининград – Паланга', href: '/transfer-kaliningrad-palanga' },
    { label: 'Калининград – Краков', href: '/transfer-kaliningrad-krakow' },
    { label: 'Такси Калининград – Клайпеда', href: '/transfer-kaliningrad-klaipeda' },
    { label: 'Трансфер Калининград – Польша', href: '/transfer-kaliningrad-poland' },
    { label: 'Трансфер для моряков', href: '#' },
    { label: 'Калининград – Вильнюс', href: '/transfer-kaliningrad-vilnius' },
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
