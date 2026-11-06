import { z } from 'zod'

import qino from '../'

export const specialThanksItem = qino.defineItem({
  file: 'special-thanks/index.mdx',
  schema: z.object({
    title: z.string().optional(),
  }),
})
