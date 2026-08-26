import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'

/**
 * Direction contract. Audited at finish; do not edit without redoing the review.
 */
const DIRECTION_CONTRACT = `<!--
OMNICTF / DIRECTION CONTRACT
THESIS: the site is a session the visitor is already logged into, not a page they
  arrived at. Refuses the centered marketing column: badge, headline, subhead, buttons.
OWN-WORLD: near-black blue ground, panes at 1px frames with 6px WM rounding, exactly one
  violet focus frame per view, ANSI colors only as data. Cascadia Code 200-700 throughout,
  self-hosted. Waybar strip on top, status line at the bottom, gap-tiled panes edge to edge.
STORY: a competitor lands mid-session, reads the finals date, time and venue in the focused
  pane within a second, sees the countdown running, leaves through Discord, Register or Login.
FIRST VIEWPORT: full-bleed. Waybar across the top. Below it a tile field: the event pane at
  two-thirds width carrying the wordmark at display scale, date, time, venue and the three
  actions; the right column stacks countdown over an event spec readout.
FORM: tiling window manager session. Pinned by the brief, no roll; seed brief-pinned.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review,
  the verdict, and DESIGN.md
-->`

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html lang={siteMetadata.language} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href={`${basePath}/static/fonts/cascadia-code-latin-normal.woff2`}
          crossOrigin="anonymous"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href={`${basePath}/static/favicons/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${basePath}/static/favicons/favicon-32x32.png?v=2`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${basePath}/static/favicons/favicon-16x16.png?v=2`}
        />
        <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
        <link
          rel="mask-icon"
          href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
          color="#bb9af7"
        />
        <meta name="msapplication-TileColor" content="#15161e" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#efe9e2" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#15161e" />
        <meta name="google-adsense-account" content="ca-pub-4621933339524198" />
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4621933339524198"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-bg text-fg min-h-screen overflow-x-hidden antialiased">
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="mb-auto w-full">{children}</main>
              <Footer />
            </div>
            <SpeedInsights />
            <VercelAnalytics />
          </SearchProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
