'use client'

import { useMemo, useState } from 'react'
import {
  Sparkles,
  Hash,
  Layers,
  Palette,
  Link2,
  CalendarClock,
  Flame,
  Sun,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { StatChip } from '@/components/stat-chip'
import { PatternCard } from '@/components/pattern-card'
import { TypeBadge } from '@/components/type-badge'
import { ObservationDetail } from '@/components/observation-detail'
import { useObservations } from '@/hooks/use-observations'
import { computeInsights } from '@/lib/patterns'
import { allTags } from '@/lib/observations'
import { getTypeConfig } from '@/lib/observation-types'
import { cn } from '@/lib/utils'
import type { Observation } from '@/lib/types'

export default function PatternsPage() {
  const {
    observations,
    hydrated,
    updateObservation,
    deleteObservation,
    toggleFavorite,
  } = useObservations()

  const [selected, setSelected] = useState<Observation | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const insights = useMemo(() => computeInsights(observations), [observations])
  const tags = useMemo(() => allTags(observations), [observations])

  const selectedLive = selected
    ? observations.find((o) => o.id === selected.id) ?? null
    : null

  function openDetail(o: Observation) {
    setSelected(o)
    setDetailOpen(true)
  }

  const maxTag = insights.topTags[0]?.count ?? 1
  const maxType = insights.typeDistribution[0]?.count ?? 1
  const { cadence } = insights

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patterns"
        description="The quiet shape of your attention. What you keep returning to, gathered from everything you've noticed."
      />

      {!hydrated ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-xl border border-border bg-card"
            />
          ))}
        </div>
      ) : observations.length < 3 ? (
        <EmptyState
          icon={Sparkles}
          title="Patterns need a little more to notice"
          description="Once you've kept a handful of observations, this page will start surfacing the themes, colors, and rhythms you return to. Keep going."
        />
      ) : (
        <>
          {/* cadence stat row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatChip
              icon={CalendarClock}
              label="This week"
              value={cadence.thisWeek}
              hint={
                cadence.delta === 0
                  ? 'Same as last week'
                  : cadence.delta > 0
                    ? `${cadence.delta} more than last week`
                    : `${Math.abs(cadence.delta)} fewer than last week`
              }
            />
            <StatChip
              icon={Flame}
              label="Current streak"
              value={cadence.streakDays > 0 ? `${cadence.streakDays}d` : '—'}
              hint={
                cadence.streakDays > 0
                  ? 'Consecutive days noticing'
                  : 'Notice something today to begin'
              }
            />
            <StatChip
              icon={Sun}
              label="You notice most"
              value={cadence.busiestPartOfDay ?? '—'}
              hint={cadence.busiestDay ? `Often on ${cadence.busiestDay}` : undefined}
            />
            <StatChip
              icon={Layers}
              label="In total"
              value={insights.total}
              hint="Fragments collected"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* top tags */}
            <PatternCard
              icon={Hash}
              title="What keeps returning"
              description="The themes you tag most often"
            >
              <ul className="space-y-2.5">
                {insights.topTags.slice(0, 8).map(({ tag, count }) => (
                  <li key={tag} className="flex items-center gap-3">
                    <span className="w-28 shrink-0 truncate text-sm font-medium">
                      #{tag}
                    </span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${(count / maxTag) * 100}%` }}
                      />
                    </div>
                    <span className="w-6 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                      {count}
                    </span>
                  </li>
                ))}
              </ul>
            </PatternCard>

            {/* type distribution */}
            <PatternCard
              icon={Layers}
              title="How you notice"
              description="The forms your attention takes"
            >
              <ul className="space-y-2.5">
                {insights.typeDistribution.map(({ type, count }) => {
                  const config = getTypeConfig(type)
                  const Icon = config.icon
                  return (
                    <li key={type} className="flex items-center gap-3">
                      <span className="flex w-28 shrink-0 items-center gap-1.5 text-sm font-medium">
                        <Icon className={cn('size-3.5', config.colorClass)} />
                        {config.label}
                      </span>
                      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
                        <div
                          className={cn('h-full rounded-full transition-all')}
                          style={{
                            width: `${(count / maxType) * 100}%`,
                            backgroundColor: `var(--type-${type})`,
                          }}
                        />
                      </div>
                      <span className="w-6 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                        {count}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </PatternCard>

            {/* recurring colors */}
            {insights.colors.length > 0 ? (
              <PatternCard
                icon={Palette}
                title="A palette, slowly forming"
                description="Colors you've stopped to keep"
              >
                <div className="flex flex-wrap gap-2">
                  {insights.colors.map((swatch) => (
                    <button
                      key={swatch.color}
                      type="button"
                      onClick={() => {
                        const found = observations.find(
                          (o) => o.id === swatch.ids[0],
                        )
                        if (found) openDetail(found)
                      }}
                      className="group flex flex-col items-center gap-1"
                      title={swatch.color}
                    >
                      <span
                        className="size-14 rounded-xl border border-border shadow-paper transition-transform group-hover:scale-105"
                        style={{ backgroundColor: swatch.color }}
                      />
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {swatch.color}
                      </span>
                    </button>
                  ))}
                </div>
              </PatternCard>
            ) : null}

            {/* co-occurring tags */}
            {insights.tagPairs.length > 0 ? (
              <PatternCard
                icon={Link2}
                title="Often noticed together"
                description="Tags that tend to show up side by side"
              >
                <ul className="space-y-2">
                  {insights.tagPairs.map((pair) => (
                    <li
                      key={`${pair.a}-${pair.b}`}
                      className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 text-sm"
                    >
                      <span>
                        <span className="font-medium">#{pair.a}</span>
                        <span className="mx-1.5 text-muted-foreground">+</span>
                        <span className="font-medium">#{pair.b}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {pair.count} times
                      </span>
                    </li>
                  ))}
                </ul>
              </PatternCard>
            ) : null}
          </div>

          {/* related groupings */}
          {insights.related.length > 0 ? (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold">
                Threads worth following
              </h2>
              {insights.related.map((group) => (
                <PatternCard
                  key={group.tag}
                  icon={Hash}
                  title={`#${group.tag}`}
                  description={`${group.observations.length} observations share this thread`}
                >
                  <div className="flex flex-wrap gap-2">
                    {group.observations.slice(0, 8).map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => openDetail(o)}
                        className="flex max-w-[16rem] items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-left text-sm transition-colors hover:border-primary/40"
                      >
                        <TypeBadge type={o.type} showLabel={false} />
                        <span className="truncate">
                          {o.body || o.title || o.color || 'Untitled'}
                        </span>
                      </button>
                    ))}
                  </div>
                </PatternCard>
              ))}
            </div>
          ) : null}
        </>
      )}

      <ObservationDetail
        observation={selectedLive}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        tagSuggestions={tags}
        onUpdate={updateObservation}
        onDelete={deleteObservation}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  )
}
