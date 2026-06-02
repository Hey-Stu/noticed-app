'use client'

import { useState, type KeyboardEvent } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { normalizeTags } from '@/lib/observations'

export function TagInput({
  value,
  onChange,
  suggestions = [],
  placeholder = 'Add a tag and press Enter',
  className,
}: {
  value: string[]
  onChange: (tags: string[]) => void
  suggestions?: string[]
  placeholder?: string
  className?: string
}) {
  const [draft, setDraft] = useState('')

  function commit(raw: string) {
    const next = normalizeTags([...value, raw])
    onChange(next)
    setDraft('')
  }

  function remove(tag: string) {
    onChange(value.filter((t) => t !== tag))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (draft.trim()) commit(draft)
    } else if (e.key === 'Backspace' && !draft && value.length) {
      remove(value[value.length - 1])
    }
  }

  const filteredSuggestions = suggestions
    .filter((s) => !value.includes(s) && s.includes(draft.trim().toLowerCase()))
    .slice(0, 6)

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-input bg-background px-2.5 py-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
          >
            #{tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              className="rounded-full text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`Remove ${tag}`}
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length ? '' : placeholder}
          className="min-w-[8rem] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      {draft && filteredSuggestions.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {filteredSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => commit(s)}
              className="rounded-full border border-border bg-card px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              #{s}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
