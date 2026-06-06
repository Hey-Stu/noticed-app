'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import {
  Sun,
  Moon,
  Monitor,
  Database,
  Sparkles,
  RotateCcw,
  Trash2,
  Download,
  Upload,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { useObservations } from '@/hooks/use-observations'
import { approximateStorageSize } from '@/lib/storage'

const THEMES = [
  { value: 'light', label: 'Daylight', icon: Sun },
  { value: 'dark', label: 'Evening', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

function SettingsRow({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-0.5">
        <h3 className="font-medium">{title}</h3>
        {description ? (
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const {
    observations,
    hydrated,
    settings,
    updateSettings,
    reloadSamples,
    clearSamples,
    exportData,
    importData,
  } = useObservations()
  const sampleCount = observations.filter((o) => o.sample).length
  const [mounted, setMounted] = useState(false)
  const [size, setSize] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleExport() {
    const payload = exportData()
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const stamp = new Date().toISOString().slice(0, 10)
    const a = document.createElement('a')
    a.href = url
    a.download = `noticed-backup-${stamp}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    toast.success('Library exported', {
      description: `${payload.observations.length} ${
        payload.observations.length === 1 ? 'note' : 'notes'
      } saved to your downloads.`,
    })
  }

  async function handleImportFile(file: File) {
    try {
      const text = await file.text()
      const { added, skipped } = importData(text)
      if (added === 0) {
        toast('Nothing new to import', {
          description:
            skipped > 0
              ? 'Every note in that file is already in your library.'
              : 'No new observations were found.',
        })
        return
      }
      toast.success(`Imported ${added} ${added === 1 ? 'note' : 'notes'}`, {
        description:
          skipped > 0
            ? `${skipped} duplicate ${skipped === 1 ? 'note was' : 'notes were'} skipped.`
            : 'Your observations were merged into the library.',
      })
    } catch (err) {
      toast.error('Import failed', {
        description:
          err instanceof Error ? err.message : 'That file could not be read.',
      })
    }
  }

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    if (!hydrated) return
    let active = true
    void approximateStorageSize().then((bytes) => {
      if (active) setSize(bytes)
    })
    return () => {
      active = false
    }
  }, [hydrated, observations])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Your space, your data. Noticed lives entirely on this device."
      />

      <div className="rounded-2xl border border-border bg-card px-5 shadow-paper">
        {/* appearance */}
        <SettingsRow
          title="Appearance"
          description="Daylight for bright rooms, Evening for quieter hours."
        >
          <div className="flex gap-1.5 rounded-lg bg-secondary/60 p-1">
            {THEMES.map((t) => {
              const Icon = t.icon
              const active = mounted && theme === t.value
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTheme(t.value)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-card text-foreground shadow-paper'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                  aria-pressed={active}
                >
                  <Icon className="size-4" />
                  {t.label}
                </button>
              )
            })}
          </div>
        </SettingsRow>

        <Separator />

        {/* storage */}
        <SettingsRow
          title="Storage"
          description="Everything you notice is saved locally in your browser — nothing is sent anywhere."
        >
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm">
            <Database className="size-4 text-muted-foreground" />
            <span className="font-medium">
              {hydrated ? observations.length : '—'}
            </span>
            <span className="text-muted-foreground">
              {observations.length === 1 ? 'note' : 'notes'} ·{' '}
              {hydrated ? formatBytes(size) : '—'}
            </span>
          </div>
        </SettingsRow>

        <Separator />

        {/* import / export */}
        <SettingsRow
          title="Import & export"
          description="Noticed keeps everything on this device only. Export a JSON backup to keep your notes safe or move them to another browser or device, then import it later to bring them back. Importing merges notes in and skips any duplicates."
        >
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={handleExport}
              disabled={!hydrated || observations.length === 0}
            >
              <Download className="size-4" />
              Export JSON
            </Button>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="size-4" />
              Import JSON
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) void handleImportFile(file)
                // allow re-importing the same file name later
                e.target.value = ''
              }}
            />
          </div>
        </SettingsRow>

        <Separator />

        {/* onboarding */}
        <SettingsRow
          title="Onboarding"
          description="Reopen the welcome modal if you dismissed it too quickly or want to revisit the app's introduction."
        >
          <Button
            variant="outline"
            onClick={() => {
              updateSettings({ onboardingDismissed: false })
              toast.success('Onboarding reset', {
                description:
                  'Return to the Library to see the welcome modal again.',
              })
            }}
            disabled={!hydrated || !settings.onboardingDismissed}
          >
            <Sparkles className="size-4" />
            Show onboarding again
          </Button>
        </SettingsRow>

        <Separator />

        {/* samples */}
        <SettingsRow
          title="Sample observations"
          description="Reload the curated example notes to explore the app, or remove just the samples when you're ready to make the space your own. Either way, notes you've saved yourself are always kept."
        >
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                reloadSamples()
                toast.success('Samples added', {
                  description:
                    'The example observations are back in your library.',
                })
              }}
            >
              <RotateCcw className="size-4" />
              Reload samples
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  disabled={!hydrated || sampleCount === 0}
                >
                  <Trash2 className="size-4" />
                  Clear samples
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove the sample notes?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This removes only the {sampleCount} curated example{' '}
                    {sampleCount === 1 ? 'note' : 'notes'}. Anything you&apos;ve
                    saved yourself stays exactly where it is. You can reload the
                    samples anytime from Settings.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep them</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      const removed = clearSamples()
                      toast('Samples removed', {
                        description: `${removed} example ${
                          removed === 1 ? 'note' : 'notes'
                        } cleared. Your own notes are untouched.`,
                      })
                    }}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Remove samples
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </SettingsRow>
      </div>

      <p className="px-1 text-center text-xs text-muted-foreground">
        Noticed · a calm field journal for what catches your eye
      </p>
    </div>
  )
}
