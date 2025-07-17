import { allBlogs, allAuthors } from 'contentlayer/generated'
import { sortPosts, coreContent } from 'pliny/utils/contentlayer'
import Main from './Main'

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

  return <Main posts={enrichedPosts} />
}
