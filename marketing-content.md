# Marketing Content for Noticed

This file collects reusable launch, submission, README, and promotional copy for the current project in this repository.

Working assumptions used here:

- The product name shown in the app UI is `Noticed`.
- The app is a local-first browser app with no visible auth, backend, or remote database.
- No OpenAI API is used at runtime in the shipped product.
- Public links, launch assets, and author metadata are not published in the repository, so placeholders are used where needed.

---

## 1. Project Positioning

### Core Identity

- Project name: `Noticed`
- Placeholder-safe name: `[PROJECT_NAME]`
- Suggested category/type: `App`, `Creative tool`, `Personal reference library`, `Template`

### One-Line Tagline

`A calm, local-first library for the things that catch your eye.`

### Short Elevator Pitch

`Noticed` is a local-first visual reference and field-notes app for saving images, links, quotes, colors, notes, and ideas in one quiet place. It helps you collect fragments quickly, browse them like a personal archive, and reflect on recurring themes through pattern summaries and weekly reports.

### Longer Product Description

`Noticed` is a browser-based capture and reflection app designed for small things that are easy to lose: a compelling image, a useful link, a quote, a color, a design detail, an overheard line, or a half-formed idea. The product is intentionally light on process. You save what matters, tag it if you want, and let the collection build over time.

The app now leans into a more editorial, image-led experience. The main library feels closer to browsing a personal moodboard or reference archive than managing a productivity dashboard. A first-time onboarding modal sets the tone, the capture composer stays fast and flexible, and the browsing surface prioritizes visual calm over app noise.

Everything is stored locally in the browser. There are no accounts, no backend dependencies, and no required setup beyond running the app. JSON import and export make the library portable, while sample observations make the product easy to demo or evaluate quickly.

What makes the project more interesting than a standard notes app is that it reflects your attention back to you. The `Patterns` view surfaces recurring tags, color clusters, type distribution, co-occurring themes, and cadence. The `Weekly Report` turns recent observations into a softer written recap of what kept returning.

### Target Audience

- Designers building personal inspiration libraries
- Writers collecting lines, fragments, and quotes
- Creative developers interested in local-first products
- People who want a calmer alternative to conventional bookmarking or notes apps
- Builders looking for a reusable Next.js template for capture, tagging, and reflection workflows

### Primary Use Case

`Capture visual and textual references throughout the week, then revisit the archive to see what patterns and themes keep returning.`

### Secondary Use Cases

- Personal inspiration library
- Moodboard-adjacent reference collection
- Quote and link clipping tool
- Creative journaling app
- Design research notebook
- Local-first demo/template for thoughtful personal software

### What Makes the Project Interesting or Different

- Local-first by default, with browser-only persistence
- Editorial, image-led browsing instead of a dashboard-heavy layout
- Six observation types: text, image, link, color, quote, idea
- Search, tags, filters, and sorting for light organization
- Reflective views that turn saved fragments into patterns and weekly summaries
- Import/export support for portability
- First-run onboarding and sample content for better demos and template usability
- Strong template potential for creative capture products or personal knowledge tools

### Suggested Project Category / Type

Best fit:

`Creative tool`

Strong alternatives:

- `App`
- `Template`
- `Visual experience`
- `Personal productivity`

### Placeholder Links

- Live demo: `[LIVE_DEMO_URL]`
- GitHub repo: `[GITHUB_REPO_URL]`
- Vercel template: `[VERCEL_TEMPLATE_URL]`
- v0 template: `[V0_TEMPLATE_URL]`
- OpenAI showcase listing: `[OPENAI_SHOWCASE_URL]`
- Cover image: `[COVER_IMAGE_URL]`

---

## 2. OpenAI Showcase Gallery Submission Content

### Submission Answers

**Project title**

`Noticed`

**Project tagline**

`A local-first reference library for saving what catches your eye, then discovering the patterns in what you keep returning to.`

**Project description**

`Noticed` is a browser-based capture and reflection app for saving visual and textual fragments: images, links, quotes, colors, notes, and early ideas. It is designed to feel more like browsing a personal archive than managing a traditional notes app, with an editorial interface and a lightweight capture flow.

Everything is stored locally in the browser, so there is no account setup or backend dependency. Users can save observations, search and filter them, revisit them in an image-led library, and export or import their archive as JSON.

What makes the project more interesting than a simple local notes app is the reflective layer. A `Patterns` view surfaces recurring themes, colors, types, and related tags, while a `Weekly Report` turns recent saves into a short written reflection. The project also works well as a reusable Next.js template for local-first capture products.

**Project type**

`Creative tool`

Alternative acceptable answers:

- `App`
- `Template`
- `Visual experience`

**Use cases showcased**

`Creative tools, personal reference libraries, local-first apps, journaling, design inspiration, developer templates`

**Capability showcased**

Recommended:

`Codex-assisted development and UI implementation`

If you prefer the most conservative answer:

`N/A at runtime; built with AI-assisted development workflows`

**OpenAI models and APIs used**

`No OpenAI API is used at runtime in the shipped product. If applicable, this project can be described as built and refined with Codex and/or ChatGPT during development, design iteration, implementation, and copy editing.`

Suggested paste-ready version:

`Built with Codex and/or ChatGPT as development tools for implementation and refinement. No OpenAI API is used at runtime in the app itself.`

**Other models or APIs used**

`N/A`

**Did you use Codex to build this?**

Recommended answer:

`Yes`

Recommended explanation:

`Codex was used during development to help implement UI changes, refine product behavior, debug issues, and improve launch-ready project copy. The final app does not depend on Codex at runtime.`

If you need a safer placeholder:

`Needs confirmation`

**Did you use another coding agent to build this?**

Recommended answer:

`Needs confirmation`

Recommended explanation:

`No other coding agent usage is clearly documented in the repository. If tools such as v0, Cursor, Claude Code, Lovable, or similar were used, replace this with the confirmed tools before submitting.`

**Tech stack**

`Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Radix UI primitives, shadcn/ui-style component architecture, next-themes, Sonner, date-fns, lucide-react, browser-local persistence with IndexedDB/local browser storage, and Vercel Analytics in production.`

**Build process description**

Maximum 500 characters:

`Built as a local-first Next.js app with TypeScript, Tailwind CSS, and Radix-based UI components. The product focuses on fast multi-type capture, editorial browsing, and reflective views like Patterns and Weekly Report. Codex and/or ChatGPT can be credited for helping implement, debug, and refine the app, but there is no OpenAI runtime dependency in production.`

**Setup steps**

Maximum 500 characters:

`Clone the repo, install dependencies with pnpm, run pnpm dev, and open http://localhost:3000. No database, auth provider, or environment variables are required. The app stores data locally in the browser and includes sample observations plus JSON import/export for trying the full workflow quickly.`

**Public GitHub repository**

`[GITHUB_REPO_URL]`

**Hosted URL**

`[LIVE_DEMO_URL]`

**Author display name**

`[AUTHOR_NAME]`

**Cover image link**

`[COVER_IMAGE_URL]`

Recommended note:

`Use a clean screenshot of the Library view showing the editorial hero, capture composer, and masonry feed, or a composite that also includes Patterns and Weekly Report.`

### OpenAI Showcase Form Checklist

| Field | Status | Notes |
| --- | --- | --- |
| Project title | Ready | `Noticed` |
| Project tagline | Ready | Can paste as-is |
| Project description | Ready | Can paste as-is |
| Project type | Ready | Best fit: `Creative tool` |
| Use cases showcased | Ready | Concise list prepared |
| Capability showcased | Ready | AI-assisted development framing suggested |
| OpenAI models and APIs used | Needs confirmation | Runtime usage is `No`; dev-tool usage can be confirmed |
| Other models or APIs used | Ready | `N/A` |
| Did you use Codex to build this? | Needs confirmation | Recommended answer prepared |
| Did you use another coding agent? | Needs confirmation | Replace only if true |
| Tech stack | Ready | Based on repo |
| Build process description | Ready | Under limit |
| Setup steps | Ready | Under limit |
| Public GitHub repository | Missing | Replace `[GITHUB_REPO_URL]` |
| Hosted URL | Missing | Replace `[LIVE_DEMO_URL]` |
| Author display name | Missing | Replace `[AUTHOR_NAME]` |
| Cover image link | Missing | Replace `[COVER_IMAGE_URL]` |

---

## 3. Vercel / v0 Template Submission Content

### Template / Project Title

`Noticed`

Alternative template-facing title:

`Noticed: Local-First Reference Library`

### Short Description

`A reusable Next.js app for collecting visual and textual references, then surfacing patterns across what you save.`

### Long Description

`Noticed` is a polished local-first Next.js app for builders who want more than a basic notes CRUD template. It supports multiple observation types, lightweight capture, image-led browsing, search and filters, local persistence, JSON import/export, first-run onboarding, sample content, and reflective views like `Patterns` and `Weekly Report`.

As a template, it gives users a strong starting point for personal reference libraries, creative notebooks, moodboard-adjacent products, private local-first tools, or capture-and-reflection workflows. It is especially useful for teams or indie builders who want a clean, thoughtful foundation before adding accounts, sync, collaboration, or AI features later.

### Category Recommendation

Best fit:

`Template`

Strong alternatives:

- `Creative`
- `Productivity`
- `Developer Tools`

### Tags

`nextjs, react, typescript, tailwindcss, radix-ui, shadcn, local-first, indexeddb, creative-tool, notes, journaling, reference-library, template, vercel`

### Features List

- Six observation types: text, image, link, color, quote, idea
- Editorial library view with responsive masonry layout
- Fast inline capture composer
- Search, tag filters, and sorting
- Local-first browser storage
- JSON import and export
- Sample observations for first-run demos
- Onboarding modal that can be reopened from Settings
- Patterns view with recurring tags, colors, cadence, and related themes
- Weekly report view generated from saved observations
- Light and dark theme support

### What Users Can Build With It

- Personal inspiration libraries
- Visual bookmarking tools
- Creative journaling products
- Research notebooks
- Design reference archives
- Private local-first note apps
- Reflection-driven capture products

### Suggested Cover Image Direction

- Main recommendation: the Library view with hero, capture composer, and cards visible
- Secondary option: a 3-panel composite of Library, Patterns, and Weekly Report
- Emphasize: editorial typography, local-first calm, and the image-led archive feel

### URL Placeholders

- Demo URL: `[LIVE_DEMO_URL]`
- GitHub URL: `[GITHUB_REPO_URL]`
- Deploy/template URL: `[VERCEL_TEMPLATE_URL]`
- v0 template URL: `[V0_TEMPLATE_URL]`

### Environment Variables

`No required environment variables are visible in the current repository.`

Optional note:

`Vercel Analytics is included in production, but no setup from the user is required for local-first usage.`

### Setup Instructions

```bash
pnpm install
pnpm dev
```

Then open:

`http://localhost:3000`

### Deployment Instructions

`Deploy to Vercel as a standard Next.js app. The current version has no backend, database, auth provider, or server-side environment requirements.`

### Notes for Reviewers

- This project is best understood as a reusable product foundation, not a static landing page.
- The most interesting behaviors are in the end-to-end workflow: capture, browse, reflect.
- `Patterns` and `Weekly Report` are core product differentiators.
- The app is honest local-first software, not a faux-SaaS demo.

---

## 4. GitHub README Draft

```md
# [PROJECT_NAME]

A calm, local-first reference library for saving what catches your eye, then discovering the patterns in what you keep returning to.

![Preview]([COVER_IMAGE_URL])

Live demo: [LIVE_DEMO_URL]

## What It Is

`Noticed` is a browser-based app for collecting images, links, colors, quotes, notes, and early ideas in one quiet place. It is designed to feel more like browsing a personal archive than managing a dashboard.

Everything is stored locally in the browser. There is no account setup, no backend dependency, and no required environment configuration for the current version.

## Features

- Save six observation types: text, image, link, color, quote, and idea
- Browse an editorial, image-led library view
- Search, filter, and sort your archive
- Review recurring themes in the `Patterns` view
- Generate a softer written recap in `Weekly Report`
- Import and export your archive as JSON
- Start with built-in sample observations
- Reopen onboarding from Settings if needed
- Switch between light and dark themes

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI primitives / shadcn-style component architecture
- next-themes
- Sonner
- date-fns
- lucide-react
- Local browser persistence
- Vercel Analytics

## Getting Started

### Installation

```bash
pnpm install
```

### Local Development

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment Variables

No environment variables are required for the current version.

## Project Structure

```text
app/
  (app)/
    page.tsx          # Library
    patterns/page.tsx # Pattern analysis
    report/page.tsx   # Weekly reflection
    settings/page.tsx # Local settings, onboarding reset, import/export
components/
  quick-capture.tsx
  observation-card.tsx
  observation-grid.tsx
  onboarding-banner.tsx
lib/
  store.ts
  observations.ts
  patterns.ts
  weekly-report.ts
```

## Customization Notes

- Replace the sample observations with your own demo content
- Adjust observation types if your product needs a narrower or broader capture model
- Rebrand the editorial shell, onboarding, and copy for your use case
- Add sync, auth, collaboration, or AI features on top of the existing local-first foundation

## Deployment

Deploy directly to Vercel as a standard Next.js app.

## Credits / Attribution

- Built with Next.js, React, Tailwind CSS, and Radix UI primitives
- If applicable, add development-tool credits here for Codex, ChatGPT, v0, or other tools used during the build

## License

[LICENSE]
```

---

## 5. Social Launch Posts

### X / Twitter Variant 1

Built a small app called `Noticed`.

It’s a local-first reference library for saving images, quotes, colors, links, and ideas in one calm place, then surfacing the patterns in what you keep returning to.

No accounts, no backend, just a browser-based archive that feels more like browsing a moodboard than managing a dashboard.

[LIVE_DEMO_URL]  
[GITHUB_REPO_URL]

Optional hashtags: `#buildinpublic #nextjs #webdev #designtools #indiehacker`

### X / Twitter Variant 2

I wanted a quieter place to keep visual references and small fragments, so I built `Noticed`.

It stores everything locally, supports multiple save types, and includes a `Patterns` view + `Weekly Report` to reflect on what keeps recurring.

[LIVE_DEMO_URL]  
[GITHUB_REPO_URL]

Optional hashtags: `#localfirst #nextjs #typescript #creativecoding`

### LinkedIn Post

I’ve been working on a project called `Noticed`, a local-first reference library for images, quotes, colors, links, notes, and early ideas.

The goal was to make something that feels calmer than a typical bookmarking tool or notes app. Instead of pushing the user into productivity workflows, the product focuses on lightweight capture, editorial browsing, and reflection. Over time, saved observations can be revisited through pattern summaries and a weekly report.

It’s built with Next.js, TypeScript, Tailwind CSS, and Radix-based UI components, with all data stored locally in the browser.

Demo: [LIVE_DEMO_URL]  
Code: [GITHUB_REPO_URL]

Optional hashtags: `#NextJS #TypeScript #ProductDesign #CreativeTools #BuildInPublic`

### Short Announcement

`Noticed` is live: a local-first app for saving what catches your eye, then discovering the patterns in what you keep coming back to.

[LIVE_DEMO_URL]

### Vercel / v0 Community-Oriented Post

Built a new Next.js project called `Noticed`.

It’s a reusable local-first app for capturing references and revisiting them through patterns and weekly reflections. The current version includes multi-type capture, sample content, JSON import/export, and an editorial library UI that feels closer to a personal archive than a notes dashboard.

Would be a good starting point for anyone building creative tools, private journals, or local-first personal software.

[LIVE_DEMO_URL]  
[GITHUB_REPO_URL]  
[VERCEL_TEMPLATE_URL]

### OpenAI / Codex Community-Oriented Post

Built `Noticed`, a local-first reference library for saving images, quotes, colors, links, notes, and ideas.

The app itself doesn’t use OpenAI at runtime, but AI-assisted development was useful for iterating on product copy, UI behavior, and implementation details. The interesting part for me was using AI help to refine a real product surface rather than just generate a generic starter.

[LIVE_DEMO_URL]  
[GITHUB_REPO_URL]  
[OPENAI_SHOWCASE_URL]

Optional hashtags: `#OpenAI #Codex #AIEngineering #NextJS`

---

## 6. OpenAI / Codex Community Post

### Project Overview

`Noticed` is a local-first reference and reflection app built for the small things that are easy to lose: visual references, quotes, colors, links, notes, and early ideas. The finished product demonstrates how a simple browser app can feel thoughtful and complete without requiring a backend or account system.

### What Was Built

- A multi-type capture flow for six kinds of observations
- An editorial library view for browsing saved references
- A `Patterns` page for repeated themes, colors, and cadence
- A `Weekly Report` page for reflective summaries
- Settings for import/export, sample content, themes, and onboarding reset
- First-run onboarding modal

### How Codex or ChatGPT Helped

Suggested framing:

`Codex and/or ChatGPT helped with implementation, UI refinement, debugging, product copy, and iteration on the final browsing experience. The tools were especially useful for tightening the relationship between visual design direction and actual working code.`

### What Parts Were Designed, Generated, Implemented, Debugged, or Refined With AI Assistance

- UI refinement for the library shell and visual direction
- Copy rewriting for onboarding and marketing surfaces
- Implementation help across layout, branding, modal behavior, and settings
- Debugging visual regressions and interaction issues
- Launch asset preparation and submission copy

### What the Final Project Demonstrates

- A practical local-first product built on a modern web stack
- A more grounded way to use AI assistance during product iteration
- How an app can combine capture, browsing, and reflection in one flow
- How AI-assisted development can support polish, not just scaffolding

### What Others Might Learn From It

- Local-first apps can still feel premium and productized
- Reflection features can create differentiation beyond CRUD
- AI tools are most useful when used iteratively against a real product direction
- Marketing and submission content are easier to prepare when product positioning is explicit

### Links and Screenshot Placeholders

- Demo: `[LIVE_DEMO_URL]`
- GitHub: `[GITHUB_REPO_URL]`
- OpenAI showcase: `[OPENAI_SHOWCASE_URL]`
- Cover / screenshots: `[COVER_IMAGE_URL]`

---

## 7. Quick Copy Snippets

### App Storefront Summary

`Noticed is a local-first reference library for saving visual and textual fragments in one calm place, then discovering the patterns in what keeps returning.`

### Builder Summary

`A polished Next.js template for local-first capture, editorial browsing, and lightweight reflection.`

### Reviewer Summary

`This project is not just a note taker. Its value is the combination of multi-type capture, moodboard-like browsing, and reflective views built on top of browser-local persistence.`

### Cover Image Reminder

Use `[COVER_IMAGE_URL]` and choose a screenshot that shows the main library hero, capture composer, and a representative spread of cards. If possible, prepare a second composite image that includes `Patterns` and `Weekly Report`.
