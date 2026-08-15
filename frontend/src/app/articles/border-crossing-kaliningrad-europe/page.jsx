import Nav from '../../../components/Nav'
import Footer from '../../../components/Footer'
import FaqSchema from '../../../components/FaqSchema'
import ArticleSchema from '../../../components/ArticleSchema'
import { articles } from '../../../data/articles'
import routeStyles from '../../../styles/TransferRoutePage.module.css'
import styles from '../../../styles/Article.module.css'

const article = articles.find((a) => a.slug === 'border-crossing-kaliningrad-europe')

export const metadata = {
  title: `${article.title} | Амбер Трансфер`,
  description: article.description,
  alternates: { canonical: `/articles/${article.slug}` },
  openGraph: {
    title: article.title,
    description: article.description,
    locale: 'ru_RU',
    type: 'article',
  },
}

const prohibited = [
  {
    label: 'Продукты животного происхождения',
    text: 'мясо, молочные продукты, сыр, готовые бутерброды и подобное — ввоз в ЕС из России практически полностью запрещён без исключений для личного пользования.',
  },
  {
    label: 'Крупные суммы наличных без декларации',
    text: 'при выезде в ЕС декларируется сумма свыше эквивалента 10 000 евро, при въезде в Россию — свыше эквивалента 10 000 долларов США.',
  },
  {
    label: 'Алкоголь и табак сверх беспошлинных норм',
    text: 'ориентировочно около 1 литра крепкого алкоголя, 2 литров вина и одного блока сигарет на человека — всё, что больше, облагается пошлиной или подлежит декларированию.',
  },
  {
    label: 'Оружие, боеприпасы, газовые баллончики и аналогичные предметы',
    text: 'провоз без официального разрешения запрещён.',
  },
  {
    label: 'Лекарства с содержанием наркотических и сильнодействующих веществ',
    text: 'без рецепта и подтверждающих документов могут быть изъяты на границе.',
  },
  {
    label: 'Растительная продукция без фитосанитарных документов',
    text: 'семена, отдельные фрукты и овощи — при отсутствии сертификата их лучше не брать с собой.',
  },
]

const faq = [
  {
    q: 'Можно ли поменять погранпереход после оформления заказа?',
    a: 'Да, если на выбранном переходе образовалась очередь, водитель предложит альтернативный маршрут и согласует это с пассажиром.',
  },
  {
    q: 'У меня нет паспорта ЕС и я планирую поездку туда-обратно через Польшу — это возможно?',
    a: 'Только в одну сторону. Въехать в Россию через Гжехотки без паспорта ЕС можно, а вот выехать из России в Польшу через этот же переход нельзя — для выезда потребуется литовский переход Чернышевское — Кибартай. Этот нюанс стоит уточнить у менеджера при планировании обратной поездки.',
  },
  {
    q: 'Нужно ли декларировать деньги на границе?',
    a: 'Да, если сумма превышает эквивалент 10 000 евро при выезде в ЕС или 10 000 долларов США при въезде в Россию.',
  },
]

const articleText = [
  article.description,
  ...prohibited.map((p) => `${p.label}: ${p.text}`),
  ...faq.map((item) => `${item.q} ${item.a}`),
].join(' ')

export default function BorderCrossingArticle() {
  return (
    <>
      <Nav />
      <FaqSchema faq={faq} />
      <ArticleSchema
        url={`https://ambertransfer.ru/articles/${article.slug}`}
        headline={article.title}
        text={articleText}
      />

      <main className={routeStyles.main}>
        <section className={routeStyles.hero}>
          <div className={routeStyles.container}>
            <p className={routeStyles.eyebrow}>Статья</p>
            <h1 className={routeStyles.title}>
              Пересечение границы Калининград <span className={routeStyles.arrow}>⇄</span> Европа
            </h1>
            <p className={routeStyles.lead}>
              Какой пункт пропуска выбрать в зависимости от паспорта, сколько
              времени занимает пересечение границы и что нельзя провозить с
              собой — разбираем на примере маршрутов через Польшу и Литву.
            </p>

            <div className={routeStyles.facts}>
              <div className={routeStyles.fact}>
                <strong>2</strong>
                <span>направления границы</span>
              </div>
              <div className={routeStyles.factDivider} />
              <div className={routeStyles.fact}>
                <strong>1–2 ч</strong>
                <span>среднее время на границе</span>
              </div>
              <div className={routeStyles.factDivider} />
              <div className={routeStyles.fact}>
                <strong>10 000 €</strong>
                <span>порог декларирования наличных</span>
              </div>
            </div>

            <a href="/#booking" className={routeStyles.ctaBtn}>Забронировать трансфер</a>
          </div>
        </section>

        <section className={routeStyles.section}>
          <div className={routeStyles.container}>
            <h2 className={routeStyles.sectionTitle}>Какой пункт пропуска выбрать в зависимости от паспорта</h2>

            <div className={styles.prose}>
              <p>
                Маршрут через границу зависит не от направления поездки, а от
                того, какой у пассажира паспорт.
              </p>
              <p>
                <strong>Есть паспорт ЕС.</strong> Можно ехать через польскую
                границу в обе стороны — чаще всего это Мамоново&nbsp;II —
                Гжехотки, реже Багратионовск — Безледы. Оба перехода работают
                и на въезд, и на выезд.
              </p>
              <p>
                <strong>Нет паспорта ЕС.</strong> Здесь маршрут асимметричный.
                Въезд в Россию (Польша → Калининград) возможен через Гжехотки
                без ограничений. А вот выезд из России в сторону Европы через
                Гжехотки невозможен — потребуется литовский переход
                Чернышевское — Кибартай.
              </p>
              <p>
                На практике это значит: если у пассажира без паспорта ЕС
                поездка туда и обратно, дорога физически пройдёт через разные
                погранпереходы — Гжехотки на въезд в Россию и Чернышевское на
                выезд. Наши водители учитывают это при планировании маршрута
                и заранее предупреждают об этом при оформлении заказа.
              </p>
            </div>
          </div>
        </section>

        <section className={routeStyles.section}>
          <div className={routeStyles.container}>
            <h2 className={routeStyles.sectionTitle}>Сколько времени занимает пересечение границы</h2>

            <div className={styles.prose}>
              <p>
                В среднем прохождение границы занимает от часа до двух — с
                учётом паспортного и таможенного контроля с обеих сторон. В
                периоды высокого туристического потока на переходах возможны
                очереди, из-за которых время ожидания увеличивается.
              </p>
              <p>
                Наши водители постоянно отслеживают обстановку на всех
                погранпереходах и, если на одном из них скопилась большая
                очередь, могут поехать через другой — но только по
                согласованию с пассажиром. Если на момент оформления заказа
                на каком-то из переходов уже есть задержки, менеджер
                предупредит об этом заранее, при бронировании.
              </p>
              <p>
                Если поездка привязана к рейсу, мы закладываем время на
                границу в расчёт маршрута заранее — с запасом на случай
                очереди, — чтобы задержка на таможне не стоила вам
                опоздания на самолёт.
              </p>
            </div>
          </div>
        </section>

        <section className={routeStyles.section}>
          <div className={routeStyles.container}>
            <h2 className={routeStyles.sectionTitle}>Что нельзя провозить через границу</h2>
            <p className={routeStyles.sectionDesc}>
              Список запрещённых и ограниченных к провозу товаров отличается
              в деталях для польской и литовской границы, но в целом
              сводится к следующим категориям.
            </p>

            <div className={styles.categoryList}>
              {prohibited.map((item) => (
                <div key={item.label} className={styles.categoryItem}>
                  <span className={styles.categoryIcon} aria-hidden="true">◆</span>
                  <p className={styles.categoryText}>
                    <strong>{item.label}</strong> — {item.text}
                  </p>
                </div>
              ))}
            </div>

            <p className={routeStyles.sectionDesc} style={{ marginTop: 32, marginBottom: 0 }}>
              Список ограничений периодически меняется, поэтому при
              возникновении сомнений по конкретному товару лучше уточнить у
              менеджера при оформлении заказа.
            </p>
          </div>
        </section>

        <section className={routeStyles.section}>
          <div className={routeStyles.container}>
            <h2 className={routeStyles.sectionTitle}>Как трансфер упрощает пересечение границы</h2>

            <div className={styles.prose}>
              <p>
                Водитель, который регулярно ездит по этому маршруту, заранее
                знает обстановку на каждом переходе, помогает правильно
                сориентироваться с документами и подскажет, что можно и
                нельзя провозить — особенно важно, если вы впервые
                пересекаете эту границу.
              </p>
            </div>
          </div>
        </section>

        <section className={routeStyles.section}>
          <div className={routeStyles.container}>
            <h2 className={routeStyles.sectionTitle}>Вопросы и ответы</h2>

            <div className={routeStyles.faqList}>
              {faq.map((item) => (
                <div key={item.q} className={routeStyles.faqItem}>
                  <h3 className={routeStyles.faqQ}>{item.q}</h3>
                  <p className={routeStyles.faqA}>{item.a}</p>
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
