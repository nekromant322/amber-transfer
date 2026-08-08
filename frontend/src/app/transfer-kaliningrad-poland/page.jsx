import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import styles from '../../styles/TransferRoutePage.module.css'
import FaqSchema from '../../components/FaqSchema'

export const metadata = {
  title: 'Трансфер Калининград — Польша | Заказать такси с водителем | Амбер Трансфер',
  description:
    'Трансфер из Калининграда в города Польши: Варшава, Гданьск, Вроцлав, Познань, Краков. Комфортные автомобили, встреча с табличкой, фиксированная цена.',
  keywords: 'трансфер Калининград Польша, такси Калининград Польша, заказать трансфер в Польшу',
  alternates: { canonical: '/transfer-kaliningrad-poland' },
  openGraph: {
    title: 'Трансфер Калининград — Польша',
    description: 'Персональный трансфер бизнес-класса из Калининграда в города Польши.',
    locale: 'ru_RU',
    type: 'website',
  },
}

const destinations = [
  {
    name: 'Варшава',
    note: 'столица Польши, аэропорты Шопена и Модлин',
    distance: '~430 км',
    time: '~5–6 часов',
    href: '/transfer-kaliningrad-varshava',
  },
  {
    name: 'Гданьск',
    note: 'Труймястье — Гданьск, Сопот, Гдыня',
    distance: '~170 км',
    time: '~4 часа',
    href: '/transfer-kaliningrad-gdansk',
  },
  {
    name: 'Вроцлав',
    note: 'исторический центр и аэропорт им. Коперника',
    distance: '~600 км',
    time: '~10 часов',
    href: '/transfer-kaliningrad-vroclav',
  },
  {
    name: 'Познань',
    note: 'Старая Рыночная площадь и аэропорт Лавица',
    distance: '~480 км',
    time: '~7 часов',
    href: '/transfer-kaliningrad-poznan',
  },
  {
    name: 'Краков',
    note: 'Рыночная площадь и аэропорт Балице',
    distance: '670 км',
    time: '~8,5–9 часов',
    href: '/transfer-kaliningrad-krakow',
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
    q: 'Через какой пункт пропуска проходят маршруты в Польшу?',
    a: 'Все маршруты проходят через автомобильный переход Мамоново — Гжехотки. Время пограничного контроля — от часа и зависит от загруженности пункта пропуска и времени суток.',
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
    a: 'Понадобится действующий загранпаспорт и шенгенская виза (если требуется для вашего гражданства). Ответственность за наличие необходимых документов лежит на пассажире — водитель помогает с логистикой поездки, но не отвечает за решения пограничной и таможенной служб.',
  },
]

export default function TransferKaliningradPoland() {
  return (
    <>
      <Nav />
      <FaqSchema faq={faq} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Направление</p>
            <h1 className={styles.title}>
              Трансфер Калининград <span className={styles.arrow}>→</span> Польша
            </h1>
            <p className={styles.lead}>
              Персональный трансфер на комфортном автомобиле с профессиональным
              водителем. Забираем из дома, отеля или аэропорта Храброво и
              доставляем в любой город Польши — Варшаву, Гданьск, Вроцлав, Познань или Краков.
            </p>

            <div className={styles.facts}>
              <div className={styles.fact}>
                <strong>5</strong>
                <span>направлений</span>
              </div>
              <div className={styles.factDivider} />
              <div className={styles.fact}>
                <strong>от 4 ч</strong>
                <span>время в пути</span>
              </div>
              <div className={styles.factDivider} />
              <div className={styles.fact}>
                <strong>от 1 ч</strong>
                <span>граница</span>
              </div>
            </div>

            <a href="/#booking" className={styles.ctaBtn}>Забронировать трансфер</a>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Куда именно в Польше</h2>
            <p className={styles.sectionDesc}>
              Выберите город назначения — у каждого маршрута своя страница с подробностями.
            </p>

            <div className={styles.airportGrid}>
              {destinations.map((d) => (
                <a key={d.name} href={d.href} className={styles.airportCard}>
                  <h3 className={styles.airportName}>{d.name}</h3>
                  <p className={styles.airportNote}>{d.note}</p>
                  <div className={styles.airportMeta}>
                    <span>{d.distance}</span>
                    <span className={styles.metaDot} />
                    <span>{d.time} в пути</span>
                  </div>
                </a>
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
