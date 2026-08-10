export default function ArticleSchema({ url, headline, text }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#content`,
    headline,
    text,
    author: [{ '@type': 'Organization', name: 'Амбер Трансфер' }],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  )
}
