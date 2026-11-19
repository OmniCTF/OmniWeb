import { z } from 'zod'

import qino from '../'

export const aboutItem = qino.defineItem({
  file: 'about/index.mdx',
  schema: z.object({
    title: z.string(),
  }),
})
