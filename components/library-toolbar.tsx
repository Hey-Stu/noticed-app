'use client'

import { Search, X, ArrowDownNarrowWide } from 'lucide-react'
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
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search your references, quotes, colors, and ideas"
            className="h-12 rounded-full border-border/80 bg-card/75 pl-11 shadow-paper"
          />
          {query ? (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
        <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="h-12 w-full rounded-full border-border/80 bg-card/75 shadow-paper sm:w-48">
            <ArrowDownNarrowWide className="size-4 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
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
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                active
                  ? cn('border-transparent', config.tintClass, config.colorClass)
                  : 'border-border/70 bg-card/55 text-muted-foreground hover:border-foreground/20 hover:bg-card hover:text-foreground',
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
        <div className="flex flex-wrap items-center gap-2">
          {tags.slice(0, 16).map((tag) => {
            const active = activeTags.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onToggleTag(tag)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/70 text-muted-foreground hover:bg-secondary hover:text-foreground',
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
