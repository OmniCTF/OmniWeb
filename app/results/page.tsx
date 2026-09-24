import { genPageMetadata } from 'app/seo'
import ResultsBoard from '@/components/ResultsBoard'
import { EDITIONS } from '@/data/results'

export const metadata = genPageMetadata({ title: 'Results' })

export default function ResultsPage() {
  return (
    <div className="w-full p-[var(--hypr-gap-out)]">
      <div className="mb-[var(--hypr-gap-in)] px-1">
        <h1 className="text-fg text-3xl font-semibold tracking-normal sm:text-4xl">Results</h1>
        <p className="text-mute mt-3 max-w-[70ch] text-sm">
          Final standings for every OmniCTF edition. Pick an edition to see its scoreboard.
        </p>
      </div>

      <ResultsBoard editions={EDITIONS} title="~/results" focus />
    </div>
  )
}
