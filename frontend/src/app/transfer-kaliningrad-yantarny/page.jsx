import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import styles from './page.module.css'

export const metadata = {
  title: 'Трансфер Калининград — Янтарный | Заказать такси с водителем | Амбер Трансфер',
  description:
    'Трансфер из Калининграда в Янтарный на комфортных автомобилях. Встреча с табличкой, фиксированная цена, профессиональные водители. Доставка к пляжу, отелю или частному дому.',
  keywords: 'трансфер Калининград Янтарный, такси Калининград Янтарный, заказать трансфер в Янтарный',
  alternates: { canonical: '/transfer-kaliningrad-yantarny' },
  openGraph: {
    title: 'Трансфер Калининград — Янтарный',
    description: 'Персональный трансфер из Калининграда в посёлок Янтарный.',
    locale: 'ru_RU',
    type: 'website',
  },
}

const destinations = [
  {
    name: 'Пляж и променад',
    note: 'главная точка притяжения курорта',
    distance: '~48 км',
    time: '~1 ч',
  },
  {
    name: 'Центр посёлка',
    note: 'отели, кафе, Янтарный комбинат',
    distance: '~48 км',
    time: '~1 ч',
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
    q: 'Сколько времени занимает трансфер до Янтарного?',
    a: 'В среднем около часа в пути — маршрут проходит без пересечения границы и пограничного контроля.',
  },
  {
    q: 'Можно ли доставить прямо к отелю или конкретному адресу?',
    a: 'Да, вы указываете точный адрес подачи и назначения при бронировании — водитель довезёт до двери, будь то отель, частный дом или пляж.',
  },
  {
    q: 'Можно ли заказать трансфер туда и обратно?',
    a: 'Да, вы можете забронировать поездку в один конец или туда и обратно — укажите это при оформлении заявки, и менеджер согласует время обратного рейса.',
  },
]

export default function TransferKaliningradYantarny() {
  return (
    <>
      <Nav />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Маршрут</p>
            <h1 className={styles.title}>
              Трансфер Калининград <span className={styles.arrow}>→</span> Янтарный
            </h1>
            <p className={styles.lead}>
              Персональный трансфер на комфортном автомобиле с профессиональным
              водителем. Забираем из дома, отеля или аэропорта Храброво и
              доставляем в любую точку Янтарного — без пересадок и лишних остановок.
            </p>

            <div className={styles.facts}>
              <div className={styles.fact}>
                <strong>~48 км</strong>
                <span>расстояние</span>
              </div>
              <div className={styles.factDivider} />
              <div className={styles.fact}>
                <strong>~1 ч</strong>
                <span>время в пути</span>
              </div>
            </div>

            <a href="/#booking" className={styles.ctaBtn}>Забронировать трансфер</a>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Куда именно в Янтарном</h2>
            <p className={styles.sectionDesc}>
              Довезём в любую точку посёлка — к отелю, пляжу или частному дому.
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
