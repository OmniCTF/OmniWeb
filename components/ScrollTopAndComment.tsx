'use client'

import siteMetadata from '@/data/siteMetadata'
import { useEffect, useState } from 'react'
import { ArrowUp, MessageSquare } from 'lucide-react'

const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => setShow(window.scrollY > 50)
    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const btn =
    'flex h-9 w-9 items-center justify-center rounded border border-line bg-pane/90 text-dim backdrop-blur transition-colors hover:border-accent/50 hover:text-accent'

  return (
    <div
      className={`fixed right-4 bottom-4 z-40 hidden flex-col gap-2 ${show ? 'md:flex' : 'md:hidden'}`}
    >
      {siteMetadata.comments?.provider && (
        <button
          aria-label="Scroll To Comment"
          onClick={() => document.getElementById('comment')?.scrollIntoView()}
          className={btn}
        >
          <MessageSquare className="h-4 w-4" strokeWidth={2} />
        </button>
      )}
      <button
        aria-label="Scroll To Top"
        onClick={() => window.scrollTo({ top: 0 })}
        className={btn}
      >
        <ArrowUp className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  )
}

export default ScrollTopAndComment
