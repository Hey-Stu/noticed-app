# Copy-ready prompt to rebuild Noticed

Use the following prompt in another app-building tool. Attach the existing assets from `public/`—especially `favicon.png`, `apple-icon.png`, `icon.svg`, `noticed-cover.png`, and `samples/kitchen-morning-shadow.png`—if the tool supports file attachments.

---

Build a production-quality, pixel-conscious recreation of a web app called **Noticed**. It is a calm, local-first personal reference library for saving what catches a person's eye and later discovering patterns in what they keep returning to. Reproduce the current product faithfully in visual design, behavior, copy, states, and data logic. Do not reinterpret it as a productivity dashboard, social feed, bookmark manager, or AI app.

## Required stack and constraints

Use Next.js App Router, React, TypeScript, Tailwind CSS, and accessible shadcn/Radix-style primitives. Use Lucide icons, next-themes, Sonner-style bottom-center toasts, and date-fns or equivalent date formatting. Prefer a client-only IndexedDB repository for persistent data. No accounts, backend, cloud sync, API keys, environment variables, or AI services are needed. The app must work after a normal install and local run.

Use strict TypeScript, modular components, accessible semantic HTML, keyboard focus states, screen-reader labels, reduced-motion support, responsive layouts, friendly loading/empty/error states, and confirmation before destructive actions.

## Product voice

The voice is warm, observant, quiet, and lightly poetic. Avoid corporate dashboard language, gamification, urgency, exclamation-heavy copy, and productivity metrics. Preserve all quoted UI copy below exactly unless a dynamic count/date must change.

## Data model

Implement these six observation types: `text`, `image`, `link`, `color`, `quote`, and `idea`. Their visible labels are Note, Image, Link, Color, Quote, and Idea.

Each observation contains: unique ID, type, required body string (allowed to be empty only where another meaningful field makes the record valid), optional title, optional URL, optional base64 image data, optional hex color, optional source, normalized tags, created timestamp, updated timestamp, and optional boolean sample marker.

Normalize tags by trimming, lowercasing, removing one leading `#`, removing blanks, and deduplicating. Store timestamps as milliseconds. Generate UUIDs where possible.

Persist observations and settings in IndexedDB database `noticed-db`, version 1, object store `kv`, using keys `observations` and `settings`. Settings include `onboardingDismissed`, `samplesSeeded`, `samplesCleared`, `libraryCardSize`, and `libraryCardPadding`; both numeric values default to 50 and range from 0 to 100. Keep in-memory UI updates synchronous and persist in the background. Show hydration skeletons before IndexedDB is ready.

Support a one-time migration from localStorage keys `noticed:observations` and `noticed:settings`. If the library is empty and samples were not deliberately cleared, seed the curated sample set. Uploaded images are stored as base64 data URLs and must be no larger than 1.5 MB.

## Global shell

Create four routes: `/`, `/patterns`, `/report`, and `/settings`.

Use a full-width sticky header, 64px tall, with a 75%-opaque background, bottom hairline border, strong backdrop blur, and z-index above content. Inside it, cap width at 90rem and use 16px horizontal padding on small screens and 32px from the medium breakpoint.

Left: an eye outline icon and `Noticed` in a 24px semibold display style. On hover, the eye briefly blinks over 800ms, but disable that animation for reduced motion.

Center on desktop: a bordered, softly shadowed, translucent card-colored pill containing Library, Patterns, Weekly Report, and Settings links. Each link is a rounded pill with muted text and a soft hover background. Reproduce the current implementation: do not add a selected-route indicator.

Right on desktop: three small round ghost icon buttons—plus/Add, saved-item layout, and theme.

At widths below `md`, preserve the current behavior: hide center navigation and all right controls, leaving only the brand. Do not invent a mobile menu in the strict recreation.

Page content is centered at max-width 90rem, with 24px vertical padding on small screens and 40px at `md`.

## Visual design

Use a minimal monochrome editorial aesthetic. Light theme: pure white background/cards, near-black text, pale gray secondary areas, fine gray borders. Dark theme: near-black background, dark gray cards, near-white text, subtle translucent white borders. Default to light and support light, dark, and system.

Use Geist Sans for interface and display text and Geist Mono for hex values. Important: the current app calls its display utility `font-serif`, but it resolves to Geist Sans; preserve that sans-serif appearance. Use slightly tight letter spacing globally.

Use many pill controls and large feature surfaces with 24–32px radii. Cards have a soft paper shadow composed of a tiny close shadow and a broad diffuse shadow. Hoverable cards lift roughly 4px, deepen their shadow, and transition over about 300ms. Type-specific variables should exist but all six should currently resolve to the normal foreground color; the app is monochrome.

Main hero type is 48px on mobile and 72px from `md`, weight 600, line-height 0.95, balanced wrapping. Body copy is 16–18px with relaxed line height. Use generous whitespace. Toasts appear bottom-center.

## Library `/`

At the top, show:

Headline: `A warmer, quieter place to collect what catches your eye.`

Paragraph: `Keep references, images, colors, links, and stray thoughts in a surface that feels more like browsing a moodboard than managing a dashboard.`

Below it, build a large rounded capture panel with a subtly tinted/grain-like background, border, and paper shadow. It starts in compact Note mode. Across the top show `Add something worth keeping` and six filter-like type pills with icons. Choosing a type activates its pill and expands the composer. Focusing the Note field also expands it.

Type-specific capture UI and validation:

- Note: placeholder `What did you notice?`; require body.
- Image: placeholder `Describe what caught your eye…`; allow drag/drop, clipboard paste, file picker, preview/removal, or remote image URL; body is optional if an image/URL exists. Include `Drop, paste, or upload an image`, explanatory text, `Choose image`, `Or use an image URL`, and placeholder `Paste an image URL…`.
- Link: placeholder `Why is this worth keeping?`; require URL; show URL placeholder `https://…` and optional Title.
- Color: default `#c98a5e`; show a 56px swatch opening native color selection, editable hex input, and `Tap the swatch to pick`; body placeholder `Where did you see this color?`.
- Quote: placeholder `Type the words worth keeping…`; require body; optional source placeholder `Who said or wrote it? (optional)`; use a larger italic display treatment.
- Idea: optional title placeholder `Give the idea a name (optional)` above body placeholder `Sketch the idea…`; require body.

Expanded footer: tag input with suggestions and placeholder `Tag it so patterns can find it later…`, quiet helper sentence `A reference library grows one small instinct at a time.`, conditional Clear button, and rounded `Keep it` button with return-key icon. Support Cmd/Ctrl+Enter to save. Successful save shows toast title `Noticed.` and description `Tucked safely into your library.`, then clears and collapses the composer. Invalid save shows `Add a little something first.` Oversized image shows `Image is a bit large` and `Try one under 1.5MB, or paste an image URL instead.`

On first run, open a 32px-radius onboarding modal with this exact content:

- Eyebrow: `Welcome to Noticed`
- Title: `Keep what moves you before it slips away.`
- Paragraph: `Capture small fragments as you move through your day: a color, a quote, a screenshot, a half-formed idea. Don't organize too early. Don't overthink it.`
- Paragraph: `Over time, Patterns and your Weekly Report will surface what you keep returning to. A few sample references are already here to help you get started.`
- Three columns titled Capture, Browse, Reflect with descriptions about saving without forced structure, browsing a visual archive rather than a to-do list, and noticing repeats through patterns/summaries.
- Footer note explaining it can be dismissed and reset later.
- Rounded action: `Got it, let me look`.

Persist dismissal.

Next show section title `References worth returning to` and three small stat pills: Saved references with total count, Tags in rotation with distinct tag count, and Latest addition formatted as abbreviated month/day.

Build a search/filter toolbar. Search placeholder: `Search your references, quotes, colors, and ideas`. Search is a case-insensitive substring across body, title, source, URL, and tags and has an inline clear icon. Sort pill offers Newest first and Oldest first. Show six multi-select type chips. Show up to 16 most frequent tag chips. Multiple selected tags use AND semantics. Search, selected types, and selected tags all combine. A Clear action clears search/types/tags but leaves sorting unchanged.

Render results as a CSS multicolumn masonry layout. Compute target column width as `220 + libraryCardSize * 1.8` pixels and column/vertical gap as `8 + libraryCardPadding * 0.24` pixels. Cards avoid breaks and have 28px corners.

Card designs:

- Image: image fills the card, max visual height 34rem, slightly zooms on hover; bottom black gradient overlay has a translucent white type badge, optional title, body/summary, and relative timestamp in white.
- Color: 112px color panel at top with hex value in a translucent background label.
- Quote: type badge, relative time, quote icon, large display quote around 27px/1.05, optional attribution.
- Link: title/body plus small hostname and external-link icon.
- Note/Idea: title if present, body, muted hierarchy when both exist.
- All non-image cards: card background around 82% opacity, hairline ring, 20px padding.
- Show up to three tag pills at bottom.

Clicking a card opens a right-side detail sheet, full-width on small screens and max-width around 512px otherwise. Header shows type badge and exact date formatted like `Wednesday, Jul 8 at 7:42 AM`. Show color media as a 160px block with hex overlay, or full-width rounded image. Then title/body/source/external URL/tags. Quote uses an indented italic blockquote.

Detail footer has Delete on the left and Edit on the right. Edit allows body/tags for all types, title for image/link/idea, and source for quote; it intentionally does not edit URL, media, color, created date, or type. Save updates `updatedAt` and shows `Updated.` Delete opens confirmation `Let this one go?` with description, `Keep it`, and destructive `Delete`; success closes the sheet and shows `Released.` / `One less thing to hold onto.`

Library states:

- While hydrating, show six varied-height pulse cards in a responsive masonry-like skeleton.
- Empty library: leaf icon, title `Nothing noticed yet`, and `Your library is empty. Start with a single image, quote, or passing thought, then let the collection take shape from there.`
- No matches: search-off icon, `Nothing matches — yet`, explanatory copy, and Clear filters button.

## Patterns `/patterns`

Page title: `Patterns`

Description: `The quiet shape of your attention. What you keep returning to, gathered from everything you've noticed.`

Show a four-card skeleton while loading. If there are fewer than three observations, show sparkles empty state titled `Patterns need a little more to notice` with copy explaining that themes, colors, and rhythms will appear after a handful of observations.

With enough data, calculate locally and render:

1. Four stat cards: This week; Current streak; You notice most; In total.
2. `This week` counts entries within the last 7×24 hours and compares with the previous 7×24 hours.
3. Current streak counts consecutive local calendar days, allowing a streak that ends yesterday.
4. Busiest weekday considers all entries. Part-of-day buckets: before 6 late night; before 12 morning; before 17 afternoon; before 21 evening; otherwise night.
5. `What keeps returning`: up to eight most frequent tags with horizontal proportional bars and counts.
6. `How you notice`: all present observation types, ordered by count, with proportional bars and counts.
7. `A palette, slowly forming`: every distinct color with 56px rounded swatch and monospace hex. Clicking opens one matching detail.
8. `Often noticed together`: up to six alphabetical tag pairs co-occurring on the same observation more than once, ordered by frequency.
9. `Threads worth following`: up to three most common tags with at least two observations, each showing up to eight clickable preview pills.

Tie-break tag counts alphabetically. Use the same observation detail sheet as Library.

## Weekly Report `/report`

Page title: `Weekly Report`

Description: `A gentle look back at the week — no scores, no streaks to defend. Just what you noticed.`

Use rolling seven-day windows. With no activity, show file icon, `No entries this week`, and copy explaining the report writes itself from captured items.

With activity, create a rounded paper report card. Header shows the rolling date range and title `What you kept noticing`. Below it, a three-column divided stat row: current observation count, number of themes among the top five tags, and dominant type label. Then generate these prose patterns from actual data:

- Opening: `This week you noticed N observation(s).` Compare with prior week using warm language: more means `your attention has been wide open`, fewer is `A quieter week ... and quiet weeks count too`, equal is `a steady, even rhythm`, and no prior entries is `A fresh start to look back on.`
- If tags exist: `You kept returning to “tag”…`; if the lead tag appears multiple times, mention its count and `clearly on your mind.`
- If a dominant type exists: state how many of that form were kept and that it says something about how attention has been paid lately.
- Always close: `Nothing here needs to become anything. It's enough that you noticed it.`

Show up to five tag chips with counts.

Below, show `The one that stayed with you` using the current-week observation with the most tags. Make the whole highlighted card clickable and format it according to its type. Then show `Everything from this week` as a rounded bordered list, newest first, with type icon, preview, weekday abbreviation, hover background, and detail opening.

## Settings `/settings`

Page title: `Settings`

Description: `Your space, your data. Noticed lives entirely on this device.`

Use one rounded bordered card with divided rows. On small screens stack label/action; on larger screens align them horizontally.

- Appearance: description `Daylight for bright rooms, Evening for quieter hours.` Segmented Daylight, Evening, System buttons with sun/moon/monitor icons.
- Storage: explain that everything is saved locally and nothing is sent anywhere. Show observation count and approximate serialized byte size.
- Import & export: explain device-only storage, backups, merging, and duplicate skipping. Export JSON button disabled for an empty library; Import JSON opens file picker.
- Onboarding: `Show onboarding again`; disable if onboarding is already active. Show success toast explaining to return to Library.
- Sample observations: `Reload samples` and destructive-outline `Clear samples`. Clear requires confirmation and only removes `sample: true` records; user entries always stay.

Footer: `Noticed · a calm field journal for what catches your eye`.

Export filename `noticed-backup-YYYY-MM-DD.json` and payload fields `app: "noticed"`, `version: 1`, ISO `exportedAt`, and `observations`. Import accepts this object or a raw array, validates recognized types and meaningful content, normalizes fields/tags, assigns missing IDs/timestamps, skips existing IDs without overwriting, merges newest-first, and reports added/skipped counts.

## Desktop Add and layout dialogs

The header plus button opens a dropdown with Upload and Import.

Upload opens a full-viewport black modal. Top-right round close button. Center eyebrow `Upload`, giant responsive headline `Drop or paste in your image.`, explanatory copy, and bottom `Select from device` plus `or paste an image from your clipboard`. Accept image drag/drop, paste, and file selection. A valid image immediately creates an Image observation with title derived from filename by removing extension and replacing hyphens/underscores with spaces. Close on success.

Import uses the same full-black structure with eyebrow `Import`, headline `Drop or paste your backup here.`, backup explanation, `Select from device`, and `or paste the JSON content directly`. Accept JSON/text file drag/drop, file selection, clipboard file, or pasted JSON text. Merge and toast results.

The layout icon opens a black panel positioned 16px below the viewport top, width `calc(100vw - 2rem)` capped near 1800px, height between 320 and 430px, 32px corners, and deep shadow. It has two centered slider columns: Size / Card width, and Spacing / Space between cards. Both update and persist instantly from 0–100. No Save button.

## Sample seed data

Seed 13 sample observations with regenerated timestamps spanning today through ten days ago. Include all six types and preserve these representative items:

- Quote: `Attention is the rarest and purest form of generosity.` — Simone Weil; tags attention, writing.
- Color `#d98a4f`: `The exact orange of the streetlight before it fully warms up.`; tags light, color-study, evening.
- Note about a stranger refolding a map incorrectly and being at peace; tags people, attention.
- Idea titled `Tiny "noticing" widget`; body about a one-tap capture with no feed; tags product, design, attention.
- Link titled `On the importance of slow looking`, URL `https://example.com/slow-looking`; tags reading, attention.
- Color `#6f8f6a` about faded ledger green; tags color-study, typography, signage.
- Image titled `Morning shadow on the kitchen wall`, using `/samples/kitchen-morning-shadow.png`; tags light, home, composition.
- Note containing `I am not lost, I am just early to somewhere I have not decided yet.` with source `cafe near the station`; tags people, overheard.
- Quote: `The details are not the details. They make the design.` — Charles Eames; tags design, craft.
- Idea titled `Weekly "what did I keep noticing" review`; tags product, design, reflection.
- Link titled `A field guide to everyday textures`, URL `https://example.com/textures`; tags reference, texture, craft.
- Color `#b5613e` about dried-clay terracotta; tags color-study, craft.
- Note: `Noticed I take more notes when it rains. The slower pace makes more room for looking.`; tags reflection, weather.

Flag every seed with `sample: true`. Reloading samples may add a fresh duplicate set with new IDs, matching current behavior. Clearing samples prevents automatic reseeding until samples are explicitly reloaded.

## Metadata and assets

Use title `Noticed — a quiet place for what you notice` and description `A calm, local-first field-notes app for collecting small observations, references, quotes, colors, and ideas — then discovering the patterns in what you keep noticing.` Configure favicon, Apple icon, Open Graph, and Twitter summary-large-image using the attached current assets. Render analytics only in production if the platform provides it.

## Acceptance criteria

The remake is complete only when all four routes, all six capture modes, IndexedDB persistence, onboarding, sample seed/clear/reload, masonry cards, detail/edit/delete sheet, search/filter/sort, pattern computations, weekly prose generation, themes, layout sliders, upload/import full-screen experiences, JSON backup transfer, loading/empty/error states, responsive behavior, and accessibility behavior work end-to-end.

Do not leave placeholder buttons, fake charts, static counts, mocked interactions, TODOs, or nonfunctional controls. Ensure a production build passes TypeScript and lint checks. Test at desktop and narrow mobile widths, test both themes, test keyboard interactions, and test persistence across reloads.

---
