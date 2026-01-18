'use client'

import { useEffect, useMemo, useState } from 'react'

type Parts = { days: number; hours: number; minutes: number; seconds: number; finished: boolean }

function getParts(target: Date, now: Date): Parts {
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds, finished: false }
}

function TimeBox({ label, value, pulse }: { label: string; value: number; pulse?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={[
          'w-20 rounded-2xl border border-white/10 bg-zinc-950/85 px-3 py-3 text-center font-mono text-2xl font-extrabold text-violet-200 shadow-inner shadow-black/20',
          'dark:bg-black/40 dark:text-violet-200',
          pulse ? 'motion-safe:animate-[pulse_1.2s_ease-in-out_infinite]' : '',
        ].join(' ')}
      >
        {String(value).padStart(2, '0')}
      </div>
      <span className="mt-2 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
    </div>
  )
}

export default function CountdownCard({
  targetIso,
  title = 'Countdown',
}: {
  targetIso: string
  title?: string
}) {
  const target = useMemo(() => new Date(targetIso), [targetIso])
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const { days, hours, minutes, seconds, finished } = getParts(target, now)

  return (
    <div className="rounded-3xl border border-violet-500/20 bg-white/60 p-4 shadow-lg shadow-violet-500/10 backdrop-blur dark:border-violet-400/15 dark:bg-zinc-900/55">
      <div className="mb-3 flex items-center justify-center text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
        {title}
      </div>

      {finished ? (
        <div className="rounded-2xl bg-emerald-600/15 px-4 py-3 text-center text-sm font-semibold text-emerald-300">
          Live now
        </div>
      ) : (
        <div className="flex gap-3 text-center">
          <TimeBox label="Days" value={days} />
          <TimeBox label="Hours" value={hours} />
          <TimeBox label="Minutes" value={minutes} />
          <TimeBox label="Seconds" value={seconds} pulse />
        </div>
      )}
    </div>
  )
}
