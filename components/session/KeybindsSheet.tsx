'use client'

import { X } from 'lucide-react'
import { useHypr } from './HyprProvider'

const GROUPS: { title: string; binds: [string, string][] }[] = [
  {
    title: 'workspaces',
    binds: [
      ['0', 'Home'],
      ['1', 'About'],
      ['2', 'Special Thanks'],
      ['3', 'Blog'],
      ['4', 'Members'],
    ],
  },
  {
    title: 'windows',
    binds: [
      ['h  l', 'Move focus'],
      ['H  L', 'Swap focused window'],
      ['f', 'Float / tile window'],
      ['q', 'Close focused window'],
      ['r', 'Reset windows'],
      ['t', 'Toggle layout'],
      ['drag', 'Title bar: swap, or move if floating'],
    ],
  },
  {
    title: 'session',
    binds: [
      ['⌘K', 'Launcher'],
      ['/', 'Filter list'],
      ['?', 'This sheet'],
      ['Esc', 'Close overlay'],
    ],
  },
]

export default function KeybindsSheet() {
  const { keybindsOpen, setKeybindsOpen } = useHypr()

  if (!keybindsOpen) return null

  return (
    <div className="fixed inset-0 z-80 flex items-start justify-center p-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Close keybindings"
        onClick={() => setKeybindsOpen(false)}
        className="bg-bg/70 absolute inset-0 cursor-default backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Keybindings"
        className="pane pane-focus relative w-full max-w-2xl overflow-hidden shadow-[0_24px_48px_-20px_rgb(0_0_0/0.7)]"
      >
        <div className="pane-title justify-between">
          <span>keybindings</span>
          <button
            type="button"
            onClick={() => setKeybindsOpen(false)}
            aria-label="Close keybindings"
            className="text-mute hover:text-fg -mr-1 flex h-5 w-5 items-center justify-center rounded transition-colors"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 p-5 sm:grid-cols-3">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-mute text-[11px] font-semibold tracking-[0.12em] uppercase">
                {group.title}
              </h3>
              <dl className="mt-3 space-y-2">
                {group.binds.map(([key, action]) => (
                  <div key={key} className="flex items-baseline justify-between gap-3">
                    <dt className="shrink-0">
                      <kbd className="kbd">{key}</kbd>
                    </dt>
                    <dd className="text-dim min-w-0 text-right text-xs">{action}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <p className="border-line text-mute border-t px-5 py-2.5 text-[11px]">
          Bindings are ignored while typing in a field.
        </p>
      </div>
    </div>
  )
}
