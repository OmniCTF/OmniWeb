import Link from '@/components/Link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import Window from '@/components/Window'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="w-full p-2 sm:p-3">
      <Window
        title="~/tags"
        meta={`${tagKeys.length} tags`}
        focus
        bodyClassName="p-5 sm:p-8 lg:p-12"
      >
        <h1 className="text-fg text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Tags</h1>
        <p className="text-mute mt-3 text-sm">Every topic the writeups cover, by frequency.</p>

        {tagKeys.length === 0 ? (
          <p className="text-mute mt-8 text-sm">No tags found.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 2xl:grid-cols-6">
            {sortedTags.map((t) => (
              <Link
                key={t}
                href={`/tags/${slug(t)}`}
                aria-label={`View posts tagged ${t}`}
                className="pane pane-hover group flex items-center justify-between gap-3 px-4 py-3"
              >
                <span className="text-fg group-hover:text-accent min-w-0 truncate text-sm font-medium transition-colors">
                  <span className="text-mute" aria-hidden>
                    --
                  </span>
                  {t.split(' ').join('-')}
                </span>
                <span className="text-mute tabnum shrink-0 text-xs">{tagCounts[t]}</span>
              </Link>
            ))}
          </div>
        )}
      </Window>
    </div>
  )
}
