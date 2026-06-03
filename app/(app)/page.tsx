'use client'

import { useMemo, useState } from 'react'
import { Leaf, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { QuickCapture } from '@/components/quick-capture'
import { LibraryToolbar } from '@/components/library-toolbar'
import { ObservationGrid } from '@/components/observation-grid'
import { ObservationDetail } from '@/components/observation-detail'
import { OnboardingBanner } from '@/components/onboarding-banner'
import { useObservations } from '@/hooks/use-observations'
import { allTags, filterObservations } from '@/lib/observations'
import type { Observation, ObservationType, SortOption } from '@/lib/types'

function LibrarySkeleton() {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {[180, 120, 220, 160, 140, 200].map((h, i) => (
        <div
          key={i}
          className="mb-4 animate-pulse rounded-2xl border border-border bg-card"
          style={{ height: h }}
        />
      ))}
    </div>
  )
}

export default function LibraryPage() {
  const {
    observations,
    hydrated,
    addObservation,
    updateObservation,
    deleteObservation,
    updateSettings,
  } = useObservations()

  const [query, setQuery] = useState('')
  const [activeTypes, setActiveTypes] = useState<ObservationType[]>([])
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [sort, setSort] = useState<SortOption>('newest')
  const [selected, setSelected] = useState<Observation | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)

  const tags = useMemo(() => allTags(observations), [observations])

  const filtered = useMemo(
    () =>
      filterObservations(observations, {
        query,
        types: activeTypes,
        tags: activeTags,
        sort,
      }),
    [observations, query, activeTypes, activeTags, sort],
  )

  // keep the open drawer in sync with edits
  const selectedLive = selected
    ? observations.find((o) => o.id === selected.id) ?? null
    : null

  const hasFilters =
    query.trim() !== '' || activeTypes.length > 0 || activeTags.length > 0

  function toggleType(t: ObservationType) {
    setActiveTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    )
  }

  function toggleTag(t: string) {
    setActiveTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    )
  }

  function clearFilters() {
    setQuery('')
    setActiveTypes([])
    setActiveTags([])
  }

  function openDetail(o: Observation) {
    setSelected(o)
    setDetailOpen(true)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Library"
        description="Everything you've noticed, in one calm place. Add a fragment above whenever something catches you."
      />

      {hydrated && showOnboarding ? (
        <OnboardingBanner
          onDismiss={() => {
            setShowOnboarding(false)
            updateSettings({ onboardingDismissed: true })
          }}
        />
      ) : null}

      <QuickCapture tagSuggestions={tags} onAdd={addObservation} />

      {!hydrated ? (
        <LibrarySkeleton />
      ) : observations.length === 0 ? (
        <EmptyState
          icon={Leaf}
          title="Nothing noticed yet"
          description="Your library is empty — and that's a fine place to begin. Capture the next small thing that catches your eye using the box above."
        />
      ) : (
        <>
          <LibraryToolbar
            query={query}
            onQueryChange={setQuery}
            activeTypes={activeTypes}
            onToggleType={toggleType}
            tags={tags}
            activeTags={activeTags}
            onToggleTag={toggleTag}
            sort={sort}
            onSortChange={setSort}
            onClearFilters={clearFilters}
            hasFilters={hasFilters}
          />

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {filtered.length}{' '}
              {filtered.length === 1 ? 'observation' : 'observations'}
              {hasFilters ? ' match' : ''}
            </span>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="Nothing matches — yet"
              description="No observations fit these filters. Try loosening your search or clearing a filter."
            >
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            </EmptyState>
          ) : (
            <ObservationGrid
              observations={filtered}
              onOpen={openDetail}
            />
          )}
        </>
      )}

      <ObservationDetail
        observation={selectedLive}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        tagSuggestions={tags}
        onUpdate={updateObservation}
        onDelete={deleteObservation}
      />
    </div>
  )
}
