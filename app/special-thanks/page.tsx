import { allSpecialThanks } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Special Thanks' })

export default function SpecialThanksPage() {
  const entry = allSpecialThanks[0] // singleton: data/special-thanks/index.mdx
  return (
    <div className="max-w-3xl mx-auto py-12 prose dark:prose-invert">
      <MDXLayoutRenderer code={entry.body.code} />
    </div>
  )
}
