import { allSpecialThanks } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { genPageMetadata } from 'app/seo'
import Window from '@/components/Window'

export const metadata = genPageMetadata({ title: 'Special Thanks' })

export default function SpecialThanksPage() {
  const entry = allSpecialThanks[0] // singleton: data/special-thanks/index.mdx

  return (
    <div className="w-full p-2 sm:p-3">
      <Window
        title="~/special-thanks"
        meta="cat thanks.md"
        focus
        bodyClassName="p-5 sm:p-8 lg:p-12"
      >
        <h1 className="text-fg text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Special thanks
        </h1>
        <p className="text-mute mt-3 max-w-[70ch] text-sm">
          Sponsors, partners, and people who made OmniCTF possible.
        </p>
        <div className="bg-line mt-8 h-px w-full" />
        <div className="prose prose-invert mt-8 max-w-none">
          <MDXLayoutRenderer code={entry.body.code} />
        </div>
      </Window>
    </div>
  )
}
