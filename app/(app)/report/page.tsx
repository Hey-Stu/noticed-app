'use client'

import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { FileText, Hash, Heart, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { EmptyState } from '@/components/empty-state'
import { TypeBadge } from '@/components/type-badge'
import { ObservationDetail } from '@/components/observation-detail'
import { useObservations } from '@/hooks/use-observations'
import { buildWeeklyReport } from '@/lib/weekly-report'
import { allTags } from '@/lib/observations'
import { cn } from '@/lib/utils'
import type { Observation } from '@/lib/types'

export default function ReportPage() {
  const {
    observations,
    hydrated,
    updateObservation,
    deleteObservation,
    toggleFavorite,
  } = useObservations()

  const [selected, setSelected] = useState<Observation | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const report = useMemo(() => buildWeeklyReport(observations), [observations])
  const tags = useMemo(() => allTags(observations), [observations])

  const selectedLive = selected
    ? observations.find((o) => o.id === selected.id) ?? null
    : null

  function openDetail(o: Observation) {
    setSelected(o)
    setDetailOpen(true)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Weekly Report"
        description="A gentle look back at the week — no scores, no streaks to defend. Just what you noticed."
      />

      {!hydrated ? (
        <div className="h-64 animate-pulse rounded-2xl border border-border bg-card" />
      ) : !report.hasActivity ? (
        <EmptyState
          icon={FileText}
          title="No entries this week"
          description="Your report writes itself from what you capture. Notice a few things this week and check back — a small reflection will be waiting."
        />
      ) : (
        <>
          {/* report sheet */}
          <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-paper">
            <header className="border-b border-border/60 bg-secondary/30 px-6 py-5">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                {report.rangeLabel}
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-balance">
                What you kept noticing
              </h2>
            </header>

            {/* stat row */}
            <div className="grid grid-cols-3 divide-x divide-border/60 border-b border-border/60">
              <div className="px-4 py-4 text-center sm:px-6">
                <p className="font-serif text-3xl font-semibold">
                  {report.count}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  observations
                </p>
              </div>
              <div className="px-4 py-4 text-center sm:px-6">
                <p className="font-serif text-3xl font-semibold">
                  {report.topTags.length}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">themes</p>
              </div>
              <div className="px-4 py-4 text-center sm:px-6">
                <p className="truncate font-serif text-3xl font-semibold">
                  {report.dominantTypeLabel ?? '—'}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  most kept
                </p>
              </div>
            </div>

            {/* prose */}
            <div className="space-y-4 px-6 py-6">
              {report.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={cn(
                    'leading-relaxed text-pretty',
                    i === 0
                      ? 'font-serif text-lg text-foreground'
                      : 'text-muted-foreground',
                  )}
                >
                  {p}
                </p>
              ))}

              {report.topTags.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Hash className="size-4 text-muted-foreground" />
                  {report.topTags.map((t) => (
                    <span
                      key={t.tag}
                      className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      #{t.tag}
                      <span className="ml-1 text-muted-foreground">
                        {t.count}
                      </span>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </article>

          {/* highlight */}
          {report.highlight ? (
            <section className="space-y-3">
              <h3 className="flex items-center gap-2 font-serif text-lg font-semibold">
                <Heart className="size-4 text-[var(--type-quote)]" />
                The one that stayed with you
              </h3>
              <button
                type="button"
                onClick={() => openDetail(report.highlight as Observation)}
                className="block w-full rounded-2xl border border-border bg-card p-5 text-left shadow-paper transition-all hover:-translate-y-0.5 hover:shadow-paper-lg"
              >
                <div className="mb-2 flex items-center gap-2">
                  <TypeBadge type={report.highlight.type} />
                </div>
                {report.highlight.title ? (
                  <p className="font-serif text-lg font-semibold">
                    {report.highlight.title}
                  </p>
                ) : null}
                <p
                  className={cn(
                    'leading-relaxed text-pretty',
                    report.highlight.type === 'quote' &&
                      'font-serif text-lg italic',
                  )}
                >
                  {report.highlight.body || report.highlight.color}
                </p>
                {report.highlight.source ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    — {report.highlight.source}
                  </p>
                ) : null}
              </button>
            </section>
          ) : null}

          {/* the week's entries */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 font-serif text-lg font-semibold">
              <Sparkles className="size-4 text-primary" />
              Everything from this week
            </h3>
            <ul className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border bg-card shadow-paper">
              {report.observations.map((o) => (
                <li key={o.id}>
                  <button
                    type="button"
                    onClick={() => openDetail(o)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/40"
                  >
                    <TypeBadge type={o.type} showLabel={false} />
                    <span className="flex-1 truncate text-sm">
                      {o.body || o.title || o.color || 'Untitled'}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {format(o.createdAt, 'EEE')}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
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
