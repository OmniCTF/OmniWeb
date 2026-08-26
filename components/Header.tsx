'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import { EVENT } from '@/data/event'
import { useHypr } from '@/components/session/HyprProvider'
import { SlidersHorizontal } from 'lucide-react'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const WORKSPACES = headerNavLinks.filter((link) => link.href !== '/')

/** The bar is a status bar, so it tells the time it actually runs on. */
function ClockModule() {
  const [utc, setUtc] = useState<string | null>(null)

  useEffect(() => {
    const tick = () =>
      setUtc(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'UTC',
        }).format(new Date())
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="module tabnum hidden lg:inline-flex" aria-label="Current time, UTC">
      <span className="text-mute">UTC</span>
      <span className="text-fg font-medium">{utc ?? '--:--:--'}</span>
    </span>
  )
}

/** Event truth follows the visitor onto every route, not just the homepage. */
function CountdownModule() {
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    const target = new Date(EVENT.countdownTargetIso).getTime()
    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) {
        setLabel('live')
        return
      }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff / 3600000) % 24)
      const m = Math.floor((diff / 60000) % 60)
      setLabel(d > 0 ? `${d}d ${String(h).padStart(2, '0')}h` : `${h}h ${String(m).padStart(2, '0')}m`)
    }
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  if (!label) return null

  return (
    <Link
      href="/"
      className="module module-strong tabnum hover:bg-accent hover:text-accent-ink transition-colors"
      aria-label={`Time until the finals: ${label}`}
    >
      <span className="bg-accent inline-block h-1.5 w-1.5 shrink-0 rounded-full" />
      <span className="hidden font-medium sm:inline">finals</span>
      <span className="font-semibold">{label}</span>
    </Link>
  )
}

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { configOpen, setConfigOpen, setKeybindsOpen } = useHypr()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  /**
   * Workspace digits are real bindings, not ornament: 1-4 switch route, 0 goes home,
   * exactly like the bar they are borrowed from.
   */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const el = e.target as HTMLElement | null
      if (el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))) return

      if (e.key === '0') {
        router.push('/')
        return
      }
      const index = Number(e.key)
      if (!Number.isInteger(index) || index < 1 || index > WORKSPACES.length) return
      router.push(WORKSPACES[index - 1].href)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [router])

  const title = pathname === '/' ? '~' : `~${pathname}`

  return (
    <header className="border-line bg-pane/85 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="flex h-12 w-full items-center gap-3 px-3 sm:px-4">
        <Link
          href="/"
          aria-label={siteMetadata.headerTitle}
          className="group flex shrink-0 items-center gap-2"
          title="Home (0)"
        >
          <Logo className="h-6 w-6" />
          <span className="text-fg group-hover:text-accent hidden text-sm font-semibold tracking-tight transition-colors sm:block">
            {siteMetadata.headerTitle}
          </span>
        </Link>

        <span className="bg-line hidden h-5 w-px shrink-0 sm:block" aria-hidden />

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Sections">
          {WORKSPACES.map((link, i) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.title}
                href={link.href}
                title={`${link.title} (${i + 1})`}
                aria-current={active ? 'page' : undefined}
                className={[
                  'flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium transition-colors',
                  active
                    ? 'bg-accent text-accent-ink'
                    : 'text-dim hover:bg-raise hover:text-fg',
                ].join(' ')}
              >
                <span
                  className={[
                    'tabnum text-[10px] font-semibold',
                    active ? 'text-accent-ink/70' : 'text-mute',
                  ].join(' ')}
                  aria-hidden
                >
                  {i + 1}
                </span>
                {link.title}
              </Link>
            )
          })}
        </nav>

        <div className="text-mute pointer-events-none hidden min-w-0 flex-1 justify-center xl:flex">
          <span className="truncate text-xs" aria-hidden>
            {title}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-1.5 xl:ml-0">
          <ClockModule />
          <CountdownModule />
          <SearchButton />
          <button
            type="button"
            onClick={() => setKeybindsOpen(true)}
            aria-label="Keybindings"
            title="Keybindings (?)"
            className="border-line bg-inset text-dim hover:border-accent/50 hover:text-fg hidden h-[26px] w-[26px] items-center justify-center rounded border text-xs font-semibold transition-colors md:flex"
          >
            ?
          </button>
          <button
            type="button"
            onClick={() => setConfigOpen(!configOpen)}
            aria-label="Edit hyprland.conf"
            aria-pressed={configOpen}
            title="hyprland.conf"
            className={[
              'flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded border transition-colors',
              configOpen
                ? 'border-accent/60 bg-accent-wash text-accent'
                : 'border-line bg-inset text-dim hover:border-accent/50 hover:text-fg',
            ].join(' ')}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
