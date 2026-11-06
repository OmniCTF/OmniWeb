import type { Infer } from '@qino/cms'
import { z } from 'zod'

import qino from '../'

const AuthorSchema = z.object({
  id: z.number(),
  is_admin: z.boolean().optional(),
  name: z.string(),
  displayName: z.string(),
  country: z.string(),
  joined: z.string(),
  position: z.string(),
  avatar: z.string().nullable(),
  bio: z.string().nullable(),
  tags: z.array(z.string()),
  links: z.object({
    website: z.string().optional(),
    github: z.string().optional(),
  }),
  nowListening: z
    .object({
      title: z.string(),
      artist: z.string(),
      url: z.string(),
    })
    .optional(),
})

export const authorCollection = qino.defineCollection({
  directory: 'authors',
  extension: '.mdx',
  schema: AuthorSchema,
  views: (view) => ({
    default: view({
      augment: (author) => ({ slug: author._meta.slug }),
    }),
  }),
})

export type Author = Infer<typeof authorCollection>['output']
