import styles from './HowItWorks.module.css'

const steps = [
  {
    n: '01',
    title: 'Выберите маршрут',
    text: 'Укажите город отправления и назначения в форме бронирования.',
  },
  {
    n: '02',
    title: 'Выберите дату',
    text: 'Выберите удобную дату и время поездки.',
  },
  {
    n: '03',
    title: 'Выберите класс авто',
    text: 'Комфорт, Бизнес или Премиум — для любого запроса.',
  },
  {
    n: '04',
    title: 'Подтвердите бронирование',
    text: 'Менеджер свяжется с вами для подтверждения деталей поездки и имени водителя.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Процесс</p>
          <h2 className={styles.title}>Как это работает</h2>
          <p className={styles.desc}>
            Четыре шага до комфортной поездки
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={s.n} className={styles.step}>
              <div className={styles.stepNumber}>{s.n}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepText}>{s.text}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={styles.connector} aria-hidden="true">
                  <span />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
