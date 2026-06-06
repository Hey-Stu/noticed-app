'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function OnboardingBanner({
  open,
  onDismiss,
}: {
  open: boolean
  onDismiss: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onDismiss()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-2xl rounded-[2rem] border-border/80 bg-background p-0 shadow-paper-lg"
      >
        <div className="overflow-hidden rounded-[2rem] bg-background">
          <div className="bg-grain border-b border-border/60 px-6 py-5 md:px-8">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Welcome to Noticed
              </p>
              <DialogHeader className="gap-1 text-left">
                <DialogTitle className="font-serif text-3xl font-semibold leading-none md:text-4xl">
                  Keep what moves you before it slips away.
                </DialogTitle>
                <DialogDescription className="sr-only">
                  First-time onboarding for the Noticed library.
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>

          <div className="space-y-5 bg-background px-6 py-6 md:px-8">
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Capture small fragments as you move through your day: a color, a
              quote, a screenshot, a half-formed idea. Don&apos;t organize too
              early. Don&apos;t overthink it.
            </p>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Over time, <span className="text-foreground">Patterns</span> and
              your <span className="text-foreground">Weekly Report</span> will
              surface what you keep returning to. A few sample references are
              already here to help you get started.
            </p>

            <div className="grid gap-3 rounded-[1.5rem] border border-border/70 bg-card/70 p-4 md:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Capture
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  Save whatever catches your attention without forcing structure.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Browse
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  Let the library read like a visual archive, not a to-do list.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Reflect
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  Use patterns and weekly summaries to notice what repeats.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-5">
              <p className="max-w-sm text-sm text-muted-foreground">
                You can dismiss this now. It won&apos;t come back unless you
                reset your local app state.
              </p>
              <Button
                size="sm"
                className="rounded-full px-4"
                onClick={onDismiss}
              >
                Got it, let me look
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
