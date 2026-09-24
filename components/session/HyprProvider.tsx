'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Layout = 'dwindle' | 'master'

export type HyprConfig = {
  gaps_in: number
  gaps_out: number
  border_size: number
  rounding: number
  inactive_opacity: number
  blur: boolean
  animations: boolean
  layout: Layout
}

export const DEFAULT_CONFIG: HyprConfig = {
  gaps_in: 8,
  gaps_out: 12,
  border_size: 1,
  rounding: 6,
  inactive_opacity: 1,
  blur: true,
  animations: true,
  layout: 'dwindle',
}

const STORAGE_KEY = 'omnictf:hyprland.conf'

function readStoredConfig(): HyprConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...DEFAULT_CONFIG, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_CONFIG
  }
  return DEFAULT_CONFIG
}

function persistConfig(config: HyprConfig): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    return true
  } catch {
    return false
  }
}

type Ctx = {
  config: HyprConfig
  set: <K extends keyof HyprConfig>(key: K, value: HyprConfig[K]) => void
  reset: () => void
  configOpen: boolean
  setConfigOpen: (open: boolean) => void
  keybindsOpen: boolean
  setKeybindsOpen: (open: boolean) => void
}

const HyprContext = createContext<Ctx | null>(null)

export function useHypr() {
  const ctx = useContext(HyprContext)
  if (!ctx) throw new Error('useHypr must be used inside HyprProvider')
  return ctx
}

export function HyprProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<HyprConfig>(DEFAULT_CONFIG)
  const [configOpen, setConfigOpen] = useState(false)
  const [keybindsOpen, setKeybindsOpen] = useState(false)

  useEffect(() => {
    setConfig(readStoredConfig())
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--hypr-gap-in', `${config.gaps_in}px`)
    root.style.setProperty('--hypr-gap-out', `${config.gaps_out}px`)
    root.style.setProperty('--hypr-border', `${config.border_size}px`)
    root.style.setProperty('--hypr-rounding', `${config.rounding}px`)
    root.style.setProperty('--hypr-inactive-opacity', String(config.inactive_opacity))
    root.dataset.hyprAnim = config.animations ? 'on' : 'off'
    root.dataset.hyprBlur = config.blur ? 'on' : 'off'

    persistConfig(config)
  }, [config])

  const set = useCallback<Ctx['set']>((key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }, [])

  const reset = useCallback(() => setConfig(DEFAULT_CONFIG), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)))
        return

      if (e.key === '?') {
        e.preventDefault()
        setKeybindsOpen((v) => !v)
        return
      }
      if (e.key === 'Escape') {
        setKeybindsOpen(false)
        setConfigOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo(
    () => ({ config, set, reset, configOpen, setConfigOpen, keybindsOpen, setKeybindsOpen }),
    [config, set, reset, configOpen, keybindsOpen]
  )

  return <HyprContext.Provider value={value}>{children}</HyprContext.Provider>
}
