'use client'

import { useEffect, useState, type ReactNode } from 'react'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'
import { SPONSORS } from 'data/sponsors'

const EVENT_DATE = new Date(2025, 9, 18, 9, 30, 0, 0) // Oct 18, 2026 (Jan is 0)

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds, finished: false }
}

const categories = ['Reverse', 'Web', 'Forensics', 'Hardware', 'PWN', 'Crypto', 'Misc', 'OSINT']

export default function Home() {
  const { days, hours, minutes, seconds, finished } = useCountdown(EVENT_DATE)

  const [selectedId, setSelectedId] = useState<string | null>(SPONSORS[0]?.id ?? null)
  const selected = SPONSORS.find((s) => s.id === selectedId) ?? null

  return (
    <div className="space-y-24">
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-16 sm:pt-24 sm:pb-20">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-white/60 px-3 py-1 text-xs font-semibold tracking-wide text-violet-700 shadow-sm backdrop-blur dark:border-violet-400/20 dark:bg-zinc-900/55 dark:text-violet-300">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500" />
              OMNICTF · ?????? · ?? HOURS
            </span>

            <h1 className="mt-6 bg-gradient-to-b from-zinc-950 to-zinc-700 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl md:text-6xl dark:from-white dark:to-zinc-300">
              OmniCTF 2026
            </h1>

            <p className="mt-4 text-lg font-semibold text-violet-700 dark:text-violet-300 sm:text-xl">
              {'>'} &nbsp; ?????? ???? &nbsp; {'·'} &nbsp; ??:?? ?? – ??:?? ??
            </p>

            <p className="mx-auto mt-6 max-w-2xl text-balance text-zinc-700 dark:text-zinc-300">
              A CTF Event built for speed, creativity, and clean execution. Sharpen your skills
              across multiple disciplines and prove you can ship under pressure.
            </p>

            {/* Countdown */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {finished ? (
                <span className="rounded-2xl bg-red-600 px-6 py-4 text-xl font-bold text-white shadow-lg shadow-red-500/20">
                  PREPARING FOR 2026! STAY TUNED!
                </span>
              ) : (
                <div className="rounded-3xl border border-violet-500/20 bg-white/60 p-4 shadow-lg shadow-violet-500/10 backdrop-blur dark:border-violet-400/15 dark:bg-zinc-900/55">
                  <div className="flex gap-3 text-center">
                    <TimeBox label="Days" value={days} />
                    <TimeBox label="Hours" value={hours} />
                    <TimeBox label="Minutes" value={minutes} />
                    <TimeBox label="Seconds" value={seconds} pulse />
                  </div>
                </div>
              )}
            </div>

            {/* Info pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Pill>?? total spots for Finals</Pill>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="https://discord.gg/jzZkfh9UFR"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white/60 px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-400/50 dark:border-white/15 dark:bg-zinc-900/50 dark:text-white dark:hover:bg-zinc-900"
              >
                Join Discord
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://ctf.omnictf.com/register"
                className="inline-flex items-center justify-center rounded-xl border border-violet-500/25 bg-white/60 px-5 py-2.5 text-sm font-semibold text-violet-800 shadow-sm backdrop-blur transition hover:border-violet-500/50 hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-400/50 dark:border-violet-400/20 dark:bg-zinc-900/50 dark:text-violet-200 dark:hover:bg-zinc-900"
              >
                Register
              </a>
              <a
                href="https://ctf.omnictf.com/login"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-violet-600 to-violet-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:from-violet-500 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
              >
                Login
              </a>
            </div>

            {/* Divider */}
            <div className="mx-auto mt-14 h-px max-w-3xl bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section id="sponsors-partners" className="mx-auto max-w-6xl px-4 pb-24">
        <SectionHeader
          title="Partnerships & Sponsorships"
          subtitle="Our sponsors who helped make OmniCTF a reality."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" role="tablist">
          {SPONSORS.map((s) => {
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
                    <Image src={selected.logo} alt={selected.name} fill sizes="80px" className="object-cover" priority />
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
                          className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-white/50 px-3 py-1.5 text-sm font-semibold text-violet-800 shadow-sm backdrop-blur transition hover:border-violet-500/50 hover:bg-white hover:shadow-md dark:border-violet-400/20 dark:bg-zinc-950/20 dark:text-violet-200"
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
                          className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white/50 px-3 py-1.5 text-sm font-medium text-zinc-800 shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md dark:border-white/15 dark:bg-zinc-950/20 dark:text-zinc-200"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-12 h-px max-w-5xl bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />
          </div>
        )}
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-6xl px-4 pb-24">
        <SectionHeader
          title="Challenge Categories"
          subtitle="Expect a curated set of problems spanning core offensive & analytical security domains."
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((c) => (
            <div
              key={c}
              className="group relative overflow-hidden rounded-2xl border border-violet-500/15 bg-white/60 px-4 py-6 text-center shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-violet-500/40 hover:shadow-md dark:border-violet-400/10 dark:bg-zinc-900/50"
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -left-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-violet-500/15 blur-2xl" />
                <div className="absolute -right-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-2xl" />
              </div>

              <div className="relative text-lg font-bold text-violet-800 transition-transform group-hover:scale-[1.03] dark:text-violet-300">
                {c}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      {siteMetadata.newsletter?.provider && (
        <section className="mx-auto max-w-xl px-4 pb-24 -mt-8">
          <div className="rounded-3xl bg-gradient-to-b from-violet-500/25 via-violet-500/10 to-transparent p-[1px]">
            <div className="rounded-3xl border border-violet-500/15 bg-white/70 p-6 shadow-lg shadow-violet-500/10 backdrop-blur dark:border-violet-400/10 dark:bg-zinc-900/60">
              <NewsletterForm />
            </div>
          </div>
        </section>
      )}

      <footer className="pb-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Stay tuned. Registration opens soon.
      </footer>
    </div>
  )
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

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-violet-500/20 bg-white/60 px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm backdrop-blur dark:border-violet-400/15 dark:bg-zinc-900/45 dark:text-zinc-200">
      {children}
    </span>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h2>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">{subtitle}</p>
    </div>
  )
}

function categoryHint(c: string) {
  switch (c) {
    case 'Reverse':
      return 'Reverse'
    case 'Web':
      return 'Web'
    case 'Forensics':
      return 'Forensics'
    case 'PWN':
      return 'PWN'
    case 'Crypto':
      return 'Crypto'
    case 'OSINT':
      return 'OSINT'
    case 'MISC':
      return 'MISC'
  }
}
