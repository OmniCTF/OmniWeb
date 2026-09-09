import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="text-accent hover:text-accent-strong text-xs font-medium transition-colors"
    >
      <span className="text-mute" aria-hidden>
        --
      </span>
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
