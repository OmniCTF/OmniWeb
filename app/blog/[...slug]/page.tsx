import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import MDXContent from '@/components/MDXContent'
import { sortPosts, coreContent, allCoreContent } from '@/lib/content'
import type { Author, Blog } from '@/lib/content'
import { blogCollection } from '@/qino/collections/blog'
import { authorCollection } from '@/qino/collections/authors'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

const defaultLayout = 'PostLayout'

// Checks the slug against the collection before reading it, so unknown params 404.
async function findPost(slug: string) {
  const slugs = await blogCollection.getAllSlugs()
  if (!slugs.includes(slug)) return undefined
  return blogCollection.getEntry(slug)
}

function getAuthorDetails(post: Blog, allAuthors: Array<Author>) {
  const authorList = post.authors || ['default']
  return authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return {
      ...coreContent(authorResults as Author),
      slug: authorResults?.slug || author,
    }
  })
}

// Was a Contentlayer computed field.
function getStructuredData(post: Blog) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.lastmod || post.date,
    description: post.summary,
    image: post.images ? post.images[0] : siteMetadata.socialBanner,
    url: `${siteMetadata.siteUrl}/${post.path}`,
  }
}
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = await findPost(slug)
  if (!post) {
    return
  }
  const authorDetails = getAuthorDetails(post, await authorCollection.getEntries())

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img && img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  const slugs = await blogCollection.getAllSlugs()
  return slugs.map((slug) => ({ slug: slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))

  const [allBlogs, allAuthors] = await Promise.all([
    blogCollection.getEntries(),
    authorCollection.getEntries(),
  ])
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allBlogs.find((p) => p.slug === slug) as Blog
  const authorDetails = getAuthorDetails(post, allAuthors)

  const mainContent = coreContent(post)
  const jsonLd = {
    ...getStructuredData(post),
    author: authorDetails.map((author) => {
      return {
        '@type': 'Person',
        name: author.name,
      }
    }),
  }

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXContent source={post.markdown} components={components} />
      </Layout>
    </>
  )
}
