'use client'

import { useEffect, useState } from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'
import { SPONSORS } from 'data/sponsors'

const EVENT_DATE = new Date(2025, 9, 18, 10, 0, 0, 0) //Jan is 0


function useCountdown(target: Date) {
  const [now, setNow] = useState<Date>(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true }
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds, finished: false }
}

const categories = [
  'Reverse',
  'Web',
  'Forensics',
  'Hardware',
  'PWN',
  'Crypto',
  'Misc',
  'OSINT',
]


export default function Home() {
  const { days, hours, minutes, seconds, finished } = useCountdown(EVENT_DATE)


  const [selectedId, setSelectedId] = useState<string | null>(SPONSORS[0]?.id ?? null)
  const selected = SPONSORS.find((s) => s.id === selectedId) ?? null

  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 pt-16 pb-24 sm:pt-24 sm:pb-20 relative">
            <h1 className="text-center font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 text-4xl sm:text-5xl md:text-6xl">
              OmniCTF 2025
            </h1>
            <p className="mt-4 text-center text-lg sm:text-xl font-semibold text-violet-600 dark:text-violet-400">
              {'>'} &nbsp; October 18th &nbsp; {'·'} &nbsp; 10:00 AM – 04:00 PM
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-center text-gray-600 dark:text-gray-300">
              A six–hour capture the flag where creativity.
              Sharpen your skills across multiple disciplines and showcase your mastery.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {finished ? (
                <span className="rounded-xl bg-green-600 px-6 py-4 text-xl font-bold text-white shadow">
                  The CTF is LIVE!
                </span>
              ) : (
                <div className="flex gap-3 text-center">
                  <TimeBox label="Days" value={days} />
                  <TimeBox label="Hours" value={hours} />
                  <TimeBox label="Minutes" value={minutes} />
                  <TimeBox label="Seconds" value={seconds} />
                </div>
              )}
            </div>

            <br></br>
            <br></br>
            <hr></hr>

            <p 
            className="mx-auto mt-10 max-w-2xl text-center text-gray-600 dark:text-gray-300">

              We have 50–60 total spots available, with only 20 reserved for students. Registration is first come, first served.
            </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <a
                href="https://docs.google.com/forms/d/1GDWEHTecxIuTnJcgbLdIeA9cYtkCEj65HyKNFmcqDGY/edit"
                className="px-5 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-500 transition"
              >
                Required Form (Complete before 17th October 11:59:59 PM)
            </a>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <a
                href="https://discord.gg/omnictf"
                className="px-5 py-2 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition"
              >
                Join Discord
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <p 
            className="mx-auto mt-6 max-w-2xl text-center text-gray-600 dark:text-gray-300">

              Registration on the competition infrastructure requires completing the form first; you’ll then receive your access code from our staff.

            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <a
              href="https://ctf.omnictf.com/register"
              className="px-5 py-2 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition"
            >
              Register
            </a>
          
            <a
              href="https://ctf.omnictf.com/login"
              className="px-5 py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-500 transition"
            >
              Login
            </a>
          
            <a
              href="https://ctf.omnictf.com/requirements"
              className="px-5 py-2 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition"
            >
              Requirements
            </a>
          </div>
          <br></br>
          <br></br>
          <hr></hr>

        </div>
      </section>

      <section id="sponsors-partners" className="mx-auto max-w-5xl px-4 pb-24">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Partnerships & Sponsorships
        </h2>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Expect a curated set of problems spanning core offensive & analytical security domains.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" role="tablist">
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
                  'group flex items-center gap-3 rounded-xl border px-4 py-3 text-left shadow-sm transition',
                  'bg-gray-50 dark:bg-gray-900/50 border-violet-700/30 dark:border-violet-500/30',
                  'hover:shadow-md hover:border-violet-500/60',
                  active ? 'ring-2 ring-violet-500 border-violet-500/60' : '',
                ].join(' ')}
              >
                <span className="relative inline-block h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-zinc-200 dark:ring-zinc-700">
                  <Image src={s.logo} alt={s.name} fill sizes="48px" className="object-cover" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm leading-5 text-gray-500 dark:text-gray-400">
                    {s.tier ?? '\u00A0'}
                  </span>
                  <span className="block text-base font-semibold text-violet-700 dark:text-violet-400 group-hover:scale-[1.02] transition-transform">
                    {s.name}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {selected && (
          <div
            id={`sponsor-panel-${selected.id}`}
            role="tabpanel"
            className="mt-8 rounded-2xl border border-violet-700/30 dark:border-violet-500/30 bg-white/70 dark:bg-gray-900/60 backdrop-blur p-6 shadow-lg"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-700">
                <Image src={selected.logo} alt={selected.name} fill sizes="80px" className="object-cover" priority />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selected.name}</h3>
                  {selected.tier && (
                    <span className="rounded-full border border-violet-500/40 px-2.5 py-0.5 text-xs font-medium text-violet-600 dark:text-violet-300">
                      {selected.tier}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{selected.description}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {selected.website && (
                    <a
                      href={selected.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-violet-500/40 px-3 py-1.5 text-sm font-medium text-violet-700 dark:text-violet-300 hover:border-violet-500 hover:bg-violet-500/5 transition"
                    >
                      Visit website
                    </a>
                  )}
                  {selected.links?.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

          <hr></hr>

      <section id="categories" className="mx-auto max-w-5xl px-4 pb-24">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Challenge Categories
        </h2>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Expect a curated set of problems spanning core offensive & analytical security domains.
        </p>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <div
              key={c}
              className="group rounded-xl border border-violet-700/30 bg-gray-50 dark:bg-gray-900/50 dark:border-violet-500/30 px-4 py-6 text-center shadow-sm hover:shadow-md transition hover:border-violet-500/60"
            >
              <div className="text-lg font-semibold text-violet-700 dark:text-violet-400 group-hover:scale-105 transition-transform">
                {c}
              </div>
            </div>
          ))}
        </div>
      </section>

    {siteMetadata.newsletter?.provider && (
      <section className="mx-auto max-w-xl px-4 pb-24 -mt-8">
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br
                        from-violet-900/30 via-violet-800/20 to-transparent
                        p-6 backdrop-blur-sm">
          <div className="">
            <NewsletterForm />
          </div>
        </div>
      </section>
    )}


      <footer className="pb-12 text-center text-sm text-gray-500 dark:text-gray-400">
        Stay tuned. Registration opens soon.
      </footer>
    </div>
  )
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 rounded-lg bg-gray-900/80 dark:bg-gray-800 px-3 py-3 text-center font-mono text-2xl font-bold text-violet-300 shadow-inner">
        {String(value).padStart(2, '0')}
      </div>
      <span className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-400">
        {label}
      </span>
    </div>
  )
}

function DisabledButton({ text, secondary }: { text: string; secondary?: boolean }) {
  return (
    <button
      disabled
      className={`cursor-not-allowed rounded-xl px-8 py-3 text-lg font-semibold shadow 
      ${
        secondary
          ? 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
          : 'bg-violet-600 text-white dark:bg-violet-500'
      } opacity-60`}
      title="Coming soon"
      type="button"
    >
      {text}
    </button>
  )
}
