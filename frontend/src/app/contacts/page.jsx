import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import routeStyles from '../../styles/TransferRoutePage.module.css'
import styles from '../../styles/PrivacyPolicy.module.css'

export const metadata = {
  title: 'Контакты | Амбер Трансфер',
  description:
    'Контакты Амбер Трансфер: телефон, Telegram, реквизиты. Трансферы из Калининграда в Польшу, Литву и другие страны Европы.',
  alternates: { canonical: '/contacts' },
  robots: { index: true, follow: true },
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Контакты Амбер Трансфер',
  url: 'https://ambertransfer.ru/contacts',
  mainEntity: {
    '@type': 'TaxiService',
    name: 'Амбер Трансфер',
    telephone: ['+7-950-008-44-57', '+373-69-140-940'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Калининград',
      addressCountry: 'RU',
    },
    sameAs: ['https://t.me/amber_transfer'],
  },
}

export default function ContactsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema).replace(/</g, '\\u003c') }}
      />

      <Nav />

      <main className={routeStyles.main}>
        <section className={routeStyles.hero}>
          <div className={routeStyles.container}>
            <p className={routeStyles.eyebrow}>Связь с нами</p>
            <h1 className={routeStyles.title}>
              Контакты <span className={routeStyles.arrow}>—</span> Амбер Трансфер
            </h1>
            <p className={routeStyles.lead}>
              Работаем ежедневно, без выходных. Свяжитесь с нами удобным способом —
              ответим и подберём маршрут из Калининграда в Польшу, Литву или другую
              страну Европы.
            </p>
          </div>
        </section>

        <section className={routeStyles.section}>
          <div className={routeStyles.container}>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Телефон</h2>
              <div className={styles.requisites}>
                <p><a href="tel:+79500084457">+7 950 008 4457</a></p>
                <p><a href="tel:+37369140940">+373 69 140 940</a></p>
              </div>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Telegram</h2>
              <div className={styles.requisites}>
                <p><a href="https://t.me/amber_transfer">@amber_transfer</a></p>
              </div>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>География</h2>
              <p className={styles.text}>
                Базируемся в Калининграде, выполняем трансферы в Гданьск, Варшаву,
                Вильнюс, Каунас, Ригу, Берлин и другие города Польши, Литвы и Европы,
                а также по Калининградской области.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>Реквизиты</h2>
              <div className={styles.requisites}>
                <p><strong>ИП Марандюк Анатолий Викторович</strong></p>
                <p>ИНН: 773583566764</p>
                <p>ОГРНИП: 321673300028243 от 9 августа 2021 г.</p>
                <p>E-mail: <a href="mailto:anatolii.marandyuk@gmail.com">anatolii.marandyuk@gmail.com</a></p>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
