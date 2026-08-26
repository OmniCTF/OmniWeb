'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { X, RotateCcw, Columns2, Rows2, PictureInPicture2, LayoutGrid } from 'lucide-react'
import { useHypr } from './HyprProvider'

export type Win = {
  id: string
  title: string
  meta?: ReactNode
  node: ReactNode
}

type Rect = { x: number; y: number; w: number; h: number }
type DragMode = 'tile' | 'float' | 'resize'

const MIN_W = 240
const MIN_H = 160
const FLOAT_MIN_VIEWPORT = 1024

/**
 * The homepage as a real workspace. Tiled windows take focus, swap by keyboard
 * or by dragging one onto another, close and restore, and re-tile between
 * dwindle and master. `f` pops a window out of the tiling as a floating window
 * that can be dragged and resized anywhere, exactly as togglefloating does.
 */
export default function Workspace({ windows }: { windows: Win[] }) {
  const { config, set } = useHypr()
  const ids = useMemo(() => windows.map((w) => w.id), [windows])

  const [order, setOrder] = useState<string[]>(ids)
  const [closed, setClosed] = useState<string[]>([])
  const [focused, setFocused] = useState<string>(ids[0])
  const [floating, setFloating] = useState<Record<string, Rect>>({})
  const [stack, setStack] = useState<string[]>([])
  const [dragId, setDragId] = useState<string | null>(null)
  const [dropTarget, setDropTarget] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const winRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const drag = useRef<{ id: string; mode: DragMode; x: number; y: number; origin: Rect } | null>(
    null
  )

  const open = useMemo(() => order.filter((id) => !closed.includes(id)), [order, closed])
  const tiled = useMemo(() => open.filter((id) => !floating[id]), [open, floating])
  const floated = useMemo(() => open.filter((id) => floating[id]), [open, floating])
  const byId = useMemo(() => new Map(windows.map((w) => [w.id, w])), [windows])

  const raise = useCallback((id: string) => {
    setStack((prev) => [...prev.filter((s) => s !== id), id])
  }, [])

  const close = useCallback(
    (id: string) => {
      setClosed((prev) => (prev.includes(id) ? prev : [...prev, id]))
      setFocused((prev) => (prev === id ? (open.filter((o) => o !== id)[0] ?? '') : prev))
    },
    [open]
  )

  const restore = useCallback(() => {
    setClosed([])
    setOrder(ids)
    setFloating({})
    setFocused(ids[0])
  }, [ids])

  const swap = useCallback((a: string, b: string) => {
    setOrder((prev) => {
      const next = [...prev]
      const i = next.indexOf(a)
      const j = next.indexOf(b)
      if (i < 0 || j < 0) return prev
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }, [])

  /** Pop out of the tiling, keeping the window exactly where it already sits. */
  const toggleFloat = useCallback(
    (id: string) => {
      if (typeof window !== 'undefined' && window.innerWidth < FLOAT_MIN_VIEWPORT) return
      setFloating((prev) => {
        if (prev[id]) {
          const next = { ...prev }
          delete next[id]
          return next
        }
        const el = winRefs.current[id]
        const box = containerRef.current
        if (!el || !box) return prev
        const r = el.getBoundingClientRect()
        const c = box.getBoundingClientRect()
        return { ...prev, [id]: { x: r.left - c.left, y: r.top - c.top, w: r.width, h: r.height } }
      })
      raise(id)
    },
    [raise]
  )

  const clampRect = useCallback((r: Rect): Rect => {
    const box = containerRef.current?.getBoundingClientRect()
    const maxX = (box?.width ?? 1200) - 80
    return {
      ...r,
      x: Math.min(Math.max(-r.w + 120, r.x), maxX),
      y: Math.max(0, r.y),
    }
  }, [])

  const onGrabStart = useCallback(
    (id: string, mode: DragMode) => (e: React.PointerEvent) => {
      if (e.button !== 0) return
      setFocused(id)
      raise(id)

      const el = winRefs.current[id]
      const box = containerRef.current
      if (!el || !box) return
      const r = el.getBoundingClientRect()
      const c = box.getBoundingClientRect()
      const origin = floating[id] ?? {
        x: r.left - c.left,
        y: r.top - c.top,
        w: r.width,
        h: r.height,
      }

      drag.current = { id, mode: floating[id] ? mode : mode === 'resize' ? 'resize' : 'tile', x: e.clientX, y: e.clientY, origin }
      setDragId(id)
      ;(e.currentTarget as Element).setPointerCapture?.(e.pointerId)
      e.preventDefault()
    },
    [floating, raise]
  )

  const onGrabMove = useCallback(
    (e: React.PointerEvent) => {
      const d = drag.current
      if (!d) return
      const dx = e.clientX - d.x
      const dy = e.clientY - d.y

      if (d.mode === 'float') {
        setFloating((prev) => ({
          ...prev,
          [d.id]: clampRect({ ...d.origin, x: d.origin.x + dx, y: d.origin.y + dy }),
        }))
        return
      }

      if (d.mode === 'resize') {
        setFloating((prev) => ({
          ...prev,
          [d.id]: {
            ...d.origin,
            w: Math.max(MIN_W, d.origin.w + dx),
            h: Math.max(MIN_H, d.origin.h + dy),
          },
        }))
        return
      }

      // Tiled: the window under the pointer becomes the swap target.
      const under = document.elementFromPoint(e.clientX, e.clientY) as Element | null
      const target = under?.closest('[data-win-id]')?.getAttribute('data-win-id') ?? null
      setDropTarget(target && target !== d.id && !floating[target] ? target : null)
    },
    [clampRect, floating]
  )

  const onGrabEnd = useCallback(() => {
    const d = drag.current
    if (d?.mode === 'tile' && dropTarget) swap(d.id, dropTarget)
    drag.current = null
    setDragId(null)
    setDropTarget(null)
  }, [dropTarget, swap])

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
          raise(open[next])
          break
        }
        case 'H':
        case 'L': {
          if (i < 0) return
          e.preventDefault()
          swap(focused, open[(i + (e.key === 'L' ? 1 : -1) + open.length) % open.length])
          break
        }
        case 'f': {
          if (!focused) return
          e.preventDefault()
          toggleFloat(focused)
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
  }, [open, focused, close, restore, set, config.layout, swap, toggleFloat, raise])

  const frame = (id: string, extra: string, delay: number, style?: React.CSSProperties) => {
    const w = byId.get(id)
    if (!w) return null
    const isFocused = focused === id
    const isFloating = !!floating[id]
    const isDragging = dragId === id
    const isTarget = dropTarget === id

    return (
      <div
        key={id}
        ref={(el) => {
          winRefs.current[id] = el
        }}
        data-win-id={id}
        data-focused={isFocused}
        role="region"
        aria-label={w.title}
        onPointerDown={() => {
          setFocused(id)
          raise(id)
        }}
        onFocusCapture={() => setFocused(id)}
        className={[
          'win pane flex min-w-0 flex-col overflow-hidden',
          isFocused ? 'pane-focus' : '',
          isDragging ? 'z-50 shadow-[0_28px_60px_-24px_rgb(0_0_0/0.8)]' : 'tile-in',
          isTarget ? 'outline-accent outline-2 outline-dashed outline-offset-2' : '',
          extra,
        ].join(' ')}
        style={{ animationDelay: `${delay}ms`, ...style }}
      >
        <div
          className="pane-title cursor-grab justify-between select-none active:cursor-grabbing"
          onPointerDown={onGrabStart(id, isFloating ? 'float' : 'tile')}
          onPointerMove={onGrabMove}
          onPointerUp={onGrabEnd}
          onPointerCancel={onGrabEnd}
        >
          <span className="flex min-w-0 items-center gap-2">
            <span
              className={[
                'inline-block h-1.5 w-1.5 shrink-0 rounded-full',
                isFocused ? 'bg-accent' : 'bg-line-strong',
              ].join(' ')}
              aria-hidden
            />
            <span className="text-dim truncate normal-case">{w.title}</span>
            {isFloating ? (
              <span className="text-accent shrink-0 normal-case">[floating]</span>
            ) : null}
          </span>

          <span className="flex shrink-0 items-center gap-2">
            {w.meta ? <span className="hidden sm:inline">{w.meta}</span> : null}
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                toggleFloat(id)
              }}
              aria-label={isFloating ? `Tile ${w.title}` : `Float ${w.title}`}
              title={`${isFloating ? 'Back to tiling' : 'Float this window'} (f)`}
              className="text-mute hover:text-accent hidden h-4 w-4 items-center justify-center rounded transition-colors lg:flex"
            >
              {isFloating ? (
                <LayoutGrid className="h-3 w-3" strokeWidth={2.5} />
              ) : (
                <PictureInPicture2 className="h-3 w-3" strokeWidth={2.5} />
              )}
            </button>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
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

        <div className="min-h-0 flex-1 overflow-auto">{w.node}</div>

        {isFloating ? (
          <div
            role="separator"
            aria-label={`Resize ${w.title}`}
            onPointerDown={onGrabStart(id, 'resize')}
            onPointerMove={onGrabMove}
            onPointerUp={onGrabEnd}
            onPointerCancel={onGrabEnd}
            className="absolute right-0 bottom-0 h-4 w-4 cursor-se-resize"
          >
            <span
              aria-hidden
              className="border-line-strong absolute right-[3px] bottom-[3px] h-2 w-2 border-r-2 border-b-2"
            />
          </div>
        ) : null}
      </div>
    )
  }

  const bar = (
    <div className="text-mute flex flex-wrap items-center gap-x-4 gap-y-1 px-1 pt-2 text-[11px]">
      <span className="hidden items-center gap-1.5 lg:flex">drag a title bar to swap windows</span>
      <span className="flex items-center gap-1.5">
        <kbd className="kbd">h</kbd>
        <kbd className="kbd">l</kbd>
        focus
      </span>
      <span className="hidden items-center gap-1.5 lg:flex">
        <kbd className="kbd">f</kbd>
        float
      </span>
      <span className="flex items-center gap-1.5">
        <kbd className="kbd">q</kbd>
        close
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
      {closed.length || floated.length ? (
        <button
          type="button"
          onClick={restore}
          className="text-accent hover:text-accent-strong flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="h-3 w-3" strokeWidth={2} aria-hidden />
          reset windows
        </button>
      ) : null}
    </div>
  )

  const [main, ...rest] = tiled

  return (
    <section className="w-full p-[var(--hypr-gap-out)]">
      <div
        ref={containerRef}
        className="relative w-full"
        style={floated.length ? { minHeight: '70vh' } : undefined}
      >
        {!open.length ? (
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
        ) : tiled.length === 0 ? (
          <div className="border-line text-mute flex min-h-40 items-center justify-center rounded border border-dashed text-xs">
            every window is floating — press f to tile one back
          </div>
        ) : config.layout === 'dwindle' ? (
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
                style={{
                  gridTemplateColumns: `repeat(${Math.min(rest.length, 3)}, minmax(0, 1fr))`,
                }}
              >
                {rest.map((id, i) => frame(id, '', 120 + i * 60))}
              </div>
            ) : null}
          </div>
        )}

        {floated.map((id) => {
          const r = floating[id]
          return frame(id, 'absolute', 0, {
            left: r.x,
            top: r.y,
            width: r.w,
            height: r.h,
            zIndex: 20 + Math.max(0, stack.indexOf(id)),
          })
        })}
      </div>
      {bar}
    </section>
  )
}
