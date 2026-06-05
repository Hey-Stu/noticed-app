# Marketing Content for Noticed

This file collects reusable launch, submission, README, and promotional copy for the current project in this repository.

Working assumptions used here:

- Product name in the app UI and metadata is `Noticed`.
- No OpenAI API usage is visible in the runtime code.
- No backend, auth, or remote database is visible in the repository.
- No public URLs, author name, or official launch assets are published in the repo, so placeholders are used where needed.

## 1. Project Positioning

### Core Identity

- Project name: `Noticed`
- Placeholder-safe name: `[PROJECT_NAME]`
- Suggested category/type: `App`, `Creative tool`, `Personal knowledge tool`, `Template`

### One-Line Tagline

`A quiet, local-first place for what you notice.`

### Short Elevator Pitch

`Noticed` is a calm field-notes app for collecting small observations, references, quotes, colors, images, and ideas. Instead of pushing productivity or performance, it helps people capture fragments as they happen, then reflect on recurring themes through pattern summaries and a weekly report.

### Longer Product Description

`Noticed` is a browser-based journaling and observation app built for small things that are easy to lose: an overheard line, a useful link, a color, a photo, a design thought, a quote, or a half-formed idea. The main capture flow supports six entry types and keeps the process intentionally lightweight.

Everything is stored locally on the device using browser storage, which makes the app feel personal, private, and easy to try without accounts or setup. The app also includes curated sample observations, JSON import/export, light and dark themes, searchable tags, and filters.

What makes the product more interesting than a basic notes app is that it does something with what you save. The `Patterns` view surfaces repeated tags, type distribution, recurring colors, co-occurring themes, and cadence. The `Weekly Report` turns a week of saved observations into a gentle written reflection.

### Target Audience

- Designers collecting visual references, colors, textures, and ideas
- Writers capturing lines, quotes, and fragments
- Creative developers exploring local-first UX patterns
- People who want a calmer alternative to a conventional notes feed
- Builders looking for a reusable Next.js template for capture, tagging, and reflection

### Primary Use Case

`Capture small observations throughout the week, then review what themes, forms, and patterns keep returning.`

### Secondary Use Cases

- Personal inspiration library
- Moodboard-adjacent reference collection
- Quote and link clipping
- Design research notebook
- Lightweight creative journaling
- Demo/template for local-first app design in Next.js

### What Makes the Project Interesting or Different

- Local-first by default, with no required account or backend
- Intentionally calm tone and interface instead of productivity pressure
- Supports multiple observation formats: text, image, link, color, quote, idea
- Turns captured fragments into pattern summaries and a weekly narrative reflection
- Includes sample data, import/export, and device-only storage messaging
- Strong template potential for builders who want a reusable capture-and-reflection foundation

### Placeholder Links

- Live demo: `[LIVE_DEMO_URL]`
- GitHub repo: `[GITHUB_REPO_URL]`
- Vercel template: `[VERCEL_TEMPLATE_URL]`
- v0 template: `[V0_TEMPLATE_URL]`
- OpenAI showcase listing: `[OPENAI_SHOWCASE_URL]`
- Cover image: `[COVER_IMAGE_URL]`

## 2. OpenAI Showcase Gallery Submission Content

### Submission Answers

**Project title**

`Noticed`

**Project tagline**

`A calm, local-first field-notes app for collecting small observations, then discovering the patterns in what you keep noticing.`

**Project description**

`Noticed` is a browser-based field-notes app for saving small fragments you want to keep: quotes, links, images, colors, text notes, and early ideas. The capture flow is lightweight, the UI stays intentionally calm, and everything is stored locally on the device.

Beyond basic capture, the app reflects your own attention back to you. A `Patterns` view surfaces recurring tags, colors, entry types, and related threads, while a `Weekly Report` turns recent observations into a gentle written summary.

It is useful both as a real personal tool and as a clean example of a thoughtful local-first app built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui-style components.

**Project type**

`App`

Alternative fit:

- `Creative tool`
- `Template`
- `Visual experience`

**Use cases showcased**

`Creative tools, personal knowledge capture, visual reference collection, journaling, developer templates`

**Capability showcased**

`Codex-assisted development and UI implementation`  
If no OpenAI tooling was used during development, replace with `N/A`.

**OpenAI models and APIs used**

`No OpenAI runtime API usage is visible in this repository. If applicable, note that the project was built or refined with Codex and/or ChatGPT during development rather than using OpenAI APIs in production.`

Suggested fill-in:

`Built with development help from Codex and/or ChatGPT. No OpenAI API is used at runtime in the app itself.`

**Other models or APIs used**

`N/A`

**Did you use Codex to build this?**

Recommended answer:

`Needs confirmation`

Recommended explanation:

`If true: Yes. Codex helped draft, refine, and iterate on the implementation and product copy. The shipped app itself does not depend on Codex at runtime.`

Fallback if not true:

`No. Codex was not used in the build process.`

**Did you use another coding agent to build this?**

Recommended answer:

`Needs confirmation`

Recommended explanation:

`No other coding agent use is clearly documented in this repository. If tools such as v0, Cursor, Claude Code, or Lovable were used, add them here before submitting.`

**Tech stack**

`Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui-style component structure, Radix UI primitives, next-themes, Sonner, date-fns, lucide-react, IndexedDB-based local persistence, Vercel Analytics in production, designed for Vercel deployment.`

**Build process description**

Maximum 500 characters:

`Built as a local-first Next.js app with TypeScript, Tailwind CSS, and shadcn/ui-style components. The product centers on fast capture, device-only persistence, and reflective views like Patterns and Weekly Report. If applicable, Codex or ChatGPT can be credited for helping iterate on the implementation and polish, but the app itself has no OpenAI runtime dependency.`

**Setup steps**

Maximum 500 characters:

`Clone the repo, install dependencies with pnpm, then run pnpm dev and open http://localhost:3000. The app stores data locally in the browser, so no database or auth setup is required. If you want a clean demo state, use the built-in sample observations or import/export JSON from Settings.`

**Public GitHub repository**

`[GITHUB_REPO_URL]`

**Hosted URL**

`[LIVE_DEMO_URL]`

**Author display name**

`[AUTHOR_NAME]`

**Cover image link**

`[COVER_IMAGE_URL]`

Recommended note:

`Use a clean screenshot of the Library view with the capture composer visible, or a side-by-side composite of Library + Patterns to show both capture and reflection.`

### OpenAI Showcase Form Checklist

| Field | Status | Notes |
| --- | --- | --- |
| Project title | Ready | `Noticed` |
| Project tagline | Ready | Can use the version above |
| Project description | Ready | Can paste as-is |
| Project type | Ready | Best fit: `App` |
| Use cases showcased | Ready | Concise list prepared |
| Capability showcased | Needs confirmation | Depends on whether Codex/ChatGPT were used |
| OpenAI models and APIs used | Needs confirmation | No runtime API usage detected |
| Other models or APIs used | Ready | `N/A` unless you add something |
| Did you use Codex to build this? | Needs confirmation | Repo does not prove build history |
| Did you use another coding agent? | Needs confirmation | Add only if true |
| Tech stack | Ready | Based on repo |
| Build process description | Ready | Under limit |
| Setup steps | Ready | Under limit |
| Public GitHub repository | Missing | Replace `[GITHUB_REPO_URL]` |
| Hosted URL | Missing | Replace `[LIVE_DEMO_URL]` |
| Author display name | Missing | Replace `[AUTHOR_NAME]` |
| Cover image link | Missing | Replace `[COVER_IMAGE_URL]` |

## 3. Vercel / v0 Template Submission Content

### Template / Project Title

`Noticed`

Alternative template-style title:

`Noticed: Local-First Field Notes App`

### Short Description

`A reusable local-first Next.js app for capturing observations, tagging them, and turning them into patterns and weekly reflections.`

### Long Description

`Noticed` is a polished Next.js starter for builders who want more than a simple notes CRUD demo. It includes fast multi-type capture, search and tag filters, local browser persistence, JSON import/export, curated sample content, a pattern-analysis view, and a weekly reflection report.

If published as a template, it gives users a strong foundation for creative journals, research notebooks, inspiration libraries, lightweight personal knowledge tools, or calm local-first apps. It is especially useful for builders who want a clean UI and meaningful product behavior without wiring up a backend first.

### Category Recommendation

- `Productivity`
- `Developer Tools`
- `Template`
- `Creative`

Best overall fit:

`Template`

### Tags

`nextjs, react, typescript, tailwind, shadcn, radix-ui, local-first, indexeddb, notes, journaling, creative-tool, template, vercel`

### Features List

- Six observation types: text, image, link, color, quote, idea
- Fast inline capture flow
- Search, tag filters, and sort controls
- Local-first persistence using browser storage
- JSON import and export
- Curated sample observations for first-run demos
- Patterns view with tags, colors, cadence, and related themes
- Weekly report generated from saved observations
- Light and dark themes
- Responsive, polished UI built with reusable components

### What Users Can Build With It

- Personal inspiration library
- Research or reference notebook
- Creative journaling tool
- Moodboard-adjacent capture app
- Private local-first note app
- Reflection or review tool
- A branded template for observation-driven products

### Suggested Cover Image Direction

- Primary recommendation: Library screen with the quick capture module open and a few sample cards visible
- Secondary recommendation: composite showing Library, Patterns, and Weekly Report
- Visual emphasis: calm typography, observation cards, and the reflective product tone

### URL Placeholders

- Demo URL: `[LIVE_DEMO_URL]`
- GitHub URL: `[GITHUB_REPO_URL]`
- Deploy/template URL: `[VERCEL_TEMPLATE_URL]`
- v0 template URL: `[V0_TEMPLATE_URL]`

### Environment Variables

`No required environment variables are visible in the current repository.`

Optional note:

`Vercel Analytics is included in production, but no user-supplied environment variables are required for local use.`

### Setup Instructions

```bash
pnpm install
pnpm dev
```

Then open:

`http://localhost:3000`

### Deployment Instructions

`Deploy to Vercel as a standard Next.js app. No database, auth provider, or server-side secrets are required for the current local-first version.`

### Notes for Reviewers

- This project is best positioned as a reusable local-first app template, not just a static design.
- The most distinctive product behavior is in `Patterns` and `Weekly Report`, not only the capture screen.
- There is no backend dependency in the current repository.
- If publishing as a template, keep the positioning honest: this is a polished starting point for capture-and-reflection products, not a full multi-user SaaS.

## 4. GitHub README Draft

```md
# [PROJECT_NAME]

A calm, local-first field-notes app for collecting small observations, references, quotes, colors, images, and ideas, then discovering the patterns in what you keep noticing.

![Preview]([COVER_IMAGE_URL])

Live demo: [LIVE_DEMO_URL]

## Features

- Capture six kinds of observations: text, image, link, color, quote, and idea
- Search, filter, and browse your saved notes in one library
- Discover recurring themes in the `Patterns` view
- Review your recent activity in a generated `Weekly Report`
- Keep everything on-device with local browser storage
- Import and export your library as JSON
- Start quickly with curated sample observations
- Switch between light and dark themes

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui-style components
- Radix UI primitives
- IndexedDB-backed local persistence
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

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

No required environment variables are currently needed to run the app locally.

## Project Structure

```text
app/
  (app)/
    page.tsx          # Library / main capture experience
    patterns/         # Pattern summaries and related themes
    report/           # Weekly reflection report
    settings/         # Theme, samples, import/export, storage info
components/          # UI and product components
lib/                 # Storage, sample data, observation logic, reports
hooks/               # Client hooks
public/              # Icons and sample media
```

## Customization

- Update the product name, metadata, and brand copy in the layout and UI components
- Replace sample observations with content that matches your domain
- Extend observation types if you want richer capture formats
- Swap local persistence for a backend if you want sync or multi-device access

## Deployment

This project deploys cleanly as a standard Next.js app on Vercel.

## Credits

- Built with Next.js, React, Tailwind CSS, Radix UI, and Vercel
- Design and product voice based on the current repository implementation

## License

[LICENSE_PLACEHOLDER]
```

## 5. Social Launch Posts

### X / Twitter

**Variant 1**

Built a small app called `Noticed`.

It’s a calm, local-first place to save things that catch your attention: quotes, colors, images, links, and half-formed ideas. Then it turns them into patterns and a weekly reflection instead of another endless feed.

Demo: [LIVE_DEMO_URL]  
Code: [GITHUB_REPO_URL]

Optional hashtags: `#nextjs #typescript #buildinpublic #indiehacker`

**Variant 2**

I wanted a notes app that felt quieter and more reflective.

So I made `Noticed`: a browser-based field journal for small observations, with local storage, tagging, pattern summaries, and a weekly report built from what you actually saved.

[LIVE_DEMO_URL]  
[GITHUB_REPO_URL]

Optional hashtags: `#webdev #design #creativecoding`

### LinkedIn

Built a project called `Noticed`, a local-first field-notes app for collecting small things you want to keep: quotes, colors, links, images, text fragments, and early ideas.

What I like about it is that it does more than store notes. It looks back at what you captured and surfaces recurring themes in a `Patterns` view, then turns the week into a short written reflection.

It’s built with Next.js, TypeScript, Tailwind CSS, and reusable UI primitives, and it can also work well as a template for other local-first products.

Demo: [LIVE_DEMO_URL]  
Repo: [GITHUB_REPO_URL]

Optional hashtags: `#Nextjs #TypeScript #ProductDesign #Vercel`

### Short Announcement

`Noticed` is live: a calm, local-first app for saving observations and spotting patterns in what keeps catching your attention.

Demo: [LIVE_DEMO_URL]  
Code: [GITHUB_REPO_URL]

### Personal Build Story Post

I kept wanting a place to save small things without turning them into tasks.

Not bookmarks to optimize, not notes to organize immediately, just fragments worth keeping: a quote, a color, a line I heard, a reference image, a rough idea.

So I built `Noticed`. It stores everything locally in the browser, keeps the capture flow light, and then reflects your own attention back to you through pattern summaries and a weekly report.

It ended up feeling less like a productivity tool and more like a field journal.

Demo: [LIVE_DEMO_URL]  
Repo: [GITHUB_REPO_URL]

### Technical “How It Was Built” Post

`Noticed` is a Next.js + TypeScript app with a local-first storage model and a simple observation schema that supports text, image, link, color, quote, and idea entries.

The interesting part wasn’t just capture. I wanted the data model to support reflective views, so the app computes top tags, recurring colors, type distribution, cadence, related themes, and a weekly prose summary from the saved observations.

It also includes JSON import/export, sample seed content, theme switching, and a polished responsive UI built with Tailwind CSS and reusable Radix-based components.

Demo: [LIVE_DEMO_URL]  
Repo: [GITHUB_REPO_URL]

### Vercel / v0 Community-Oriented Post

Built a small Next.js app called `Noticed` that I think also works well as a template.

It’s a local-first field-notes app with multi-type capture, JSON import/export, sample data, a pattern-analysis screen, and a weekly report generated from saved observations. No backend setup required in the current version.

I’d be interested in feedback on how people would position it: personal product, creative tool, or reusable template.

Demo: [LIVE_DEMO_URL]  
Repo: [GITHUB_REPO_URL]  
Template: [VERCEL_TEMPLATE_URL]

### OpenAI / Codex Community-Oriented Post

Built `Noticed`, a calm local-first app for saving small observations and turning them into patterns.

The app itself doesn’t use OpenAI at runtime, but it’s a good example of the kind of product/UI work that can be accelerated with tools like Codex or ChatGPT during implementation, polish, and iteration.

It combines a clean capture flow with reflective views like `Patterns` and `Weekly Report`, which made it a nice project for testing product framing, component composition, and local-first UX.

Demo: [LIVE_DEMO_URL]  
Repo: [GITHUB_REPO_URL]

Optional hashtags: `#OpenAI #Codex #Nextjs #BuildInPublic`

## 6. Vercel Community Forum Blog Post / Project Overview

### Title

`Built Noticed: a calm local-first field-notes app in Next.js`

### Forum-Ready Post

I’ve been working on a small project called `Noticed`, and I thought it might be interesting to share here because it sits somewhere between a personal app and a reusable template.

`Noticed` is a local-first field-notes app for saving small things that catch your attention: text notes, links, images, colors, quotes, and ideas. The main goal was to make capture feel lightweight and personal, then make the saved data feel meaningful later.

Instead of stopping at CRUD, the app includes two reflective views:

- `Patterns`, which surfaces recurring tags, type distribution, colors, cadence, and related themes
- `Weekly Report`, which turns the week’s saved observations into a short written summary

It’s built with Next.js, React, TypeScript, Tailwind CSS, and a shadcn/ui-style component setup. The current version stores everything locally in the browser, includes sample seed content for first-run demos, and supports JSON import/export.

One thing I found interesting was balancing product tone with implementation. I wanted it to feel calm and intentional, not like another productivity dashboard. That shaped both the copy and the UI decisions.

### Links

- Demo: `[LIVE_DEMO_URL]`
- GitHub: `[GITHUB_REPO_URL]`
- Vercel template: `[VERCEL_TEMPLATE_URL]`

### Screenshots

- Library view: `[COVER_IMAGE_URL]`
- Patterns view: `[PATTERNS_SCREENSHOT_URL]`
- Weekly report view: `[REPORT_SCREENSHOT_URL]`

### Feedback Request

I’d especially like feedback on:

- whether the positioning reads more like a real end-user app or a template
- whether the reflective views feel genuinely useful
- how you’d describe the project to new builders discovering it

## 7. OpenAI / Codex Community Post

### Title

`Built Noticed, a local-first reflection app for small observations`

### Post

I built a project called `Noticed`, a browser-based app for saving small observations like quotes, colors, links, images, and ideas.

The interesting part is that it does more than store notes. It turns saved observations into reflective views: a `Patterns` screen that surfaces recurring themes and a `Weekly Report` that writes a short summary from what you captured.

If you used Codex or ChatGPT while building it, this is a good example of where those tools help without becoming runtime dependencies. They can help with:

- shaping product copy and UX tone
- iterating on component structure and flows
- implementing storage and derived views
- refining details like import/export, sample data, and empty states

The final project demonstrates a calmer kind of app-building: local-first, no account wall, no backend dependency, and product behavior that comes from thoughtful use of saved data rather than from a large feature surface.

What others might take from it:

- local-first products can still feel polished and complete
- AI-assisted coding is especially useful for iteration and refinement
- small data models can power meaningful product behavior if the derived views are well designed

### Links

- Demo: `[LIVE_DEMO_URL]`
- GitHub: `[GITHUB_REPO_URL]`
- Showcase: `[OPENAI_SHOWCASE_URL]`

### Screenshots

- Main screen: `[COVER_IMAGE_URL]`
- Patterns screen: `[PATTERNS_SCREENSHOT_URL]`
- Weekly report screen: `[REPORT_SCREENSHOT_URL]`

## 8. Press / Media Kit Copy

### Very Short Boilerplate

`Noticed is a local-first field-notes app for collecting observations and reflecting on the patterns in what you keep noticing.`

### Longer Boilerplate

`Noticed` is a browser-based field-notes app built for small fragments worth keeping: quotes, links, images, colors, text notes, and early ideas. Everything is stored locally on the device, and the app helps users look back on what they saved through pattern summaries and a weekly reflection report. It is both a usable personal tool and a strong template for calm, local-first product design.

### Founder / Maker Quote Placeholder

`"[MAKER_QUOTE_ABOUT_BUILDING_NOTICED]"`  
`[AUTHOR_NAME], maker of Noticed`

### Key Facts

- Product name: `Noticed`
- Category: `App` / `Creative tool` / `Template`
- Platform: Web
- Storage model: Local-first, browser storage
- Core entry types: text, image, link, color, quote, idea
- Key views: Library, Patterns, Weekly Report, Settings
- Stack: Next.js, React, TypeScript, Tailwind CSS, Radix UI
- Deployment target: Vercel

### Suggested Screenshots

- Library screen with capture composer
- Patterns screen showing tags and color swatches
- Weekly report screen with generated prose
- Settings screen showing local-storage and import/export messaging

### Suggested Alt Text for Images

- `Noticed library view showing a calm note-capture interface with observation cards and filters`
- `Patterns view showing recurring tags, colors, and related observation threads`
- `Weekly report view summarizing the user's recent observations in prose`
- `Settings view showing local-first storage details and JSON import/export controls`

### Suggested OG Image Text

- `Noticed`
- `A quiet place for what you notice`
- `Capture. Reflect. Notice patterns.`

## 9. Reusable Copy Snippets

### 25-Character Description

`A quiet noticing app`

### 50-Character Description

`Local-first notes for what keeps catching your eye`

### 100-Character Description

`Capture quotes, colors, links, images, and ideas, then spot patterns in what you keep noticing.`

### 160-Character Meta Description

`A calm, local-first field-notes app for saving observations, references, quotes, colors, and ideas, then reflecting on the patterns they form.`

### 255-Character OpenAI Showcase-Friendly Tagline / Summary

`Noticed is a local-first field-notes app for capturing small observations like quotes, links, colors, images, and ideas, then turning them into reflective views such as recurring patterns and a weekly report built from what you saved.`

### 500-Character Build Process Summary

`Noticed was built as a local-first Next.js app with TypeScript, Tailwind CSS, and reusable Radix-based UI components. The product focuses on lightweight capture and meaningful derived views rather than a backend-heavy setup. Saved observations power a Patterns screen and a Weekly Report, while IndexedDB-based storage, sample data, and JSON import/export make the app easy to try, demo, and extend.`

### 500-Character Setup Summary

`Clone the repository, run pnpm install, then start the app with pnpm dev and open http://localhost:3000. No database, auth provider, or environment variables are required in the current version. Data is stored locally in the browser, and the app includes sample observations plus JSON import/export for testing and transfer.`

### 1000-Character Project Description

`Noticed is a browser-based, local-first field-notes app for saving the small things that catch your attention: a quote, a color, a useful link, a reference image, a passing thought, or an early product idea. The interface is intentionally calm and lightweight, so capture feels closer to jotting something down than maintaining a system. Everything is stored locally on the device, with no required account or backend in the current version. What makes the project more than a simple note app is what happens after capture. A Patterns view surfaces recurring tags, entry types, related themes, recurring colors, and noticing cadence, while a Weekly Report turns recent activity into a short reflective summary. The result is a product that works both as a personal creative tool and as a reusable template for local-first journaling, inspiration capture, and reflection-focused app ideas.`

## Final Placeholder Checklist

Replace these before publishing:

- `[LIVE_DEMO_URL]`
- `[GITHUB_REPO_URL]`
- `[VERCEL_TEMPLATE_URL]`
- `[V0_TEMPLATE_URL]`
- `[OPENAI_SHOWCASE_URL]`
- `[COVER_IMAGE_URL]`
- `[PATTERNS_SCREENSHOT_URL]`
- `[REPORT_SCREENSHOT_URL]`
- `[AUTHOR_NAME]`
- `[LICENSE_PLACEHOLDER]`
- Codex / ChatGPT usage confirmation
- Any other coding agent usage confirmation
