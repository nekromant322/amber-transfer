import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import styles from '../../styles/TransferRoutePage.module.css'
import FaqSchema from '../../components/FaqSchema'
import ArticleSchema from '../../components/ArticleSchema'

export const metadata = {
  title: 'Трансфер Калининград — Латвия | Заказать такси с водителем | Амбер Трансфер',
  description:
    'Трансфер из Калининграда в Ригу и другие города Латвии на комфортных автомобилях бизнес-класса. Встреча с табличкой, фиксированная цена, профессиональные водители.',
  alternates: { canonical: '/transfer-kaliningrad-latvia' },
  openGraph: {
    title: 'Трансфер Калининград — Латвия',
    description: 'Персональный трансфер бизнес-класса из Калининграда в Ригу.',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: 'https://ambertransfer.ru/cars/kia-sportage/1.png', width: 720, height: 960, alt: 'Амбер Трансфер — Kia Sportage' }],
  },
}

const destinations = [
  {
    name: 'Аэропорт Риги',
    note: 'крупнейший международный аэропорт стран Балтии',
    distance: '~300 км',
    time: '~5 часов',
  },
  {
    name: 'Центр Риги',
    note: 'Старый город и набережная Даугавы',
    distance: '~300 км',
    time: '~5 часов',
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
    q: 'Сколько времени занимает трансфер до Риги?',
    a: 'В среднем около 5 часов в пути через территорию Литвы, с учётом пересечения границы на автомобильном переходе Чернышевское — Кибартай. Пограничный контроль обычно занимает около 2 часов.',
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
    a: 'Понадобится действующий загранпаспорт и виза (если требуется для вашего гражданства), а также медицинская страховка. Ответственность за наличие необходимых документов лежит на пассажире — водитель помогает с логистикой поездки, но не отвечает за решения пограничной и таможенной служб.',
  },
]

const articleText = [...advantages, ...faq.map((item) => `${item.q} ${item.a}`)].join(' ')

export default function TransferKaliningradLatvia() {
  return (
    <>
      <Nav />
      <FaqSchema faq={faq} />
      <ArticleSchema url="https://ambertransfer.ru/transfer-kaliningrad-latvia" headline="Трансфер Калининград — Латвия" text={articleText} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Направление</p>
            <h1 className={styles.title}>
              Трансфер Калининград <span className={styles.arrow}>→</span> Латвия
            </h1>
            <p className={styles.lead}>
              Персональный трансфер на комфортном автомобиле с профессиональным
              водителем. Забираем из дома, отеля или аэропорта Храброво и
              доставляем в любую точку Риги — без пересадок и лишних остановок.
            </p>

            <div className={styles.facts}>
              <div className={styles.fact}>
                <strong>~300 км</strong>
                <span>расстояние</span>
              </div>
              <div className={styles.factDivider} />
              <div className={styles.fact}>
                <strong>~5 ч</strong>
                <span>время в пути</span>
              </div>
              <div className={styles.factDivider} />
              <div className={styles.fact}>
                <strong>~2 ч</strong>
                <span>граница</span>
              </div>
            </div>

            <a href="/#booking" className={styles.ctaBtn}>Забронировать трансфер</a>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Куда именно в Риге</h2>
            <p className={styles.sectionDesc}>
              Довезём в любую точку города, включая международный аэропорт Риги.
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
