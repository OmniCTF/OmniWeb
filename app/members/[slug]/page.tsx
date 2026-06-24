import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { allBlogs } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'
import { Globe, Github } from 'lucide-react'

export const dynamicParams = false


interface MemberPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'data/authors')
  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'))
  return files.map((file) => ({ slug: file.replace('.mdx', '') }))
}

export default function MemberProfile({ params }: MemberPageProps) {
  const filePath = path.join(process.cwd(), 'data/authors', `${params.slug}.mdx`)
  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data: member } = matter(fileContent) as {
    data: {
      id?: number
      is_admin?: boolean
      name: string
      displayName: string
      avatar?: string
      country?: string
      joined?: string
      position?: string
      bio?: string
      tags?: string[]
      links?: {
        website?: string
        github?: string
      }
      nowListening?: {
        title: string
        artist: string
        url: string
      }
    }
  }

  const posts = allBlogs.filter((post) => post.authors?.includes(params.slug))
  const retired = (member.position ?? '').toLowerCase().includes('retired')

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div
        className={`rounded-3xl p-[1px] ${
          retired
            ? 'bg-gradient-to-b from-zinc-400/20 via-transparent to-transparent'
            : 'bg-gradient-to-b from-violet-500/20 via-transparent to-transparent'
        }`}
      >
        <div
          className={`rounded-3xl border p-6 shadow-lg backdrop-blur ${
            retired
              ? 'border-zinc-300/60 bg-zinc-100/60 opacity-80 shadow-zinc-500/10 grayscale dark:border-white/10 dark:bg-zinc-900/50'
              : 'border-violet-500/15 bg-white/70 shadow-violet-500/10 dark:border-violet-400/10 dark:bg-zinc-900/60'
          }`}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {member.avatar ? (
              <Image
                src={member.avatar}
                alt={member.name}
                width={120}
                height={120}
                className="rounded-full border border-white/10 object-cover"
              />
            ) : (
              <div className="h-[120px] w-[120px] rounded-full bg-zinc-200 dark:bg-zinc-700" />
            )}

            <div className="flex-1">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {member.displayName}
                    </h1>
                    {member.is_admin ? (
                      <span className="rounded-full border border-amber-500/40 bg-amber-500/15 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                        Admin
                      </span>
                    ) : null}
                    {retired ? (
                      <span className="rounded-full border border-zinc-400/40 bg-zinc-400/15 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                        Retired
                      </span>
                    ) : null}
                  </div>
                  {member.position ? (
                    <p
                      className={`mt-1 text-sm font-semibold ${
                        retired
                          ? 'text-zinc-500 dark:text-zinc-400'
                          : 'text-violet-700 dark:text-violet-300'
                      }`}
                    >
                      {member.position}
                    </p>
                  ) : null}
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    {member.joined ? <span>Joined {member.joined}</span> : null}
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

                <div className="flex items-center gap-3">
                  {member.links?.website ? (
                    <a
                      href={member.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white/70 p-2 text-zinc-700 shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md dark:border-white/15 dark:bg-zinc-950/20 dark:text-zinc-200"
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
                      className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white/70 p-2 text-zinc-700 shadow-sm backdrop-blur transition hover:bg-white hover:shadow-md dark:border-white/15 dark:bg-zinc-950/20 dark:text-zinc-200"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  ) : null}
                </div>
              </div>

              {(member.tags ?? []).length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.tags?.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="rounded-full border border-violet-500/20 bg-violet-500/5 px-2.5 py-1 text-xs font-semibold text-violet-800 transition hover:border-violet-500/40 hover:bg-violet-500/10 dark:border-violet-400/15 dark:text-violet-200"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              ) : null}

              {member.nowListening?.url ? (
                <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
                  <div className="text-xs font-extrabold uppercase tracking-wide text-violet-700 dark:text-violet-200">
                    Now playing
                  </div>
                  <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {member.nowListening.title}
                      </div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-300">
                        {member.nowListening.artist}
                      </div>
                    </div>
                    <audio controls className="h-10 w-full rounded md:w-[360px]">
                      <source src={member.nowListening.url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {member.bio ? (
        <div className="mt-8 rounded-2xl border border-zinc-300 bg-white/70 p-6 text-zinc-700 shadow-sm backdrop-blur dark:border-white/15 dark:bg-zinc-900/50 dark:text-zinc-300">
          {member.bio}
        </div>
      ) : null}

      <div className="mt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Writeups
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Posts authored by this member.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-2xl border border-violet-500/15 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-violet-400/10 dark:bg-zinc-900/50"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {post.title}
                </h3>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {post.date}
                </span>
              </div>
              {post.summary ? (
                <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {post.summary}
                </p>
              ) : null}
              {post.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.slice(0, 5).map((tag) => (
                    <span
                      key={`${post.slug}-${tag}`}
                      className="rounded-full border border-violet-500/20 bg-violet-500/5 px-2.5 py-1 text-xs font-semibold text-violet-800 dark:border-violet-400/15 dark:text-violet-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          ))}
        </div>

        {!posts.length ? (
          <div className="mt-6 rounded-2xl border border-zinc-300 bg-white/70 p-6 text-sm text-zinc-600 shadow-sm backdrop-blur dark:border-white/15 dark:bg-zinc-900/50 dark:text-zinc-300">
            No posts yet.
          </div>
        ) : null}
      </div>
    </div>
  )
}
