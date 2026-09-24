import { genPageMetadata } from 'app/seo'
import ResultsBoard from '@/components/ResultsBoard'
import { EDITIONS } from '@/data/results'
import { ResultsJsonLd } from '@/components/StructuredData'

export const metadata = genPageMetadata({
  title: 'Results',
  description:
    'Final standings for every OmniCTF edition, including the 2026 Finals held on-site at Ovidius University in Constanta, Romania.',
})

export default function ResultsPage() {
  return (
    <div className="w-full p-[var(--hypr-gap-out)]">
      <ResultsJsonLd />
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
