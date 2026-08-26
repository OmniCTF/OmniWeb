import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-fg text-2xl leading-tight font-semibold tracking-[-0.035em] sm:text-3xl md:text-4xl">
      {children}
    </h1>
  )
}
