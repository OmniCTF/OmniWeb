import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const root = process.cwd()
const out = process.argv[2]

const raw = fs.readFileSync(path.join(root, 'data/logo.svg'), 'utf8')
const logo = raw
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/fill:\s*#7211f3/g, 'fill: #bb9af7')

const W = 1200
const H = 630
const F = "'Cascadia Code','Consolas',monospace"

const C = {
  bg: '#15161e',
  pane: '#1a1b26',
  inset: '#101017',
  line: '#2b2e41',
  lineStrong: '#3d4363',
  fg: '#c9d1f2',
  dim: '#a2abd6',
  mute: '#8089b3',
  accent: '#bb9af7',
  wash: '#241f3a',
}

const ANSI = ['#ff9e64', '#7dcfff', '#9ece6a', '#f7768e', '#bb9af7', '#e0af68', '#7aa2f7', '#8089b3']

const spec = [
  ['format', 'On-site · Jeopardy + KOTH'],
  ['date', '19 Sep 2026'],
  ['window', '06:00 – 16:00 UTC'],
  ['venue', 'Ovidius University'],
  ['location', 'Constanța, Romania'],
]

const PX = 40
const PY = 40
const PW = W - PX * 2
const PH = H - PY * 2
const BAR = 36

const specX = 706
const specW = W - PX - 32 - specX + 32
const specTop = PY + BAR + 24
const rowStart = specTop + 78
const rowStep = 40
const specH = 78 + spec.length * rowStep - 12

const specRows = spec
  .map(([k, v], i) => {
    const y = rowStart + i * rowStep
    return `
    <text x='${specX + 20}' y='${y}' font-family="${F}" font-size='17' fill='${C.mute}'>${k}</text>
    <text x='${specX + 128}' y='${y}' font-family="${F}" font-size='17' fill='${C.dim}'>${v}</text>
    ${i < spec.length - 1 ? `<line x1='${specX + 20}' y1='${y + 14}' x2='${specX + specW - 20}' y2='${y + 14}' stroke='${C.line}'/>` : ''}`
  })
  .join('')

const strip = ANSI.map(
  (c, i) =>
    `<rect x='${PX + (PW / ANSI.length) * i}' y='${PY + PH - 8}' width='${PW / ANSI.length}' height='8' fill='${c}'/>`
).join('')

const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}' viewBox='0 0 ${W} ${H}'>
  <defs>
    <linearGradient id='glow' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#bb9af7' stop-opacity='0.16'/>
      <stop offset='55%' stop-color='#bb9af7' stop-opacity='0'/>
    </linearGradient>
    <clipPath id='pane'>
      <rect x='${PX}' y='${PY}' width='${PW}' height='${PH}' rx='10'/>
    </clipPath>
  </defs>

  <rect width='${W}' height='${H}' fill='${C.bg}'/>
  <rect x='${PX}' y='${PY}' width='${PW}' height='${PH}' rx='10' fill='${C.pane}'/>

  <g clip-path='url(#pane)'>
    <rect x='${PX}' y='${PY}' width='${PW}' height='${PH}' fill='url(#glow)'/>
    <rect x='${PX}' y='${PY}' width='${PW}' height='${BAR}' fill='${C.inset}'/>
    ${strip}
  </g>

  <line x1='${PX}' y1='${PY + BAR}' x2='${PX + PW}' y2='${PY + BAR}' stroke='${C.line}' stroke-width='2'/>
  <circle cx='${PX + 24}' cy='${PY + 18}' r='5' fill='${C.accent}'/>
  <text x='${PX + 42}' y='${PY + 24}' font-family="${F}" font-size='17' fill='${C.mute}'>omnictf@finals:~</text>
  <text x='${W - PX - 20}' y='${PY + 24}' text-anchor='end' font-family="${F}" font-size='17' fill='${C.mute}'>omnictf.com</text>

  <g transform='translate(84,132) scale(0.0475)'>${logo}</g>

  <text x='232' y='196' font-family="${F}" font-size='86' fill='${C.fg}'>OmniCTF</text>
  <text x='232' y='268' font-family="${F}" font-size='52' fill='${C.accent}'>2026 Finals</text>

  <text x='84' y='372' font-family="${F}" font-size='24' fill='${C.accent}'>&gt;</text>
  <text x='116' y='372' font-family="${F}" font-size='24' fill='${C.dim}'>19 September 2026</text>

  <text x='84' y='414' font-family="${F}" font-size='24' fill='${C.accent}'>&gt;</text>
  <text x='116' y='414' font-family="${F}" font-size='24' fill='${C.dim}'>Ovidius University, Constanța</text>

  <rect x='84' y='452' width='420' height='52' rx='6' fill='${C.wash}' stroke='${C.accent}' stroke-opacity='0.4' stroke-width='2'/>
  <text x='106' y='485' font-family="${F}" font-size='22' fill='${C.accent}'>You Play. You Hack. You Write.</text>

  <rect x='${specX}' y='${specTop}' width='${specW}' height='${specH}' rx='8' fill='${C.inset}' stroke='${C.line}' stroke-width='2'/>
  <text x='${specX + 20}' y='${specTop + 30}' font-family="${F}" font-size='15' fill='${C.mute}' letter-spacing='2'>EVENT.SPEC</text>
  <line x1='${specX}' y1='${specTop + 46}' x2='${specX + specW}' y2='${specTop + 46}' stroke='${C.line}' stroke-width='2'/>
  ${specRows}

  <rect x='${specX}' y='${452}' width='${specW}' height='52' rx='6' fill='none' stroke='${C.lineStrong}' stroke-width='2'/>
  <text x='${specX + specW / 2}' y='485' text-anchor='middle' font-family="${F}" font-size='20' fill='${C.mute}'>9 teams · 2 countries</text>
</svg>`

sharp(Buffer.from(svg, 'utf8'))
  .png({ compressionLevel: 9 })
  .toFile(out)
  .then((i) => console.log('ok', i.width + 'x' + i.height, Math.round(i.size / 1024) + 'KB'))
  .catch((e) => console.log('ERR', e.message))
