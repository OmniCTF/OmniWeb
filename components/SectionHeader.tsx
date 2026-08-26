import { ReactNode } from 'react'

/**
 * A section break in a session is a rule with a label on it, the way a
 * status line divides regions. No eyebrow, no centered stack.
 */
export default function SectionHeader({
  title,
  subtitle,
  right,
}: {
  title: string
  subtitle?: string
  right?: ReactNode
}) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <h2 className="text-fg shrink-0 text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        <span className="bg-line h-px min-w-6 flex-1" aria-hidden />
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      {subtitle ? <p className="text-mute mt-3 max-w-[70ch] text-sm">{subtitle}</p> : null}
    </div>
  )
}
