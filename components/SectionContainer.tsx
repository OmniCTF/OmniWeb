import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 xl:px-8">{children}</section>
  )
}
