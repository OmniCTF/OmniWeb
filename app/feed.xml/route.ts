import siteMetadata from '@/data/siteMetadata'
import { sortPosts } from '@/lib/content'
import { generateRss, rssResponse } from '@/lib/rss'
import { blogCollection } from '@/qino/collections/blog'

export const dynamic = 'force-static'

export async function GET() {
  const posts = await blogCollection.getEntries()
  const publishPosts = posts.filter((post) => post.draft !== true)
  return rssResponse(generateRss(siteMetadata, sortPosts(publishPosts)))
}
