'use client'

import { formatDistanceToNow } from 'date-fns'
import { Quote as QuoteIcon, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Observation } from '@/lib/types'
import { getTypeConfig } from '@/lib/observation-types'
import { TypeBadge } from '@/components/type-badge'

function hostOf(url?: string): string | null {
  if (!url) return null
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

export function ObservationCard({
  observation,
  onOpen,
}: {
  observation: Observation
  onOpen: (o: Observation) => void
}) {
  const config = getTypeConfig(observation.type)
  const time = formatDistanceToNow(observation.createdAt, { addSuffix: true })
  const imgSrc = observation.imageData || observation.url
  const isImageCard = observation.type === 'image' && imgSrc
  const summary =
    observation.body || observation.title || observation.source || observation.type

  return (
    <article
      className={cn(
        'group relative mb-5 flex break-inside-avoid flex-col overflow-hidden rounded-[1.75rem] text-left transition-all duration-300 hover:-translate-y-1',
        isImageCard
          ? 'bg-card shadow-paper hover:shadow-paper-lg'
          : 'bg-card/82 ring-1 ring-border/70 shadow-paper hover:shadow-paper-lg',
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(observation)}
        className="flex flex-1 flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        aria-label={`Open observation: ${observation.body || observation.title || observation.type}`}
      >
        {/* color block */}
        {observation.type === 'color' && observation.color ? (
          <div
            className="flex h-28 items-end p-3"
            style={{ backgroundColor: observation.color }}
          >
            <span className="rounded-md bg-background/85 px-2 py-0.5 font-mono text-xs font-medium uppercase text-foreground backdrop-blur">
              {observation.color}
            </span>
          </div>
        ) : null}

        {/* image */}
        {observation.type === 'image' && imgSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc || '/placeholder.svg'}
            alt={observation.title || observation.body || 'A saved image'}
            className="max-h-[34rem] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            crossOrigin="anonymous"
          />
        ) : null}

        {isImageCard ? (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <TypeBadge
                  type={observation.type}
                  className="bg-white/14 text-white backdrop-blur"
                />
                {observation.title ? (
                  <h3 className="max-w-[18rem] font-serif text-2xl font-semibold leading-none text-balance">
                    {observation.title}
                  </h3>
                ) : null}
                <p className="max-w-[18rem] text-sm leading-relaxed text-white/82">
                  {summary}
                </p>
              </div>
              <time className="shrink-0 pt-1 text-[11px] uppercase tracking-[0.16em] text-white/72">
                {time}
              </time>
            </div>
          </div>
        ) : null}

        <div className={cn('flex flex-1 flex-col gap-3 p-5', isImageCard && 'sr-only')}>
          <div className="flex items-center justify-between gap-3">
            <TypeBadge type={observation.type} />
            <time className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {time}
            </time>
          </div>

          {/* quote */}
          {observation.type === 'quote' ? (
            <blockquote className="relative space-y-2 pl-1">
              <QuoteIcon
                className={cn('mb-1 size-4 opacity-50', config.colorClass)}
              />
              <p className="font-serif text-[1.7rem] leading-[1.05] text-pretty">
                {observation.body}
              </p>
              {observation.source ? (
                <footer className="text-sm uppercase tracking-[0.14em] text-muted-foreground">
                  — {observation.source}
                </footer>
              ) : null}
            </blockquote>
          ) : null}

          {/* idea / text / image / link / color body */}
          {observation.type !== 'quote' ? (
            <>
              {observation.title ? (
                <h3 className="font-serif text-2xl font-semibold leading-tight text-pretty">
                  {observation.title}
                </h3>
              ) : null}
              {observation.body ? (
                <p
                  className={cn(
                    'text-sm leading-relaxed text-pretty md:text-[15px]',
                    observation.title
                      ? 'text-muted-foreground'
                      : 'text-foreground',
                  )}
                >
                  {observation.body}
                </p>
              ) : null}
              {observation.type === 'link' && observation.url ? (
                <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--type-link)]">
                  <ExternalLink className="size-3" />
                  {hostOf(observation.url)}
                </span>
              ) : null}
            </>
          ) : null}

          {observation.tags.length ? (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {observation.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary/80 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </button>


    </article>
  )
}
