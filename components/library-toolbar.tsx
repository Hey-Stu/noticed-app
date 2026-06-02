'use client'

import { Search, X, ArrowDownWide } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { TYPE_ORDER, getTypeConfig } from '@/lib/observation-types'
import type { ObservationType, SortOption } from '@/lib/types'

export function LibraryToolbar({
  query,
  onQueryChange,
  activeTypes,
  onToggleType,
  tags,
  activeTags,
  onToggleTag,
  sort,
  onSortChange,
  onClearFilters,
  hasFilters,
}: {
  query: string
  onQueryChange: (q: string) => void
  activeTypes: ObservationType[]
  onToggleType: (t: ObservationType) => void
  tags: string[]
  activeTags: string[]
  onToggleTag: (t: string) => void
  sort: SortOption
  onSortChange: (s: SortOption) => void
  onClearFilters: () => void
  hasFilters: boolean
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search what you've noticed…"
            className="h-10 pl-9"
          />
          {query ? (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
        <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="h-10 w-full sm:w-44">
            <ArrowDownWide className="size-4 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="favorites">Favorites first</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {TYPE_ORDER.map((t) => {
          const config = getTypeConfig(t)
          const Icon = config.icon
          const active = activeTypes.includes(t)
          return (
            <button
              key={t}
              type="button"
              onClick={() => onToggleType(t)}
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

        {hasFilters ? (
          <button
            type="button"
            onClick={onClearFilters}
            className="ml-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            <X className="size-3" />
            Clear
          </button>
        ) : null}
      </div>

      {tags.length ? (
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.slice(0, 16).map((tag) => {
            const active = activeTags.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onToggleTag(tag)}
                className={cn(
                  'rounded-full px-2 py-0.5 text-xs transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
              >
                #{tag}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
