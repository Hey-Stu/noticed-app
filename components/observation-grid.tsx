'use client'

import type { Observation } from '@/lib/types'
import { ObservationCard } from '@/components/observation-card'

export function ObservationGrid({
  observations,
  onOpen,
  onToggleFavorite,
}: {
  observations: Observation[]
  onOpen: (o: Observation) => void
  onToggleFavorite: (id: string) => void
}) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {observations.map((o) => (
        <ObservationCard
          key={o.id}
          observation={o}
          onOpen={onOpen}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
