import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

/**
 * The session fills the display. Content runs edge to edge with a WM gutter,
 * and only long-form reading columns re-impose a measure.
 */
export default function SectionContainer({ children, className = '' }: Props) {
  return <div className={`w-full px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}
