import { ReactNode } from 'react'

/**
 * Every inner route is a window in the same session: a title strip that names
 * the path, and content inside the frame. One primitive, used everywhere.
 */
export default function Window({
  title,
  meta,
  children,
  focus = false,
  className = '',
  bodyClassName = '',
}: {
  title: string
  meta?: ReactNode
  children: ReactNode
  focus?: boolean
  className?: string
  bodyClassName?: string
}) {
  return (
    <div className={['pane overflow-hidden', focus ? 'pane-focus' : '', className].join(' ')}>
      <div className="pane-title justify-between">
        <span className="min-w-0 truncate normal-case">{title}</span>
        {meta ? <span className="text-mute shrink-0 normal-case">{meta}</span> : null}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}
