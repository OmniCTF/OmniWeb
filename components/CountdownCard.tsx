'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { TeamResult } from '@/data/results'

type Parts = { days: number; hours: number; minutes: number; seconds: number; finished: boolean }

function getParts(target: Date, now: Date): Parts {
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    finished: false,
  }
}

function Cell({ label, value, live }: { label: string; value: number; live?: boolean }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center">
      <div
        className={[
          'tabnum border-line bg-inset w-full rounded border py-2.5 text-center text-2xl font-semibold sm:text-3xl',
          live ? 'text-accent' : 'text-fg',
        ].join(' ')}
      >
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-mute mt-1.5 text-xs font-semibold tracking-[0.12em] uppercase">
        {label}
      </span>
    </div>
  )
}

const RAIL: Record<number, string> = {
  1: 'var(--c-yellow)',
  2: 'var(--c-line-strong)',
  3: 'var(--c-orange)',
}

function Podium({ podium }: { podium: TeamResult[] }) {
  if (!podium.length) {
    return (
      <div className="border-ansi-green/40 bg-ansi-green/10 text-ansi-green rounded border px-4 py-4 text-center text-sm font-semibold">
        Ended
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      {podium.slice(0, 3).map((t) => (
        <div
          key={t.team}
          className="border-line bg-inset flex items-stretch overflow-hidden rounded border"
        >
          <span className="w-[3px] shrink-0" style={{ background: RAIL[t.place] }} aria-hidden />
          <div className="flex min-w-0 flex-1 items-baseline gap-2 px-3 py-2">
            <span className="text-mute tabnum shrink-0 text-xs">{t.place}</span>
            <span className="text-fg min-w-0 flex-1 truncate text-sm">{t.team}</span>
            <span className="text-dim tabnum shrink-0 text-xs">
              {t.score.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      ))}

      <a
        href="#results"
        className="text-mute hover:text-accent mt-0.5 inline-flex items-center gap-1 self-start text-xs transition-colors"
      >
        full standings
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
      </a>
    </div>
  )
}

export default function CountdownCard({
  targetIso,
  title = 'Countdown',
  frameless = false,
  podium = [],
}: {
  targetIso: string
  title?: string
  frameless?: boolean
  podium?: TeamResult[]
}) {
  const target = useMemo(() => new Date(targetIso), [targetIso])
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const parts = now ? getParts(target, now) : null

  const body = (
    <div className="p-3">
      {parts === null ? (
        <div className="flex gap-2" aria-hidden>
          {['Days', 'Hours', 'Minutes', 'Seconds'].map((l) => (
            <Cell key={l} label={l} value={0} />
          ))}
        </div>
      ) : parts.finished ? (
        <Podium podium={podium} />
      ) : (
        <div className="flex gap-2">
          <Cell label="Days" value={parts.days} />
          <Cell label="Hours" value={parts.hours} />
          <Cell label="Minutes" value={parts.minutes} />
          <Cell label="Seconds" value={parts.seconds} live />
        </div>
      )}
    </div>
  )

  if (frameless) return body

  return (
    <div className="pane flex flex-col">
      <div className="pane-title justify-between">
        <span>{title}</span>
        <span className="text-mute normal-case">
          {new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            timeZone: 'UTC',
          }).format(target)}
        </span>
      </div>
      {body}
    </div>
  )
}
