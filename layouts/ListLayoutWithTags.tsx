'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  const btn =
    'inline-flex items-center gap-1.5 rounded border border-line px-3 py-1.5 text-xs font-medium transition-colors'

  return (
    <nav className="border-line flex items-center justify-between border-t px-5 py-4">
      {prevPage ? (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          rel="prev"
          className={`${btn} text-dim hover:border-accent/50 hover:text-accent`}
        >
          <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          Previous
        </Link>
      ) : (
        <span className={`${btn} text-mute opacity-40`}>
          <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          Previous
        </span>
      )}

      <span className="text-mute tabnum text-xs">
        {currentPage} of {totalPages}
      </span>

      {nextPage ? (
        <Link
          href={`/${basePath}/page/${currentPage + 1}`}
          rel="next"
          className={`${btn} text-dim hover:border-accent/50 hover:text-accent`}
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        </Link>
      ) : (
        <span className={`${btn} text-mute opacity-40`}>
          Next
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        </span>
      )}
    </nav>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const activeTag = decodeURI(pathname.split('/tags/')[1] ?? '')

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="w-full p-2 sm:p-3">
      <div className="grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="pane sticky top-15 hidden max-h-[calc(100vh-4.5rem)] self-start overflow-hidden lg:flex lg:flex-col">
          <div className="pane-title shrink-0">filter</div>
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            <Link
              href="/blog"
              className={[
                'flex items-center justify-between rounded px-3 py-2 text-xs font-semibold transition-colors',
                pathname.startsWith('/blog')
                  ? 'bg-accent text-accent-ink'
                  : 'text-dim hover:bg-raise hover:text-fg',
              ].join(' ')}
            >
              All Posts
              <span className="tabnum opacity-70">{posts.length}</span>
            </Link>

            <div className="bg-line my-2 h-px" />

            <ul>
              {sortedTags.map((t) => {
                const active = activeTag === slug(t)
                return (
                  <li key={t}>
                    <Link
                      href={`/tags/${slug(t)}`}
                      aria-label={`View posts tagged ${t}`}
                      aria-current={active ? 'page' : undefined}
                      className={[
                        'flex items-center justify-between gap-2 rounded px-3 py-1.5 text-xs transition-colors',
                        active ? 'text-accent bg-accent-wash' : 'text-dim hover:bg-raise hover:text-fg',
                      ].join(' ')}
                    >
                      <span className="min-w-0 truncate">
                        <span className="text-mute" aria-hidden>
                          --
                        </span>
                        {t.split(' ').join('-')}
                      </span>
                      <span className="tabnum text-mute shrink-0">{tagCounts[t]}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>

        <div className="pane min-w-0 overflow-hidden">
          <div className="pane-title justify-between">
            <span className="normal-case">{activeTag ? `~/tags/${activeTag}` : '~/blog'}</span>
            <span className="tabnum normal-case">{posts.length} posts</span>
          </div>

          <div className="border-line border-b px-5 py-5 lg:hidden">
            <h1 className="text-fg text-2xl font-semibold tracking-[-0.035em]">{title}</h1>
          </div>

          <ul className="divide-y divide-[var(--c-line)]">
            {displayPosts.map((post) => {
              const { path, date, title: postTitle, summary, tags } = post
              const authors = (post as { authorsData?: { slug?: string; name?: string; avatar?: string }[] })
                .authorsData

              return (
                <li key={path} className="hover:bg-raise/60 group transition-colors">
                  <article className="grid grid-cols-1 gap-x-8 gap-y-2 px-5 py-6 lg:grid-cols-[8.5rem_minmax(0,1fr)]">
                    <div className="flex flex-col gap-2">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-mute tabnum text-xs">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                        </dd>
                      </dl>
                      {authors?.length ? (
                        <div className="flex flex-wrap items-center gap-2">
                          {authors.map((author) => (
                            <Link
                              key={author.slug}
                              href={`/members/${author.slug}`}
                              className="text-mute hover:text-accent flex items-center gap-1.5 text-xs transition-colors"
                            >
                              {author.avatar ? (
                                <img
                                  src={author.avatar}
                                  alt=""
                                  className="border-line h-4 w-4 rounded-full border object-cover"
                                />
                              ) : null}
                              <span>{author.name}</span>
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-lg leading-snug font-semibold tracking-tight">
                        <Link
                          href={`/${path}`}
                          className="text-fg group-hover:text-accent transition-colors"
                        >
                          {postTitle}
                        </Link>
                      </h2>

                      {tags?.length ? (
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      ) : null}

                      <p className="text-dim mt-3 max-w-[85ch] text-sm leading-relaxed">{summary}</p>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>

          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}
