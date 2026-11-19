import type { Infer } from '@qino/cms'
import { extractTocHeadings } from 'pliny/mdx-plugins/index.js'
import readingTime from 'reading-time'
import { z } from 'zod'

import qino from '../'

// Contentlayer's `date` type emitted ISO datetimes; keep that output.
const isoDate = z.iso.date().transform((date) => new Date(date).toISOString())

const BlogSchema = z.object({
  title: z.string(),
  date: isoDate,
  tags: z.array(z.string()).default([]),
  lastmod: isoDate.optional(),
  draft: z.boolean().optional(),
  summary: z.string().optional(),
  images: z.union([z.string(), z.array(z.string())]).optional(),
  authors: z.array(z.string()).optional(),
  layout: z.enum(['PostSimple', 'PostLayout', 'PostBanner']).optional(),
  bibliography: z.string().optional(),
  canonicalUrl: z.string().optional(),
})

export const blogCollection = qino.defineCollection({
  directory: 'blog',
  extension: '.mdx',
  schema: BlogSchema,
  views: (view) => ({
    default: view({
      augment: async (post) => ({
        slug: post._meta.slug,
        path: `blog/${post._meta.slug}`,
        filePath: `blog/${post._meta.fileName}`,
        readingTime: readingTime(post.markdown),
        toc: await extractTocHeadings(post.markdown),
      }),
      // Newest first, which is the order the app always saw from Contentlayer.
      sort: (a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0),
    }),
  }),
})

export type Blog = Infer<typeof blogCollection>['output']
