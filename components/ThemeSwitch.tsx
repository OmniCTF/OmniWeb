'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

/**
 * Two states, one throw. The knob carries the mode you are in and sits over
 * its own glyph, so the control reads correctly at a glance in either theme.
 */
const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const isDark = !mounted || resolvedTheme !== 'light'
  const Icon = isDark ? Moon : Sun

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="border-line bg-inset hover:border-accent/50 relative flex h-[26px] w-[46px] shrink-0 items-center rounded-full border transition-colors"
    >
      <span className="text-mute pointer-events-none absolute inset-0 flex items-center justify-between px-[6px]">
        <Moon className="h-3 w-3" strokeWidth={2} aria-hidden />
        <Sun className="h-3 w-3" strokeWidth={2} aria-hidden />
      </span>

      <span
        aria-hidden
        className="bg-accent text-accent-ink pointer-events-none absolute top-[2px] left-[2px] flex h-5 w-5 items-center justify-center rounded-full transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: isDark ? 'translateX(0)' : 'translateX(20px)' }}
      >
        {mounted ? <Icon className="h-3 w-3" strokeWidth={2.5} /> : null}
      </span>
    </button>
  )
}

export default ThemeSwitch
