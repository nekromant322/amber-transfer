import BookingWidget from './BookingWidget'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} id="booking">
      {/* Background decorative elements */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgLine} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span className={styles.dot} />
            Персональные трансферы
          </p>

          <h1 className={styles.headline}>
            <span className={styles.headlineTop}>Калининград</span>
            <span className={styles.headlineDivider} aria-hidden="true">
              <span className={styles.line} />
              <span className={styles.arrowIcon}>→</span>
              <span className={styles.line} />
            </span>
            <span className={styles.headlineBottom}>
              <em>Европа</em>
            </span>
          </h1>

          <p className={styles.subtitle}>
            Комфортные поездки на автомобилях бизнес-класса.<br />
            Профессиональные водители. Точно в срок.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <strong>6+</strong>
              <span>направлений</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <strong>3</strong>
              <span>класса авто</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <strong>24/7</strong>
              <span>поддержка</span>
            </div>
          </div>
        </div>

        <div className={styles.widgetWrap}>
          <BookingWidget />
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  )
}
