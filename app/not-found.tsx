import Link from '@/components/Link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="w-full p-2 sm:p-3">
      <div className="pane pane-focus overflow-hidden">
        <div className="pane-title justify-between">
          <span className="normal-case">error</span>
          <span className="text-ansi-red normal-case">exit 404</span>
        </div>

        <div className="flex flex-col gap-8 p-8 sm:p-14 md:flex-row md:items-center md:gap-14">
          <div className="text-ansi-red text-[clamp(4rem,14vw,10rem)] leading-none font-semibold tracking-[-0.05em]">
            404
          </div>

          <div className="border-line max-w-lg md:border-l md:pl-14">
            <p className="text-fg text-lg font-semibold">Sorry we couldn't find this page.</p>
            <p className="text-dim mt-3 text-sm leading-relaxed">
              But dont worry, you can find plenty of other things on our homepage.
            </p>
            <Link
              href="/"
              className="bg-accent text-accent-ink hover:bg-accent-strong mt-7 inline-flex items-center gap-2 rounded px-4 py-2.5 text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
