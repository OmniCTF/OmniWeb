# Design

Recorded from the built site, not from intention. If code and this file disagree, the code is
right and this file is stale.

## The world

**The site is a session the visitor is already inside, not a page they arrived at.** It borrows
the grammar of a tiling window manager: gap-separated panes with 1px frames, a status bar pinned
to the top, a system readout at the bottom, and keyboard addresses on the navigation. It refuses
the centered marketing column — badge, headline, subhead, button pair — that this category ships
by default.

The audience reads logs for fun. Density and precision are the courtesy; decoration is noise.

## Ground rules

1. **Full bleed.** The session fills the display. Content runs edge to edge with a WM gutter
   (`p-2 sm:p-3`, an 8–12px gap between panes). Only long-form reading re-imposes a measure.
2. **One focused pane per view.** `.pane-focus` marks the single window that matters on a route:
   the event on `/`, the roster on `/members`, the document on a post. Never two.
3. **Panes, not cards.** A pane is `background + 1px line + 6px radius`, optionally with a
   `.pane-title` strip naming what it holds. Nested panes are wrong.
4. **Colour is data.** Violet is the brand and the only accent that means "act" or "you are
   here". The ANSI channels carry meaning (a category, a status, a diff) and never decorate.
5. **Everything is mono.** One family at many weights. There is no second face.

## Tokens

Defined in `css/tailwind.css` on `:root` (dark) with a single `:root.light` override block, then
aliased into Tailwind utilities under `@theme`. **Add a colour by adding a token, never by
writing a hex value or a `dark:` variant in a component.**

| Token | Dark | Light | Role |
|---|---|---|---|
| `--c-bg` | `#15161e` | `#efe9e2` | page ground |
| `--c-pane` | `#1a1b26` | `#faf5f0` | window fill |
| `--c-raise` | `#1f2130` | `#f2ebe4` | hover / active row |
| `--c-inset` | `#101017` | `#e6ded6` | wells: inputs, code, digit cells |
| `--c-line` | `#2b2e41` | `#ded3c9` | frames and dividers |
| `--c-line-strong` | `#3d4363` | `#c3b5a8` | emphasis borders, scrollbar |
| `--c-fg` | `#c9d1f2` | `#2f2b3f` | primary text |
| `--c-dim` | `#a2abd6` | `#4c4763` | body text |
| `--c-mute` | `#8089b3` | `#635d7d` | labels, metadata |
| `--c-accent` | `#bb9af7` | `#6b3fc9` | brand violet: action, focus, current |
| `--c-accent-strong` | `#a684ee` | `#572fae` | accent hover |
| `--c-accent-ink` | `#14141c` | `#fdfaf7` | text on an accent fill |
| `--c-accent-wash` | `#241f3a` | `#e8e0f6` | accent surface |

ANSI channels: `--c-cyan` `--c-green` `--c-yellow` `--c-orange` `--c-red` `--c-blue`. Used for
challenge categories, status dots, code tokens, admin/retired badges.

Measured contrast on the built page: h1 11.3:1, body 11.3:1, pane titles 6.15:1, muted labels
6.15:1, nav 9.33:1. Every text token clears 4.5:1 on its own surface in both themes.

**Dark is the default** (`siteMetadata.theme = 'dark'`). The use scene decided it: a competitor
on a second monitor at 2am with a terminal open. Light is a real second theme, not an
afterthought, reachable from the header slider.

## Type

**Cascadia Code**, variable 200–700 with a true italic, self-hosted from
`public/static/fonts/` (latin + latin-ext, so `Constanța` renders). Chosen because it is the
face the borrowed world actually ships, not because the subject is technical.

- Display: `clamp(2rem, 5.2vw, 5rem)`, weight 600, tracking `-0.045em`. Never past 6rem.
- Page titles: `text-3xl`/`text-4xl`, weight 600, tracking `-0.035em`.
- Section headings: `text-xl`/`text-2xl`, weight 600.
- Body: `text-sm`/`text-base`, `leading-relaxed`, measure capped at 68–85ch; long-form at 76ch.
- Labels and pane titles: `text-[11px]`, weight 600, uppercase, tracking `0.08–0.12em`.
- Numbers that change or align use `.tabnum`.
- Ligatures are off site-wide; `->` and `=>` must read as two characters.

## Components

`.pane` `.pane-inset` `.pane-focus` `.pane-hover` `.pane-title` `.kbd` `.module`
`.module-strong` `.tabnum` `.tile-in` — all in `css/tailwind.css`.

`components/Window.tsx` is the route-level primitive: a pane with a path-shaped title
(`~/about`, `~/members`) and an optional right-hand meta slot.

Icons are **lucide-react** at `strokeWidth={2}`, 3.5–4 units. No emoji, no glyph substitutes.

## Layout grammar

- **Status bar** (`components/Header.tsx`): sticky, 48px, full width. Left: mark, wordmark,
  workspace nav. Centre: current path as window title (xl+). Right: UTC clock, finals countdown,
  launcher, theme slider, mobile menu.
- **Workspaces**: nav items are numbered and the digits are **live keybindings** — `1`–`4` switch
  route, `0` goes home, ignored while typing. The number is an address, which is the only reason
  it is allowed to be there.
- **Persistent countdown**: the finals module rides the status bar on every route, because event
  truth is the product.
- **Launcher**: the existing kbar search, presented as the session launcher with its `⌘K` binding
  shown. On mobile the workspace list becomes a full-screen launcher panel.
- **Footer**: a `fastfetch`-style system readout — logo in the art slot, key/value rows carrying
  every legal and contact string verbatim.
- **Homepage**: a 12-column tile field. Event pane at 8–9 columns (focused), countdown and
  `event.spec` stacked at 3–4. Categories tile 1→2→4→8 across breakpoints. Sponsors and posts
  follow as their own tile grids.
- **List routes**: a filter rail plus a row list, dense, `ls`-shaped. Members render as a process
  list with id, name, position, joined, focus and links columns; `/` focuses the filter.
- **Reading routes**: metadata rail (`post.info`) on the left, document pane on the right at a
  76ch measure.

## The session is operable

The WM metaphor is not a skin — the chrome does what it depicts, and every binding is published
in the `?` sheet so nothing is hidden behaviour.

**`hyprland.conf` (status bar, sliders icon).** A floating, draggable window holding the real
config: `general { gaps_in, gaps_out, border_size }`, `decoration { rounding, inactive_opacity,
blur }`, `animations { enabled }`, `dwindle { layout }`. Values are written onto
`document.documentElement` as `--hypr-*` custom properties, so a change re-tiles every pane on
every route immediately, and the choice persists to `localStorage` under
`omnictf:hyprland.conf`. Reset restores the defaults in `DEFAULT_CONFIG`.

**Anything that should respond to the config must consume the variables**, never a hard-coded
value: `p-[var(--hypr-gap-out)]` for route gutters, `gap-[var(--hypr-gap-in)]` for tile grids,
and `.pane` for frames and rounding.

**Homepage windows** (`components/session/Workspace.tsx`) take focus on pointer or keyboard
focus, swap places, close, restore, and re-tile between `dwindle` (main plus side stack) and
`master` (main on top, rest in a row). Bindings: `h`/`l` focus, `H`/`L` swap, `q` close, `r`
restore, `t` layout. Route bindings live in the header: `0`–`4` for workspaces. `/` focuses a
list filter, `⌘K` opens the launcher, `?` opens the sheet, `Esc` closes overlays. Every handler
ignores events originating in an input, textarea, select, or contenteditable.

Windows carry `role="region"` with the window title as label; the keybinding sheet and
`hyprland.conf` are labelled dialogs with real buttons for dismissal.

## Motion

One authored moment: `.tile-in` — panes arrive on first paint with a 10px rise, 0.985 scale and a
6px blur clearing over 620ms on `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 40/120/180ms. It reads
as a WM opening its windows. Everything else is a 160–200ms colour or transform transition on
hover and the theme knob. Fully disabled under `prefers-reduced-motion`.

## States

Hover lifts a pane's border toward the accent and its fill to `--c-raise`. Focus is a 2px accent
outline at 2px offset, never removed. Disabled pagination sits at 40% opacity. Empty states are a
single muted sentence inside the pane that would have held the list. Retired members render at
60% opacity with a grayscale avatar that clears on hover.

## Constraints this design must keep

- Static export to GitHub Pages: no server runtime, everything survives `next export`.
- The CSP in `next.config.js` allowlists external origins; self-hosted fonts avoid it entirely.
- Copy is fixed. Every headline, tagline, prize table, sponsor description and legal string is
  reproduced word for word. The only changed copy is the homepage event line (finals date, time,
  venue), changed on request.
- The logo/wordmark and the violet accent are brand commitments.

## Known leftovers

`layouts/ListLayout.tsx`, `layouts/AuthorLayout.tsx` and `components/SponsorsTabs.tsx` are not
imported by any route and were left on the old visual system. Restyle or delete them before
wiring any of them up.
