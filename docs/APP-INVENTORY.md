# Noticed — Current App Inventory

This document describes the product as implemented in the repository on July 11, 2026. It is intended as a source of truth for recreating the app in another tool.

## 1. Product definition

Noticed is a calm, local-first personal reference library. It lets a person save small fragments that catch their attention, browse them as an editorial moodboard, and discover recurring themes through computed patterns and a weekly written reflection.

Core principles:

- Capturing should feel light and non-judgmental.
- The library should feel like a visual archive, not a dashboard or task manager.
- Reflection is descriptive, not gamified; there are no goals or scores to defend.
- Data stays in the browser and requires no account, backend, or environment configuration.
- Copy is warm, quiet, concise, and occasionally poetic.

## 2. Information architecture

The app has four routes:

| Route | Label | Purpose |
| --- | --- | --- |
| `/` | Library | Capture, search, filter, sort, browse, open, edit, and delete observations |
| `/patterns` | Patterns | Computed insights about tags, types, colors, timing, and related entries |
| `/report` | Weekly Report | A generated reflection based on observations from the last seven days |
| `/settings` | Settings | Theme, storage summary, JSON import/export, onboarding reset, and sample management |

The global desktop header is sticky and translucent. It contains the animated eye mark and `Noticed` wordmark on the left, centered pill navigation, and Add, layout controls, and theme toggle buttons on the right. The content width is capped at 90rem.

Current responsive behavior: at widths below `md`, the centered navigation and all right-side controls are hidden; no mobile navigation replaces them. The logo remains. Content uses 1rem horizontal padding on small screens and 2rem from `md` upward.

## 3. Data model

An observation has:

```ts
type ObservationType = 'text' | 'image' | 'link' | 'color' | 'quote' | 'idea'

interface Observation {
  id: string
  type: ObservationType
  body: string
  title?: string
  url?: string
  imageData?: string
  color?: string
  source?: string
  tags: string[]
  createdAt: number
  updatedAt: number
  sample?: boolean
}
```

Settings contain onboarding state, sample seeding/clearing state, and two 0–100 layout values: `libraryCardSize` and `libraryCardPadding`, both defaulting to 50.

Tags are trimmed, lowercased, stripped of an initial `#`, deduplicated, and kept in insertion order. IDs use `crypto.randomUUID()` when available.

## 4. Persistence and startup

- All observations and settings are stored in IndexedDB database `noticed-db`, version 1, object store `kv`.
- Keys are `observations` and `settings`.
- A one-time migration copies legacy `localStorage` values from `noticed:observations` and `noticed:settings` into IndexedDB, then removes the legacy keys.
- Writes update in-memory state synchronously and persist to IndexedDB asynchronously.
- On first load, 13 curated sample observations are seeded.
- If the library is empty and samples were not explicitly cleared, samples are automatically restored.
- Uploaded images are stored inline as base64 data URLs. Image uploads are limited to 1.5 MB.
- Hydration shows skeletons to avoid rendering empty server state.

## 5. Observation types and capture rules

| Internal type | UI label | Required to save | Optional fields / special behavior |
| --- | --- | --- | --- |
| `text` | Note | Non-empty body | Tags |
| `image` | Image | Uploaded image, image URL, or body | Caption/body, URL, base64 image, tags; drag, paste, or file upload |
| `link` | Link | Non-empty URL | Optional title, description/body, tags |
| `color` | Color | A color value | Default `#c98a5e`, native color picker, editable hex, body, tags |
| `quote` | Quote | Non-empty body | Optional source, tags; italic display treatment |
| `idea` | Idea | Non-empty body | Optional title, tags |

The main quick capture starts in compact Note mode. Focusing it or choosing another type expands it. `Cmd/Ctrl + Enter` saves. Saving shows `Noticed.` with `Tucked safely into your library.` and resets/collapses the composer. Invalid capture shows `Add a little something first.` Storage failure shows an image-storage suggestion.

The image capture supports drag-and-drop, clipboard paste, file selection, preview/removal, and remote image URL. Non-images and oversized images show friendly error toasts.

Tags use a tag input with suggestions drawn from existing tags. The expanded composer has Clear and `Keep it` actions.

## 6. Library route

### Hero and composer

Headline: `A warmer, quieter place to collect what catches your eye.`

Supporting copy: `Keep references, images, colors, links, and stray thoughts in a surface that feels more like browsing a moodboard than managing a dashboard.`

The quick capture sits directly below in a large rounded, subtly tinted paper panel.

### First-run onboarding

Until dismissed, a 2rem-radius modal welcomes the user with:

- `Welcome to Noticed`
- `Keep what moves you before it slips away.`
- Two paragraphs explaining lightweight capture and later reflection.
- Three mini columns: Capture, Browse, Reflect.
- Primary action: `Got it, let me look`.

Dismissal is persisted. Settings can re-enable it.

### Library overview

Section title: `References worth returning to`.

Three pill stats show:

- Saved references: total observations.
- Tags in rotation: distinct tag count.
- Latest addition: newest observation date as abbreviated month and day.

### Search, filtering, and sorting

- Search matches a case-insensitive substring across body, title, source, URL, and tags.
- Type filters are multi-select and use AND with other filter groups.
- Tag filters are multi-select; an observation must contain every selected tag.
- The toolbar shows at most the 16 most frequent tags.
- Sort options are Newest first and Oldest first.
- Clear resets search, types, and tags, but not sort.

### Masonry library

The library uses CSS multicolumn masonry, not a fixed grid. Column width is `220 + size * 1.8` pixels. Gaps are `8 + spacing * 0.24` pixels. Cards avoid column breaks.

Cards have approximately 1.75rem rounded corners, subtle paper shadows, a 1px border/ring for non-image cards, and lift 4px on hover.

- Image cards are edge-to-edge images with a black gradient overlay, white type badge, title/body, and relative time. Image gently scales on hover.
- Color cards start with a 7rem color block and an overlaid hex label.
- Quote cards use a quote icon, large italic-style display text, and optional attribution.
- Link cards show title/body and the hostname with an external-link icon.
- Idea and text cards show their title/body hierarchy.
- Up to three tags appear at the bottom.
- Clicking anywhere opens the detail sheet.

### Detail sheet

A right-side sheet is full width on small screens and capped at `sm:max-w-lg`. It shows type, exact formatted date/time, color or image media, title/body/source/link/tags, and Edit/Delete actions.

Editing supports body and tags for every type; title for idea/link/image; source for quote. It does not edit the URL, image, color, created date, or type. Save updates `updatedAt` and shows `Updated.`

Delete requires confirmation: `Let this one go?` / `Keep it` / `Delete`. Deletion closes the sheet and shows `Released.` with `One less thing to hold onto.`

### Library states

- Loading: six masonry-like pulse cards of varied heights.
- Empty library: leaf icon, `Nothing noticed yet`, and explanatory copy.
- No filter match: search-off icon, `Nothing matches — yet`, copy, and Clear filters button.

## 7. Patterns route

Header: `Patterns` with `The quiet shape of your attention. What you keep returning to, gathered from everything you've noticed.`

Patterns require at least three observations. Below that threshold, show `Patterns need a little more to notice`.

When available, show four stat cards:

- This week: observations within the last 7×24 hours, plus comparison with the previous 7×24 hours.
- Current streak: consecutive calendar days ending today or yesterday.
- You notice most: busiest part of day (`late night`, `morning`, `afternoon`, `evening`, `night`) and busiest weekday.
- In total: total fragments.

Insight panels:

- What keeps returning: up to eight most common tags with proportional bars and counts.
- How you notice: each present observation type with proportional bars and counts.
- A palette, slowly forming: every saved color swatch; clicking opens one associated observation.
- Often noticed together: up to six tag pairs that co-occur more than once.
- Threads worth following: up to three top tag groups that contain multiple observations; each shows up to eight clickable observation pills.

All computations are deterministic and local. Ties in tag frequency sort alphabetically. Relevant entries open in the same detail sheet used by Library.

## 8. Weekly Report route

Header: `Weekly Report` with `A gentle look back at the week — no scores, no streaks to defend. Just what you noticed.`

The report uses rolling time windows: current week means the last 7×24 hours, and prior week means the preceding 7×24 hours.

With no current activity, show `No entries this week` and explanatory copy.

With activity, show a rounded paper report containing:

- Current date range.
- `What you kept noticing`.
- Three stats: observation count, number of top themes (up to five), and dominant observation type.
- Generated prose comparing volume with the prior week, naming top tags, describing the dominant format, and closing with `Nothing here needs to become anything. It's enough that you noticed it.`
- Up to five tag chips with counts.

Below the report:

- `The one that stayed with you`: the current-week observation with the most tags (ties retain source order), clickable to detail.
- `Everything from this week`: newest-first compact rows with type icon, preview text, and weekday, each clickable.

## 9. Settings route

Header: `Settings` with `Your space, your data. Noticed lives entirely on this device.`

Rows inside one rounded card:

1. Appearance: segmented Daylight, Evening, and System theme buttons.
2. Storage: observation count and approximate serialized storage size.
3. Import & export: export JSON and import JSON.
4. Onboarding: re-enable the welcome modal; user must return to Library to see it.
5. Sample observations: reload curated samples or remove samples only after confirmation.

Footer: `Noticed · a calm field journal for what catches your eye`.

Export filename is `noticed-backup-YYYY-MM-DD.json`. Payload:

```json
{
  "app": "noticed",
  "version": 1,
  "exportedAt": "ISO timestamp",
  "observations": []
}
```

Import accepts either that payload or a raw observation array. It validates records, merges non-destructively, skips duplicate IDs, sorts newest-first, and reports counts. It never overwrites an existing record.

Reload samples prepends a fresh set while keeping user notes; repeated reloads can create duplicate sample content with new IDs. Clear samples removes only records with `sample: true`.

## 10. Global Add and layout controls

The desktop plus button opens a small menu:

- Upload opens a full-viewport black drop zone for an image. Upload immediately creates an image observation with a title derived from its filename and no intermediate edit step.
- Import opens a matching full-viewport black drop zone for a JSON/text backup and accepts drop, paste, or file selection.

The layout button opens a wide black panel near the top of the viewport with Size and Spacing sliders. Changes apply and persist immediately; there is no Save/Cancel step.

The theme icon button cycles light → dark → system behavior through the theme control implementation; Settings provides explicit choices.

## 11. Visual design system

- Overall aesthetic: monochrome editorial minimalism; bright white or near-black background; softly elevated paper cards; generous breathing room; rounded pills and large rounded panels.
- Font: Geist Sans and Geist Mono. The `font-serif` utility currently aliases Geist Sans, so display headings are not actually serif.
- Main hero: 3rem on mobile, 4.5rem at `md`, weight 600, line-height 0.95.
- Page titles: display style, roughly 2.25rem–3rem depending on component.
- Body: 14–18px with relaxed leading; muted text uses middle gray.
- Radius token is 0.45rem, but feature surfaces explicitly use 1.5–2rem radii and pill controls use full rounding.
- Light theme uses white cards/background, near-black text, gray secondary surfaces, subtle gray borders.
- Dark theme uses near-black background, dark gray cards, near-white text, translucent white borders.
- Type-specific CSS variables exist for all six types but currently all resolve to foreground, making the UI intentionally monochrome.
- Paper shadow: a tiny close shadow plus a broad soft shadow. Hover shadow becomes deeper.
- Sticky header uses 75% opaque background with strong backdrop blur.
- Logo eye blinks on hover over 800ms when reduced motion is not requested.
- Toasts appear bottom-center.
- Focus rings, accessible labels, semantic buttons/links, destructive confirmations, screen-reader-only dialog headings, and reduced-motion handling are present.

## 12. Sample content

The first-run library includes 13 examples distributed across all six types. Themes include attention, design, light, people, color studies, craft, reflection, and everyday noticing. It includes three colors (`#d98a4f`, `#6f8f6a`, `#b5613e`), one bundled kitchen-shadow image, two example.com links, quotes attributed to Simone Weil and Charles Eames, and notes/ideas across the last ten days. Timestamps are regenerated relative to the current day on every seed.

## 13. Current technical implementation

- Next.js 16 App Router, React 19, TypeScript.
- Tailwind CSS 4.
- shadcn-style components built with Radix UI primitives.
- next-themes, Sonner, date-fns, Lucide icons.
- IndexedDB storage; no server APIs, authentication, database, or environment variables.
- Vercel Analytics renders only in production.
- Metadata includes title, description, favicon/apple icon, Open Graph image, and Twitter summary-large-image card.

## 14. Fidelity notes versus optional improvements

For an exact remake, preserve the current mobile absence of navigation, monochrome type colors, and Geist Sans display font. If improvement is allowed, the first sensible changes would be adding accessible mobile navigation, introducing subtle type colors, and choosing a true serif for editorial headings. These are not part of the current behavior and should not be silently added to a strict clone.
