import { ArrowUpRight } from 'lucide-react'

const REPEATS = 4

export default function AnnouncementTicker({
  messages,
  href,
  durationSeconds = 32,
}: {
  messages: string[]
  href?: string
  durationSeconds?: number
}) {
  if (!messages.length) return null

  const half = Array.from({ length: REPEATS }).flatMap(() => messages)

  const lane = (ariaHidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {half.map((m, i) => (
        <li key={`${m}-${i}`} className="flex shrink-0 items-center">
          <span className="text-accent px-5 text-xs font-semibold tracking-[0.18em] whitespace-nowrap uppercase">
            {m}
          </span>
          <span className="bg-accent/40 h-1 w-1 shrink-0 rotate-45" aria-hidden />
        </li>
      ))}
    </ul>
  )

  const body = (
    <div
      className="ticker border-line bg-accent-wash relative flex overflow-hidden border-y py-2"
      style={{ ['--ticker-duration' as string]: `${durationSeconds}s` }}
    >
      <div className="ticker-track flex min-w-max">
        {lane(false)}
        {lane(true)}
      </div>

      {href ? (
        <ArrowUpRight
          className="text-accent/70 pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2"
          strokeWidth={2}
          aria-hidden
        />
      ) : null}
    </div>
  )

  if (!href) return body

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="hover:border-accent/50 block rounded-sm transition-colors"
      aria-label={`${messages.join(' · ')} — visit sponsor site`}
    >
      {body}
    </a>
  )
}
