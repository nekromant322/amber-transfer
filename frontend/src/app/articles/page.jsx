import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { articles } from '../../data/articles'
import routeStyles from '../../styles/TransferRoutePage.module.css'
import styles from '../../styles/ArticlesIndex.module.css'

export const metadata = {
  title: 'Статьи о трансфере Калининград — Европа | Амбер Трансфер',
  description:
    'Полезные материалы о пересечении границы, документах и организации поездок между Калининградом и Европой.',
  alternates: { canonical: '/articles' },
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ArticlesIndexPage() {
  return (
    <>
      <Nav />

      <main className={routeStyles.main}>
        <section className={routeStyles.hero}>
          <div className={routeStyles.container}>
            <p className={routeStyles.eyebrow}>Статьи</p>
            <h1 className={routeStyles.title}>Полезное о поездках между Калининградом и Европой</h1>
            <p className={routeStyles.lead}>
              Разбираем практические вопросы, которые чаще всего возникают у
              пассажиров: пересечение границы, документы, организация
              поездки.
            </p>
          </div>
        </section>

        <section className={routeStyles.section}>
          <div className={routeStyles.container}>
            <div className={styles.grid}>
              {articles.map((a) => (
                <a key={a.slug} href={`/articles/${a.slug}`} className={styles.card}>
                  <p className={styles.cardDate}>{formatDate(a.date)}</p>
                  <h2 className={styles.cardTitle}>{a.title}</h2>
                  <p className={styles.cardDesc}>{a.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
