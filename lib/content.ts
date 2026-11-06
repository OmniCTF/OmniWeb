// Replaces pliny/utils/contentlayer. Type-only imports, so client components can use it.
export type { Blog } from '@/qino/collections/blog'
export type { Author } from '@/qino/collections/authors'

type MarkdownEntry = { markdown: string; raw: string }

export type CoreContent<T> = Omit<T, 'markdown' | 'raw'>

const isProduction = process.env.NODE_ENV === 'production'

// Drops the Markdown body so it doesn't end up in client props or search.json.
export function coreContent<T extends MarkdownEntry>(content: T): CoreContent<T> {
  const { markdown: _markdown, raw: _raw, ...rest } = content
  return rest
}

export function allCoreContent<T extends MarkdownEntry & { draft?: boolean }>(
  contents: Array<T>
) {
  const cores = contents.map((content) => coreContent(content))
  return isProduction ? cores.filter((content) => content.draft !== true) : cores
}

export function sortPosts<T extends { date: string }>(posts: Array<T>) {
  return [...posts].sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))
}
