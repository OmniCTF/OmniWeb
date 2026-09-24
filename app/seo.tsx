import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  keywords?: string[]
  [key: string]: any
}

export function genPageMetadata({
  title,
  description,
  image,
  keywords,
  ...rest
}: PageSEOProps): Metadata {
  const resolved = description || siteMetadata.description
  const isRoot = title === siteMetadata.title
  const socialTitle = isRoot ? title : `${title} | ${siteMetadata.title}`
  const social = image || siteMetadata.socialBanner
  const images = [
    {
      url: social,
      width: 1200,
      height: 630,
      alt: socialTitle,
    },
  ]

  return {
    title: isRoot ? { absolute: title } : title,
    description: resolved,
    keywords: keywords ?? siteMetadata.keywords,
    alternates: {
      canonical: './',
    },
    openGraph: {
      title: socialTitle,
      description: resolved,
      url: './',
      siteName: siteMetadata.title,
      images,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: socialTitle,
      description: resolved,
      card: 'summary_large_image',
      site: siteMetadata.xHandle,
      creator: siteMetadata.xHandle,
      images,
    },
    ...rest,
  }
}
