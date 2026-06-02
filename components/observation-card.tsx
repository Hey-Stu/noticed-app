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

  return (
    <article
      className="group relative mb-4 flex break-inside-avoid flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-paper transition-all hover:-translate-y-0.5 hover:shadow-paper-lg"
    >
      <button
        type="button"
        onClick={() => onOpen(observation)}
        className="flex flex-1 flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Open observation: ${observation.body || observation.title || observation.type}`}
      >
        {/* color block */}
        {observation.type === 'color' && observation.color ? (
          <div
            className="relative flex h-28 items-end p-3"
            style={{ backgroundColor: observation.color }}
          >
            <TypeBadge
              type={observation.type}
              className="absolute left-3 top-3 shadow-sm backdrop-blur"
            />
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
            className="max-h-72 w-full object-cover"
            crossOrigin="anonymous"
          />
        ) : null}

        <div className="flex flex-1 flex-col gap-2 p-4">
          <div
            className={cn(
              'flex items-center gap-2',
              observation.type === 'color' ? 'justify-end' : 'justify-between',
            )}
          >
            {observation.type !== 'color' ? (
              <TypeBadge type={observation.type} />
            ) : null}
            <time className="text-xs text-muted-foreground">{time}</time>
          </div>

          {/* quote */}
          {observation.type === 'quote' ? (
            <blockquote className="relative pl-1">
              <QuoteIcon
                className={cn('mb-1 size-4 opacity-50', config.colorClass)}
              />
              <p className="font-serif text-lg leading-snug text-pretty">
                {observation.body}
              </p>
              {observation.source ? (
                <footer className="mt-2 text-sm text-muted-foreground">
                  — {observation.source}
                </footer>
              ) : null}
            </blockquote>
          ) : null}

          {/* idea / text / image / link / color body */}
          {observation.type !== 'quote' ? (
            <>
              {observation.title ? (
                <h3 className="font-serif text-base font-semibold leading-snug text-pretty">
                  {observation.title}
                </h3>
              ) : null}
              {observation.body ? (
                <p
                  className={cn(
                    'text-sm leading-relaxed text-pretty',
                    observation.title
                      ? 'text-muted-foreground'
                      : 'text-foreground',
                  )}
                >
                  {observation.body}
                </p>
              ) : null}
              {observation.type === 'link' && observation.url ? (
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[var(--type-link)]">
                  <ExternalLink className="size-3" />
                  {hostOf(observation.url)}
                </span>
              ) : null}
            </>
          ) : null}

          {observation.tags.length ? (
            <div className="mt-auto flex flex-wrap gap-1 pt-1">
              {observation.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary/70 px-2 py-0.5 text-xs text-muted-foreground"
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
