import { slug } from 'github-slugger'
import { blogCollection } from '@/qino/collections/blog'

const isProduction = process.env.NODE_ENV === 'production'

// Replaces app/tag-data.json, which Contentlayer's onSuccess hook used to write.
export async function getTagCounts() {
  const posts = await blogCollection.getEntries()
  const tagCount: Record<string, number> = {}
  // File-name order, like Contentlayer, so tags with equal counts keep their order.
  const byFileName = [...posts].sort((a, b) => a._meta.fileName.localeCompare(b._meta.fileName))
  byFileName.forEach((post) => {
    if (isProduction && post.draft === true) return
    post.tags.forEach((tag) => {
      const formattedTag = slug(tag)
      tagCount[formattedTag] = (tagCount[formattedTag] ?? 0) + 1
    })
  })
  return tagCount
}
