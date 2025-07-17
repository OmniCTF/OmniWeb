import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' with { type: 'json' }
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'

// FIX: Absolute path to root-level /public folder
const outputFolder = path.join(process.cwd(), '../public')

const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/blog/${post.slug}</link>
    ${post.summary ? `<description>${escape(post.summary)}</description>` : ''}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags?.map((t) => `<category>${escape(t)}</category>`).join('') || ''}
  </item>
`

const generateRss = (config, posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/blog</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
`

async function generateRSS(config, allBlogs, page = 'feed.xml') {
  console.log('📝 [RSS] Total blog posts found:', allBlogs.length)

  const publishPosts = allBlogs.filter((post) => post.draft !== true)
  if (publishPosts.length === 0) {
    console.warn('⚠️ [RSS] No published posts found.')
    return
  }

  const sortedPosts = sortPosts(publishPosts)

  // Write main RSS
  const mainFeedPath = path.join(outputFolder, page)
  mkdirSync(path.dirname(mainFeedPath), { recursive: true })
  writeFileSync(mainFeedPath, generateRss(config, sortedPosts))
  console.log('✅ [RSS] Main feed saved:', mainFeedPath)

  // Write per-tag RSS
  for (const tag of Object.keys(tagData)) {
    const filtered = sortedPosts.filter((post) =>
      post.tags?.map((t) => slug(t)).includes(tag)
    )

    if (filtered.length === 0) continue

    const tagDir = path.join(outputFolder, 'tags', tag)
    mkdirSync(tagDir, { recursive: true })

    const tagFeedPath = path.join(tagDir, page)
    writeFileSync(tagFeedPath, generateRss(config, filtered, `tags/${tag}/${page}`))
    console.log(`✅ [RSS] Tag '${tag}' written to: ${tagFeedPath}`)
  }
}

const rss = () => {
  generateRSS(siteMetadata, allBlogs)
    .then(() => console.log('🎉 [RSS] Generation complete.'))
    .catch((err) => console.error('❌ [RSS] Error:', err))
}

rss()
