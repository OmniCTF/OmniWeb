'use client'

import { AlgoliaButton } from 'pliny/search/AlgoliaButton'
import { KBarButton } from 'pliny/search/KBarButton'
import { Search } from 'lucide-react'
import siteMetadata from '@/data/siteMetadata'

/**
 * The launcher. Same role SUPER holds in the session it borrows from, so it
 * advertises its binding instead of hiding behind a magnifier.
 */
const SearchButton = () => {
  if (
    !siteMetadata.search ||
    (siteMetadata.search.provider !== 'algolia' && siteMetadata.search.provider !== 'kbar')
  ) {
    return null
  }

  const SearchButtonWrapper = siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton

  return (
    <SearchButtonWrapper aria-label="Open launcher">
      <span className="border-line bg-inset text-dim hover:border-accent/50 hover:text-fg flex items-center gap-2 rounded border px-2 py-1 text-xs transition-colors">
        <Search className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        <span className="hidden md:inline">search</span>
        <kbd className="kbd hidden md:inline-flex">⌘K</kbd>
      </span>
    </SearchButtonWrapper>
  )
}

export default SearchButton
