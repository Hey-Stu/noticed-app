'use client'

import type { Observation } from '@/lib/types'
import { ObservationCard } from '@/components/observation-card'

export function ObservationGrid({
  observations,
  onOpen,
}: {
  observations: Observation[]
  onOpen: (o: Observation) => void
}) {
  return (
    <div className="columns-1 gap-5 md:columns-2 xl:columns-3 2xl:columns-4">
      {observations.map((o) => (
        <ObservationCard
          key={o.id}
          observation={o}
          onOpen={onOpen}
        />
      ))}
    </div>
  )
}
