import { slug } from 'github-slugger'
import siteMetadata from '@/data/siteMetadata'
import { getTagCounts } from '@/lib/get-tag-counts'
import { generateRss, rssResponse } from '@/lib/rss'
import { blogCollection } from '@/qino/collections/blog'

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  const tagCounts = await getTagCounts()
  return Object.keys(tagCounts).map((tag) => ({ tag }))
}

export async function GET(_request: Request, props: { params: Promise<{ tag: string }> }) {
  const { tag } = await props.params
  const posts = await blogCollection.getEntries()
  const filteredPosts = posts.filter((post) => post.tags.map((t) => slug(t)).includes(tag))
  return rssResponse(generateRss(siteMetadata, filteredPosts, `tags/${tag}/feed.xml`))
}
