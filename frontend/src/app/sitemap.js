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

export default function sitemap() {
  return routes.map((route) => ({
    url: route ? `${baseUrl}/${route}` : baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
