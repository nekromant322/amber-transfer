export const dynamic = 'force-static'

const baseUrl = 'https://ambertransfer.ru'

const routes = [
  '',
  'transfer-kaliningrad-varshava',
  'transfer-kaliningrad-gdansk',
  'transfer-kaliningrad-kaunas',
  'transfer-kaliningrad-vilnius',
  'transfer-kaliningrad-vroclav',
  'transfer-kaliningrad-druskininkai',
  'transfer-kaliningrad-gamburg',
  'transfer-kaliningrad-poznan',
  'transfer-kaliningrad-krakow',
  'transfer-kaliningrad-klaipeda',
  'transfer-kaliningrad-palanga',
  'transfer-kaliningrad-litva',
  'transfer-kaliningrad-latvia',
  'transfer-kaliningrad-poland',
  'transfer-kaliningrad-yantarny',
  'transfer-kaliningrad-zelenogradsk',
  'transfer-kaliningrad-pionersky',
  'transfer-kaliningrad-svetlogorsk',
  'transfer-khrabrovo-baltiysk',
  'transfer-iz-aeroporta-khrabrovo',
]

const staticPages = ['contacts', 'politika-konfidencialnosti']

export default function sitemap() {
  const routeEntries = routes.map((route) => ({
    url: route ? `${baseUrl}/${route}` : baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))

  const staticEntries = staticPages.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  }))

  return [...routeEntries, ...staticEntries]
}
