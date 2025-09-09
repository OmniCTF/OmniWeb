'use client'

import { useEffect, useState } from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

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
  'Stego',
  'PWN',
  'Crypto',
  'Misc',
  'OSINT',
]

export default function Home() {
  const { days, hours, minutes, seconds, finished } = useCountdown(EVENT_DATE)

  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 pt-16 pb-24 sm:pt-24 sm:pb-32 relative">
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

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <a
              href="https://ctf.omnictf.com/register"
              className="px-5 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition"
            >
              Register
            </a>
          
            <a
              href="https://ctf.omnictf.com/login"
              className="px-5 py-2 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition"
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


        </div>
      </section>

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
