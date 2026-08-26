import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import Logo from '@/data/logo.svg'
import { EVENT } from '@/data/event'

/**
 * The footer is the session's system readout: the art slot on the left, a
 * key/value column on the right. Every legal string is carried verbatim.
 */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-line/70 flex flex-col gap-1 border-b py-2.5 last:border-b-0 sm:flex-row sm:gap-4">
      <dt className="text-mute w-32 shrink-0 text-xs">{label}</dt>
      <dd className="text-dim min-w-0 flex-1 text-xs leading-relaxed">{children}</dd>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="border-line mt-20 w-full border-t">
      <div className="w-full px-2 py-8 sm:px-3">
        <div className="pane overflow-hidden">
          <div className="pane-title justify-between">
            <span className="normal-case">omnictf@omnicybr:~</span>
            <span className="hidden normal-case sm:inline">{siteMetadata.siteUrl}</span>
          </div>

          <div className="grid grid-cols-1 gap-8 p-5 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-12 lg:p-8">
            <div className="flex flex-col items-start gap-5">
              <Logo className="h-20 w-20" />
              <div>
                <div className="text-fg text-lg font-semibold tracking-tight">
                  {siteMetadata.title}
                </div>
                <p className="text-mute mt-1 text-xs">{siteMetadata.description}</p>
              </div>
              <div className="text-dim flex flex-wrap items-center gap-3">
                <SocialIcon kind="mail" href={`mailto:${siteMetadata.email_support}`} size={5} />
                <SocialIcon kind="github" href={siteMetadata.github} size={5} />
                <SocialIcon kind="x" href={siteMetadata.x} size={5} />
                <SocialIcon kind="instagram" href={siteMetadata.instagram} size={5} />
                <SocialIcon kind="youtube" href={siteMetadata.youtube} size={5} />
                <SocialIcon kind="ctftime" href={siteMetadata.ctftime} size={5} />
              </div>
            </div>

            <dl className="min-w-0">
              <Row label="event">
                <span className="text-fg">{EVENT.name}</span>
                <span className="text-mute"> · </span>
                <span className="tabnum">
                  {EVENT.dateLabel} · {EVENT.timeLabel}
                </span>
              </Row>
              <Row label="venue">
                {EVENT.venue} · {EVENT.venueCity}
              </Row>
              <Row label="Quick links">
                <span className="flex flex-wrap gap-x-4 gap-y-1">
                  <Link className="hover:text-accent transition-colors" href="/">
                    Home
                  </Link>
                  <Link className="hover:text-accent transition-colors" href="/blog">
                    Blog
                  </Link>
                  <Link className="hover:text-accent transition-colors" href="/members">
                    Members
                  </Link>
                  <Link className="hover:text-accent transition-colors" href="/about">
                    About
                  </Link>
                  <Link
                    className="hover:text-accent transition-colors"
                    href="https://discord.gg/jzZkfh9UFR"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Discord
                  </Link>
                </span>
              </Row>
              <Row label="Contact">
                <span className="text-mute">For partnerships, sponsorships, or support:</span>
                <span className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <a
                    className="text-accent hover:text-accent-strong transition-colors"
                    href={`mailto:${siteMetadata.email_support}`}
                  >
                    {siteMetadata.email_support}
                  </a>
                  <a
                    className="text-accent hover:text-accent-strong transition-colors"
                    href={`mailto:${siteMetadata.email_sponsors}`}
                  >
                    {siteMetadata.email_sponsors}
                  </a>
                </span>
              </Row>
              <Row label="operator">
                <Link className="text-fg hover:text-accent font-medium transition-colors" href="/">
                  OmniCTF
                </Link>{' '}
                is a cybersecurity competition and brand operated by{' '}
                <span className="text-fg font-medium">ASOCIAȚIA OMNICYBR</span>, a Romanian
                nonprofit association.
              </Row>
              <Row label="registration">
                CIF: 55377548 · Registered in the Register of Associations and Foundations under no.
                85/30.07.2026
              </Row>
              <Row label="build">
                <span className="flex flex-wrap gap-x-4 gap-y-1">
                  <span>Built with Next.js · Tailwind · Pliny</span>
                  <span className="text-mute">Theme built by eLure</span>
                </span>
              </Row>
              <Row label="copyright">
                © {new Date().getFullYear()} ASOCIAȚIA OMNICYBR. All rights reserved.
              </Row>
            </dl>
          </div>
        </div>
      </div>
    </footer>
  )
}
