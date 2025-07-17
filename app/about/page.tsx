import { allAbouts } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function AboutPage() {
  const about = allAbouts[0] // there's only one, index.mdx
  const content = coreContent(about)

  return (
    <div className="max-w-3xl mx-auto py-12 prose dark:prose-invert">
      <MDXLayoutRenderer code={about.body.code} />
    </div>
  )
}
