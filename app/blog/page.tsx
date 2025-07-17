import { allCoreContent, sortPosts, coreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
  const posts = allCoreContent(sortPosts(allBlogs))

  // Enrich posts with author data
  const enrichedPosts = posts.map((post) => {
    const authorsData = post.authors?.map((slug) => {
      const author = allAuthors.find((a) => a.slug === slug)
      return {
        slug: author?.slug,
        name: author?.name,
        avatar: author?.avatar,
      }
    })
    return { ...post, authorsData }
  })

  const pageNumber = 1
  const totalPages = Math.ceil(enrichedPosts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = enrichedPosts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={enrichedPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
