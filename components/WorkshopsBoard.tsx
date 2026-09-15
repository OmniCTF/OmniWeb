import Image from 'next/image'
import type { Workshop } from '@/data/workshops'

export default function WorkshopsBoard({ workshops }: { workshops: Workshop[] }) {
  if (!workshops.length) return null

  return (
    <div>
      <section className="mt-8">
        <div className="flex items-center gap-3">
          <h3 className="text-dim shrink-0 text-xs font-semibold tracking-[0.12em] uppercase">
            Workshops
          </h3>
          <span className="bg-line h-px flex-1" aria-hidden />
          <span className="text-mute tabnum shrink-0 text-xs">{workshops.length}</span>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-[var(--hypr-gap-in)] lg:grid-cols-2">
          {workshops.map((w) => (
            <article key={w.id} className="pane pane-hover overflow-hidden">
              <div className="pane-title justify-between">
                <span className="normal-case">workshop.info</span>
              </div>

              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:gap-6">
                <div className="border-line bg-inset relative h-24 w-24 shrink-0 overflow-hidden rounded border">
                  <Image
                    src={w.speaker.photo}
                    alt={w.speaker.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-fg text-base font-semibold tracking-normal sm:text-lg">
                    {w.title}
                  </h4>

                  <p className="text-mute mt-3 text-xs">by</p>

                  <p className="text-accent mt-1 text-sm font-semibold">{w.speaker.name}</p>

                  {w.speaker.title ? (
                    <p className="text-dim mt-1 text-xs">{w.speaker.title}</p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
