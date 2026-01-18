import { allAbouts } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function AboutPage() {
  const about = allAbouts[0] // there's only one, index.mdx
  return (
    <div className="mx-auto max-w-3xl py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          About
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          What OmniCTF is, why we run it, and what to expect.
        </p>
        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />
      </div>

      <div className="prose max-w-none dark:prose-invert">
        <MDXLayoutRenderer code={about.body.code} />
      </div>
    </div>
  )
}
