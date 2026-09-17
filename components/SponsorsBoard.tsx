'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, X } from 'lucide-react'
import { sponsorTiers, type Sponsor } from '@/data/sponsors'

const TIERS = ['Partner', 'Platinum', 'Gold', 'Silver', 'Bronze', 'Community', 'Infra'] as const

const TIER_TITLES: Record<string, string> = {
  Partner: 'Partners',
  Platinum: 'Platinum Sponsors',
  Gold: 'Gold Sponsors',
  Silver: 'Silver Sponsors',
  Bronze: 'Bronze Sponsors',
  Community: 'Community Sponsors',
  Infra: 'Infrastructure Sponsor',
}

function Detail({
  sponsor,
  tier,
  onClose,
}: {
  sponsor: Sponsor
  tier: string
  onClose: () => void
}) {
  return (
    <div
      id={`sponsor-panel-${tier}-${sponsor.id}`}
      role="tabpanel"
      className="pane pane-focus mt-[var(--hypr-gap-in)] overflow-hidden"
    >
      <div className="pane-title justify-between">
        <span className="normal-case">sponsor.info</span>
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${sponsor.name} details`}
          className="text-mute hover:text-fg -mr-1 flex h-5 w-5 items-center justify-center rounded transition-colors"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>

      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:gap-6">
        <div className="border-line bg-inset relative h-20 w-20 shrink-0 overflow-hidden rounded border">
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            fill
            sizes="80px"
            className="object-contain p-2"
            priority
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-fg text-lg font-semibold tracking-normal">{sponsor.name}</h3>
            <span className="border-accent/30 bg-accent-wash text-accent rounded border px-2 py-0.5 text-[11px] font-semibold">
              {tier}
            </span>
          </div>

          <p className="text-dim mt-2.5 max-w-[85ch] text-sm leading-relaxed">
            {sponsor.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {sponsor.website ? (
              <a
                href={sponsor.website}
                target="_blank"
                rel="noreferrer"
                className="border-accent/40 text-accent hover:bg-accent hover:text-accent-ink inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-semibold transition-colors"
              >
                Visit website
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              </a>
            ) : null}
            {sponsor.links?.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="border-line text-dim hover:border-line-strong hover:text-fg inline-flex items-center rounded border px-3 py-1.5 text-xs font-medium transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SponsorsBoard({ sponsors }: { sponsors: Sponsor[] }) {
  // Keyed by tier as well as id: a sponsor holding two tiers is listed twice,
  // and only the tile that was clicked should open.
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const groups = useMemo(
    () =>
      TIERS.map((tier) => ({
        tier,
        list: sponsors.filter((s) => sponsorTiers(s).includes(tier)),
      })).filter((g) => g.list.length > 0),
    [sponsors]
  )

  if (!sponsors.length) return null

  return (
    <div>
      {groups.map(({ tier, list }) => {
        const openHere = list.find((s) => `${tier}:${s.id}` === selectedKey) ?? null
        return (
          <section key={tier} className="mt-10 first:mt-8">
            <div className="flex items-center gap-3">
              <h3 className="text-dim shrink-0 text-xs font-semibold tracking-[0.12em] uppercase">
                {TIER_TITLES[tier] ?? tier}
              </h3>
              <span className="bg-line h-px flex-1" aria-hidden />
              <span className="text-mute tabnum shrink-0 text-xs">{list.length}</span>
            </div>

            <div
              className="mt-3 grid grid-cols-1 gap-[var(--hypr-gap-in)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
              role="tablist"
              aria-label={TIER_TITLES[tier] ?? tier}
            >
              {list.map((s) => {
                const key = `${tier}:${s.id}`
                const active = key === selectedKey
                return (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={active}
                    aria-controls={`sponsor-panel-${tier}-${s.id}`}
                    onClick={() => setSelectedKey(active ? null : key)}
                    className={[
                      'pane pane-hover flex items-center gap-3 px-3 py-3 text-left',
                      active ? 'pane-focus' : '',
                    ].join(' ')}
                  >
                    <span className="border-line bg-inset relative inline-block h-10 w-10 shrink-0 overflow-hidden rounded border">
                      <Image src={s.logo} alt="" fill sizes="40px" className="object-contain p-1" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="text-mute block text-[11px]">{tier}</span>
                      <span
                        className={[
                          'block truncate text-sm font-semibold',
                          active ? 'text-accent' : 'text-fg',
                        ].join(' ')}
                      >
                        {s.name}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={[
                        'h-1.5 w-1.5 shrink-0 rounded-full transition-colors',
                        active ? 'bg-accent' : 'bg-line-strong',
                      ].join(' ')}
                    />
                  </button>
                )
              })}
            </div>

            {openHere ? (
              <Detail sponsor={openHere} tier={tier} onClose={() => setSelectedKey(null)} />
            ) : null}
          </section>
        )
      })}
    </div>
  )
}
