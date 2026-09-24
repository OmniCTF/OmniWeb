import siteMetadata from '@/data/siteMetadata'
import { EVENT } from '@/data/event'
import { EDITIONS } from '@/data/results'

const ORG_ID = `${siteMetadata.siteUrl}/#organization`
const SITE_ID = `${siteMetadata.siteUrl}/#website`

const sameAs = [
  siteMetadata.x,
  siteMetadata.github,
  siteMetadata.linkedin,
  siteMetadata.instagram,
  siteMetadata.youtube,
  siteMetadata.facebook,
  siteMetadata.ctftime,
].filter((url): url is string => Boolean(url) && url !== '#')

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: siteMetadata.title,
        legalName: 'ASOCIAȚIA OMNICYBR',
        url: siteMetadata.siteUrl,
        logo: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
        description: siteMetadata.description,
        email: siteMetadata.email_support,
        sameAs,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Constanța',
          addressCountry: 'RO',
        },
      },
      {
        '@type': 'WebSite',
        '@id': SITE_ID,
        url: siteMetadata.siteUrl,
        name: siteMetadata.title,
        description: siteMetadata.description,
        publisher: { '@id': ORG_ID },
        inLanguage: 'en',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function EventJsonLd() {
  const winners = EDITIONS.find((e) => e.status === 'final')?.results ?? []

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: EVENT.name,
    description:
      'The on-site final of OmniCTF 2026: a jeopardy and king-of-the-hill cybersecurity competition for the teams that qualified through the online round.',
    startDate: EVENT.countdownTargetIso,
    endDate: EVENT.endIso,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: `${siteMetadata.siteUrl}/results`,
    image: [`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`],
    organizer: { '@id': ORG_ID },
    location: {
      '@type': 'Place',
      name: EVENT.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Constanța',
        addressCountry: 'RO',
      },
    },
    ...(winners.length ? { award: `Won by ${winners[0].team}` } : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ResultsJsonLd() {
  const edition = EDITIONS.find((e) => e.status === 'final')
  if (!edition?.results.length) return null

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${edition.label} final standings`,
    url: `${siteMetadata.siteUrl}/results`,
    numberOfItems: edition.results.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: edition.results.map((r) => ({
      '@type': 'ListItem',
      position: r.place,
      name: r.team,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
