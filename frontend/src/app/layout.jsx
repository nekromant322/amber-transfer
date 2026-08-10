import { Cormorant_Garamond, Raleway } from 'next/font/google'
import './globals.css'
import OrganizationSchema from '../components/OrganizationSchema'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-raleway',
  display: 'swap',
})

export const metadata = {
  icons: { icon: '/favicon.svg' },
  title: 'Амбер Трансфер — Калининград · Европа',
  description: 'Амбер Трансфер — персональные трансферы из Калининграда в Европу. Комфортные поездки в Гданьск, Варшаву, Вильнюс, Ригу и другие города.',
  verification: {
    other: { 'yandex-verification': '81a1a020d93aeb05' },
  },
  other: {
    'geo.region': 'RU-KGD',
    'geo.placename': 'Kaliningrad',
    'geo.position': '54.7104;20.4522',
    ICBM: '54.7104, 20.4522',
  },
  openGraph: {
    title: 'Амбер Трансфер — Калининград · Европа',
    description: 'Персональные трансферы бизнес-класса из Калининграда в Европу.',
    locale: 'ru_RU',
    type: 'website',
    images: [{ url: 'https://ambertransfer.ru/cars/kia-sportage/1.png', width: 720, height: 960, alt: 'Амбер Трансфер — Kia Sportage' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Амбер Трансфер — Калининград · Европа',
    description: 'Персональные трансферы бизнес-класса из Калининграда в Европу.',
    images: ['https://ambertransfer.ru/cars/kia-sportage/1.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${cormorantGaramond.variable} ${raleway.variable}`}>
      <body>
        <OrganizationSchema />
        {children}
      </body>
    </html>
  )
}
