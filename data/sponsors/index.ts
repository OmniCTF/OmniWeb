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
  id: 'cyberm-delta',
  name: 'Delta Obscura',
  tier: 'Partner',
  logo: '/static/images/cyberm-delta.png',
  description:
    'Delta Obscura is the team behind Mission Vector Zero, an ongoing cybersecurity mission that has already protected 3+ billion users globally through vulnerability research & responsible disclosure. The team has a collective count of over 50 CVEs.',
  website: 'https://delta.cyberm.ca/',
  links: [
    { label: 'Website', href: 'https://delta.cyberm.ca/' },
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
    id: 'ottersec',
    name: 'OtterSec',
    tier: 'Gold',
    logo: '/static/images/otter.png',
    description:
      'OtterSec is a blockchain security company focused on identifying and patching critical exploits before our clients go to market. We work closely with leading teams to provide a holistic and collaborative approach to security.',
    website: 'https://osec.io/',
    links: [
      { label: 'X', href: 'https://x.com/osec_io' },
    ],
  },

  {
  id: 'hyperlinerobotics',
  name: 'HyperLine Robotics',
  tier: 'Silver',
  logo: '/static/images/hyper.png',
  description:
    'HyperLine Robotics designs and builds open-source line followers, mini sumos and racing robots - engineered in Romania, raced worldwide.',
  website: 'https://hyperlinerobotics.com/',
  links: [
    { label: 'Instagram', href: 'https://www.instagram.com/hyperlinerobotics_team/' },
    { label: 'Oshwlab', href: 'https://oshwlab.com/bicicleta11/works' },
  ],
},
  
  {
  id: 'knight-squad-academy',
  name: 'Knight Squad Academy',
  tier: 'Silver',
  logo: '/static/images/ksa-icon.png',
  description:
    'Knight Squad Academy provides hands-on cybersecurity and penetration testing certifications designed to assess real-world, practical skills. Our certifications follow a training-agnostic model, allowing candidates to pursue certification without mandatory training requirements. We emphasize practical methodology, technical depth, and job-relevant competencies aligned with modern security challenges.',
  website: 'https://knightsquad.academy/',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/knight-squad-academy/' },
    { label: 'Facebook', href: 'https://www.facebook.com/knightsquad.academy' },
  ],
},

  {
  id: 'genxyz',
  name: 'Gen.xyz',
  tier: 'Silver',
  logo: '/static/images/xyz-logo.png',
  description:
    'Gen.xyz is the registry behind the .xyz domain, building a global community inspired by the internet’s limitless potential and helping creators and companies launch modern, memorable domains.',
  website: 'https://gen.xyz/',
  links: [
    { label: 'About', href: 'https://gen.xyz/about' },
  ],
},
  {
  id: 'unbreakable-romania',
  name: 'Unbreakable Romania',
  tier: 'Partner',
  logo: '/static/images/UNR.png',
  description:
    'Unbreakable Romania is a national cybersecurity education program that teaches students and young professionals practical security skills through CTF competitions, hands-on challenges, and training resources designed to grow the next generation of cybersecurity experts.',
  website: 'https://unbreakable.ro/',
  links: [
    { label: 'Website', href: 'https://unbreakable.ro/' },
  ],
},
]
