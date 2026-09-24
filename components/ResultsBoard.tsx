'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, ChevronDown } from 'lucide-react'
import type { EditionResults, TeamResult } from '@/data/results'

const COLS = 'sm:grid-cols-[3.25rem_minmax(0,1fr)_4.5rem_6.5rem]'

const PODIUM: Record<number, { rail: string; text: string; label: string }> = {
  1: { rail: 'var(--c-yellow)', text: 'text-ansi-yellow', label: '1st' },
  2: { rail: 'var(--c-line-strong)', text: 'text-fg', label: '2nd' },
  3: { rail: 'var(--c-orange)', text: 'text-ansi-orange', label: '3rd' },
}

const COUNTRY_NAME: Record<string, string> = { RO: 'Romania', JO: 'Jordan' }

const points = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function YearMenu({
  editions,
  activeYear,
  onSelect,
}: {
  editions: EditionResults[]
  activeYear: string
  onSelect: (year: string) => void
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="border-line-strong bg-inset text-fg hover:border-accent hover:text-accent tabnum inline-flex items-center gap-2 rounded border px-3 py-1.5 text-sm transition-colors"
      >
        <span className="text-mute text-xs">edition</span>
        {activeYear}
        <ChevronDown
          className={['h-3.5 w-3.5 transition-transform', open ? 'rotate-180' : ''].join(' ')}
          strokeWidth={2}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Choose an edition"
          className="pane absolute top-full right-0 z-10 mt-1 w-48 overflow-hidden py-1"
        >
          {editions.map((e) => {
            const active = e.year === activeYear
            return (
              <li key={e.year} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(e.year)
                    setOpen(false)
                  }}
                  className={[
                    'hover:bg-raise flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
                    active ? 'text-accent' : 'text-dim',
                  ].join(' ')}
                >
                  <Check
                    className={['h-3.5 w-3.5 shrink-0', active ? '' : 'opacity-0'].join(' ')}
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span className="tabnum">{e.year}</span>
                  {e.status === 'upcoming' ? (
                    <span className="text-mute ml-auto text-xs">soon</span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

function Row({ r }: { r: TeamResult }) {
  const podium = PODIUM[r.place]
  return (
    <li className="hover:bg-raise group flex items-stretch transition-colors">
      <span
        className="w-[3px] shrink-0"
        style={{ background: podium?.rail ?? 'transparent' }}
        aria-hidden
      />
      <div
        className={[
          'grid flex-1 grid-cols-[3.25rem_minmax(0,1fr)] items-center gap-x-4 gap-y-1.5 py-3 pr-5 pl-[calc(1.25rem-3px)] sm:gap-4 sm:py-2.5',
          COLS,
        ].join(' ')}
      >
        <span
          className={['tabnum text-sm font-semibold', podium ? podium.text : 'text-mute'].join(' ')}
        >
          {podium ? podium.label : String(r.place).padStart(2, '0')}
        </span>

        <span className="text-fg group-hover:text-accent min-w-0 truncate text-sm transition-colors">
          {r.team}
        </span>

        <span className="col-start-2 flex items-center gap-3 sm:contents">
          <span
            className="border-line-strong text-mute inline-block rounded border px-1.5 py-px text-xs font-semibold"
            title={COUNTRY_NAME[r.country] ?? r.country}
          >
            {r.country}
          </span>

          <span className="text-dim tabnum text-sm sm:text-right">{points(r.score)}</span>
        </span>
      </div>
    </li>
  )
}

export default function ResultsBoard({ editions }: { editions: EditionResults[] }) {
  const [year, setYear] = useState(editions[0]?.year ?? '')
  const edition = editions.find((e) => e.year === year) ?? editions[0]

  if (!edition) return null

  const champion = edition.results[0]

  return (
    <div className="pane overflow-hidden">
      <div className="pane-title justify-between gap-3">
        <span className="normal-case">finals.scores</span>
        {edition.sourceUrl ? (
          <a
            href={edition.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-mute hover:text-accent inline-flex items-center gap-1 normal-case transition-colors"
          >
            {edition.sourceLabel ?? 'scoreboard'}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          </a>
        ) : null}
      </div>

      <div className="border-line flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3">
        <span className="text-dim text-sm">{edition.label}</span>
        <YearMenu editions={editions} activeYear={edition.year} onSelect={setYear} />
      </div>

      {champion ? (
        <div className="border-line bg-accent-wash flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b px-5 py-4">
          <span className="text-mute text-xs font-semibold tracking-[0.12em] uppercase">
            Champion
          </span>
          <span className="text-accent text-lg">{champion.team}</span>
          <span className="text-mute tabnum text-xs">
            {points(champion.score)} pts
          </span>
        </div>
      ) : null}

      {edition.results.length === 0 ? (
        <p className="text-mute px-5 py-10 text-center text-sm">
          {edition.note ?? 'Results are not published yet.'}
        </p>
      ) : (
        <>
          <div
            className={[
              'border-line text-mute hidden border-b px-5 py-2 text-xs font-semibold tracking-[0.1em] uppercase sm:grid sm:gap-4',
              COLS,
            ].join(' ')}
          >
            <span>Place</span>
            <span>Team</span>
            <span>Country</span>
            <span className="text-right">CTF points</span>
          </div>

          <ol className="divide-y divide-[var(--c-line)]">
            {edition.results.map((r) => (
              <Row key={r.team} r={r} />
            ))}
          </ol>
        </>
      )}
    </div>
  )
}
