import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: (CoreContent<Authors> & { slug: string })[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

function RailHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-mute text-[11px] font-semibold tracking-[0.12em] uppercase">{children}</h2>
  )
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, readingTime } = content as CoreContent<Blog> & {
    readingTime?: { text?: string }
  }
  const basePath = path.split('/')[0]

  return (
    <div className="w-full p-2 sm:p-3">
      <ScrollTopAndComment />

      <div className="grid grid-cols-1 gap-2 sm:gap-3 xl:grid-cols-[280px_minmax(0,1fr)]">
        {/* metadata rail: the file info pane */}
        <aside className="pane sticky top-15 hidden max-h-[calc(100vh-4.5rem)] self-start overflow-hidden xl:flex xl:flex-col">
          <div className="pane-title shrink-0">post.info</div>
          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4">
            <div>
              <RailHeading>Published</RailHeading>
              <p className="text-dim mt-2 text-xs">
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                </time>
              </p>
              {readingTime?.text ? (
                <p className="text-mute mt-1 text-xs">{readingTime.text}</p>
              ) : null}
            </div>

            {authorDetails.length > 0 ? (
              <div>
                <RailHeading>Authors</RailHeading>
                <ul className="mt-2 space-y-2">
                  {authorDetails.map((author) => (
                    <li key={author.name}>
                      <Link
                        href={`/members/${author.slug}`}
                        className="text-dim hover:text-accent flex items-center gap-2 text-xs transition-colors"
                      >
                        {author.avatar ? (
                          <Image
                            src={author.avatar}
                            width={24}
                            height={24}
                            alt=""
                            className="border-line h-6 w-6 rounded-full border object-cover"
                          />
                        ) : null}
                        <span className="min-w-0 truncate">{author.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {tags?.length ? (
              <div>
                <RailHeading>Tags</RailHeading>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
            ) : null}

            {prev?.path || next?.path ? (
              <div className="space-y-4">
                {prev?.path ? (
                  <div>
                    <RailHeading>Previous Article</RailHeading>
                    <Link
                      href={`/${prev.path}`}
                      className="text-accent hover:text-accent-strong mt-1.5 flex items-start gap-1 text-xs leading-snug transition-colors"
                    >
                      <ChevronLeft className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                      <span>{prev.title}</span>
                    </Link>
                  </div>
                ) : null}
                {next?.path ? (
                  <div>
                    <RailHeading>Next Article</RailHeading>
                    <Link
                      href={`/${next.path}`}
                      className="text-accent hover:text-accent-strong mt-1.5 flex items-start gap-1 text-xs leading-snug transition-colors"
                    >
                      <span>{next.title}</span>
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
                    </Link>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="border-line space-y-2 border-t pt-4">
              <Link
                href={editUrl(filePath)}
                className="text-dim hover:text-accent flex items-center gap-1.5 text-xs transition-colors"
              >
                View on GitHub
                <ArrowUpRight className="h-3 w-3" strokeWidth={2} aria-hidden />
              </Link>
              <Link
                href={discussUrl(path)}
                rel="nofollow"
                className="text-dim hover:text-accent flex items-center gap-1.5 text-xs transition-colors"
              >
                Discuss on Twitter
                <ArrowUpRight className="h-3 w-3" strokeWidth={2} aria-hidden />
              </Link>
              <Link
                href={`/${basePath}`}
                aria-label="Back to the blog"
                className="text-mute hover:text-fg flex items-center gap-1.5 pt-1 text-xs transition-colors"
              >
                <ArrowLeft className="h-3 w-3" strokeWidth={2} aria-hidden />
                Back to the blog
              </Link>
            </div>
          </div>
        </aside>

        {/* the document */}
        <article className="pane min-w-0 overflow-hidden">
          <div className="pane-title justify-between">
            <span className="min-w-0 truncate normal-case">~/{path}</span>
            <span className="tabnum shrink-0 normal-case">
              <time dateTime={date}>
                {new Date(date).toLocaleDateString(siteMetadata.locale, {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                })}
              </time>
            </span>
          </div>

          <div className="px-5 py-10 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-[76ch]">
              <h1 className="text-fg text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl">
                {title}
              </h1>

              <div className="text-mute mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
                {authorDetails.map((author, i) => (
                  <span key={author.name} className="flex items-center gap-1.5">
                    {i > 0 ? <span aria-hidden>·</span> : null}
                    {author.avatar ? (
                      <Image
                        src={author.avatar}
                        width={20}
                        height={20}
                        alt=""
                        className="border-line h-5 w-5 rounded-full border object-cover"
                      />
                    ) : null}
                    <Link href={`/members/${author.slug}`} className="hover:text-accent transition-colors">
                      {author.name}
                    </Link>
                  </span>
                ))}
              </div>

              <div className="bg-line mt-8 h-px" />

              <div className="prose prose-invert mt-10 max-w-none">{children}</div>

              {tags?.length ? (
                <div className="border-line mt-12 flex flex-wrap gap-x-3 gap-y-1.5 border-t pt-6 xl:hidden">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              ) : null}

              {siteMetadata.comments ? (
                <div className="border-line mt-12 border-t pt-8" id="comment">
                  <Comments slug={slug} />
                </div>
              ) : null}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
