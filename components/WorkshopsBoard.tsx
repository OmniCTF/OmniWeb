import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { SpeakerEntry, Workshop } from '@/data/workshops'

function hostLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function GroupHeading({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center gap-3">
      <h3 className="text-dim shrink-0 text-xs font-semibold tracking-[0.12em] uppercase">
        {title}
      </h3>
      <span className="bg-line h-px flex-1" aria-hidden />
      <span className="text-mute tabnum shrink-0 text-xs">{count}</span>
    </div>
  )
}

function SiteLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="border-accent/40 text-accent hover:bg-accent hover:text-accent-ink inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-semibold transition-colors"
    >
      {hostLabel(href)}
      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
    </a>
  )
}

function Portrait({ src, alt, size }: { src: string; alt: string; size: 'md' | 'lg' }) {
  return (
    <div
      className={[
        'border-line bg-inset relative shrink-0 overflow-hidden rounded border',
        size === 'lg' ? 'h-24 w-24' : 'h-16 w-16',
      ].join(' ')}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={size === 'lg' ? '96px' : '64px'}
        className="object-cover"
        unoptimized={src.endsWith('.gif')}
      />
    </div>
  )
}

export default function WorkshopsBoard({
  workshops,
  speakers = [],
}: {
  workshops: Workshop[]
  speakers?: SpeakerEntry[]
}) {
  if (!workshops.length && !speakers.length) return null

  return (
    <div>
      {workshops.length > 0 ? (
        <section className="mt-8">
          <GroupHeading title="Workshops" count={workshops.length} />

          <div className="mt-3 grid grid-cols-1 gap-[var(--hypr-gap-in)] lg:grid-cols-2">
            {workshops.map((w) => (
              <article key={w.id} className="pane pane-hover overflow-hidden">
                <div className="pane-title justify-between">
                  <span className="normal-case">workshop.info</span>
                </div>

                <div className="flex flex-col gap-5 p-5 sm:flex-row sm:gap-6">
                  <Portrait src={w.speaker.photo} alt={w.speaker.name} size="lg" />

                  <div className="min-w-0 flex-1">
                    <h4 className="text-fg text-base font-semibold tracking-normal sm:text-lg">
                      {w.title}
                    </h4>

                    <p className="text-mute mt-3 text-xs">by</p>

                    <p className="text-accent mt-1 text-sm font-semibold">{w.speaker.name}</p>

                    {w.speaker.title ? (
                      <p className="text-dim mt-1 text-xs">{w.speaker.title}</p>
                    ) : null}

                    {w.speaker.website ? (
                      <div className="mt-4">
                        <SiteLink href={w.speaker.website} />
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {speakers.length > 0 ? (
        <section className="mt-10">
          <GroupHeading title="Speakers" count={speakers.length} />

          <div className="mt-3 grid grid-cols-1 gap-[var(--hypr-gap-in)] sm:grid-cols-2 lg:grid-cols-3">
            {speakers.map((s) => (
              <article key={s.id} className="pane pane-hover overflow-hidden">
                <div className="pane-title justify-between">
                  <span className="normal-case">speaker.info</span>
                </div>

                <div className="flex items-center gap-4 p-5">
                  <Portrait src={s.photo} alt={s.name} size="md" />

                  <div className="min-w-0 flex-1">
                    <p className="text-fg truncate text-sm font-semibold">{s.name}</p>

                    {s.title ? <p className="text-dim mt-1 text-xs">{s.title}</p> : null}

                    {s.website ? (
                      <div className="mt-3">
                        <SiteLink href={s.website} />
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
