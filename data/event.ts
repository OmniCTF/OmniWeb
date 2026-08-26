/**
 * Single source of truth for the event. The status bar, the homepage and any
 * future surface all read from here, so a date change is one edit.
 *
 * Facts confirmed against CTFtime event 3401.
 */
export const EVENT = {
  name: 'OmniCTF 2026 Finals',
  shortName: 'OmniCTF 2026',
  format: 'On-site',
  durationLabel: '10 hours',
  dateLabel: '19th September',
  timeLabel: '06:00 – 16:00 UTC',
  localTimeLabel: '09:00 – 19:00 local time (EEST)',
  venue: 'Ovidius University',
  venueCity: 'Constanța, Romania',
  venueUrl: 'https://www.google.com/maps/search/?api=1&query=Universitatea+Ovidius+din+Constanta',
  mode: 'countdown' as 'preparing' | 'countdown',
  countdownTargetIso: '2026-09-19T06:00:00.000Z',
  endIso: '2026-09-19T16:00:00.000Z',
}

export const LINKS = {
  discord: 'https://discord.gg/jzZkfh9UFR',
  register: 'https://ctf.omnictf.com/register',
  login: 'https://ctf.omnictf.com/login',
  requirements: 'https://ctf.omnictf.com/requirements',
  ctftime: 'https://ctftime.org/event/3401',
}

/** What the event pane reads out, in the order a competitor needs it. */
export const EVENT_SPEC: [string, string][] = [
  ['event', EVENT.name],
  ['format', 'On-site · Jeopardy + KOTH'],
  ['date', '19 Sep 2026'],
  ['window', '06:00 – 16:00 UTC'],
  ['local', '09:00 – 19:00 EEST'],
  ['duration', '10 hours'],
  ['venue', 'Ovidius University'],
  ['location', 'Constanța, Romania'],
  ['teams', '12 qualified · up to 3 players'],
  ['entry', 'Prequalified'],
]
