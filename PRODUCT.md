# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: **competitors** — the 12 teams that qualified for the OmniCTF 2026 Finals, and the
much larger pool of CTF players deciding whether OmniCTF is worth their next weekend.

They arrive on a phone or a second monitor mid-session, already fluent in the domain. They want
event truth fast (when, where, what format, am I eligible, where do I log in), and they judge the
organization's competence by how the site handles that. Writeups and past challenges are how they
calibrate difficulty before committing a team.

Secondary, confirmed but not leading: sponsors/partners evaluating the program, and the members
and testers whose profiles the site publishes.

## Product Purpose

OmniCTF is a cybersecurity competition run by ASOCIAȚIA OMNICYBR, a Romanian nonprofit
association (CIF 55377548, registered in the Register of Associations and Foundations under
no. 85/30.07.2026). omnictf.com is the public face: it announces the event, states the rules of
entry, publishes writeups and the people behind it, and credits sponsors and partners.

Success is a competitor who finds the date, venue, and entry path without asking in Discord, and
who comes away treating OmniCTF as a serious competition rather than a student side project.

## Positioning

A Romanian-run competition with a real on-site final: online qualifiers feed 12 teams
(top 9 Romania-based, top 3 international) into a same-day, on-site final in Constanța. Most
CTFs of this size stop at the online round. The split-nationality qualification and the physical
final are the parts a neighboring event cannot truthfully copy.

## Operating Context

- **Quals:** OmniCTF 2026, online, 17–19 July 2026, 48 hours, 15:00–15:00 UTC. Concluded.
- **Finals:** 19 September 2026, 06:00–16:00 UTC (09:00–19:00 EEST), on-site at Ovidius
  University, Constanța, Romania. Jeopardy plus KOTH. Prequalified/invite-only, teams of up to
  3 players. CTFtime event 3401 lists the span as 10 hours while its own description says
  9 hours — unresolved, do not silently pick one.
- **Competition infrastructure** is a separate property at ctf.omnictf.com (`/register`,
  `/login`, `/requirements`). Registration requires completing a form first; staff then issue an
  access code.
- **Challenge categories:** Reverse, Web, Forensics, PWN, Crypto, OSINT, Blockchain, Misc.
- Discord is the live channel during events; CTFtime team 383015 is the public record.

## Capabilities and Constraints

- Next.js 15 App Router, React 19, Tailwind CSS v4 (CSS-first `@theme` in `css/tailwind.css`),
  contentlayer2 for MDX, pliny for search/newsletter/analytics/comments.
- **Static export.** GitHub Actions builds with `EXPORT=1 UNOPTIMIZED=1` and deploys `./out` to
  GitHub Pages on push to `main`, served at omnictf.com via CNAME. No server runtime: no image
  optimization, no server actions, no runtime env. Everything must survive `next export`.
- A strict CSP lives in `next.config.js`, including an explicit allowlist of external image
  hosts. New third-party origins require editing it.
- Routes: `/`, `/about`, `/special-thanks`, `/blog` (+ pagination, tags, post pages),
  `/members` (+ member pages), `404`.
- Content is authored as MDX under `data/` (blog writeups, authors, about, special thanks) and
  as typed data (`data/sponsors/index.ts`, `data/headerNavLinks.ts`, `data/siteMetadata.js`).
  Non-technical edits happen in those files, so their shape should stay stable.
- Sponsor tiers in use: Partner, Platinum, Gold, Silver, Bronze, Infra.
- Google AdSense script and Vercel Analytics/Speed Insights are currently loaded in the root
  layout.

## Brand Commitments

- Name **OmniCTF**; operator **ASOCIAȚIA OMNICYBR**. The footer's legal identification is
  required text.
- **The logo/wordmark is fixed** (`data/logo.svg`, `public/static/images/logo.png`).
- **Violet is the brand accent and stays violet.**
- **All existing copy is fixed and must be reproduced word-for-word.** Headlines, taglines, body
  text, sponsor descriptions, prize tables, member bios. The only copy this project has changed
  is the homepage event line, at the user's request, to state the finals date, time, and venue.
- Light mode is *not* a commitment: the user released it, so the redesign may go dark-only or
  dark-first.
- Binding visual constraint volunteered by the user, recorded here and interpreted in DESIGN.md,
  not expanded here: "more professional / Omarchy-style — terminal-native, monospace, tight,
  minimal chrome."
- Existing credit line "Theme built by eLure" is present in the footer.
- Contact routes: support@omnictf.com, sponsors@omnictf.com.

## Evidence on Hand

- Real sponsors and partners with logos in `public/static/images/`: Spectrum Constanța, Delta
  Obscura, UNbreakable Romania, OtterSec, Marina Hub, Caido, HyperLine Robotics, Knight Squad
  Academy, Hetzner.
- Six real challenge writeups in `data/blog/` (dexcore, dns-cover, impasta, intro-to-osint,
  old-days-intercepted, tetoris).
- Fifteen real member profiles with avatars in `data/authors/` and
  `public/static/images/avatars/`.
- Real prize structure for quals and finals (`data/about/index.mdx`, CTFtime 3401).
- Public record: CTFtime team 383015, Discord, X/@OmniCYBR, YouTube, LinkedIn, Instagram,
  Facebook, GitHub org.
- **Not on hand, must not be fabricated:** participant counts, team counts, past-edition
  statistics, photos of the venue or of previous events, testimonials, press coverage, and any
  claim about editions before 2026.

## Product Principles

1. **Event truth is the product.** Date, time, place, eligibility, and entry path outrank every
   other element on the homepage.
2. **Written for people who read logs.** The audience is technical; density and precision read
   as respect, decoration reads as noise.
3. **Never invent proof.** No fabricated numbers, photos, or history. Absent evidence is stated
   or omitted, never simulated.
4. **Authorable by the team.** Content stays in MDX and typed data files a non-designer can edit
   without touching layout code.
5. **Must survive static export.** No feature that needs a server; the whole site is files on
   GitHub Pages.

## Accessibility & Inclusion

No product-specific standard has been established. Baseline expectations apply: keyboard-operable
navigation and search, visible focus, contrast that holds on the dark surfaces the site favors,
and text alternatives for logos and avatars. The audience includes non-native English speakers;
the site is English-only and there is no confirmed plan to localize.
