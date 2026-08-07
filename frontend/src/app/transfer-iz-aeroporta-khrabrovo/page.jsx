import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import styles from './page.module.css'

export const metadata = {
  title: 'Такси из аэропорта Храброво (Калининград) | Заказать трансфер с водителем | Амбер Трансфер',
  description:
    'Трансфер из аэропорта Храброво по Калининграду и области. Встреча с табличкой, фиксированная цена, профессиональные водители. Доставка в Зеленоградск, Светлогорск, Пионерский, Янтарный, Балтийск.',
  keywords: 'такси Храброво, трансфер из аэропорта Калининград, такси аэропорт Калининград',
  alternates: { canonical: '/transfer-iz-aeroporta-khrabrovo' },
  openGraph: {
    title: 'Такси из аэропорта Храброво',
    description: 'Персональный трансфер из аэропорта Храброво по Калининграду и области.',
    locale: 'ru_RU',
    type: 'website',
  },
}

const destinations = [
  {
    name: 'Калининград',
    note: 'город и любой район',
    distance: '~20 км',
    time: '~15 мин',
    href: '/#booking',
  },
  {
    name: 'Зеленоградск',
    note: 'курорт и отправная точка на Куршскую косу',
    distance: '~28 км',
    time: '~40 мин',
    href: '/transfer-kaliningrad-zelenogradsk',
  },
  {
    name: 'Светлогорск',
    note: 'променад и канатная дорога',
    distance: '~40 км',
    time: '~50 мин',
    href: '/transfer-kaliningrad-svetlogorsk',
  },
  {
    name: 'Пионерский',
    note: 'пляж и набережная',
    distance: '~38 км',
    time: '~30 мин',
    href: '/transfer-kaliningrad-pionersky',
  },
  {
    name: 'Янтарный',
    note: 'пляж и Янтарный комбинат',
    distance: '~55 км',
    time: '~60 мин',
    href: '/transfer-kaliningrad-yantarny',
  },
  {
    name: 'Балтийск',
    note: 'морской порт и набережная',
    distance: '~50 км',
    time: '~80 мин',
    href: '/transfer-khrabrovo-baltiysk',
  },
]

const classes = [
  { name: 'Легковой автомобиль', pax: '4', hint: 'Skoda Kodiaq, Kia Sportage и аналоги' },
  { name: 'Минивэн', pax: '6–8', hint: 'Kia Carnival, Mercedes V-Class и аналоги' },
]

const advantages = [
  'Встреча с табличкой прямо в зоне прилёта',
  'Фиксированная стоимость поездки без доплат по дороге',
  'Профессиональные русскоговорящие водители',
  'Комфортные автомобили любого класса на выбор',
  'Бесплатное детское кресло по запросу',
  'Поддержка 24/7 на протяжении всей поездки',
]

const faq = [
  {
    q: 'Как проходит встреча в аэропорту?',
    a: 'Водитель ждёт вас в зоне прилёта с табличкой с вашим именем. Время подачи автомобиля рассчитывается с учётом фактического времени приземления рейса.',
  },
  {
    q: 'Можно ли доставить прямо к отелю или конкретному адресу?',
    a: 'Да, вы указываете точный адрес назначения при бронировании — водитель довезёт до двери, будь то отель, частный дом или пляж.',
  },
  {
    q: 'Что делать, если рейс задержится?',
    a: 'Водитель отслеживает статус рейса и скорректирует время подачи автомобиля — доплата за ожидание в разумных пределах не взимается.',
  },
  {
    q: 'Можно ли заказать трансфер туда и обратно?',
    a: 'Да, вы можете забронировать поездку в один конец или туда и обратно — укажите это при оформлении заявки, и менеджер согласует время обратного рейса в аэропорт.',
  },
]

export default function TransferIzAeroportaKhrabrovo() {
  return (
    <>
      <Nav />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Трансфер</p>
            <h1 className={styles.title}>
              Такси из аэропорта <span className={styles.arrow}>→</span> Храброво
            </h1>
            <p className={styles.lead}>
              Персональный трансфер на комфортном автомобиле с профессиональным
              водителем. Встречаем в зоне прилёта аэропорта Храброво и
              доставляем в любую точку Калининграда и области — без пересадок и лишних остановок.
            </p>

            <div className={styles.facts}>
              <div className={styles.fact}>
                <strong>6</strong>
                <span>направлений</span>
              </div>
              <div className={styles.factDivider} />
              <div className={styles.fact}>
                <strong>от 15 мин</strong>
                <span>время в пути</span>
              </div>
            </div>

            <a href="/#booking" className={styles.ctaBtn}>Забронировать трансфер</a>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Куда именно из Храброво</h2>
            <p className={styles.sectionDesc}>
              Выберите город назначения — доставим в любую точку Калининграда и области.
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
