export type Speaker = {
  name: string
  photo: string
  title?: string
}

export type Workshop = {
  id: string
  title: string
  speaker: Speaker
}

export const WORKSHOPS: Workshop[] = [
  {
    id: 'agentic-hacking',
    title: 'Agentic hacking with uncensored AI models',
    speaker: {
      name: 'Andrei "Pax" Popa',
      photo: '/static/images/pax.jpeg',
    },
  },
]
