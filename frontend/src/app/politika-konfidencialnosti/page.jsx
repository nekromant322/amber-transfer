import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import routeStyles from '../../styles/TransferRoutePage.module.css'
import styles from '../../styles/PrivacyPolicy.module.css'

export const metadata = {
  title: 'Политика обработки персональных данных | Амбер Трансфер',
  description:
    'Политика в отношении обработки персональных данных ИП Марандюк А.В. — оператора сайта ambertransfer.ru: какие данные собираются, с какой целью и как защищаются.',
  alternates: { canonical: '/politika-konfidencialnosti' },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />

      <main className={routeStyles.main}>
        <section className={routeStyles.hero}>
          <div className={routeStyles.container}>
            <p className={routeStyles.eyebrow}>Правовая информация</p>
            <h1 className={routeStyles.title}>
              Политика обработки <span className={routeStyles.arrow}>—</span> персональных данных
            </h1>
            <p className={routeStyles.lead}>
              Настоящая политика определяет порядок обработки персональных данных и меры
              по обеспечению их безопасности при использовании сайта ambertransfer.ru,
              в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».
            </p>
          </div>
        </section>

        <section className={routeStyles.section}>
          <div className={routeStyles.container}>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>1. Оператор персональных данных</h2>
              <div className={styles.requisites}>
                <p><strong>ИП Марандюк Анатолий Викторович</strong></p>
                <p>ИНН: 773583566764</p>
                <p>ОГРНИП: 321673300028243 от 9 августа 2021 г.</p>
                <p>E-mail: <a href="mailto:anatolii.marandyuk@gmail.com">anatolii.marandyuk@gmail.com</a></p>
              </div>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>2. Какие данные собираются</h2>
              <p className={styles.text}>
                При оформлении заявки на сайте оператор собирает следующие персональные данные:
              </p>
              <ul className={styles.list}>
                <li>номер телефона;</li>
                <li>город отправления и назначения, дата поездки;</li>
                <li>тип паспорта (для расчёта маршрута через границу);</li>
                <li>иные данные, которые пользователь добровольно указывает при общении с менеджером.</li>
              </ul>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>3. Цели обработки</h2>
              <p className={styles.text}>
                Персональные данные обрабатываются исключительно для оформления и исполнения
                заказа трансфера: расчёта стоимости поездки, связи с пользователем для подтверждения
                деталей заявки, передачи данных заказа водителю, выполняющему поездку.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>4. Правовые основания обработки</h2>
              <p className={styles.text}>
                Обработка осуществляется с согласия пользователя, предоставленного при отправке
                формы заявки на сайте, а также в целях исполнения договора оказания услуг
                перевозки, стороной которого является пользователь.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>5. Условия обработки и передачи данных</h2>
              <p className={styles.text}>
                Персональные данные не передаются третьим лицам, за исключением водителя,
                назначенного на исполнение конкретного заказа, — ему передаются только данные,
                необходимые для выполнения поездки (телефон, маршрут, дата). Оператор не продаёт
                и не передаёт персональные данные в рекламных целях.
              </p>
              <p className={styles.text}>
                Обработка данных осуществляется с использованием средств автоматизации
                (серверы оператора и его подрядчиков, обеспечивающих работу сайта) и без
                таковых, любыми законными способами, включая хранение, уточнение, использование
                и уничтожение.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>6. Срок хранения данных</h2>
              <p className={styles.text}>
                Персональные данные хранятся не дольше срока, необходимого для исполнения заказа
                и целей, указанных в п. 3, либо до отзыва согласия пользователем, если это не
                противоречит требованиям законодательства.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>7. Права пользователя</h2>
              <p className={styles.text}>
                Пользователь вправе в любой момент отозвать согласие на обработку персональных
                данных, а также запросить их уточнение, блокирование или уничтожение, направив
                соответствующее обращение на e-mail оператора, указанный в разделе 1.
              </p>
            </div>

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>8. Согласие на обработку данных</h2>
              <p className={styles.text}>
                Заполняя и отправляя форму заявки на сайте, пользователь подтверждает, что
                ознакомлен с настоящей политикой, и даёт согласие на обработку указанных им
                персональных данных на условиях, изложенных выше.
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
