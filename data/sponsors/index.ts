// /data/sponsors/index.ts

export type SponsorLink = { label: string; href: string }

export type Sponsor = {
  id: string
  name: string
  logo: string
  description: string
  website?: string
  links?: SponsorLink[]
  tier?: 'Partner' | 'Platinum' | 'Gold' | 'Silver' | 'Bronze' | 'Community' | 'Infra' | string
}

export const SPONSORS: Sponsor[] = [
  {
    id: 'spectrum',
    name: 'Spectrum',
    tier: 'Partner',
    logo: '/static/images/spectrum.png',
    description:
      'Spectrum Constanța is a modern educational institution focused on performance, respect, and innovation. It combines the tradition of Romanian education with European values, preparing responsible, creative, and competitive students ready for future careers.',
    website: 'https://spectrumconstanta.ro/',
    links: [
      { label: 'Facebook', href: 'https://www.facebook.com/ScoalaSpectrumConstanta/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/scoala-gimnaziala-spectrum-constanta/' },
    ],
  },

  {
    id: 'hetzner',
    name: 'Hetzner',
    tier: 'Infra',
    logo: '/static/images/hetzner.png',
    description:
      'Hetzner Online provides dedicated servers and cloud infrastructure, powering reliable hosting and scalable deployments for OmniCTF.',
    website: 'https://www.hetzner.com/',
    links: [
      { label: 'Cloud', href: 'https://www.hetzner.com/cloud' },
      { label: 'Server Auction', href: 'https://www.hetzner.com/sb' },
    ],
  },

  {
    id: 'caido',
    name: 'CAIDO',
    tier: 'Platinum',
    logo: 'https://caido.io/images/logo.color.webp?size=160',
    description:
      'A lightweight web security auditing toolkit | Caido aims to help security professionals and enthusiasts audit web applications with efficiency and ease.',
    website: 'https://caido.io/',
    links: [
      { label: 'X', href: 'https://x.com/caidoio' },
      { label: 'Discord', href: 'https://discord.gg/caido-843915806748180492' },
    ],
  },

  {
    id: 'deadoverflow',
    name: 'DeadOverflow',
    tier: 'Partner',
    logo:
      'https://yt3.ggpht.com/Bi8lwQz0fUcRjfa_33QERvZ2DfCyC2UMEMrBZSJh4KHr-T6JKc_qlifem6Thjn3V7XbaqHLn=s176-c-k-c0x00ffffff-no-rj-mo?size=160',
    description: 'Cybersecurity | Bug Bounty | Ethical Hacking',
    website: 'https://www.youtube.com/@deadoverflow',
    links: [{ label: 'Youtube', href: 'https://www.youtube.com/@deadoverflow' }],
  },
]
