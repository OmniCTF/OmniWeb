import { MetadataRoute } from 'next'
import { blogCollection } from '@/qino/collections/blog'
import { authorCollection } from '@/qino/collections/authors'
import { getTagCounts } from '@/lib/get-tag-counts'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allBlogs, memberSlugs, tagData] = await Promise.all([
    blogCollection.getEntries(),
    authorCollection.getAllSlugs(),
    getTagCounts(),
  ])
  const siteUrl = siteMetadata.siteUrl
  const today = new Date().toISOString().split('T')[0]

  const posts = allBlogs.filter((post) => !post.draft)

  const blogRoutes = posts.map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.lastmod || post.date,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  const tagRoutes = Object.keys(tagData).map((tag) => ({
    url: `${siteUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }))

  const memberRoutes = memberSlugs.map((slug) => ({
    url: `${siteUrl}/members/${slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }))

  const staticRoutes = [
    { route: '', priority: 1, changeFrequency: 'weekly' as const },
    { route: 'results', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: 'about', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: 'blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { route: 'members', priority: 0.6, changeFrequency: 'monthly' as const },
    { route: 'special-thanks', priority: 0.5, changeFrequency: 'monthly' as const },
    { route: 'tags', priority: 0.4, changeFrequency: 'monthly' as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: route ? `${siteUrl}/${route}` : siteUrl,
    lastModified: today,
    changeFrequency,
    priority,
  }))

  return [...staticRoutes, ...blogRoutes, ...tagRoutes, ...memberRoutes]
}
