import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { allBlogs } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'
import { Globe, Github, ArrowLeft, ChevronRight } from 'lucide-react'

export const dynamicParams = false

interface MemberPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'data/authors')
  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'))
  return files.map((file) => ({ slug: file.replace('.mdx', '') }))
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-line/70 flex flex-col gap-1 border-b py-2.5 last:border-b-0 sm:flex-row sm:gap-4">
      <dt className="text-mute w-24 shrink-0 text-xs">{label}</dt>
      <dd className="text-dim min-w-0 flex-1 text-xs leading-relaxed">{children}</dd>
    </div>
  )
}

export default async function MemberProfile({ params }: MemberPageProps) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'data/authors', `${slug}.mdx`)
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
      links?: { website?: string; github?: string }
      nowListening?: { title: string; artist: string; url: string }
    }
  }

  const posts = allBlogs.filter((post) => post.authors?.includes(slug))
  const retired = (member.position ?? '').toLowerCase().includes('retired')

  return (
    <div className="w-full p-2 sm:p-3">
      <div className="grid grid-cols-1 gap-2 sm:gap-3 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        {/* identity */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="pane pane-focus overflow-hidden">
            <div className="pane-title justify-between">
              <span className="normal-case">whoami</span>
              <span className="tabnum normal-case">{member.id != null ? `#${member.id}` : ''}</span>
            </div>

            <div className="p-5">
              <div className="flex items-start gap-4">
                {member.avatar ? (
                  <Image
                    src={member.avatar}
                    alt=""
                    width={88}
                    height={88}
                    className={[
                      'border-line h-22 w-22 shrink-0 rounded border object-cover',
                      retired ? 'grayscale' : '',
                    ].join(' ')}
                  />
                ) : (
                  <div className="bg-inset border-line h-22 w-22 shrink-0 rounded border" />
                )}

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-fg text-2xl font-semibold tracking-[-0.035em]">
                      {member.displayName}
                    </h1>
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
                  </div>

                  {member.position ? (
                    <p className={['mt-1 text-sm', retired ? 'text-mute' : 'text-accent'].join(' ')}>
                      {member.position}
                    </p>
                  ) : null}

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {member.links?.website ? (
                      <a
                        href={member.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-line bg-inset text-dim hover:border-accent/50 hover:text-accent flex h-7 w-7 items-center justify-center rounded border transition-colors"
                        aria-label="Website"
                      >
                        <Globe className="h-3.5 w-3.5" strokeWidth={2} />
                      </a>
                    ) : null}
                    {member.links?.github ? (
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-line bg-inset text-dim hover:border-accent/50 hover:text-accent flex h-7 w-7 items-center justify-center rounded border transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="h-3.5 w-3.5" strokeWidth={2} />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <dl className="mt-5">
                <Row label="handle">{member.name}</Row>
                {member.joined ? <Row label="joined">Joined {member.joined}</Row> : null}
                {member.country ? (
                  <Row label="country">
                    <span className="flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://flagcdn.com/w40/${member.country.toLowerCase()}.png`}
                        alt={member.country}
                        className="border-line h-3 w-[18px] rounded-[2px] border object-cover"
                      />
                      <span className="uppercase">{member.country}</span>
                    </span>
                  </Row>
                ) : null}
                {member.tags?.length ? (
                  <Row label="focus">
                    <span className="flex flex-wrap gap-x-3 gap-y-1">
                      {member.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/tags/${encodeURIComponent(tag)}`}
                          className="text-accent hover:text-accent-strong transition-colors"
                        >
                          <span className="text-mute" aria-hidden>
                            --
                          </span>
                          {tag}
                        </Link>
                      ))}
                    </span>
                  </Row>
                ) : null}
                <Row label="writeups">{posts.length}</Row>
              </dl>
            </div>
          </div>

          {member.bio ? (
            <div className="pane overflow-hidden">
              <div className="pane-title">bio</div>
              <p className="text-dim p-5 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ) : null}

          {member.nowListening?.url ? (
            <div className="pane overflow-hidden">
              <div className="pane-title justify-between">
                <span>Now playing</span>
                <span className="bg-ansi-green inline-block h-1.5 w-1.5 rounded-full" aria-hidden />
              </div>
              <div className="p-5">
                <div className="text-fg text-sm font-semibold">{member.nowListening.title}</div>
                <div className="text-mute mt-0.5 text-xs">{member.nowListening.artist}</div>
                <audio controls className="mt-3 h-9 w-full">
                  <source src={member.nowListening.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          ) : null}

          <Link
            href="/members"
            className="text-mute hover:text-fg flex items-center gap-1.5 px-1 py-1 text-xs transition-colors"
          >
            <ArrowLeft className="h-3 w-3" strokeWidth={2} aria-hidden />
            All members
          </Link>
        </div>

        {/* output */}
        <div className="pane min-w-0 overflow-hidden">
          <div className="pane-title justify-between">
            <span className="normal-case">~/members/{slug}/writeups</span>
            <span className="tabnum normal-case">{posts.length}</span>
          </div>

          <div className="border-line border-b px-5 py-5">
            <h2 className="text-fg text-xl font-semibold tracking-tight">Writeups</h2>
            <p className="text-mute mt-1.5 text-sm">Posts authored by this member.</p>
          </div>

          {posts.length ? (
            <ul className="divide-y divide-[var(--c-line)]">
              {posts.map((post) => (
                <li key={post.slug} className="hover:bg-raise/70 group transition-colors">
                  <Link href={`/blog/${post.slug}`} className="block px-5 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-fg group-hover:text-accent text-base font-semibold tracking-tight transition-colors">
                        {post.title}
                      </h3>
                      <span className="text-mute tabnum shrink-0 text-xs">{post.date}</span>
                    </div>
                    {post.summary ? (
                      <p className="text-dim mt-2 line-clamp-2 max-w-[85ch] text-sm leading-relaxed">
                        {post.summary}
                      </p>
                    ) : null}
                    {post.tags?.length ? (
                      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                        {post.tags.slice(0, 5).map((tag) => (
                          <span key={`${post.slug}-${tag}`} className="text-mute text-xs">
                            <span aria-hidden>--</span>
                            {tag}
                          </span>
                        ))}
                        <ChevronRight
                          className="text-line-strong group-hover:text-accent ml-auto h-3.5 w-3.5 transition-colors"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </div>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-mute px-5 py-10 text-sm">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
