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
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 54.7104,
    longitude: 20.4522,
  },
  areaServed: [
    { '@type': 'City', name: 'Калининград' },
    { '@type': 'City', name: 'Варшава' },
    { '@type': 'City', name: 'Гданьск' },
    { '@type': 'City', name: 'Вроцлав' },
    { '@type': 'City', name: 'Познань' },
    { '@type': 'City', name: 'Краков' },
    { '@type': 'City', name: 'Вильнюс' },
    { '@type': 'City', name: 'Каунас' },
    { '@type': 'City', name: 'Клайпеда' },
    { '@type': 'City', name: 'Паланга' },
    { '@type': 'City', name: 'Друскининкай' },
    { '@type': 'City', name: 'Рига' },
    { '@type': 'City', name: 'Гамбург' },
    { '@type': 'City', name: 'Зеленоградск' },
    { '@type': 'City', name: 'Светлогорск' },
    { '@type': 'City', name: 'Пионерский' },
    { '@type': 'City', name: 'Янтарный' },
    { '@type': 'City', name: 'Балтийск' },
    { '@type': 'Country', name: 'Польша' },
    { '@type': 'Country', name: 'Литва' },
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
