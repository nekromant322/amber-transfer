'use client'

import { useState } from 'react'
import styles from './FAQ.module.css'

const items = [
  {
    q: 'Как забронировать трансфер?',
    a: 'Выберите маршрут и дату в форме на сайте, после чего с вами свяжется менеджер для подтверждения деталей поездки и выбора класса автомобиля.',
  },
  {
    q: 'Какие способы оплаты доступны?',
    a: 'Оплата возможна наличными или переводом. После оплаты можно получить чек. Оплата в большинстве случаев производится после поездки.',
  },
  {
    q: 'Как связаться с водителем?',
    a: 'После подтверждения бронирования вы получите имя и контактный номер водителя.',
  },
  {
    q: 'Нужно ли детское кресло?',
    a: 'Да, при наличии детей до 12 лет необходимо заранее сообщить об этом менеджеру — мы предоставим кресло бесплатно.',
  },
  {
    q: 'За сколько нужно бронировать?',
    a: 'Рекомендуем бронировать как минимум за 24 часа, но принимаем заявки и в день поездки при наличии свободных водителей.',
  },
  {
    q: 'Что если нужно изменить или отменить поездку?',
    a: 'Изменения и отмена возможны не позднее чем за 48 часов до поездки.',
  },
  {
    q: 'Какой багаж можно взять?',
    a: 'Каждый пассажир может взять один большой и один ручной чемодан. Для дополнительного багажа уточняйте условия у менеджера.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.left}>
            <p className={styles.eyebrow}>FAQ</p>
            <h2 className={styles.title}>Вопросы<br /><em>и ответы</em></h2>
            <p className={styles.hint}>
              Не нашли ответа? Напишите нам.
            </p>
            <a href="https://t.me/amber_transfer" target="_blank" rel="noopener noreferrer" className={styles.contactBtn}>Задать вопрос</a>
          </div>

          <div className={styles.right}>
            {items.map((item, i) => (
              <div
                key={i}
                className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}
              >
                <button
                  className={styles.question}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className={styles.qText}>{item.q}</span>
                  <span className={styles.icon} aria-hidden="true">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                    >
                      <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                <div
                  className={styles.answer}
                  style={{ maxHeight: open === i ? '200px' : '0' }}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
