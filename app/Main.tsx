import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { SPONSORS } from '@/data/sponsors'
import SponsorsTabs from '@/components/SponsorsTabs'
import SectionHeader from '@/components/SectionHeader'
import CountdownCard from '@/components/CountdownCard'

type Post = {
  path: string
  title: string
  summary: string
  date: string
  tags?: string[]
  authorsData?: { slug?: string; name?: string; avatar?: string }[]
}

const EVENT = {
  name: 'OmniCTF 2026',
  format: 'Online',
  durationLabel: '48 hours',
  dateLabel: '17th - 19th July',
  timeLabel: '15:00 PM – 15:00 PM UTC',
  mode: 'countdown' as 'preparing' | 'countdown',
  countdownTargetIso: '2026-07-17T18:00:00.000Z',
}

const LINKS = {
  discord: 'https://discord.gg/jzZkfh9UFR',
  register: 'https://ctf.omnictf.com/register',
  login: 'https://ctf.omnictf.com/login',
  requirements: 'https://ctf.omnictf.com/requirements',
}

const categories = [
  { name: 'Reverse', hint: 'VMs, crackmes, obfuscation' },
  { name: 'Web', hint: 'Realistic bugs & chains' },
  { name: 'Forensics', hint: 'Artifacts, memory, traffic' },
  { name: 'PWN', hint: 'Exploitation & primitives' },
  { name: 'Crypto', hint: 'Attacks over theory' },
  { name: 'OSINT', hint: 'Trace, pivot, verify' },
  { name: 'Blockchain', hint: 'Blockchain stuff' },
  { name: 'Misc', hint: 'Curveballs & creativity' },
]

export default function Main({ posts }: { posts: Post[] }) {
  const latest = posts?.slice(0, 3) ?? []

  return (
    <div className="space-y-24 overflow-x-hidden">
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-[-220px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.20),transparent_70%)] blur-2xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:pt-20 sm:pb-16">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-white/70 px-3 py-1 text-xs font-semibold tracking-wide text-violet-700 shadow-sm backdrop-blur dark:border-violet-400/20 dark:bg-zinc-900/55 dark:text-violet-300">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500" />
              {EVENT.format.toUpperCase()} · {EVENT.durationLabel.toUpperCase()}
            </span>

            <h1 className="mt-6 bg-gradient-to-b from-zinc-950 to-zinc-700 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl md:text-6xl dark:from-white dark:to-zinc-300">
              {EVENT.name}
            </h1>

            <p className="mt-4 text-lg font-semibold text-violet-700 dark:text-violet-300 sm:text-xl">
              {'>'} &nbsp; {EVENT.dateLabel} &nbsp; {'·'} &nbsp; {EVENT.timeLabel}
            </p>

            <p className="mx-auto mt-6 max-w-2xl text-balance text-zinc-700 dark:text-zinc-300">
              A CTF built on Team work, creativity, and clean execution. 
              Compete at a high level and prove you can ship under pressure.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {EVENT.mode === 'countdown' ? (
                <CountdownCard targetIso={EVENT.countdownTargetIso} title="Time until kickoff" />
              ) : (
                <div className="rounded-2xl border border-red-500/25 bg-red-500/10 px-6 py-4 text-center text-sm font-semibold text-red-600 shadow-sm dark:border-red-400/20 dark:text-red-300">
                  Preparing for the 2026 event. Be ready.
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Pill>?? Spots For 2026 Finals</Pill>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href={LINKS.discord}
                className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-400/50 dark:border-white/15 dark:bg-zinc-900/50 dark:text-white dark:hover:bg-zinc-900"
              >
                Join Discord
              </a>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-zinc-600 dark:text-zinc-400">
              Registration on the competition infrastructure requires completing the form first; you’ll
              then receive your access code from our staff.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href={LINKS.register}
                className="inline-flex items-center justify-center rounded-xl border border-violet-500/25 bg-white/70 px-5 py-2.5 text-sm font-semibold text-violet-800 shadow-sm backdrop-blur transition hover:border-violet-500/50 hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-400/50 dark:border-violet-400/20 dark:bg-zinc-900/50 dark:text-violet-200 dark:hover:bg-zinc-900"
              >
                Register
              </a>
              <a
                href={LINKS.login}
                className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
              >
                Login
              </a>
              <a
                href={LINKS.requirements}
                className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-400/50 dark:border-white/15 dark:bg-zinc-900/50 dark:text-white dark:hover:bg-zinc-900"
              >
                Requirements
              </a>
            </div>

            <div className="mx-auto mt-14 h-px max-w-4xl bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />
          </div>
        </div>
      </section>

      <section id="sponsors-partners" className="mx-auto max-w-6xl px-4">
        <SectionHeader
          title="Partnerships & Sponsorships"
          subtitle="Organizations supporting OmniCTF — thank you."
        />
        <SponsorsTabs sponsors={SPONSORS} />
        <div className="mx-auto mt-12 h-px max-w-5xl bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />
      </section>

      <section id="categories" className="mx-auto max-w-6xl px-4">
        <SectionHeader
          title="Challenge Categories"
          subtitle="A curated set of problems spanning core offensive & analytical security domains."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {categories.map((c) => (
            <div
              key={c.name}
              className="group relative overflow-hidden rounded-2xl border border-violet-500/15 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-violet-500/40 hover:shadow-md dark:border-violet-400/10 dark:bg-zinc-900/50"
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -left-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-violet-500/15 blur-2xl" />
                <div className="absolute -right-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-2xl" />
              </div>
              <div className="relative">
                <div className="text-lg font-extrabold tracking-tight text-violet-800 dark:text-violet-300">
                  {c.name}
                </div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{c.hint}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {latest.length > 0 && (
        <section className="mx-auto max-w-6xl px-4">
          <SectionHeader
            title="Latest posts"
            subtitle="Announcements, writeups, and updates from the team."
            right={
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-400/50 dark:border-violet-400/20 dark:bg-zinc-900/50 dark:text-violet-200 dark:hover:bg-zinc-900"
              >
                View all <span className="opacity-70">→</span>
              </Link>
            }
          />

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {latest.map((post) => (
              <article
                key={post.path}
                className="rounded-2xl border border-violet-500/15 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-violet-400/10 dark:bg-zinc-900/50"
              >
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    <time dateTime={post.date} suppressHydrationWarning>
                      {formatDate(post.date, siteMetadata.locale)}
                    </time>
                  </dd>
                </dl>

                <h3 className="mt-3 text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                  <Link href={`/${post.path}`}>{post.title}</Link>
                </h3>

                {post.authorsData?.length ? (
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    {post.authorsData.map((a) => (
                      <span key={`${post.path}-${a.slug ?? a.name}`} className="inline-flex items-center gap-2">
                        {a.avatar ? (
                          <img src={a.avatar} alt={a.name ?? 'Author'} className="h-5 w-5 rounded-full" />
                        ) : null}
                        {a.slug ? <Link href={`/members/${a.slug}`}>{a.name}</Link> : <span>{a.name}</span>}
                      </span>
                    ))}
                  </div>
                ) : null}

                <p className="mt-3 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {post.summary}
                </p>

                {post.tags?.length ? (
                  <div className="mt-4 flex flex-wrap">
                    {post.tags.slice(0, 3).map((t) => (
                      <Tag key={`${post.path}-${t}`} text={t} />
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      )}

      {siteMetadata.newsletter?.provider && (
        <section className="mx-auto max-w-2xl px-4 pb-8">
          <div className="rounded-3xl bg-gradient-to-b from-violet-500/25 via-violet-500/10 to-transparent p-[1px]">
            <div className="rounded-3xl border border-violet-500/15 bg-white/70 p-6 shadow-lg shadow-violet-500/10 backdrop-blur dark:border-violet-400/10 dark:bg-zinc-900/60">
              <NewsletterForm />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-violet-500/20 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-800 shadow-sm backdrop-blur dark:border-violet-400/15 dark:bg-zinc-900/45 dark:text-zinc-200">
      {children}
    </span>
  )
}
