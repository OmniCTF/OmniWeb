'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Globe, Github, Search, ChevronRight } from 'lucide-react'

export interface MemberCardData {
  slug: string
  id?: number
  is_admin?: boolean
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

// A member counts as "retired" when their position says so.
function isRetired(member: MemberCardData): boolean {
  return (member.position ?? '').toLowerCase().includes('retired')
}

export default function MembersClient({ members }: { members: MemberCardData[] }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string>('All')
  const searchRef = useRef<HTMLInputElement>(null)

  /** `/` focuses the filter, the way it does in every pager this borrows from. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      const el = e.target as HTMLElement | null
      if (el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))) return
      e.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
        const hay =
          `${m.displayName} ${m.name} ${m.position ?? ''} ${(m.tags ?? []).join(' ')}`.toLowerCase()
        return hay.includes(q)
      })
  }, [members, query, activeTag])

  return (
    <div className="w-full p-[var(--hypr-gap-out)]">
      <div className="pane pane-focus overflow-hidden">
        <div className="pane-title justify-between">
          <span className="normal-case">~/members</span>
          <span className="tabnum normal-case">
            {filtered.length} of {members.length}
          </span>
        </div>

        <div className="border-line flex flex-col gap-5 border-b px-5 py-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-fg text-3xl font-semibold tracking-[-0.035em]">Members</h1>
            <p className="text-mute mt-2 max-w-[70ch] text-sm">
              The people behind OmniCTF: organizers, authors, and contributors.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
            <div className="relative w-full sm:w-72">
              <Search
                className="text-mute pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2"
                strokeWidth={2}
                aria-hidden
              />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search members…"
                aria-label="Search members"
                className="border-line bg-inset text-fg placeholder:text-mute focus:border-accent/60 w-full rounded border py-2 pr-10 pl-9 text-sm outline-none transition-colors"
              />
              <kbd className="kbd pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">
                /
              </kbd>
            </div>

            <select
              value={activeTag}
              onChange={(e) => setActiveTag(e.target.value)}
              aria-label="Filter by tag"
              className="border-line bg-inset text-fg focus:border-accent/60 w-full rounded border px-3 py-2 text-sm outline-none transition-colors sm:w-44"
            >
              {allTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* column header, the way a process list labels its columns */}
        <div className="border-line text-mute hidden border-b px-5 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase lg:grid lg:grid-cols-[3rem_minmax(0,1.4fr)_minmax(0,1fr)_9rem_minmax(0,1.1fr)_6.5rem] lg:gap-4">
          <span className="text-right">id</span>
          <span>name</span>
          <span>position</span>
          <span>joined</span>
          <span>focus</span>
          <span className="text-right">links</span>
        </div>

        <ul className="divide-y divide-[var(--c-line)]">
          {filtered.map((member) => {
            const retired = isRetired(member)
            return (
              <li
                key={member.slug}
                className={[
                  'hover:bg-raise/70 group px-5 py-3 transition-colors',
                  retired ? 'opacity-60 hover:opacity-100' : '',
                ].join(' ')}
              >
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-[3rem_minmax(0,1.4fr)_minmax(0,1fr)_9rem_minmax(0,1.1fr)_6.5rem] lg:items-center lg:gap-4">
                  <span className="text-mute tabnum hidden text-right text-xs lg:block">
                    {member.id ?? '—'}
                  </span>

                  <Link
                    href={`/members/${member.slug}`}
                    className="flex min-w-0 items-center gap-3"
                  >
                    {member.avatar ? (
                      <Image
                        src={member.avatar}
                        alt=""
                        width={32}
                        height={32}
                        className={[
                          'border-line h-8 w-8 shrink-0 rounded-full border object-cover',
                          retired ? 'grayscale group-hover:grayscale-0' : '',
                        ].join(' ')}
                      />
                    ) : (
                      <span className="bg-inset border-line h-8 w-8 shrink-0 rounded-full border" />
                    )}
                    <span className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="text-fg group-hover:text-accent truncate text-sm font-semibold transition-colors">
                        {member.displayName}
                      </span>
                      {member.is_admin ? (
                        <span className="border-ansi-yellow/40 text-ansi-yellow rounded border px-1.5 py-px text-[10px] font-semibold">
                          admin
                        </span>
                      ) : null}
                      {retired ? (
                        <span className="border-line-strong text-mute rounded border px-1.5 py-px text-[10px] font-semibold">
                          retired
                        </span>
                      ) : null}
                    </span>
                  </Link>

                  <span
                    className={[
                      'truncate text-xs',
                      retired ? 'text-mute' : 'text-accent',
                    ].join(' ')}
                  >
                    {member.position ?? ''}
                  </span>

                  <span className="text-mute tabnum text-xs">
                    {member.joined ? `Joined ${member.joined}` : ''}
                  </span>

                  <span className="flex min-w-0 flex-wrap gap-x-3 gap-y-1">
                    {(member.tags ?? []).map((tag) => (
                      <Link
                        key={`${member.slug}-${tag}`}
                        href={`/tags/${encodeURIComponent(tag)}`}
                        className="text-dim hover:text-accent text-xs transition-colors"
                      >
                        <span className="text-mute" aria-hidden>
                          --
                        </span>
                        {tag}
                      </Link>
                    ))}
                  </span>

                  <span className="text-mute flex items-center gap-2.5 lg:justify-end">
                    {member.country ? (
                      <img
                        src={`https://flagcdn.com/w40/${member.country.toLowerCase()}.png`}
                        alt={member.country}
                        className="border-line h-3 w-[18px] rounded-[2px] border object-cover"
                      />
                    ) : null}
                    {member.links?.website ? (
                      <a
                        href={member.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                        aria-label={`${member.displayName} website`}
                      >
                        <Globe className="h-3.5 w-3.5" strokeWidth={2} />
                      </a>
                    ) : null}
                    {member.links?.github ? (
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                        aria-label={`${member.displayName} GitHub`}
                      >
                        <Github className="h-3.5 w-3.5" strokeWidth={2} />
                      </a>
                    ) : null}
                    <ChevronRight
                      className="text-line-strong group-hover:text-accent hidden h-3.5 w-3.5 transition-colors lg:block"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </span>
                </div>
              </li>
            )
          })}
        </ul>

        {!filtered.length ? (
          <p className="text-mute px-5 py-10 text-center text-sm">No members match your search.</p>
        ) : null}
      </div>
    </div>
  )
}
