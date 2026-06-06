'use client'

import { useMemo, useState } from 'react'
import { Leaf, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
    <div className="columns-1 gap-5 md:columns-2 xl:columns-3 2xl:columns-4">
      {[180, 120, 220, 160, 140, 200].map((h, i) => (
        <div
          key={i}
          className="mb-5 animate-pulse rounded-[1.75rem] border border-border/70 bg-card"
          style={{ height: h }}
        />
      ))}
    </div>
  )
}

export default function LibraryPage() {
  const {
    observations,
    settings,
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
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_24rem]">
        <div className="space-y-5">
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Your visual library
            </p>
            <div className="max-w-4xl space-y-3">
              <h1 className="font-serif text-5xl font-semibold leading-[0.95] text-balance md:text-7xl">
                A warmer, quieter place to collect what catches your eye.
              </h1>
              <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Keep references, images, colors, links, and stray thoughts in a
                surface that feels more like browsing a moodboard than managing
                a dashboard.
              </p>
            </div>
          </div>

          <QuickCapture tagSuggestions={tags} onAdd={addObservation} />
        </div>

        <aside className="bg-grain rounded-[2rem] border border-border/80 p-5 shadow-paper">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            At a glance
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <div className="space-y-1">
              <p className="font-serif text-4xl font-semibold">
                {hydrated ? observations.length : '—'}
              </p>
              <p className="text-sm text-muted-foreground">Saved references</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-4xl font-semibold">
                {hydrated ? tags.length : '—'}
              </p>
              <p className="text-sm text-muted-foreground">Tags in rotation</p>
            </div>
            <div className="space-y-1">
              <p className="font-serif text-4xl font-semibold">
                {hydrated && observations[0]
                  ? new Date(observations[0].createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })
                  : '—'}
              </p>
              <p className="text-sm text-muted-foreground">Latest addition</p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            The closer this page feels to browsing inspiration, the more the
            references get to lead.
          </p>
        </aside>
      </section>

      {hydrated && !settings.onboardingDismissed ? (
        <OnboardingBanner
          open={!settings.onboardingDismissed}
          onDismiss={() => updateSettings({ onboardingDismissed: true })}
        />
      ) : null}

      {!hydrated ? (
        <LibrarySkeleton />
      ) : observations.length === 0 ? (
        <EmptyState
          icon={Leaf}
          title="Nothing noticed yet"
          description="Your library is empty. Start with a single image, quote, or passing thought, then let the collection take shape from there."
        />
      ) : (
        <>
          <section className="space-y-5">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Browse the archive
                </p>
                <h2 className="font-serif text-3xl font-semibold md:text-4xl">
                  References worth returning to
                </h2>
              </div>
              <div className="text-sm text-muted-foreground">
                {filtered.length}{' '}
                {filtered.length === 1 ? 'observation' : 'observations'}
                {hasFilters ? ' match your current view' : ' in the current archive'}
              </div>
            </div>

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
          </section>

          {filtered.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="Nothing matches — yet"
              description="No saved references fit this filter set. Broaden the search or clear a few chips to bring the archive back into view."
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
