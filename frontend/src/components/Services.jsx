import styles from './Services.module.css'

const services = [
  {
    icon: '◎',
    title: 'Индивидуальный трансфер',
    text: 'Персональный автомобиль только для вас и вашей компании.',
  },
  {
    icon: '◈',
    title: 'Групповой трансфер',
    text: 'Комфортные микроавтобусы для групп от 4 до 8 человек.',
  },
  {
    icon: '◷',
    title: 'Трансфер в аэропорт',
    text: 'Встреча с табличкой, помощь с багажом, точно в срок.',
  },
  {
    icon: '⇌',
    title: 'Обратный трансфер',
    text: 'Организуем поездку в обоих направлениях.',
  },
  {
    icon: '◆',
    title: 'Бизнес-трансфер',
    text: 'Представительские автомобили для деловых поездок.',
  },
  {
    icon: '✦',
    title: 'VIP-трансфер',
    text: 'Автомобили премиум-класса, максимальный комфорт.',
  },
]

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Что мы предлагаем</p>
          <h2 className={styles.title}>Услуги</h2>
        </div>

        <div className={styles.grid}>
          {services.map((s) => (
            <div key={s.title} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">{s.icon}</span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardText}>{s.text}</p>
              <span className={styles.arrow}>→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
