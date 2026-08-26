'use client'

import { useEffect, useMemo, useState } from 'react'

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
      <span className="text-mute mt-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase">
        {label}
      </span>
    </div>
  )
}

export default function CountdownCard({
  targetIso,
  title = 'Countdown',
  frameless = false,
}: {
  targetIso: string
  title?: string
  frameless?: boolean
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
          <div className="border-ansi-green/40 bg-ansi-green/10 text-ansi-green rounded border px-4 py-4 text-center text-sm font-semibold">
            Ended
          </div>
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
