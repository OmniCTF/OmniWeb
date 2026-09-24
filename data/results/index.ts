export type TeamResult = {
  place: number
  team: string
  country: 'RO' | 'JO'
  score: number
}

export type EditionResults = {
  year: string
  label: string
  status: 'final' | 'upcoming'
  sourceUrl?: string
  sourceLabel?: string
  note?: string
  results: TeamResult[]
}

export const EDITIONS: EditionResults[] = [
  {
    year: '2026',
    label: 'OmniCTF 2026 Finals',
    status: 'final',
    sourceUrl: 'https://ctftime.org/event/3401',
    sourceLabel: 'ctftime',
    results: [
      { place: 1, team: 'SelfwashRO', country: 'RO', score: 1886.48 },
      { place: 2, team: 'Dacia Team', country: 'RO', score: 1641.35 },
      { place: 3, team: 'The WiWiWi', country: 'RO', score: 1533.24 },
      { place: 4, team: 'JordanShell', country: 'JO', score: 1529.89 },
      { place: 5, team: 'Am1gos', country: 'JO', score: 1498.0 },
      { place: 6, team: 'O Fire Tandra', country: 'RO', score: 1313.6 },
      { place: 7, team: 'C.D-Pereti', country: 'RO', score: 810.84 },
      { place: 8, team: 'Noi DA!', country: 'RO', score: 274.4 },
      { place: 9, team: 'OSINtf', country: 'RO', score: 227.2 },
    ],
  },
  {
    year: '2027',
    label: 'OmniCTF 2027',
    status: 'upcoming',
    note: 'Coming soon.',
    results: [],
  },
]

export const FINALS_RESULTS = EDITIONS[0].results
