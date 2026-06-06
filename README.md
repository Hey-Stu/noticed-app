# Noticed

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
