import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import styles from './page.module.css'

export const metadata = {
  title: 'Трансфер Калининград — Варшава | Заказать такси с водителем | Амбер Трансфер',
  description:
    'Трансфер из Калининграда в Варшаву на комфортных автомобилях бизнес-класса. Встреча с табличкой, фиксированная цена, профессиональные водители. Доставка в аэропорты Шопена и Модлин.',
  keywords: 'трансфер Калининград Варшава, такси Калининград Варшава, заказать трансфер в Варшаву',
  alternates: { canonical: '/transfer-kaliningrad-varshava' },
  openGraph: {
    title: 'Трансфер Калининград — Варшава',
    description: 'Персональный трансфер бизнес-класса из Калининграда в Варшаву.',
    locale: 'ru_RU',
    type: 'website',
  },
}

const airports = [
  {
    name: 'Аэропорт им. Шопена',
    note: 'главный международный аэропорт Варшавы',
    distance: '~430 км',
    time: '5–6 часов',
  },
  {
    name: 'Аэропорт Модлин',
    note: 'бюджетный аэропорт в 35 км от центра города',
    distance: '~370 км',
    time: '4.5–5 часов',
  },
]

const classes = [
  { name: 'Легковой автомобиль', pax: '4', hint: 'Skoda Kodiaq, Kia Sportage и аналоги' },
  { name: 'Минивэн', pax: '6–8', hint: 'Kia Carnival, Mercedes V-Class и аналоги' },
]

const advantages = [
  'Встреча с табличкой в аэропорту или у отеля',
  'Фиксированная стоимость поездки без доплат по дороге',
  'Профессиональные русскоговорящие водители',
  'Комфортные автомобили любого класса на выбор',
  'Бесплатное детское кресло по запросу',
  'Поддержка 24/7 на протяжении всей поездки',
]

const faq = [
  {
    q: 'Сколько времени занимает трансфер до Варшавы?',
    a: 'В среднем 5–6 часов в пути с учётом пересечения границы. Время пограничного контроля зависит от загруженности пункта пропуска и может составлять от получаса до пары часов.',
  },
  {
    q: 'Можно ли доставить прямо к отелю или конкретному адресу?',
    a: 'Да, вы указываете точный адрес подачи и назначения при бронировании — водитель довезёт до двери, а не только до аэропорта.',
  },
  {
    q: 'Что делать, если рейс задержится?',
    a: 'Водитель отслеживает статус рейса и скорректирует время подачи автомобиля — доплата за ожидание в разумных пределах не взимается.',
  },
  {
    q: 'Какие документы нужны для пересечения границы?',
    a: 'Понадобится действующий загранпаспорт и виза (если требуется для вашего гражданства). Ответственность за наличие необходимых документов лежит на пассажире — водитель помогает с логистикой поездки, но не отвечает за решения пограничной и таможенной служб.',
  },
]

export default function TransferKaliningradVarshava() {
  return (
    <>
      <Nav />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Маршрут</p>
            <h1 className={styles.title}>
              Трансфер Калининград <span className={styles.arrow}>→</span> Варшава
            </h1>
            <p className={styles.lead}>
              Персональный трансфер на комфортном автомобиле с профессиональным
              водителем. Забираем из дома, отеля или аэропорта Храброво и
              доставляем в любую точку Варшавы — без пересадок и лишних остановок.
            </p>

            <div className={styles.facts}>
              <div className={styles.fact}>
                <strong>~430 км</strong>
                <span>расстояние</span>
              </div>
              <div className={styles.factDivider} />
              <div className={styles.fact}>
                <strong>5–6 ч</strong>
                <span>время в пути</span>
              </div>
              <div className={styles.factDivider} />
              <div className={styles.fact}>
                <strong>~1 ч</strong>
                <span>граница</span>
              </div>
            </div>

            <a href="/#booking" className={styles.ctaBtn}>Забронировать трансфер</a>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Куда именно в Варшаве</h2>
            <p className={styles.sectionDesc}>
              Довезём в любую точку города, включая оба аэропорта Варшавы.
            </p>

            <div className={styles.airportGrid}>
              {airports.map((a) => (
                <div key={a.name} className={styles.airportCard}>
                  <h3 className={styles.airportName}>{a.name}</h3>
                  <p className={styles.airportNote}>{a.note}</p>
                  <div className={styles.airportMeta}>
                    <span>{a.distance}</span>
                    <span className={styles.metaDot} />
                    <span>{a.time} в пути</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Классы автомобилей</h2>
            <p className={styles.sectionDesc}>
              Итоговая стоимость зависит от класса автомобиля — уточняйте цену у менеджера.
            </p>

            <div className={styles.classGrid}>
              {classes.map((c) => (
                <div key={c.name} className={styles.classCard}>
                  <h3 className={styles.className}>{c.name}</h3>
                  <p className={styles.classHint}>{c.hint}</p>
                  <span className={styles.classPax}>до {c.pax} пасс.</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Что входит в поездку</h2>

            <ul className={styles.advList}>
              {advantages.map((a) => (
                <li key={a} className={styles.advItem}>
                  <span className={styles.advIcon} aria-hidden="true">◆</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Вопросы и ответы</h2>

            <div className={styles.faqList}>
              {faq.map((item) => (
                <div key={item.q} className={styles.faqItem}>
                  <h3 className={styles.faqQ}>{item.q}</h3>
                  <p className={styles.faqA}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>Готовы к поездке?</h2>
            <p className={styles.ctaDesc}>
              Оставьте заявку — менеджер свяжется с вами и подтвердит детали трансфера.
            </p>
            <a href="/#booking" className={styles.ctaBtn}>Забронировать трансфер</a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
