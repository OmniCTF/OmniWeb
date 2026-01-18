import { allSpecialThanks } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Special Thanks' })

export default function SpecialThanksPage() {
  const entry = allSpecialThanks[0] // singleton: data/special-thanks/index.mdx
  return (
    <div className="mx-auto max-w-3xl py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Special thanks
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Sponsors, partners, and people who made OmniCTF possible.
        </p>
        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />
      </div>

      <div className="prose max-w-none dark:prose-invert">
        <MDXLayoutRenderer code={entry.body.code} />
      </div>
    </div>
  )
}
