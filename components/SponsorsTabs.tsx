'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import type { Sponsor } from '@/data/sponsors'

export default function SponsorsTabs({ sponsors }: { sponsors: Sponsor[] }) {
  const first = sponsors[0]?.id ?? null
  const [selectedId, setSelectedId] = useState<string | null>(first)
  const selected = useMemo(
    () => sponsors.find((s) => s.id === selectedId) ?? null,
    [sponsors, selectedId]
  )

  if (!sponsors.length) return null

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" role="tablist">
        {sponsors.map((s) => {
          const active = s.id === selectedId
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={active}
              aria-controls={`sponsor-panel-${s.id}`}
              onClick={() => setSelectedId(s.id)}
              className={[
                'group relative flex items-center gap-3 rounded-2xl border px-4 py-3 text-left shadow-sm transition',
                'bg-white/60 backdrop-blur dark:bg-zinc-900/50',
                'border-violet-500/20 dark:border-violet-400/15',
                'hover:-translate-y-0.5 hover:border-violet-500/45 hover:shadow-md',
                active ? 'ring-2 ring-violet-500/50 border-violet-500/50' : '',
              ].join(' ')}
            >
              <span className="relative inline-block h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-zinc-200/70 dark:ring-white/10">
                <Image src={s.logo} alt={s.name} fill sizes="48px" className="object-cover" />
              </span>
              <span className="flex-1">
                <span className="block text-xs text-zinc-500 dark:text-zinc-400">{s.tier ?? '\u00A0'}</span>
                <span className="block text-base font-semibold text-violet-800 transition-transform group-hover:translate-x-0.5 dark:text-violet-300">
                  {s.name}
                </span>
              </span>

              <span
                className={[
                  'absolute right-3 top-3 h-2 w-2 rounded-full bg-violet-500/30',
                  active ? 'bg-violet-500' : '',
                ].join(' ')}
              />
            </button>
          )
        })}
      </div>

      {selected && (
        <div id={`sponsor-panel-${selected.id}`} role="tabpanel" className="mt-8">
          <div className="rounded-3xl bg-gradient-to-b from-violet-500/20 via-transparent to-transparent p-[1px]">
            <div className="rounded-3xl border border-violet-500/15 bg-white/70 p-6 shadow-lg shadow-violet-500/10 backdrop-blur dark:border-violet-400/10 dark:bg-zinc-900/60">
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl ring-1 ring-zinc-200/70 dark:ring-white/10">
                  <Image
                    src={selected.logo}
                    alt={selected.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{selected.name}</h3>
                    {selected.tier && (
                      <span className="rounded-full border border-violet-500/30 bg-violet-500/5 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:border-violet-400/20 dark:text-violet-200">
                        {selected.tier}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-zinc-700 dark:text-zinc-300">{selected.description}</p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {selected.website && (
                      <a
                        href={selected.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-white/50 px-3 py-1.5 text-sm font-semibold text-violet-800 shadow-sm backdrop-blur transition hover:border-violet-500/50 hover:bg-white hover:shadow-md dark:border-violet-400/20 dark:bg-zinc-950/20 dark:text-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-400/50 dark:border-violet-400/20 dark:bg-zinc-900/50 dark:text-violet-200 dark:hover:bg-zinc-900"
                      >
                        Visit website <span className="opacity-70">↗</span>
                      </a>
                    )}
                    {selected.links?.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white/50 px-3 py-1.5 text-sm font-medium text-zinc-800 shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md dark:border-white/15 dark:bg-zinc-950/20 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-400/50 dark:border-violet-400/20 dark:bg-zinc-900/50 dark:text-violet-200 dark:hover:bg-zinc-900"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
