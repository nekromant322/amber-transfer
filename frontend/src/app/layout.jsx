import './globals.css'
import OrganizationSchema from '../components/OrganizationSchema'

export const metadata = {
  icons: { icon: '/favicon.svg' },
  title: 'Амбер Трансфер — Калининград · Европа',
  description: 'Амбер Трансфер — персональные трансферы из Калининграда в Европу. Комфортные поездки в Гданьск, Варшаву, Вильнюс, Ригу и другие города.',
  keywords: 'трансфер Калининград Европа, такси Калининград Гданьск, трансфер Калининград Варшава, пассажирские перевозки Калининград',
  verification: {
    other: { 'yandex-verification': '81a1a020d93aeb05' },
  },
  openGraph: {
    title: 'Амбер Трансфер — Калининград · Европа',
    description: 'Персональные трансферы бизнес-класса из Калининграда в Европу.',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Raleway:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <OrganizationSchema />
        {children}
      </body>
    </html>
  )
}
