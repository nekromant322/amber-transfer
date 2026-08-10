import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import styles from '../../styles/TransferRoutePage.module.css'
import FaqSchema from '../../components/FaqSchema'

export const metadata = {
  title: 'Трансфер аэропорт Храброво — Балтийск | Заказать такси с водителем | Амбер Трансфер',
  description:
    'Трансфер из аэропорта Храброво в Балтийск на комфортных автомобилях. Встреча с табличкой, фиксированная цена, профессиональные водители. Доставка к отелю или в порт.',
  keywords: 'трансфер Храброво Балтийск, такси аэропорт Калининград Балтийск, заказать трансфер в Балтийск',
  alternates: { canonical: '/transfer-khrabrovo-baltiysk' },
  openGraph: {
    title: 'Трансфер аэропорт Храброво — Балтийск',
    description: 'Персональный трансфер из аэропорта Храброво в Балтийск.',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: 'https://ambertransfer.ru/cars/kia-sportage/1.png', width: 720, height: 960, alt: 'Амбер Трансфер — Kia Sportage' }],
  },
}

const destinations = [
  {
    name: 'Центр Балтийска',
    note: 'отели и жилые районы города',
    distance: '~70 км',
    time: '~1 ч 20 мин',
  },
  {
    name: 'Морской порт и набережная',
    note: 'военно-морская база и набережная',
    distance: '~70 км',
    time: '~1 ч 20 мин',
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
    q: 'Сколько времени занимает трансфер из Храброво в Балтийск?',
    a: 'В среднем около 1 часа 20 минут в пути — маршрут проходит без пересечения границы и пограничного контроля.',
  },
  {
    q: 'Можно ли доставить прямо к отелю или конкретному адресу?',
    a: 'Да, вы указываете точный адрес назначения при бронировании — водитель довезёт до двери, будь то отель или частный дом.',
  },
  {
    q: 'Что делать, если рейс задержится?',
    a: 'Водитель отслеживает статус рейса и скорректирует время подачи автомобиля — доплата за ожидание в разумных пределах не взимается.',
  },
  {
    q: 'Можно ли заказать трансфер туда и обратно?',
    a: 'Да, вы можете забронировать поездку в один конец или туда и обратно — укажите это при оформлении заявки, и менеджер согласует время обратного рейса.',
  },
]

export default function TransferKhrabrovoBaltiysk() {
  return (
    <>
      <Nav />
      <FaqSchema faq={faq} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Маршрут</p>
            <h1 className={styles.title}>
              Трансфер Храброво <span className={styles.arrow}>→</span> Балтийск
            </h1>
            <p className={styles.lead}>
              Персональный трансфер на комфортном автомобиле с профессиональным
              водителем. Встречаем в аэропорту Храброво и доставляем в любую
              точку Балтийска — без пересадок и лишних остановок.
            </p>

            <div className={styles.facts}>
              <div className={styles.fact}>
                <strong>~70 км</strong>
                <span>расстояние</span>
              </div>
              <div className={styles.factDivider} />
              <div className={styles.fact}>
                <strong>~1 ч 20 мин</strong>
                <span>время в пути</span>
              </div>
            </div>

            <a href="/#booking" className={styles.ctaBtn}>Забронировать трансфер</a>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Куда именно в Балтийске</h2>
            <p className={styles.sectionDesc}>
              Довезём в любую точку города — к отелю, порту или частному дому.
            </p>

            <div className={styles.airportGrid}>
              {destinations.map((d) => (
                <div key={d.name} className={styles.airportCard}>
                  <h3 className={styles.airportName}>{d.name}</h3>
                  <p className={styles.airportNote}>{d.note}</p>
                  <div className={styles.airportMeta}>
                    <span>{d.distance}</span>
                    <span className={styles.metaDot} />
                    <span>{d.time} в пути</span>
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

      </main>

      <Footer />
    </>
  )
}
