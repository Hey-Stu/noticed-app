'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function OnboardingBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="relative w-fit max-w-full overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-5 shadow-paper md:p-6">
      <button
        type="button"
        onClick={onDismiss}
        className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground"
        aria-label="Dismiss welcome"
      >
        <X className="size-4" />
      </button>
      <div className="max-w-3xl space-y-2 pr-6">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          Welcome to Noticed
        </p>
        <h2 className="font-serif text-xl font-semibold md:text-2xl">
          A quiet place for the things you keep paying attention to.
        </h2>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          Capture small fragments as you move through your day — a color, a
          quote, a screenshot, a half-formed idea. Don&apos;t organize, don&apos;t
          judge. Over time, <span className="text-foreground">Patterns</span>{' '}
          and your <span className="text-foreground">Weekly Report</span> will
          show you what you keep noticing. We&apos;ve left a few examples below
          to get you started. Remove examples one by one, or clear them all at
          once in <span className="text-foreground">Settings</span>.
        </p>
      </div>
      <div className="mt-4">
        <Button size="sm" variant="outline" onClick={onDismiss}>
          Got it, let me look
        </Button>
      </div>
    </div>
  )
}
