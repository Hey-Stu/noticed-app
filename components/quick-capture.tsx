'use client'

import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { ImagePlus, Upload, X, CornerDownLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { TYPE_ORDER, getTypeConfig } from '@/lib/observation-types'
import type { ObservationType } from '@/lib/types'
import type { NewObservationInput } from '@/lib/observations'
import { TagInput } from '@/components/tag-input'

const BODY_PROMPTS: Record<ObservationType, string> = {
  text: 'What did you notice?',
  image: 'Describe what caught your eye…',
  link: 'Why is this worth keeping?',
  color: 'Where did you see this color?',
  quote: 'Type the words worth keeping…',
  idea: 'Sketch the idea…',
}

export function QuickCapture({
  tagSuggestions,
  onAdd,
}: {
  tagSuggestions: string[]
  onAdd: (input: NewObservationInput) => void
}) {
  const [type, setType] = useState<ObservationType>('text')
  const [expanded, setExpanded] = useState(false)
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [imageData, setImageData] = useState<string | undefined>(undefined)
  const [color, setColor] = useState('#c98a5e')
  const [source, setSource] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  function reset() {
    setBody('')
    setTitle('')
    setUrl('')
    setImageData(undefined)
    setColor('#c98a5e')
    setSource('')
    setTags([])
    setExpanded(false)
  }

  function handleFile(file: File | undefined) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('That does not look like an image.')
      return
    }
    if (file.size > 1.5 * 1024 * 1024) {
      toast.error('Image is a bit large', {
        description: 'Try one under 1.5MB, or paste an image URL instead.',
      })
      return
    }
    const reader = new FileReader()
    reader.onload = () => setImageData(reader.result as string)
    reader.onerror = () => toast.error('Could not read that file.')
    reader.readAsDataURL(file)
  }

  function canSave(): boolean {
    switch (type) {
      case 'color':
        return Boolean(color)
      case 'image':
        return Boolean(imageData || url.trim() || body.trim())
      case 'link':
        return Boolean(url.trim())
      default:
        return Boolean(body.trim())
    }
  }

  function handleSave() {
    if (!canSave()) {
      toast.error('Add a little something first.')
      return
    }
    try {
      onAdd({ type, body, title, url, imageData, color, source, tags })
      toast.success('Noticed.', {
        description: 'Tucked safely into your library.',
      })
      reset()
    } catch {
      toast.error('Storage is full', {
        description:
          'Uploaded images take up space. Try clearing a few or using image URLs.',
      })
    }
  }

  const showExpanded = expanded || type !== 'text'

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-paper md:p-5">
      {/* type selector */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {TYPE_ORDER.map((t) => {
          const config = getTypeConfig(t)
          const Icon = config.icon
          const active = type === t
          return (
            <button
              key={t}
              type="button"
              onClick={() => {
                setType(t)
                setExpanded(true)
              }}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                active
                  ? cn('border-transparent', config.tintClass, config.colorClass)
                  : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground',
              )}
            >
              <Icon className="size-3.5" />
              {config.label}
            </button>
          )
        })}
      </div>

      {/* quote / idea / link extras above the body for natural reading */}
      {type === 'idea' ? (
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give the idea a name (optional)"
          className="mb-2 border-0 border-b border-border bg-transparent px-1 font-serif text-lg shadow-none focus-visible:ring-0"
        />
      ) : null}

      {type === 'color' ? (
        <div className="mb-3 flex items-center gap-3">
          <label className="relative size-14 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-border shadow-paper">
            <span
              className="block size-full"
              style={{ backgroundColor: color }}
            />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="absolute inset-0 cursor-pointer opacity-0"
              aria-label="Pick a color"
            />
          </label>
          <div>
            <Input
              value={color.toUpperCase()}
              onChange={(e) => setColor(e.target.value)}
              className="w-32 font-mono text-sm uppercase"
              aria-label="Hex color"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Tap the swatch to pick
            </p>
          </div>
        </div>
      ) : null}

      {/* body */}
      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onFocus={() => setExpanded(true)}
        placeholder={BODY_PROMPTS[type]}
        rows={showExpanded ? 3 : 1}
        className={cn(
          'resize-none border-0 bg-transparent px-1 text-base shadow-none focus-visible:ring-0',
          type === 'quote' && 'font-serif text-lg italic',
          !showExpanded && 'min-h-0',
        )}
      />

      {/* link fields */}
      {type === 'link' ? (
        <div className="mt-1 space-y-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://…"
            inputMode="url"
            className="text-sm"
          />
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className="text-sm"
          />
        </div>
      ) : null}

      {/* image fields */}
      {type === 'image' ? (
        <div className="mt-1 space-y-2">
          {imageData ? (
            <div className="relative overflow-hidden rounded-xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageData || '/placeholder.svg'}
                alt="Preview of your upload"
                className="max-h-56 w-full object-cover"
              />
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="absolute right-2 top-2 size-7"
                onClick={() => setImageData(undefined)}
                aria-label="Remove image"
              >
                <X className="size-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste an image URL…"
                inputMode="url"
                className="text-sm"
              />
              <Button
                type="button"
                variant="outline"
                className="shrink-0"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="size-4" />
                Upload
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>
          )}
        </div>
      ) : null}

      {/* quote source */}
      {type === 'quote' ? (
        <Input
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Who said or wrote it? (optional)"
          className="mt-1 border-0 border-l-2 border-[var(--type-quote)]/40 bg-transparent px-3 text-sm italic shadow-none focus-visible:ring-0"
        />
      ) : null}

      {/* expanded footer: tags + actions */}
      {showExpanded ? (
        <div className="mt-3 space-y-3 border-t border-border/60 pt-3">
          <TagInput
            value={tags}
            onChange={setTags}
            suggestions={tagSuggestions}
            placeholder="Tag it so patterns can find it later…"
          />
          <div className="flex items-center justify-between">
            <p className="hidden text-xs text-muted-foreground sm:block">
              Small things count. That's the whole point.
            </p>
            <div className="flex items-center gap-2">
              {(body || title || url || imageData || tags.length) ? (
                <Button variant="ghost" size="sm" onClick={reset}>
                  Clear
                </Button>
              ) : null}
              <Button size="sm" onClick={handleSave} disabled={!canSave()}>
                Keep it
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex items-center gap-2 px-1 text-xs text-muted-foreground">
          <ImagePlus className="size-3.5" />
          <span>Capture a fragment — a color, a quote, a passing thought.</span>
        </div>
      )}
    </div>
  )
}
