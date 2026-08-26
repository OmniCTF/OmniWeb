import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostSimple({ content, next, prev, children }: LayoutProps) {
  const { path, slug, date, title } = content

  return (
    <div className="w-full p-2 sm:p-3">
      <ScrollTopAndComment />
      <article className="pane overflow-hidden">
        <div className="pane-title justify-between">
          <span className="min-w-0 truncate normal-case">~/{path}</span>
          <span className="tabnum normal-case">
            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
          </span>
        </div>

        <div className="px-5 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto max-w-[76ch]">
            <h1 className="text-fg text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl">
              {title}
            </h1>
            <div className="bg-line mt-8 h-px" />
            <div className="prose prose-invert mt-10 max-w-none">{children}</div>

            {siteMetadata.comments ? (
              <div className="border-line mt-12 border-t pt-8" id="comment">
                <Comments slug={slug} />
              </div>
            ) : null}

            <footer className="border-line mt-12 flex flex-col gap-4 border-t pt-6 text-sm sm:flex-row sm:justify-between">
              {prev?.path ? (
                <Link
                  href={`/${prev.path}`}
                  className="text-accent hover:text-accent-strong flex items-center gap-1.5 transition-colors"
                  aria-label={`Previous post: ${prev.title}`}
                >
                  <ChevronLeft className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  {prev.title}
                </Link>
              ) : (
                <span />
              )}
              {next?.path ? (
                <Link
                  href={`/${next.path}`}
                  className="text-accent hover:text-accent-strong flex items-center gap-1.5 transition-colors"
                  aria-label={`Next post: ${next.title}`}
                >
                  {next.title}
                  <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                </Link>
              ) : null}
            </footer>
          </div>
        </div>
      </article>
    </div>
  )
}
