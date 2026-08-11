'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Cars.module.css'

const categories = [
  {
    id: 'sedan',
    badge: '4 места',
    title: 'Легковой автомобиль',
    photo: '/cars/sedan-category.png',
    cars: [
      {
        id: 1,
        name: 'Kia Sportage',
        photos: ['/cars/kia-sportage/1.png', '/cars/kia-sportage/2.png', '/cars/kia-sportage/3.png'],
      },
      {
        id: 2,
        name: 'Mercedes-Benz E-Class',
        photos: ['/cars/mercedes-e-class/1.png', '/cars/mercedes-e-class/2.png'],
      },
      {
        id: 3,
        name: 'Volkswagen Passat',
        photos: ['/cars/vw-passat/1.png'],
      },
    ],
  },
  {
    id: 'minivan',
    badge: '6–8 мест',
    title: 'Минивэн 6–8 мест',
    photo: '/cars/minivan-category.png',
    cars: [
      {
        id: 1,
        name: 'Kia Carnival',
        photos: ['/cars/kia-carnival/1.png', '/cars/kia-carnival/2.png'],
      },
      { id: 2, name: 'Автомобиль 2', photos: [] },
    ],
  },
]

function CarCard({ car, onOpenLightbox }) {
  const [index, setIndex] = useState(0)
  const hasPhotos = car.photos.length > 0
  const hasMultiple = car.photos.length > 1

  const prev = (e) => {
    e.stopPropagation()
    setIndex((i) => (i - 1 + car.photos.length) % car.photos.length)
  }

  const next = (e) => {
    e.stopPropagation()
    setIndex((i) => (i + 1) % car.photos.length)
  }

  return (
    <div className={styles.card}>
      <div
        className={styles.cardPhoto}
        onClick={() => hasPhotos && onOpenLightbox(car, index)}
        role={hasPhotos ? 'button' : undefined}
        tabIndex={hasPhotos ? 0 : undefined}
      >
        {hasPhotos ? (
          <Image
            key={car.photos[index]}
            src={car.photos[index]}
            alt={car.name}
            fill
            sizes="(max-width: 720px) 50vw, 33vw"
            className={styles.cardImg}
          />
        ) : (
          <span className={styles.photoIcon} aria-hidden="true">🚗</span>
        )}

        {hasMultiple && (
          <>
            <button
              className={`${styles.navArrow} ${styles.navArrowLeft}`}
              onClick={prev}
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
            <button
              className={`${styles.navArrow} ${styles.navArrowRight}`}
              onClick={next}
              aria-label="Следующее фото"
            >
              ›
            </button>
            <span className={styles.photoCount}>
              {index + 1}/{car.photos.length}
            </span>
          </>
        )}
      </div>
      <p className={styles.cardName}>{car.name}</p>
    </div>
  )
}

export default function Cars() {
  const [active, setActive] = useState(null)
  const [lightbox, setLightbox] = useState(null) // { photos, index }

  useEffect(() => {
    if (!active && !lightbox) return

    document.body.style.overflow = 'hidden'
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightbox) setLightbox(null)
        else setActive(null)
      } else if (lightbox && e.key === 'ArrowLeft') {
        setLightbox((lb) => ({
          ...lb,
          index: (lb.index - 1 + lb.photos.length) % lb.photos.length,
        }))
      } else if (lightbox && e.key === 'ArrowRight') {
        setLightbox((lb) => ({
          ...lb,
          index: (lb.index + 1) % lb.photos.length,
        }))
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [active, lightbox])

  const openLightbox = (car, index) => {
    setLightbox({ photos: car.photos, index })
  }

  const lightboxPrev = (e) => {
    e.stopPropagation()
    setLightbox((lb) => ({
      ...lb,
      index: (lb.index - 1 + lb.photos.length) % lb.photos.length,
    }))
  }

  const lightboxNext = (e) => {
    e.stopPropagation()
    setLightbox((lb) => ({
      ...lb,
      index: (lb.index + 1) % lb.photos.length,
    }))
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Автопарк</p>
          <h2 className={styles.title}>Наши автомобили</h2>
          <p className={styles.desc}>
            Комфортные и премиальные автомобили для поездок любого формата.
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={styles.categoryCard}
              onClick={() => setActive(cat)}
            >
              <div className={styles.photo}>
                <span className={styles.badge}>{cat.badge}</span>
                {cat.photo ? (
                  <Image
                    src={cat.photo}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 560px) 100vw, 360px"
                    className={styles.cardImg}
                  />
                ) : (
                  <span className={styles.photoIcon} aria-hidden="true">🚗</span>
                )}
              </div>
              <p className={styles.categoryName}>{cat.title}</p>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className={styles.overlay}
          onClick={() => setActive(null)}
          role="presentation"
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{active.title}</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setActive(null)}
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>

            <div className={styles.modalGrid}>
              {active.cars.map((car) => (
                <CarCard key={car.id} car={car} onOpenLightbox={openLightbox} />
              ))}
            </div>
          </div>
        </div>
      )}

      {lightbox && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setLightbox(null)}
          role="presentation"
        >
          <button
            className={styles.lightboxClose}
            onClick={(e) => {
              e.stopPropagation()
              setLightbox(null)
            }}
            aria-label="Закрыть"
          >
            ✕
          </button>

          <div className={styles.lightboxStage} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxImgWrap}>
              <Image
                key={lightbox.photos[lightbox.index]}
                src={lightbox.photos[lightbox.index]}
                alt=""
                fill
                sizes="90vw"
                className={styles.lightboxImg}
              />
            </div>

            {lightbox.photos.length > 1 && (
              <>
                <button
                  className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
                  onClick={lightboxPrev}
                  aria-label="Предыдущее фото"
                >
                  ‹
                </button>
                <button
                  className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
                  onClick={lightboxNext}
                  aria-label="Следующее фото"
                >
                  ›
                </button>
                <span className={styles.lightboxCount}>
                  {lightbox.index + 1}/{lightbox.photos.length}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
