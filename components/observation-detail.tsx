'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { Pencil, Trash2, ExternalLink, Check } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import type { Observation } from '@/lib/types'
import { getTypeConfig } from '@/lib/observation-types'
import { TypeBadge } from '@/components/type-badge'
import { TagInput } from '@/components/tag-input'

export function ObservationDetail({
  observation,
  open,
  onOpenChange,
  tagSuggestions,
  onUpdate,
  onDelete,
}: {
  observation: Observation | null
  open: boolean
  onOpenChange: (open: boolean) => void
  tagSuggestions: string[]
  onUpdate: (id: string, patch: Partial<Observation>) => void
  onDelete: (id: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')
  const [source, setSource] = useState('')
  const [tags, setTags] = useState<string[]>([])

  // reset local state whenever a different observation opens
  useEffect(() => {
    if (observation) {
      setBody(observation.body)
      setTitle(observation.title ?? '')
      setSource(observation.source ?? '')
      setTags(observation.tags)
      setEditing(false)
    }
  }, [observation])

  if (!observation) return null

  const config = getTypeConfig(observation.type)
  const imgSrc = observation.imageData || observation.url

  function save() {
    if (!observation) return
    onUpdate(observation.id, {
      body: body.trim(),
      title: title.trim() || undefined,
      source: source.trim() || undefined,
      tags,
    })
    setEditing(false)
    toast.success('Updated.')
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 overflow-y-auto p-0 sm:max-w-lg">
        <SheetHeader className="border-b border-border/60 p-5">
          <div className="flex items-center justify-between gap-2">
            <TypeBadge type={observation.type} />
            <span className="text-xs text-muted-foreground">
              {format(observation.createdAt, "EEEE, MMM d 'at' h:mm a")}
            </span>
          </div>
          <SheetTitle className="sr-only">Observation detail</SheetTitle>
          <SheetDescription className="sr-only">
            View and edit this observation
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 p-5">
          {/* media */}
          {observation.type === 'color' && observation.color ? (
            <div
              className="flex h-40 items-end rounded-xl border border-border p-3 shadow-paper"
              style={{ backgroundColor: observation.color }}
            >
              <span className="rounded-md bg-background/85 px-2 py-1 font-mono text-sm font-medium uppercase backdrop-blur">
                {observation.color}
              </span>
            </div>
          ) : null}

          {observation.type === 'image' && imgSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgSrc || '/placeholder.svg'}
              alt={observation.title || observation.body || 'Saved image'}
              className="w-full rounded-xl border border-border object-cover shadow-paper"
              crossOrigin="anonymous"
            />
          ) : null}

          {/* editable content */}
          {editing ? (
            <div className="space-y-3">
              {(observation.type === 'idea' ||
                observation.type === 'link' ||
                observation.type === 'image') && (
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="font-serif text-lg"
                />
              )}
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                placeholder="What did you notice?"
                className={cn(observation.type === 'quote' && 'font-serif italic')}
              />
              {observation.type === 'quote' && (
                <Input
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Source"
                />
              )}
              <TagInput
                value={tags}
                onChange={setTags}
                suggestions={tagSuggestions}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {observation.title ? (
                <h2 className="font-serif text-2xl font-semibold leading-tight text-balance">
                  {observation.title}
                </h2>
              ) : null}

              {observation.type === 'quote' ? (
                <blockquote
                  className={cn(
                    'border-l-2 pl-4 font-serif text-xl italic leading-snug',
                    'border-[var(--type-quote)]/50',
                  )}
                >
                  {observation.body}
                  {observation.source ? (
                    <footer className="mt-2 text-base not-italic text-muted-foreground">
                      — {observation.source}
                    </footer>
                  ) : null}
                </blockquote>
              ) : observation.body ? (
                <p className="text-base leading-relaxed text-pretty">
                  {observation.body}
                </p>
              ) : null}

              {observation.source && observation.type !== 'quote' ? (
                <p className="text-sm text-muted-foreground">
                  Noticed at {observation.source}
                </p>
              ) : null}

              {observation.url ? (
                <a
                  href={observation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--type-link)] underline-offset-2 hover:underline"
                >
                  <ExternalLink className="size-3.5" />
                  {observation.url}
                </a>
              ) : null}

              {observation.tags.length ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {observation.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>

        <SheetFooter className="flex-row items-center justify-between border-t border-border/60 p-4">
          <div className="flex items-center gap-1">


            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Delete observation"
                >
                  <Trash2 className="size-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Let this one go?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This observation will be removed from your library. This
                    can&apos;t be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep it</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      onDelete(observation.id)
                      onOpenChange(false)
                      toast('Released.', {
                        description: 'One less thing to hold onto.',
                      })
                    }}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {editing ? (
            <Button size="sm" onClick={save}>
              <Check className="size-4" />
              Save changes
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
              <Pencil className="size-4" />
              Edit
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
