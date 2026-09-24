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
  fg: '#c9d1f2',
  mute: '#8089b3',
  accent: '#bb9af7',
}

const ANSI = ['#ff9e64', '#7dcfff', '#9ece6a', '#f7768e', '#bb9af7', '#e0af68', '#7aa2f7', '#8089b3']

const PX = 40
const PY = 40
const PW = W - PX * 2
const PH = H - PY * 2
const BAR = 36
const CX = W / 2

const strip = ANSI.map(
  (c, i) =>
    `<rect x='${PX + (PW / ANSI.length) * i}' y='${PY + PH - 8}' width='${PW / ANSI.length}' height='8' fill='${c}'/>`
).join('')

const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}' viewBox='0 0 ${W} ${H}'>
  <defs>
    <radialGradient id='glow' cx='50%' cy='42%' r='62%'>
      <stop offset='0%' stop-color='#bb9af7' stop-opacity='0.17'/>
      <stop offset='100%' stop-color='#bb9af7' stop-opacity='0'/>
    </radialGradient>
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
  <text x='${PX + 42}' y='${PY + 24}' font-family="${F}" font-size='17' fill='${C.mute}'>omnictf@omnicybr:~</text>
  <text x='${W - PX - 20}' y='${PY + 24}' text-anchor='end' font-family="${F}" font-size='17' fill='${C.mute}'>omnictf.com</text>

  <g transform='translate(${CX - 61},178) scale(0.0478)'>${logo}</g>

  <text x='${CX}' y='424' text-anchor='middle' font-family="${F}" font-size='104' fill='${C.fg}'>OmniCTF</text>

  <text x='${CX}' y='486' text-anchor='middle' font-family="${F}" font-size='26' fill='${C.accent}'>You Play. You Hack. You Write.</text>
</svg>`

sharp(Buffer.from(svg, 'utf8'))
  .png({ compressionLevel: 9 })
  .toFile(out)
  .then((i) => console.log('ok', i.width + 'x' + i.height, Math.round(i.size / 1024) + 'KB'))
  .catch((e) => console.log('ERR', e.message))
