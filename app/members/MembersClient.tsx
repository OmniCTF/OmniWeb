'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Globe, Github, Search } from 'lucide-react'

export interface MemberCardData {
  slug: string
  name: string
  displayName: string
  avatar?: string
  country?: string
  joined?: string
  position?: string
  tags?: string[]
  links?: {
    website?: string
    github?: string
  }
}

export default function MembersClient({ members }: { members: MemberCardData[] }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string>('All')

  const allTags = useMemo(() => {
    const set = new Set<string>()
    for (const m of members) (m.tags ?? []).forEach((t) => set.add(t))
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [members])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return members
      .filter((m) => (activeTag === 'All' ? true : (m.tags ?? []).includes(activeTag)))
      .filter((m) => {
        if (!q) return true
        const hay = `${m.displayName} ${m.name} ${m.position ?? ''} ${(m.tags ?? []).join(' ')}`.toLowerCase()
        return hay.includes(q)
      })
  }, [members, query, activeTag])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            Members
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
            The people behind OmniCTF: organizers, authors, and contributors.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search members…"
              className="w-full rounded-xl border border-zinc-300 bg-white/70 py-2 pl-10 pr-3 text-sm font-medium text-zinc-900 shadow-sm backdrop-blur outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-400/40 dark:border-white/15 dark:bg-zinc-900/50 dark:text-white"
            />
          </div>

          <select
            value={activeTag}
            onChange={(e) => setActiveTag(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white/70 px-3 py-2 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-400/40 sm:w-52 dark:border-white/15 dark:bg-zinc-900/50 dark:text-white"
          >
            {allTags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((member) => (
          <div
            key={member.slug}
            className="group rounded-2xl border border-violet-500/15 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-violet-500/40 hover:shadow-md dark:border-violet-400/10 dark:bg-zinc-900/50"
          >
            <Link href={`/members/${member.slug}`} className="flex flex-col items-center text-center">
              {member.avatar ? (
                <Image
                  src={member.avatar}
                  alt={member.displayName}
                  width={96}
                  height={96}
                  className="rounded-full border border-white/10 object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-zinc-200 dark:bg-zinc-700" />
              )}
              <h2 className="mt-4 text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                {member.displayName}
              </h2>
              {member.position ? (
                <p className="mt-1 text-sm font-semibold text-violet-700 dark:text-violet-300">
                  {member.position}
                </p>
              ) : null}
              {member.joined ? (
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Joined {member.joined}
                </p>
              ) : null}
            </Link>

            {(member.tags ?? []).length ? (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {(member.tags ?? []).map((tag) => (
                  <Link
                    key={`${member.slug}-${tag}`}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="rounded-full border border-violet-500/20 bg-violet-500/5 px-2.5 py-1 text-xs font-semibold text-violet-800 transition hover:border-violet-500/40 hover:bg-violet-500/10 dark:border-violet-400/15 dark:text-violet-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="mt-4 flex items-center justify-center gap-4">
              {member.links?.website ? (
                <a
                  href={member.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 transition hover:text-violet-500 dark:text-zinc-400"
                  aria-label="Website"
                >
                  <Globe className="h-5 w-5" />
                </a>
              ) : null}
              {member.links?.github ? (
                <a
                  href={member.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 transition hover:text-violet-500 dark:text-zinc-400"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              ) : null}
              {member.country ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://flagcdn.com/w40/${member.country.toLowerCase()}.png`}
                  alt={member.country}
                  className="h-4 w-6 rounded-sm object-cover"
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {!filtered.length ? (
        <div className="mt-10 rounded-2xl border border-zinc-300 bg-white/70 p-6 text-center text-sm text-zinc-600 backdrop-blur dark:border-white/15 dark:bg-zinc-900/50 dark:text-zinc-300">
          No members match your search.
        </div>
      ) : null}
    </div>
  )
}
