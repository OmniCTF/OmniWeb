import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

function memberSlugs(): string[] {
  const dir = path.join(process.cwd(), 'data', 'authors')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const today = new Date().toISOString().split('T')[0]

  const posts = allBlogs.filter((post) => !post.draft)

  const blogRoutes = posts.map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.lastmod || post.date,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  const tagRoutes = Object.keys(tagData as Record<string, number>).map((tag) => ({
    url: `${siteUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }))

  const memberRoutes = memberSlugs().map((slug) => ({
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
