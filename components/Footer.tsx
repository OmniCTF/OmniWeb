import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200/60 pt-10 pb-10 dark:border-gray-800/60">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <div className="text-lg font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            {siteMetadata.title}
          </div>

          <p className="mt-2 max-w-sm text-sm text-gray-600 dark:text-gray-400">
            {siteMetadata.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
            <SocialIcon kind="github" href={siteMetadata.github} size={5} />
            <SocialIcon kind="x" href={siteMetadata.x} size={5} />
            <SocialIcon kind="instagram" href={siteMetadata.instagram} size={5} />
            <SocialIcon kind="youtube" href={siteMetadata.youtube} size={5} />
            <SocialIcon kind="ctftime" href={siteMetadata.ctftime} size={5} />
          </div>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100">
            Quick links
          </div>

          <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link className="hover:text-purple-500 dark:hover:text-purple-400" href="/">
                Home
              </Link>
            </li>

            <li>
              <Link className="hover:text-purple-500 dark:hover:text-purple-400" href="/blog">
                Blog
              </Link>
            </li>

            <li>
              <Link className="hover:text-purple-500 dark:hover:text-purple-400" href="/members">
                Members
              </Link>
            </li>

            <li>
              <Link className="hover:text-purple-500 dark:hover:text-purple-400" href="/about">
                About
              </Link>
            </li>

            <li>
              <Link
                className="hover:text-purple-500 dark:hover:text-purple-400"
                href="https://discord.gg/jzZkfh9UFR"
                target="_blank"
                rel="noreferrer"
              >
                Discord
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100">
            Contact
          </div>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            For partnerships, sponsorships, or support:
          </p>

          <div className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
            <a
              className="hover:text-purple-500 dark:hover:text-purple-400"
              href={`mailto:${siteMetadata.email_support}`}
            >
              {siteMetadata.email_support}
            </a>
          </div>

          <div className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
            <a
              className="hover:text-purple-500 dark:hover:text-purple-400"
              href={`mailto:${siteMetadata.email_sponsors}`}
            >
              {siteMetadata.email_sponsors}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200/60 pt-6 dark:border-gray-800/60">
        <div className="space-y-2 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            <Link
              className="font-semibold text-gray-700 hover:text-purple-500 dark:text-gray-300 dark:hover:text-purple-400"
              href="/"
            >
              OmniCTF
            </Link>{' '}
            is a cybersecurity competition and brand operated by{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              ASOCIAȚIA OMNICYBR
            </span>
            , a Romanian nonprofit association.
          </p>

          <p className="text-xs">
            CIF: 55377548 · Registered in the Register of Associations and Foundations under
            no. 85/30.07.2026
          </p>

          <p className="text-xs">
            © {new Date().getFullYear()} ASOCIAȚIA OMNICYBR. All rights reserved.
          </p>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-2 text-xs text-gray-400 dark:text-gray-500 md:flex-row">
          <span>Built with Next.js · Tailwind · Pliny</span>
          <span>Theme built by eLure</span>
        </div>
      </div>
    </footer>
  )
}
