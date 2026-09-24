import { ReactNode } from 'react'

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
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <h2 className="text-fg min-w-0 text-xl font-semibold tracking-normal sm:text-2xl">
          {title}
        </h2>
        <span className="bg-line hidden h-px min-w-6 flex-1 sm:block" aria-hidden />
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      {subtitle ? <p className="text-mute mt-3 max-w-[70ch] text-sm">{subtitle}</p> : null}
    </div>
  )
}
