export type SponsorLink = { label: string; href: string }
export type Sponsor = {
  id: string
  name: string
  logo: string           
  description: string
  website?: string
  links?: SponsorLink[]
  tier?: 'Partner' | 'Platinum' | 'Gold' | 'Silver' | 'Community' |string
}

export const SPONSORS: Sponsor[] = [
  {
    id: 'spectrum',
    name: 'Spectrum',
    tier: 'Partner',
    logo:
      'https://media.canva.com/v2/image-resize/format:PNG/height:760/quality:100/uri:ifs%3A%2F%2FM%2F361c7e81-a331-4f1c-866e-065759333667/watermark:F/width:744?csig=AAAAAAAAAAAAAAAAAAAAAPJI40c3HFGZik3pfmCO-T6O5e30dmlnqVUvKihSwgRA&exp=1758050677&osig=AAAAAAAAAAAAAAAAAAAAAIYR-WXw38Tq29EK_hnhUsy7i2pk8BOOraaMLIZZY9Sy&signer=media-rpc&x-canva-quality=screen',
    description:
      '',
    website: 'https://spectrumconstanta.ro/',
    links: [
      { label: 'Facebook', href: 'https://www.facebook.com/ScoalaSpectrumConstanta/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/scoala-gimnaziala-spectrum-constanta/' },
    ],
  },

]
