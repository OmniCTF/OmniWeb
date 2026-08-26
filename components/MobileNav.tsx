'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { Fragment, useState, useEffect, useRef } from 'react'
import { Menu as MenuIcon, X } from 'lucide-react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { EVENT } from '@/data/event'

/**
 * On a phone there is no keyboard to bind, so the workspace list becomes the
 * launcher itself: full screen, one row per route, digits kept as addresses.
 */
const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const navRef = useRef(null)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        enableBodyScroll(navRef.current)
      } else {
        disableBodyScroll(navRef.current)
      }
      return !status
    })
  }

  useEffect(() => clearAllBodyScrollLocks, [])

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="border-line bg-inset text-dim hover:text-fg flex h-[26px] w-[26px] items-center justify-center rounded border transition-colors sm:hidden"
      >
        <MenuIcon className="h-3.5 w-3.5" strokeWidth={2} />
      </button>

      <Transition appear show={navShow} as={Fragment} unmount={false}>
        <Dialog as="div" onClose={onToggleNav} unmount={false}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            unmount={false}
          >
            <div className="bg-bg/80 fixed inset-0 z-60 backdrop-blur-sm" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-[0.98]"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-[0.98]"
            unmount={false}
          >
            <DialogPanel className="fixed inset-0 z-70 flex flex-col p-3">
              <div className="pane flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="pane-title justify-between">
                  <span>launcher</span>
                  <button
                    aria-label="Close menu"
                    onClick={onToggleNav}
                    className="text-mute hover:text-fg -mr-1 flex h-6 w-6 items-center justify-center rounded transition-colors"
                  >
                    <X className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>

                <nav ref={navRef} className="min-h-0 flex-1 overflow-y-auto p-2">
                  {headerNavLinks.map((link, i) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="text-fg hover:bg-raise hover:text-accent flex items-center gap-3 rounded px-3 py-3 text-base font-medium transition-colors"
                      onClick={onToggleNav}
                    >
                      <span className="text-mute tabnum w-4 text-xs" aria-hidden>
                        {i === 0 ? 0 : i}
                      </span>
                      {link.title}
                    </Link>
                  ))}
                </nav>

                <div className="border-line text-mute border-t px-4 py-3 text-xs">
                  <div className="text-dim">{EVENT.name}</div>
                  <div className="tabnum mt-0.5">
                    {EVENT.dateLabel} · {EVENT.timeLabel}
                  </div>
                  <div className="mt-0.5">
                    {EVENT.venue} · {EVENT.venueCity}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileNav
