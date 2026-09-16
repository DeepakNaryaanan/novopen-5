# NovoPen 5 — User Story

## User Story

As a visitor researching a reusable injection pen, I want a clear, responsive product page that summarizes the product, its key features, specifications, downloadable guides, and related resources so that I can quickly find relevant information and continue to an appropriate document or product page.

As an author, I want the page assembled from simple, reusable EDS content patterns so that product information can be maintained without nested blocks, duplicated layout logic, or specialist markup.

## Acceptance Criteria

### Page structure and markup

- **AC-01:** The page has one visible `h1` for the product name, followed by logically ordered `h2` and `h3` headings without skipped levels.
- **AC-02:** The page is assembled in this order: product hero, introductory product content, feature messaging, specifications, guides, related promotions, and the existing global footer.
- **AC-03:** Default content is used for short introductory copy, section headings, explanatory notes, and references; content is not placed in a block solely to obtain spacing.
- **AC-04:** Existing `Hero`, `Columns`, and `Cards` blocks are reused for the product hero, image/text features, guides, and promotions. The only new block is `Specifications`.
- **AC-05:** All authored structures remain flat. No block is nested inside another block.
- **AC-06:** Images use meaningful alternative text when informative and empty alternative text when decorative. Product images must not repeat adjacent visible copy verbatim.
- **AC-07:** PDF links are ordinary authored links with concise, unique accessible names that identify the guide and file type.

### Visual presentation

- **AC-08:** `Hero (product)` presents a full-width visual with a small product-category eyebrow and the product name overlaid with sufficient contrast; the title remains readable if the image is unavailable.
- **AC-09:** `Columns (product-intro)` and `Columns (feature)` create clear image/text groupings, preserve image aspect ratio, and do not crop essential product details.
- **AC-10:** Feature messages are visually scannable using concise headings or lists and retain their semantic list structure.
- **AC-11:** `Specifications (default)` presents label/value pairs as an aligned, readable data set rather than a generic decorative card grid.
- **AC-12:** `Cards (downloads)` distinguishes guide links as a related collection, while `Cards (promotional)` pairs each destination with an image, heading, short description, and link.
- **AC-13:** Styling introduced later is scoped to the relevant block or variation and uses mobile-first rules with `@media (width >= ...)` queries.

### Responsive behavior

- **AC-14:** On mobile viewports below 768px, all multi-column content becomes a single reading-order column; text and controls remain within the viewport with no horizontal scrolling.
- **AC-15:** At 768px–1199px, content uses available width without overly long line lengths, and promotional cards may form an intermediate grid only when their minimum usable width is retained.
- **AC-16:** At 1200px and wider, feature columns and related promotions may display side by side within a centered maximum-width content area; the hero remains full width.
- **AC-17:** Responsive reordering never changes the meaningful DOM reading order: an item image precedes or remains adjacent to its associated text, and specifications retain label/value association.

### Behavior and authored-content resilience

- **AC-18:** The page requires no custom page-level interaction. Links use native browser behavior, and external/PDF destinations remain usable by keyboard, pointer, and touch.
- **AC-19:** Missing optional content removes only that element and its spacing; it must not produce empty cards, blank columns, broken image placeholders, or inaccessible unlabeled links.
- **AC-20:** Long headings, descriptions, filenames, translated copy, and unbroken URLs wrap without clipping or overlapping adjacent content.
- **AC-21:** A malformed specification row with an absent label or value is ignored or rendered harmlessly without throwing an error; valid rows continue to render.
- **AC-22:** Cards and columns tolerate additional or omitted authored rows/cells defensively, consistent with repository guidance.

### Accessibility (WCAG 2.1/2.2 AA)

- **AC-23:** Text and meaningful icons meet WCAG AA contrast; text over imagery uses a reliable overlay or protected image area rather than relying on the source image alone.
- **AC-24:** All actionable elements have a visible focus indicator, logical focus order, and a minimum target size of approximately 44 by 44 CSS pixels where the visual design permits.
- **AC-25:** Information is not conveyed by color, position, or image alone. Specification labels remain programmatically associated with their values.
- **AC-26:** At 200% zoom and at a 320px CSS viewport, content reflows without loss of information or functionality.
- **AC-27:** Motion is not required. Any optional decorative transition added later must respect `prefers-reduced-motion`.

### Performance, SEO, and definition of done

- **AC-28:** The hero image is the only likely eager/LCP image; below-the-fold images are optimized and lazy-loaded through standard EDS image handling.
- **AC-29:** Images have appropriate responsive renditions or dimensions to reduce layout shift, and the page introduces no third-party runtime dependency.
- **AC-30:** Product title and summary are present in server-delivered markup for discoverability; links remain crawlable anchors.
- **AC-31:** Representative demo prose is original and concise. It may preserve factual product values and destination types but must not reproduce source marketing copy.
- **AC-32:** Completion requires lint-clean implementation, passing tests at mobile/tablet/desktop widths, keyboard and accessibility checks, no console errors, and no regression to global header/footer behavior.

## Test Cases

| ID | Title | Preconditions | Steps | Expected Result | Traces To |
|---|---|---|---|---|---|
| TC-01 | Semantic page outline | Target page is authored with all planned sections | Inspect server-delivered and decorated markup; enumerate headings | Exactly one `h1`; section headings follow in logical order with no skipped levels | AC-01, AC-30 |
| TC-02 | Architecture and sequence | Full demo content is available | Read the page from top to bottom and inspect block wrappers | Hero, intro, features, specifications, guides, promotions, and footer appear in order; no nested blocks exist | AC-02, AC-04, AC-05 |
| TC-03 | Product hero desktop | Viewport is 1440px wide; hero image loads | Open the page and inspect the first content section | Full-width hero shows eyebrow and product `h1`; title is legible and protected from image contrast changes | AC-08, AC-16, AC-23 |
| TC-04 | Product hero mobile | Viewport is 390px wide | Open the page and inspect hero crop, title wrapping, and page width | Essential image subject and complete title remain visible; no horizontal overflow occurs | AC-08, AC-14, AC-20 |
| TC-05 | Hero image failure | Hero image request is blocked | Reload the page | Product title and eyebrow remain readable; no broken-image text obscures content | AC-06, AC-08, AC-19 |
| TC-06 | Intro columns responsive | Product intro contains image, heading, and concise copy | Test at 390px, 768px, and 1440px | Mobile is one column in DOM order; wider layouts use balanced columns without cropping or excessive line length | AC-09, AC-14, AC-15, AC-16, AC-17 |
| TC-07 | Feature variation and list semantics | Feature image and three feature bullets are authored | Inspect visual layout and accessibility tree | Image and messages form one coherent feature section; bullets remain a semantic list | AC-09, AC-10, AC-25 |
| TC-08 | Optional feature image omitted | A feature row contains text but no image | Render at mobile and desktop widths | Text occupies usable width with no empty column or broken placeholder | AC-19, AC-22 |
| TC-09 | Oversized feature copy | Heading exceeds 100 characters and a bullet spans several lines | Render at 320px and 1440px | Copy wraps without clipping, collision, or horizontal scrolling | AC-20, AC-26 |
| TC-10 | Specifications complete | Five valid label/value rows are authored | Inspect desktop/mobile presentation and accessibility tree | Every value is visibly and programmatically associated with its label; values match authored content | AC-11, AC-17, AC-25 |
| TC-11 | Specifications at narrow width | Viewport is 320px and browser zoom is 200% | Navigate through the specifications | Pairs reflow or wrap cleanly without obscuring labels or values and without horizontal page scrolling | AC-14, AC-26 |
| TC-12 | Malformed specification rows | Include one missing label, one missing value, and valid rows before/after | Render page and inspect console | Invalid rows do not create misleading orphan data or exceptions; valid rows remain intact | AC-21, AC-22 |
| TC-13 | Long specification content | Add a translated label and long alphanumeric value | Render at all target widths | Content wraps within its pair and does not overlap neighboring rows | AC-20, AC-21 |
| TC-14 | Download cards complete | Three PDF links with distinct labels are authored | Inspect cards; activate each link | Three scannable guide items render; each native anchor reaches its authored PDF destination | AC-07, AC-12, AC-18 |
| TC-15 | Download optional description omitted | One guide has a heading/link but no description | Render the guides section | Guide remains complete and actionable with no blank gap | AC-19, AC-22 |
| TC-16 | Download missing link | One download item has text but no anchor | Render and keyboard-tab through guides | No empty or fake action is produced; other guide links remain reachable | AC-07, AC-19, AC-22 |
| TC-17 | Promotional cards responsive | Two complete promotion rows are authored | Test at 390px, 900px, and 1440px | Cards stack on mobile and form a usable wider grid when space allows; each image stays associated with its content | AC-12, AC-14, AC-15, AC-16, AC-17 |
| TC-18 | Promotional optional fields | Remove one description, then remove one image | Render each case | Description omission collapses cleanly; image omission produces a text-only card without an empty media region | AC-19, AC-22 |
| TC-19 | Alternative text audit | Full page is rendered | Inspect every image’s `alt` value and adjacent content | Informative product/promotion imagery has concise alt text; decorative imagery has `alt=""`; no redundant wording | AC-06, AC-25 |
| TC-20 | Keyboard and focus | Full demo page is rendered | Use only keyboard to traverse all page actions | Focus order follows reading order; every link has a visible focus state and can be activated | AC-18, AC-24 |
| TC-21 | Pointer and touch targets | Mobile emulation is active | Inspect and activate card/PDF links | Targets are reliably operable and approximately 44px high/wide where applicable | AC-18, AC-24 |
| TC-22 | Contrast validation | Hero, cards, specifications, and links are rendered | Measure normal text, large text, focus, and meaningful icon contrast | WCAG AA contrast thresholds are met, including text over the hero image | AC-23, AC-24 |
| TC-23 | Reflow and zoom | Page is available at 320px and desktop 200% zoom | Traverse every section and link | No information or action is clipped, overlapped, or dependent on two-dimensional scrolling | AC-14, AC-20, AC-26 |
| TC-24 | Reduced motion | OS/browser requests reduced motion | Load and interact with page | No required motion exists; any enhancement is removed or reduced | AC-27 |
| TC-25 | Image loading and layout stability | Network throttling is enabled | Reload from an empty cache and observe loading | Hero is prioritized; below-fold imagery is deferred/optimized; image loading does not cause disruptive shifts | AC-28, AC-29 |
| TC-26 | Server markup and dependency audit | Local server is running | Fetch target `.plain.html`; inspect network/runtime dependencies | Meaningful title/copy/links are present in HTML; no new third-party runtime is introduced | AC-30, AC-29 |
| TC-27 | Representative prose review | Demo page content is complete | Compare structure and factual fields with source, then review prose | Structure and essential factual values are represented, but marketing prose is concise and independently written | AC-31 |
| TC-28 | Global regression and quality gate | Implementation phase is complete | Run lint/test suite; inspect console, header, and footer | Checks pass, console is clean, and existing global components retain expected behavior | AC-32 |

## Variant Inventory

- `Hero (product)` — reused block; full-width product visual with eyebrow and `h1`.
- `Columns (product-intro)` — reused block; product image paired with introductory copy.
- `Columns (feature)` — reused block; supporting image paired with feature heading/list.
- `Specifications (default)` — **new block**; repeating semantic label/value rows.
- `Cards (downloads)` — reused collection; concise PDF guide actions.
- `Cards (promotional)` — reused collection; related image, heading, summary, and link.

## Visual and Content Analysis

### Observed source structure

The source was treated as an untrusted visual/content reference. Its primary sequence is:

1. A full-bleed lifestyle hero with product-category eyebrow and large product title near the lower-left.
2. Introductory product copy and a transparent product cutout.
3. A second capped-pen image and feature-oriented messaging.
4. A wide supporting graphic (`content-novopen5.jpg`) with scannable feature points and short references.
5. A compact specification set: product name, 3 ml cartridge, 1-unit increment, 1-unit minimum dose, and 60-unit maximum dose.
6. Three PDF guide actions.
7. Two related promotional image/link panels.

Observed imagery includes `denise-bowditch.jpg`, `Novo5.png`, the capped-pen image, `content-novopen5.jpg`, `banner-novopen5.jpeg`, and `banner-flextouch.jpeg`. Three PDF guide destinations were observed. Source alternative text contains inconsistencies, so new concise alt text must be authored rather than copied.

### Layout and hierarchy

- The source hero is viewport-width and visually deep, with title content anchored toward the lower-left and global navigation overlaid around it.
- Main content uses generous vertical separation and constrained inner content widths.
- Product/feature content alternates prominent imagery with shorter text groupings.
- Specifications form a compact label/value matrix.
- Download actions are separated into distinct rows.
- Related promotions use wide image-led panels.
- The page is primarily informational; no product-page-specific widget, accordion, carousel, form, or modal is required.

### Responsive cues

- **Mobile (<768px, inferred):** image/text pairs and cards stack in source reading order; the hero uses a mobile-safe crop; labels and values wrap rather than force a wide table.
- **Tablet (768px–1199px, inferred):** constrained content width and moderate gutters; columns/cards may remain stacked until each item has a usable width.
- **Desktop (>=1200px, observed/inferred):** hero stays full bleed; image/text groups and related cards can use side-by-side layouts within a centered content area.
- Exact source breakpoints and pixel spacing are implementation references, not authoring requirements. Final values require token extraction by `styleforge`.

### Interaction and iconography

- Product content has no required custom interaction.
- PDF and related-resource links use native anchors.
- Directional/download icons may be added decoratively during design/implementation, but link text must remain the accessible name.
- Required states are default, hover, focus-visible, active, and visited where global link styling supports it. There is no disabled or loading state in the content model.

### Stated versus inferred

- **Stated/observed:** content sequence, five specification values, three PDF guides, two promotional panels, and available source assets.
- **Inferred:** exact mobile/tablet rearrangement, crop focal points, breakpoint values, card count per row, overlay strength, and detailed typography/spacing tokens.
- No fragment-loading dependency was found; therefore fragment capture is not required.

## Block Inventory and Architecture

| Page region | Authored approach | Reuse/new | Rationale |
|---|---|---|---|
| Global navigation | Existing `Header` | Reuse | Site-wide chrome should not be recreated in page content. |
| Product hero | `Hero (product)` | Reuse with variation | Existing hero already supports a background picture and heading; a variation can supply product-specific alignment/contrast without a new content model. |
| Intro heading/copy | Default content | Reuse | Semantic headings and short prose need no block. |
| Product intro | `Columns (product-intro)` | Reuse with variation | Standard two-cell image/text content; existing block already stacks responsively. |
| Feature overview | `Columns (feature)` plus default semantic list/references | Reuse with variation | Image/text pairing is not structurally novel; list markup should remain authored content. |
| Specifications | `Specifications (default)` | **New** | Repeating key/value data needs stronger semantic association and defensive handling than generic columns or cards provide. |
| Guide downloads | `Cards (downloads)` | Reuse with variation | Repeating semi-structured link items match the collection model; no bespoke download component is justified. |
| Related resources | `Cards (promotional)` | Reuse with variation | Repeating image/text/link items match the existing cards collection. |
| Global footer | Existing `Footer` | Reuse | Site-wide chrome should remain centrally maintained. |

`Widget` is not used because the source has no dynamic or API-fed page feature. `Fragment` is not used because the page content is directly authored and no reusable remote fragment is required.

## Reused Block Authoring Contracts

These describe intended authoring for the page and do not modify existing block implementations.

### Hero (product)

| Hero (product) |
|---|
| Background/lifestyle picture *(required)* |
| Product-category eyebrow *(optional)* |
| Product-name `h1` *(required)* |

Optional behavior: when the eyebrow is absent, the `h1` retains its intended bottom alignment. If the picture fails, text remains visible against a safe block background.

### Columns (product-intro)

| Columns (product-intro) |
|---|
| Product picture *(required)* | Heading and concise introductory copy *(required)* |

Optional behavior: supporting copy beneath the heading is optional. A missing image allows the text cell to use the available width rather than leaving an empty column.

### Columns (feature)

| Columns (feature) |
|---|
| Supporting picture *(optional)* | Feature heading *(required)*, feature list *(required)*, references/notes *(optional)* |

Optional behavior: references and the image may be omitted independently. An absent image produces a text-only section. Empty list items are not rendered.

### Cards (downloads)

| Cards (downloads) |
|---|
| Guide heading and PDF link *(required)*, short description *(optional)* |

Optional behavior: an omitted description leaves a compact guide action. An item without a usable link must not be presented as an action. Empty rows are ignored.

### Cards (promotional)

| Cards (promotional) |
|---|
| Promotion picture *(optional)* | Heading *(required)*, concise description *(optional)*, destination link *(required)* |

Optional behavior: missing description collapses cleanly; missing image creates a text-only card. Rows without a heading or usable destination are ignored rather than creating an unlabeled card.

## New Block Content Model

### Specifications (default)

- Canonical model: collection.
- Each authored row is one specification.
- First cell: semantic label, required.
- Second cell: value including its unit, required.
- Rows may be added or reordered without changing the model.
- The block contract is saved at `blocks/specifications/block.md`.
- Decoration should later produce semantic label/value associations, preferably a description list, while preserving the authored order.

## Optional-Field and Defensive-Authoring Rules

- Whitespace-only optional cells are treated as absent.
- Optional images do not reserve media space when omitted.
- Optional descriptions, eyebrows, and notes do not leave empty wrappers or spacing.
- A required link that is missing or invalid does not become a button-like non-link.
- A malformed specification pair is skipped as a pair; it must not shift the next row’s value onto the wrong label.
- Extra cells or rows must not throw. Unsupported extra content may be ignored after valid content is retained.
- Oversized prose and localized strings wrap naturally; authoring does not depend on fixed character counts.

## Representative Demo Content Plan

All prose below is intentionally brief and original. Product values and document purposes are factual data.

1. **Hero**
   - Eyebrow: “Reusable injection pen”
   - `h1`: “NovoPen 5”
   - Image: lifestyle hero; alt is empty when the image is treated as decorative behind the title.
2. **Intro default content**
   - Heading: “A simple view of your latest dose”
   - Copy: “A reusable pen designed to help users check recent dose information.”
3. **Product intro columns**
   - Image: `Novo5.png`; alt: “Silver reusable injection pen with digital dose display.”
   - Heading: “Designed for everyday handling”
   - Copy: “The display provides a quick reference to the most recent recorded dose.”
4. **Feature columns**
   - Image: capped-pen asset or `content-novopen5.jpg`, with concise subject-based alt text.
   - Heading: “Key features”
   - Bullets: “Recent-dose display”; “One-unit dose steps”; “Compatible needle options.”
   - Optional note: “Refer to the approved instructions supplied with the device.”
5. **Specifications**
   - Pen — NovoPen 5
   - Cartridge — 3 ml
   - Increment — 1 unit
   - Minimum dose — 1 unit
   - Maximum dose — 60 units
6. **Guides**
   - “Injection guide (PDF)” — “A short guide to preparing and using the pen.”
   - “Pen comparison (PDF)” — “Compare selected reusable pen features.”
   - “Display guide (PDF)” — “Learn how to read recent-dose information.”
7. **Related promotions**
   - “Instructions for use” — “Find approved product instructions for your market.”
   - “Explore another pen option” — “Review a related delivery device.”

## Open Questions and Ambiguities

1. Confirm whether the implementation may reuse the remote source assets for a demo or whether approved local/licensed replacements will be supplied. The architecture does not depend on the source binaries.
2. Confirm the intended related destination and approved label for the second promotional panel; the source points to another delivery-device campaign, but the demo should use a project-approved URL.
3. Confirm whether PDF links should open in the same tab (recommended native default) or whether product governance requires a new tab plus explicit accessible warning.
4. Exact brand typefaces, color values, spacing scale, overlay treatment, and image focal points are not defined by local tokens and require `styleforge`.
5. The existing hero implementation has no decoration logic and its current CSS only explicitly styles the `h1`; `blockwright` should verify that the optional eyebrow is preserved and styled by the proposed variation.

## Recommended Next Agent

**styleforge** — visual tokens, responsive spacing, hero overlay/crop behavior, typography, card treatments, and focus states still need to be extracted and mapped before implementation.
