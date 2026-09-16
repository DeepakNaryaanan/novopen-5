# NovoPen 5 design-token mapping plan

Phase 1.5 handoff for `user_story/novopen-5.md` and
`blocks/specifications/block.md`. This is a CSS plan, not implementation CSS.

## Inputs and constraints

- Reviewed `CLAUDE.md`, `AGENTS.md`, `styles/styles.css`,
  `styles/fonts.css`, and the existing Hero, Columns, and Cards CSS.
- `docs/blocks.md`, `docs/globals.md`, and `styles/config/` are absent.
  There are no existing theme, palette, typography-class, grid, button, or
  override config files to consume.
- The source page and served CSS/assets were inspected as visual reference
  only. Do not copy its prose, fonts, or binaries.
- Official AEM guidance was checked via `site:www.aem.live`: keep authoring
  simple, inherit context, scope block CSS, and preserve responsive/a11y output.
- Preserve current changes and do not edit `scripts/aem.js`.

## Observed values versus approximations

| Property | Observed source | Planned approximation / token |
|---|---|---|
| Brand ink | `#001965`, dominant source CSS colour | `--color-brand-primary` |
| Action blue | `#005ad2` | `--color-interactive-focus` |
| Warm section | Inline `#EEEAE4` | `--color-surface-warm` |
| Canvas / hero text | White / white | `--color-surface-page` / `--color-text-on-media` |
| Card border | Existing Cards hard-codes `#dadada` | `--color-border-subtle`; structural only |
| Source type | “Novo” display face and Noto Sans | Do not import; use local Roboto Condensed 700 and Roboto 400/500/700 |
| Hero title | Roughly 48/52, 64/72, 96/98, 126/128 px | `--type-size-display: clamp(3rem, 7vw + 0.5rem, 7.875rem)`; leading 1.02 |
| Body | Source large copy 24/42 px | Keep project body scale; constrain measure |
| Section rhythm | Commonly 60 px; title offset 80 px | 48 px mobile, 64 px at 760, 80 px at 1272 |
| Source gutters | 150 px left / 180 px right on large screens | Keep project 24/32 px symmetric gutters and 1200 px max |
| Hero | `100vh`; asset 1900×715; bottom-aligned text | 420 px mobile; `min(72vh, 720px)` from 992 |
| Hero focus | Source coordinates `-0.06:-0.26` | Start at `object-position: 44% 37%`; validate with approved image |
| Product image | Observed 1280×853 | Intrinsic ratio, `object-fit: contain`; never crop pen ends/display |
| Feature strip | Observed 1040×300 | Intrinsic ratio, `contain` |
| Promotion | Observed 1280×482 | Preserve ratio; `8 / 3` only for equivalent approved composition |
| Radii | Predominantly square/low-radius | 4 px data/card, 8 px contained panels; keep pill buttons |
| Motion | Source entrance 600 ms | Omit entrance; optional state transitions 160 ms |

Observed values describe source CSS, not a requirement to clone it.

## Token mapping

### Colour

| Element | Semantic token | Current/fallback mapping |
|---|---|---|
| Page/card canvas | `--color-surface-page` | `var(--background-color)` |
| Quiet surface | `--color-surface-subtle` | `var(--light-color)` |
| Warm intro surface | `--color-surface-warm` | proposed source-derived value |
| Primary / secondary copy | `--color-text-primary` / `--color-text-secondary` | `var(--text-color)` / `var(--dark-color)` |
| Heading ink | `--color-brand-primary` | proposed source-derived value |
| Text over media | `--color-text-on-media` | white palette value |
| Links | `--color-interactive-default` / `--color-interactive-hover` | `var(--link-color)` / `var(--link-hover-color)` |
| Active / focus | `--color-interactive-active` / `--color-interactive-focus` | brand ink / proposed action blue |
| Disabled | `--color-text-disabled` / `--color-surface-disabled` | dark / light primitives |
| Divider | `--color-border-subtle` | replaces raw Cards border |
| Hero overlay | `--overlay-media-scrim` | reusable gradient token |

Brand, surface, state, and media-overlay meanings span multiple blocks and
belong globally. Crop positions and component geometry remain block-local.

### Typography

`styles/config/typography.css` and typography classes do not exist. Use
semantic HTML and current global families/sizes.

| Role | Mapping | Note |
|---|---|---|
| Hero title | heading family 700; display size/leading tokens | Local approximation; no synthetic 600 |
| Eyebrow | body 700, 16/24 px, optional 0.04 em tracking | Do not uppercase via JS |
| Section `h2` | `--heading-font-size-xl`, heading 700 | Current CSS asks for unloaded 600 |
| Card/spec heading or term | heading M or body 18/700 | Heading level follows outline |
| Body/list | `--body-font-size-m`, body 400 | Cap at `--measure-copy` |
| Link/UI | `--body-font-size-s`, body 500/700 | Underline; ≥44 px action target |
| Notes | `--body-font-size-xs`, body 400, 1.5 leading | Never below global 14 px |

### Spacing, radii, widths

| Need | Token | Value |
|---|---|---|
| Fine/inline | `--space-1`, `--space-2` | 4, 8 px |
| Compact/card | `--space-3`, `--space-4` | 12, 16 px |
| Grid/gutter | `--space-6`, `--space-8` | 24, 32 px |
| Large rhythm | `--space-10`, `--space-12`, `--space-16`, `--space-20` | 40, 48, 64, 80 px |
| Radii | `--radius-s`, `--radius-m`, `--radius-pill` | 4, 8, 999 px |
| Content width | `--width-content` | 1200 px |
| Reading/data measure | `--measure-copy`, `--measure-compact` | 65ch, 48rem |
| Card minimum | `--width-card-min` | 280 px |

## Variant plans

### Hero(product)

- Keep `.hero.product` full bleed and authored text in normal DOM content.
- Establish a local stacking context so fallback surface/text survives image
  failure; avoid the current negative-z-index dependency.
- Use `cover` and initially `object-position: 44% 37%`.
- Apply the scrim over the full image and keep eyebrow/title in its darkest
  bottom 32%; never rely on image pixels for contrast.
- Allow mobile title wrapping and cap its measure. Desktop text may span about
  10 grid columns but should not cover the subject.
- Hero is the only eager/LCP candidate; other images use EDS lazy renditions.

### Columns(product-intro)

- Image then text, one column by default. Missing image collapses fully.
- Use warm surface only when selected through section metadata.
- Use `contain`, intrinsic dimensions, and about 36rem max image width.
- At 992 px use balanced columns, 32 px gap, and copy capped at 65ch.

### Columns(feature)

- Same mobile order/missing-image behavior; preserve semantic `ul`.
- Use `contain` for wide graphic. At 992 px use about 7/5 image/text when
  imagery exists; constrain text-only content.
- Notes use secondary text and compact spacing, never opacity.

### Cards(downloads)

- Text-led; no fabricated thumbnail/button.
- One column; two at 760; three at 992 only above 280 px per item.
- Subtle surface/border, underlined native link, and ≥44 px action row.

### Cards(promotional)

- One column; approved image, heading, description, link. Two columns at 760
  when each remains ≥280 px.
- Preserve intrinsic media ratio; missing image removes media region.
- Page surface, subtle border, 8 px radius. Never clip focus indicators.

### Specifications(default)

- Prefer `dl`/`dt`/`dd`; keep authored label/value order.
- One pair per divided row; stack label over value on narrow screens.
- From 632 px use `minmax(10rem, 1fr) minmax(0, 2fr)`.
- Use `overflow-wrap: anywhere`, `--measure-compact`, and no horizontal scroll.

## Responsive plan

Use mobile-first `@media (width >= ...)` only.

| Breakpoint | Plan |
|---|---|
| Base / <632 | 24 px gutters; all stack; 420 px hero; stacked specs; 48 px section rhythm |
| 632 | Specs become two-column pairs; measures may widen; no reordering |
| 760 | 32 px gutters where possible; downloads/promotions may use two columns; 64 px rhythm; Columns stay stacked |
| 992 | Product/feature Columns become two columns; downloads may use three; hero can use `min(72vh, 720px)` |
| 1272 | Center 1200 px content; 80 px rhythm; feature may use 7/5 proportions |
| 1432 | No extra columns; hero title/spacing can reach caps; retain 1200 px max |

This replaces isolated 900 px block switches and approximates the source's
525/768/1280 steps with the shared 632/760/992/1272/1432 scale.

## States

| Element | Hover | Active | Focus-visible | Disabled |
|---|---|---|---|---|
| Inline/PDF link | hover token + thicker/offset underline | active token | `3px solid var(--color-interactive-focus)`, 3 px offset | Not applicable; omit `href` rather than fake disabled |
| Download row | subtle surface + hover text | active token, no shift | same 3 px ring | disabled foreground/surface only for a true control |
| Promotional link | hover token/surface | active token | same ring, never clipped | same true-control rule |
| Existing button | current semantic hover | active token | separate required 3 px ring from hover | semantic disabled tokens |

Default links use the default interactive token and underline. Hover/active
also change underline/surface so colour is not the only cue. Visited styling is
optional and must remain ≥4.5:1.

## Motion and reduced motion

- No load/scroll animation.
- Optional colour/background/underline/transform transition:
  `160ms cubic-bezier(0.2, 0, 0, 1)`.
- Optional hover translation is at most 2 px and does not move keyboard focus.
- Under `prefers-reduced-motion: reduce`, use `0.01ms` durations, one animation
  iteration, and no transforms.

## WCAG contrast and themes

| Pair | Ratio | Result |
|---|---:|---|
| `#001965` / white | 15.83:1 | AAA |
| `#005ad2` / white | 6.19:1 | AA and focus pass |
| Existing `#3b63fb` / white | 4.81:1 | AA |
| Existing `#1d3ecf` / white | 7.95:1 | AAA |
| `#131313` / white | 18.58:1 | AAA |
| `#505050` / `#f8f8f8` | 7.59:1 | AAA |
| `#001965` / `#eeeae4` | 13.21:1 | AAA |
| `#005ad2` / `#eeeae4` | 5.16:1 | Focus pass |

`#dadada` / white is 1.40:1, acceptable only for a non-essential separator.
The hero scrim reaches 72% black; keep text in that protected zone and measure
again with the approved crop.

Current CSS has no `data-eds-theme` support. The proposal below adds semantic
dark mappings: `#b3d4fc` / `#131313` is 12.16:1; `#70757f` border /
`#131313` is 4.02:1. Blocks must consume semantic tokens to adapt.

## Proposed exact addition — do not apply yet

Target: `styles/config/overrides.css`.

Creating only this file is inappropriate while `styles/config/` and its import
order do not exist. First establish that layer (or place equivalent definitions
in the loaded global stylesheet). Then add:

```css
:root {
  --color-brand-primary: #001965;
  --color-surface-page: var(--background-color);
  --color-surface-subtle: var(--light-color);
  --color-surface-warm: #eeeae4;
  --color-text-primary: var(--text-color);
  --color-text-secondary: var(--dark-color);
  --color-text-on-media: #fff;
  --color-text-disabled: var(--dark-color);
  --color-surface-disabled: var(--light-color);
  --color-border-subtle: #dadada;
  --color-interactive-default: var(--link-color);
  --color-interactive-hover: var(--link-hover-color);
  --color-interactive-active: var(--color-brand-primary);
  --color-interactive-focus: #005ad2;
  --overlay-media-scrim:
    linear-gradient(
      to top,
      rgb(0 0 0 / 72%) 0%,
      rgb(0 0 0 / 68%) 32%,
      rgb(0 0 0 / 32%) 68%,
      rgb(0 0 0 / 8%) 100%
    );
  --type-size-display: clamp(3rem, 7vw + 0.5rem, 7.875rem);
  --type-leading-display: 1.02;
  --motion-duration-fast: 160ms;
  --motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --radius-s: 4px;
  --radius-m: 8px;
  --radius-pill: 999px;
  --width-content: 1200px;
  --width-card-min: 280px;
  --measure-copy: 65ch;
  --measure-compact: 48rem;
}

[data-eds-theme="dark"] {
  --color-brand-primary: #b3d4fc;
  --color-surface-page: #131313;
  --color-surface-subtle: #242424;
  --color-surface-warm: #242424;
  --color-text-primary: #f8f8f8;
  --color-text-secondary: #d4d7dc;
  --color-text-on-media: #fff;
  --color-text-disabled: #939aa7;
  --color-surface-disabled: #333;
  --color-border-subtle: #70757f;
  --color-interactive-default: #b3d4fc;
  --color-interactive-hover: #fff;
  --color-interactive-active: #d4d7dc;
  --color-interactive-focus: #b3d4fc;
}
```

Raw colour values must not appear in block CSS.

## Open gaps

1. Approved/licensed local images are missing; source assets must not be
   imported.
2. Revalidate focal points when approved images arrive.
3. Confirm whether to establish the missing `styles/config/` architecture.
   Until then, semantic imports and dark theme have no runtime contract.
4. Confirm whether warm surface is global or only section metadata. If unique
   to this page, use the existing subtle surface instead.
5. Existing Cards has raw `#dadada`; current blocks use 900 px; global focus
   conflates hover/focus. Resolve only in approved scope.
6. Heading CSS asks for 600 but only Roboto Condensed 700 exists. Use 700 or
   approve a real 600 asset; do not synthesize.
7. Final checks require approved imagery, 320 px/200% reflow, keyboard focus,
   and light/dark rendered contrast.

## Handoff

Recommended next agent: **blockwright**. Implement all six variants
mobile-first using this map. Apply the override proposal only after establishing
its import contract; validate crop/contrast with approved assets; do not copy
source assets/prose or edit `scripts/aem.js`.
