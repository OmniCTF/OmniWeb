import { aboutItem } from '@/qino/items/about'
import MDXContent from '@/components/MDXContent'
import { genPageMetadata } from 'app/seo'
import Window from '@/components/Window'

export const metadata = genPageMetadata({
  title: 'About',
  description:
    'What OmniCTF is, who runs it, and what to expect: a Romanian cybersecurity competition with online qualifiers feeding an on-site final in Constanta.',
})

export default async function AboutPage() {
  const about = await aboutItem.getEntry()

  return (
    <div className="w-full p-[var(--hypr-gap-out)]">
      <Window title="~/about" meta="cat about.md" focus bodyClassName="p-5 sm:p-8 lg:p-12">
        <h1 className="text-fg text-3xl font-semibold tracking-normal sm:text-4xl">About</h1>
        <p className="text-mute mt-3 max-w-[70ch] text-sm">
          What OmniCTF is, why we run it, and what to expect.
        </p>
        <div className="bg-line mt-8 h-px w-full" />
        <div className="prose prose-invert mt-8 max-w-[75ch]">
          <MDXContent source={about.markdown} />
        </div>
      </Window>
    </div>
  )
}
