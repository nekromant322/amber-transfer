const schema = {
  '@context': 'https://schema.org',
  '@type': 'TaxiService',
  name: 'Амбер Трансфер',
  url: 'https://ambertransfer.ru',
  image: 'https://ambertransfer.ru/favicon.svg',
  telephone: '+7-950-008-44-57',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Калининград',
    addressCountry: 'RU',
  },
  areaServed: [
    'Калининград', 'Варшава', 'Гданьск', 'Вроцлав', 'Познань', 'Краков',
    'Вильнюс', 'Каунас', 'Клайпеда', 'Паланга', 'Друскининкай', 'Рига',
    'Гамбург', 'Зеленоградск', 'Светлогорск', 'Пионерский', 'Янтарный', 'Балтийск',
  ],
  sameAs: ['https://t.me/amber_transfer'],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
}

export default function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  )
}
