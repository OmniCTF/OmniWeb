'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { X, RotateCcw } from 'lucide-react'
import { useHypr, type HyprConfig, type Layout } from './HyprProvider'

function Slider({
  name,
  value,
  min,
  max,
  step = 1,
  suffix = '',
  onChange,
}: {
  name: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onChange: (v: number) => void
}) {
  return (
    <label className="grid grid-cols-[8.5rem_minmax(0,1fr)_3.5rem] items-center gap-3 px-4 py-1.5">
      <span className="text-dim text-xs">{name}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={name}
        className="w-full"
      />
      <span className="text-accent tabnum text-right text-xs">
        {step < 1 ? value.toFixed(2) : value}
        {suffix}
      </span>
    </label>
  )
}

function Toggle({
  name,
  value,
  onChange,
}: {
  name: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="grid grid-cols-[8.5rem_minmax(0,1fr)_3.5rem] items-center gap-3 px-4 py-1.5">
      <span className="text-dim text-xs">{name}</span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={name}
        onClick={() => onChange(!value)}
        className="border-line bg-inset hover:border-accent/50 relative h-[18px] w-9 rounded-full border transition-colors"
      >
        <span
          aria-hidden
          className={[
            'absolute top-[2px] left-[2px] h-3 w-3 rounded-full transition-transform duration-200',
            value ? 'bg-accent translate-x-[18px]' : 'bg-line-strong translate-x-0',
          ].join(' ')}
        />
      </button>
      <span className="text-accent tabnum text-right text-xs">{String(value)}</span>
    </div>
  )
}

function Section({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="py-2">
      <div className="text-mute px-4 pb-1 text-xs">
        {name} <span className="text-line-strong">{'{'}</span>
      </div>
      {children}
      <div className="text-line-strong px-4 pt-1 text-xs">{'}'}</div>
    </div>
  )
}

export default function ConfigWindow() {
  const { config, set, reset, configOpen, setConfigOpen } = useHypr()
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const drag = useRef<{ dx: number; dy: number } | null>(null)
  const winRef = useRef<HTMLDivElement>(null)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const rect = winRef.current?.getBoundingClientRect()
    if (!rect) return
    drag.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top }
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag.current) return
    const w = winRef.current?.offsetWidth ?? 340
    const h = winRef.current?.offsetHeight ?? 400
    setPos({
      x: Math.min(Math.max(8, e.clientX - drag.current.dx), window.innerWidth - w - 8),
      y: Math.min(Math.max(56, e.clientY - drag.current.dy), window.innerHeight - 60),
    })
  }, [])

  const onPointerUp = useCallback(() => {
    drag.current = null
  }, [])

  useEffect(() => {
    if (!configOpen) drag.current = null
  }, [configOpen])

  if (!configOpen) return null

  const style = pos
    ? { left: pos.x, top: pos.y, right: 'auto' as const }
    : { right: 12, top: 60 }

  return (
    <div
      ref={winRef}
      role="dialog"
      aria-label="hyprland.conf"
      style={style}
      className="pane pane-focus fixed z-70 w-[min(22rem,calc(100vw-1.5rem))] overflow-hidden shadow-[0_24px_48px_-20px_rgb(0_0_0/0.7)]"
    >
      <div
        className="pane-title cursor-grab justify-between select-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <span className="normal-case">~/.config/hypr/hyprland.conf</span>
        <span className="flex items-center gap-1">
          <button
            type="button"
            onClick={reset}
            aria-label="Reset to defaults"
            title="Reset to defaults"
            className="text-mute hover:text-fg flex h-5 w-5 items-center justify-center rounded transition-colors"
          >
            <RotateCcw className="h-3 w-3" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => setConfigOpen(false)}
            aria-label="Close hyprland.conf"
            className="text-mute hover:text-ansi-red flex h-5 w-5 items-center justify-center rounded transition-colors"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </span>
      </div>

      <div className="max-h-[min(28rem,calc(100vh-8rem))] overflow-y-auto py-2">
        <Section name="general">
          <Slider
            name="gaps_in"
            value={config.gaps_in}
            min={0}
            max={24}
            onChange={(v) => set('gaps_in', v)}
          />
          <Slider
            name="gaps_out"
            value={config.gaps_out}
            min={0}
            max={48}
            onChange={(v) => set('gaps_out', v)}
          />
          <Slider
            name="border_size"
            value={config.border_size}
            min={0}
            max={5}
            onChange={(v) => set('border_size', v)}
          />
        </Section>

        <Section name="decoration">
          <Slider
            name="rounding"
            value={config.rounding}
            min={0}
            max={20}
            onChange={(v) => set('rounding', v)}
          />
          <Slider
            name="inactive_opacity"
            value={config.inactive_opacity}
            min={0.4}
            max={1}
            step={0.02}
            onChange={(v) => set('inactive_opacity', v)}
          />
          <Toggle name="blur" value={config.blur} onChange={(v) => set('blur', v)} />
        </Section>

        <Section name="animations">
          <Toggle
            name="enabled"
            value={config.animations}
            onChange={(v) => set('animations', v)}
          />
        </Section>

        <Section name="dwindle">
          <div className="grid grid-cols-[8.5rem_minmax(0,1fr)] items-center gap-3 px-4 py-1.5">
            <span className="text-dim text-xs">layout</span>
            <div className="flex gap-1">
              {(['dwindle', 'master'] as Layout[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => set('layout', l)}
                  aria-pressed={config.layout === l}
                  className={[
                    'rounded px-2 py-1 text-xs transition-colors',
                    config.layout === l
                      ? 'bg-accent text-accent-ink'
                      : 'text-dim hover:bg-raise hover:text-fg',
                  ].join(' ')}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <p className="border-line text-mute border-t px-4 py-2 text-[11px]">
        Applies live, saved to this browser. Drag the title bar to move.
      </p>
    </div>
  )
}
