'use client'

import type { Observation } from '@/lib/types'
import { ObservationCard } from '@/components/observation-card'

export function ObservationGrid({
  observations,
  onOpen,
  cardSize,
  cardSpacing,
}: {
  observations: Observation[]
  onOpen: (o: Observation) => void
  cardSize: number
  cardSpacing: number
}) {
  const columnWidth = 220 + cardSize * 1.8
  const cardGap = 8 + cardSpacing * 0.24

  return (
    <div
      className="w-full"
      style={{
        columnWidth: `${columnWidth}px`,
        columnGap: `${cardGap}px`,
      }}
    >
      {observations.map((o) => (
        <ObservationCard
          key={o.id}
          observation={o}
          onOpen={onOpen}
          cardGap={cardGap}
        />
      ))}
    </div>
  )
}
