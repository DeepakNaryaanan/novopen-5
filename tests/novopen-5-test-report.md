# NovoPen 5 — Test Report

**Block:** NovoPen 5 reusable page architecture | **Date:** 2026-09-16 | **Local URL:** http://localhost:3000/novopen-5-test | **Lint:** Passed (`npm run lint`)

**Passed: 28 / Total: 28**

| ID | Title | Steps (brief) | Expected | Actual | Status | Traces To |
|---|---|---|---|---|---|---|
| TC-01 | Semantic page outline | Inspected server and decorated headings, including regression fixtures | One `h1`; logical levels | One product `h1`; plain Hero uses an `h2`; remaining `h2`/`h3` levels stay ordered | ✅ Pass | AC-01, AC-30 |
| TC-02 | Architecture and sequence | Enumerated product blocks, regression fixtures, and nested blocks | Required product order; flat blocks | Product sequence remains hero, intro, features, specifications, guides, promotions; plain Hero/Cards fixtures are separate flat sections; zero nested blocks; footer loaded | ✅ Pass | AC-02, AC-04, AC-05 |
| TC-03 | Product hero desktop | Rendered at 1440px and inspected screenshot/styles | Full-width protected title | 648px full-width hero, scrim, white eyebrow/title | ✅ Pass | AC-08, AC-16, AC-23 |
| TC-04 | Product hero mobile | Rendered at 390px | Safe crop/title; no overflow | Complete title and subject; `scrollWidth` 390 | ✅ Pass | AC-08, AC-14, AC-20 |
| TC-05 | Hero image failure | Dispatched image error in browser | Readable fallback | Picture removed; title remained visible on brand surface | ✅ Pass | AC-06, AC-08, AC-19 |
| TC-06 | Intro columns responsive | Checked 390, 768, 900, 991, 992, and 1440px computed grid | Stack then balanced columns | One column below approved 992px breakpoint; two columns from 992px; balanced at 1440px; image uses `contain` | ✅ Pass | AC-09, AC-14–17 |
| TC-07 | Feature variation and list semantics | Inspected decorated DOM | Coherent image/text; semantic list | Feature image/text retained; two authored `ul` elements preserved | ✅ Pass | AC-09, AC-10, AC-25 |
| TC-08 | Optional feature image omitted | Rendered text-only authored row | No empty media column | `columns-row-no-media` uses full available width | ✅ Pass | AC-19, AC-22 |
| TC-09 | Oversized feature copy | Rendered long heading/list at 320 and 1440px | Wrap without overflow | No horizontal overflow at either width | ✅ Pass | AC-20, AC-26 |
| TC-10 | Specifications complete | Inspected `dl`, `dt`, and `dd` | Associated values in authored order | Five core pairs plus two edge-case valid pairs retained with matched `dt`/`dd` | ✅ Pass | AC-11, AC-17, AC-25 |
| TC-11 | Specifications narrow | Rendered at 320px | Clean stacked reflow | One-column 272px pairs; no horizontal overflow | ✅ Pass | AC-14, AC-26 |
| TC-12 | Malformed specification rows | Included missing label/value and valid neighbors | Ignore invalid rows; no exception | Both orphan rows absent; valid rows intact; browser errors empty | ✅ Pass | AC-21, AC-22 |
| TC-13 | Long specification content | Rendered localized label/unbroken value | Wrap within pair | `overflow-wrap:anywhere`; no overflow at all tested widths | ✅ Pass | AC-20, AC-21 |
| TC-14 | Download cards complete | Inspected three links and requested destinations | Three native PDF anchors | Three cards; all destinations returned HTTP 200 `application/pdf` | ✅ Pass | AC-07, AC-12, AC-18 |
| TC-15 | Download optional description omitted | Rendered second guide without description | Compact valid action | Card remains actionable without empty description space | ✅ Pass | AC-19, AC-22 |
| TC-16 | Download missing link | Included text-only malformed row; tabbed links | No fake action | Row omitted; three valid links remain in focus order | ✅ Pass | AC-07, AC-19, AC-22 |
| TC-17 | Promotional cards responsive | Checked 390, 900, 1440px grids | Stack then usable grid | One column mobile; two columns from 760px | ✅ Pass | AC-12, AC-14–17 |
| TC-18 | Promotional optional fields | Included missing description and missing image | Collapse cleanly | Description-less/text-only card retained; malformed link-less row omitted | ✅ Pass | AC-19, AC-22 |
| TC-19 | Alternative text audit | Enumerated decorated images, including plain Hero fixture | Meaningful/empty appropriate alts | Product and plain Hero decorative images use empty alt; informative rendered images have concise unique alt text | ✅ Pass | AC-06, AC-25 |
| TC-20 | Keyboard and focus | Sent Tab events through actions | Logical order; visible focus | Order starts home, specs, guides, first PDF; 3px solid focus ring | ✅ Pass | AC-18, AC-24 |
| TC-21 | Pointer and touch targets | Inspected mobile computed action size | Approximately 44px target | Download action computed `min-height: 44px` | ✅ Pass | AC-18, AC-24 |
| TC-22 | Contrast validation | Checked approved token ratios and rendered scrim | WCAG AA | Token plan ratios pass AA; 72% hero scrim visibly protects white text | ✅ Pass | AC-23, AC-24 |
| TC-23 | Reflow and zoom | Tested 320px and responsive computed layouts | No clipping/2D scroll | `scrollWidth === innerWidth` at 320–1440px; long values wrap | ✅ Pass | AC-14, AC-20, AC-26 |
| TC-24 | Reduced motion | Emulated `prefers-reduced-motion: reduce` | No required motion | No load motion; optional link transition reduced to 0.01ms | ✅ Pass | AC-27 |
| TC-25 | Image loading and stability | Inspected loading/dimensions | Product hero eager; others lazy; dimensions present | Product Hero is `eager`; plain Hero and all lower images are `lazy`; authored width/height set | ✅ Pass | AC-28, AC-29 |
| TC-26 | Server markup and dependencies | Fetched page, `.plain.html`, and `.md`; inspected runtime | Content present; no third party runtime | All three routes returned 200 with title/copy/links and both plain regression fixtures; only existing EDS runtime used | ✅ Pass | AC-30, AC-29 |
| TC-27 | Representative prose review | Compared demo structure/facts with source | Original concise prose | Factual values retained; demo marketing prose is independently written | ✅ Pass | AC-31 |
| TC-28 | Global regression and quality gate | Ran lint; rendered explicit plain and product Hero/Cards fixtures at 390px and 1440px; checked Columns at 900/991/992px | Clean checks; no regression | Lint passed; console errors empty; no overflow. Plain Hero remained full viewport width with safely layered media/readable heading. Plain Cards rendered 1 column at 390px and an auto-fill multi-column grid at 1440px. Product Hero, downloads, and promotional variants retained their responsive layouts. Columns switched from 1 to 2 tracks at approved 992px. | ✅ Pass | AC-32 |

## Failures & Follow-ups

No implementation failures or blocked phase checks remain.

- The repository has no `npm test` script or configured automated suite; Phase 4b used real headless Chrome, computed DOM/style checks, screenshots, curl, and lint. Sentinel should add the formal Playwright coverage.
- Browser evidence was captured at `/tmp/novopen-5-390.png`, `/tmp/novopen-5-1440.png`, `/tmp/novopen-5-cards-390.png`, and `/tmp/novopen-5-cards-1440.png`.
- Local demo imagery intentionally references public remote URLs and no binaries were copied into the repository. These URLs are not approved production assets; production still requires human approval/licensing and final focal-point validation.
- Direct source-page visual capture was partially obscured by its cookie-consent dialog; the locally proxied source content and source imagery were also inspected for comparison.
