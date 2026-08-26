import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="pane pane-hover flex flex-col overflow-hidden">
    {imgSrc &&
      (href ? (
        <Link href={href} aria-label={`Link to ${title}`} className="border-line block border-b">
          <Image
            alt={title}
            src={imgSrc}
            className="h-44 w-full object-cover object-center"
            width={544}
            height={306}
          />
        </Link>
      ) : (
        <Image
          alt={title}
          src={imgSrc}
          className="border-line h-44 w-full border-b object-cover object-center"
          width={544}
          height={306}
        />
      ))}
    <div className="flex flex-1 flex-col p-5">
      <h2 className="text-fg text-base font-semibold tracking-tight">
        {href ? (
          <Link href={href} aria-label={`Link to ${title}`} className="hover:text-accent transition-colors">
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      <p className="text-dim mt-2 flex-1 text-sm leading-relaxed">{description}</p>
      {href && (
        <Link
          href={href}
          className="text-accent hover:text-accent-strong mt-4 text-sm font-medium transition-colors"
          aria-label={`Link to ${title}`}
        >
          Learn more &rarr;
        </Link>
      )}
    </div>
  </div>
)

export default Card
