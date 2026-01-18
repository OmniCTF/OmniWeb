'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import { usePathname } from 'next/navigation'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  const pathname = usePathname()

  let headerClass =
    'flex w-full items-center justify-between border-b border-gray-200/60 bg-white/70 py-6 backdrop-blur dark:border-gray-800/60 dark:bg-gray-950/60'
  if (siteMetadata.stickyNav) headerClass += ' sticky top-0 z-50'

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Logo />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-2xl font-extrabold tracking-tight sm:block">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-3 leading-5 sm:-mr-2 sm:space-x-4">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-1 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={[
                  'm-1 rounded-lg px-3 py-2 text-sm font-semibold transition',
                  isActive(link.href)
                    ? 'bg-gray-900 text-white shadow-sm dark:bg-white dark:text-gray-950'
                    : 'text-gray-900 hover:bg-gray-100/80 dark:text-gray-100 dark:hover:bg-white/10',
                ].join(' ')}
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
