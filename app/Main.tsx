// Main.tsx
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { SPONSORS } from '@/data/sponsors'
import { EVENT, EVENT_SPEC, LINKS } from '@/data/event'
import SponsorsBoard from '@/components/SponsorsBoard'
import SectionHeader from '@/components/SectionHeader'
import CountdownCard from '@/components/CountdownCard'
import Workspace from '@/components/session/Workspace'
import { MapPin, ArrowUpRight, ArrowRight } from 'lucide-react'

type Post = {
  path: string
  title: string
  summary: string
  date: string
  tags?: string[]
  authorsData?: { slug?: string; name?: string; avatar?: string }[]
}

/** Each domain gets its own channel colour, the way a terminal palette assigns one. */
const categories = [
  { name: 'Reverse', hint: 'VMs, crackmes, obfuscation', color: 'var(--c-orange)' },
  { name: 'Web', hint: 'Realistic bugs & chains', color: 'var(--c-cyan)' },
  { name: 'Forensics', hint: 'Artifacts, memory, traffic', color: 'var(--c-green)' },
  { name: 'PWN', hint: 'Exploitation & primitives', color: 'var(--c-red)' },
  { name: 'Crypto', hint: 'Attacks over theory', color: 'var(--c-accent)' },
  { name: 'OSINT', hint: 'Trace, pivot, verify', color: 'var(--c-yellow)' },
  { name: 'Blockchain', hint: 'Blockchain stuff', color: 'var(--c-blue)' },
  { name: 'Misc', hint: 'Curveballs & creativity', color: 'var(--c-mute)' },
]

export default function Main({ posts }: { posts: Post[] }) {
  const latest = posts?.slice(0, 3) ?? []

  return (
    <div className="w-full">
      {/* ---- the workspace: real windows, focusable and re-tileable ---- */}
      <Workspace
        windows={[
          {
            id: 'event',
            title: 'omnictf@finals:~',
            meta: `${EVENT.format} · ${EVENT.durationLabel}`,
            node: (
              <div className="flex flex-1 flex-col justify-center px-5 py-10 sm:px-10 sm:py-14 xl:px-14">
                <h1 className="text-fg text-[clamp(2rem,5.2vw,5rem)] leading-[1.02] font-semibold tracking-[-0.045em]">
                  {EVENT.name}
                </h1>

                <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-base sm:text-xl">
                  <span className="text-accent" aria-hidden>
                    {'>'}
                  </span>
                  <span className="text-fg font-medium">{EVENT.dateLabel}</span>
                  <span className="text-line-strong" aria-hidden>
                    ·
                  </span>
                  <span className="text-accent tabnum font-medium">{EVENT.timeLabel}</span>
                </p>

                <p className="text-mute tabnum mt-1.5 text-xs sm:text-sm">{EVENT.localTimeLabel}</p>

                <a
                  href={EVENT.venueUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border-line bg-inset text-dim hover:border-accent/50 hover:text-fg group mt-6 inline-flex w-fit items-center gap-2 rounded border px-3 py-2 text-sm transition-colors"
                >
                  <MapPin className="text-accent h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  <span>
                    {EVENT.venue} · {EVENT.venueCity}
                  </span>
                  <ArrowUpRight
                    className="text-mute group-hover:text-accent h-3.5 w-3.5 shrink-0 transition-colors"
                    strokeWidth={2}
                    aria-hidden
                  />
                </a>

                <p className="text-dim mt-8 max-w-[68ch] text-sm leading-relaxed sm:text-base">
                  A CTF built on Team work, creativity, and clean execution. Compete at a high level
                  and prove you can ship under pressure.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <a
                    href={LINKS.register}
                    className="bg-accent text-accent-ink hover:bg-accent-strong inline-flex items-center gap-2 rounded px-4 py-2.5 text-sm font-semibold transition-colors"
                  >
                    Register
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                  </a>
                  <a
                    href={LINKS.login}
                    className="border-line-strong text-fg hover:border-accent hover:text-accent inline-flex items-center rounded border px-4 py-2.5 text-sm font-semibold transition-colors"
                  >
                    Login
                  </a>
                  <a
                    href={LINKS.discord}
                    className="text-dim hover:text-fg hover:bg-raise inline-flex items-center gap-2 rounded px-4 py-2.5 text-sm font-medium transition-colors"
                  >
                    Join Discord
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  </a>
                </div>

                <p className="text-mute mt-5 max-w-[62ch] text-xs leading-relaxed">
                  Registration on the competition infrastructure requires completing the form first;
                  you’ll then receive your access code from our staff.
                </p>
              </div>
            ),
          },
          {
            id: 'countdown',
            title: 'Time until kickoff',
            node: <CountdownCard targetIso={EVENT.countdownTargetIso} title="Time until kickoff" frameless />,
          },
          {
            id: 'spec',
            title: 'event.spec',
            node: (
              <div className="flex min-h-0 flex-1 flex-col">
                <dl className="flex-1 divide-y divide-[var(--c-line)] text-xs">
                  {EVENT_SPEC.map(([k, v]) => (
                    <div key={k} className="flex items-baseline gap-3 px-3 py-2">
                      <dt className="text-mute w-[4.5rem] shrink-0">{k}</dt>
                      <dd className="text-dim min-w-0 flex-1 break-words">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="border-line bg-accent-wash text-accent border-t px-3 py-2.5 text-xs font-semibold">
                  12 Spots For 2026 Finals
                </div>
              </div>
            ),
          },
        ]}
      />

      {/* ---- categories ---- */}
      <section id="categories" className="w-full px-[var(--hypr-gap-out)] pt-12 sm:pt-16">
        <SectionHeader
          title="Challenge Categories"
          subtitle="A curated set of problems spanning core offensive & analytical security domains."
        />
        <div className="mt-6 grid grid-cols-1 gap-[var(--hypr-gap-in)] sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-8">
          {categories.map((c) => (
            <div key={c.name} className="pane pane-hover group flex items-stretch overflow-hidden">
              <span
                className="w-[3px] shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
                style={{ background: c.color }}
                aria-hidden
              />
              <div className="min-w-0 p-4">
                <div
                  className="truncate text-sm font-semibold tracking-tight"
                  style={{ color: c.color }}
                >
                  {c.name}
                </div>
                <div className="text-mute mt-1 text-xs">{c.hint}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- sponsors ---- */}
      <section id="sponsors-partners" className="w-full px-[var(--hypr-gap-out)] pt-16 sm:pt-20">
        <SectionHeader
          title="Partnerships & Sponsorships"
          subtitle="Organizations supporting OmniCTF - thank you."
        />

        <SponsorsBoard sponsors={SPONSORS} />
      </section>

      {/* ---- latest posts ---- */}
      {latest.length > 0 && (
        <section className="w-full px-[var(--hypr-gap-out)] pt-16 pb-16 sm:pt-20 sm:pb-20">
          <SectionHeader
            title="Latest posts"
            subtitle="Announcements, writeups, and updates from the team."
            right={
              <Link
                href="/blog"
                className="text-dim hover:text-accent inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              </Link>
            }
          />

          <div className="mt-6 grid grid-cols-1 gap-[var(--hypr-gap-in)] md:grid-cols-3">
            {latest.map((post) => (
              <article key={post.path} className="pane pane-hover flex flex-col overflow-hidden">
                <div className="pane-title justify-between">
                  <time className="tabnum normal-case" dateTime={post.date} suppressHydrationWarning>
                    {formatDate(post.date, siteMetadata.locale)}
                  </time>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-fg hover:text-accent text-base font-semibold tracking-tight transition-colors">
                    <Link href={`/${post.path}`}>{post.title}</Link>
                  </h3>

                  {post.authorsData?.length ? (
                    <div className="text-mute mt-2 flex flex-wrap items-center gap-2 text-xs">
                      {post.authorsData.map((a) => (
                        <span
                          key={`${post.path}-${a.slug ?? a.name}`}
                          className="inline-flex items-center gap-1.5"
                        >
                          {a.avatar ? (
                            <img
                              src={a.avatar}
                              alt=""
                              className="border-line h-4 w-4 rounded-full border object-cover"
                            />
                          ) : null}
                          {a.slug ? (
                            <Link href={`/members/${a.slug}`} className="hover:text-accent">
                              {a.name}
                            </Link>
                          ) : (
                            <span>{a.name}</span>
                          )}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <p className="text-dim mt-3 line-clamp-3 flex-1 text-sm leading-relaxed">
                    {post.summary}
                  </p>

                  {post.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                      {post.tags.slice(0, 3).map((t) => (
                        <Tag key={`${post.path}-${t}`} text={t} />
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
