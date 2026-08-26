'use client'

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { X, RotateCcw, Columns2, Rows2 } from 'lucide-react'
import { useHypr } from './HyprProvider'

export type Win = {
  id: string
  title: string
  meta?: ReactNode
  node: ReactNode
}

/**
 * The homepage as a real workspace: windows take focus, swap places, close and
 * re-tile, and the layout switches between dwindle and master. Every binding
 * here is listed in the `?` sheet, so none of it is hidden behaviour.
 */
export default function Workspace({ windows }: { windows: Win[] }) {
  const { config, set } = useHypr()
  const ids = useMemo(() => windows.map((w) => w.id), [windows])

  const [order, setOrder] = useState<string[]>(ids)
  const [closed, setClosed] = useState<string[]>([])
  const [focused, setFocused] = useState<string>(ids[0])

  const open = useMemo(() => order.filter((id) => !closed.includes(id)), [order, closed])
  const byId = useMemo(() => new Map(windows.map((w) => [w.id, w])), [windows])

  const close = useCallback(
    (id: string) => {
      setClosed((prev) => (prev.includes(id) ? prev : [...prev, id]))
      setFocused((prev) => {
        if (prev !== id) return prev
        const rest = open.filter((o) => o !== id)
        return rest[0] ?? ''
      })
    },
    [open]
  )

  const restore = useCallback(() => {
    setClosed([])
    setOrder(ids)
    setFocused(ids[0])
  }, [ids])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const el = e.target as HTMLElement | null
      if (el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))) return
      if (!open.length && e.key !== 'r' && e.key !== 'R') return

      const i = open.indexOf(focused)

      switch (e.key) {
        case 'h':
        case 'l': {
          if (i < 0) return
          e.preventDefault()
          const next = e.key === 'l' ? (i + 1) % open.length : (i - 1 + open.length) % open.length
          setFocused(open[next])
          break
        }
        case 'H':
        case 'L': {
          if (i < 0) return
          e.preventDefault()
          const dir = e.key === 'L' ? 1 : -1
          const target = open[(i + dir + open.length) % open.length]
          setOrder((prev) => {
            const next = [...prev]
            const a = next.indexOf(focused)
            const b = next.indexOf(target)
            ;[next[a], next[b]] = [next[b], next[a]]
            return next
          })
          break
        }
        case 'q': {
          if (!focused) return
          e.preventDefault()
          close(focused)
          break
        }
        case 'r':
        case 'R': {
          e.preventDefault()
          restore()
          break
        }
        case 't': {
          e.preventDefault()
          set('layout', config.layout === 'dwindle' ? 'master' : 'dwindle')
          break
        }
        default:
          break
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, focused, close, restore, set, config.layout])

  const frame = (id: string, extra: string, delay: number) => {
    const w = byId.get(id)
    if (!w) return null
    const isFocused = focused === id
    return (
      <div
        key={id}
        data-focused={isFocused}
        role="region"
        aria-label={w.title}
        onPointerDown={() => setFocused(id)}
        onFocusCapture={() => setFocused(id)}
        className={[
          'win pane tile-in flex min-w-0 flex-col overflow-hidden',
          isFocused ? 'pane-focus' : '',
          extra,
        ].join(' ')}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="pane-title justify-between">
          <span className="flex min-w-0 items-center gap-2">
            <span
              className={[
                'inline-block h-1.5 w-1.5 shrink-0 rounded-full',
                isFocused ? 'bg-accent' : 'bg-line-strong',
              ].join(' ')}
              aria-hidden
            />
            <span className="text-dim truncate normal-case">{w.title}</span>
          </span>
          <span className="flex shrink-0 items-center gap-2">
            {w.meta ? <span className="hidden sm:inline">{w.meta}</span> : null}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                close(id)
              }}
              aria-label={`Close ${w.title}`}
              title={`Close ${w.title} (q)`}
              className="text-mute hover:text-ansi-red -mr-1 flex h-4 w-4 items-center justify-center rounded transition-colors"
            >
              <X className="h-3 w-3" strokeWidth={2.5} />
            </button>
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col">{w.node}</div>
      </div>
    )
  }

  const bar = (
    <div className="text-mute flex flex-wrap items-center gap-x-4 gap-y-1 px-1 pt-2 text-[11px]">
      <span className="flex items-center gap-1.5">
        <kbd className="kbd">h</kbd>
        <kbd className="kbd">l</kbd>
        focus
      </span>
      <span className="flex items-center gap-1.5">
        <kbd className="kbd">q</kbd>
        close
      </span>
      <span className="flex items-center gap-1.5">
        <kbd className="kbd">t</kbd>
        layout
      </span>
      <span className="flex items-center gap-1.5">
        <kbd className="kbd">?</kbd>
        all bindings
      </span>
      <button
        type="button"
        onClick={() => set('layout', config.layout === 'dwindle' ? 'master' : 'dwindle')}
        className="hover:text-fg ml-auto flex items-center gap-1.5 transition-colors"
        aria-label={`Switch to ${config.layout === 'dwindle' ? 'master' : 'dwindle'} layout`}
      >
        {config.layout === 'dwindle' ? (
          <Columns2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        ) : (
          <Rows2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        )}
        {config.layout}
      </button>
      {closed.length ? (
        <button
          type="button"
          onClick={restore}
          className="text-accent hover:text-accent-strong flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="h-3 w-3" strokeWidth={2} aria-hidden />
          restore {closed.length}
        </button>
      ) : null}
    </div>
  )

  if (!open.length) {
    return (
      <section className="w-full p-[var(--hypr-gap-out)]">
        <div className="pane flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
          <p className="text-mute text-sm">No windows on this workspace.</p>
          <button
            type="button"
            onClick={restore}
            className="bg-accent text-accent-ink hover:bg-accent-strong inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
            Restore windows
          </button>
        </div>
        {bar}
      </section>
    )
  }

  const [main, ...rest] = open

  return (
    <section className="w-full p-[var(--hypr-gap-out)]">
      {config.layout === 'dwindle' ? (
        <div className="grid grid-cols-1 gap-[var(--hypr-gap-in)] lg:grid-cols-12">
          {frame(main, rest.length ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12', 40)}
          {rest.length ? (
            <div className="flex flex-col gap-[var(--hypr-gap-in)] lg:col-span-4 xl:col-span-3">
              {rest.map((id, i) => frame(id, 'flex-1', 120 + i * 60))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex flex-col gap-[var(--hypr-gap-in)]">
          {frame(main, '', 40)}
          {rest.length ? (
            <div
              className="grid gap-[var(--hypr-gap-in)]"
              style={{ gridTemplateColumns: `repeat(${Math.min(rest.length, 3)}, minmax(0, 1fr))` }}
            >
              {rest.map((id, i) => frame(id, '', 120 + i * 60))}
            </div>
          ) : null}
        </div>
      )}
      {bar}
    </section>
  )
}
