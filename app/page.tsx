import { allBlogs, allAuthors } from 'contentlayer/generated'
import { sortPosts, coreContent } from 'pliny/utils/contentlayer'
import Main from './Main'
import { genPageMetadata } from 'app/seo'
import { EventJsonLd } from '@/components/StructuredData'

export const metadata = genPageMetadata({
  title: 'OmniCTF',
  description:
    'OmniCTF is a Romanian cybersecurity capture-the-flag competition. Online qualifiers send twelve teams to an on-site final in Constanta: jeopardy and king-of-the-hill across web, pwn, reversing, crypto, forensics, OSINT and blockchain.',
})

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)

  const enrichedPosts = sortedPosts.map((post) => {
    const authorsData = post.authors?.map((slug) => {
      const author = allAuthors.find((a) => a.slug === slug)
      return {
        slug: author?.slug || 'default',
        name: author?.name || 'Unknown',
        avatar: author?.avatar || '',
      }
    })

    return {
      ...coreContent(post),
      authorsData,
    }
  })

  return (
    <>
      <EventJsonLd />
      <Main posts={enrichedPosts} />
    </>
  )
}
