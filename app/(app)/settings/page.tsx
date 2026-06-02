'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import { Sun, Moon, Monitor, Database, RotateCcw, Trash2 } from 'lucide-react'
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
  const { observations, hydrated, reloadSamples, clearAll } = useObservations()
  const [mounted, setMounted] = useState(false)
  const [size, setSize] = useState(0)

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    if (hydrated) setSize(approximateStorageSize())
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

        {/* reload samples */}
        <SettingsRow
          title="Sample observations"
          description="Add the curated example notes back into your library to explore the app. Your own notes are kept."
        >
          <Button
            variant="outline"
            onClick={() => {
              reloadSamples()
              toast.success('Samples added', {
                description: 'The example observations are back in your library.',
              })
            }}
          >
            <RotateCcw className="size-4" />
            Reload samples
          </Button>
        </SettingsRow>

        <Separator />

        {/* danger zone */}
        <SettingsRow
          title="Clear everything"
          description="Permanently remove all observations from this device. There's no undo, and nothing is backed up."
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="size-4" />
                Clear all data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear your whole library?</AlertDialogTitle>
                <AlertDialogDescription>
                  This removes every observation stored on this device. It
                  can&apos;t be undone. Samples won&apos;t return automatically,
                  but you can reload them anytime from Settings.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep my notes</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    clearAll()
                    toast('Library cleared', {
                      description: 'A clean slate. Notice something new.',
                    })
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Clear everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SettingsRow>
      </div>

      <p className="px-1 text-center text-xs text-muted-foreground">
        Noticed · a calm field journal for what catches your eye
      </p>
    </div>
  )
}
