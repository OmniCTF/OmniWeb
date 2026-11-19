import { allCoreContent, sortPosts } from '@/lib/content'
import { blogCollection } from '@/qino/collections/blog'

export const dynamic = 'force-static'

// Was written to public/search.json by Contentlayer's onSuccess hook. Read by kbar search.
export async function GET() {
  const posts = await blogCollection.getEntries()
  return Response.json(allCoreContent(sortPosts(posts)))
}
