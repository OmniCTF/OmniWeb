export type Speaker = {
  name: string
  photo: string
  title?: string
  website?: string
  links?: { label: string; href: string }[]
}

export type Workshop = {
  id: string
  title: string
  speaker: Speaker
}

export type SpeakerEntry = Speaker & { id: string }

export const WORKSHOPS: Workshop[] = [
  {
    id: 'agentic-hacking',
    title: 'Agentic hacking with uncensored AI models',
    speaker: {
      name: 'Andrei "Pax" Popa',
      photo: '/static/images/pax.jpeg',
      website: 'https://paxdynamics.com/',
    },
  },
]

export const SPEAKERS: SpeakerEntry[] = [
  {
    id: 'agentperry',
    name: 'AgentPerry',
    photo: '/static/images/agentperry.gif',
    website: 'https://scr1ptk1dd13s.xyz/discord',
  },
  {
    id: 'anghel-filip-neo',
    name: 'Anghel Filip-Neo',
    photo: '/static/images/anghel-filip-neo.jpg',
    links: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/lifip27' }],
  },
]
