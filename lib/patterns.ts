import type { Observation, ObservationType } from './types'

const DAY = 24 * 60 * 60 * 1000

export interface TagCount {
  tag: string
  count: number
}

export interface TypeCount {
  type: ObservationType
  count: number
}

export interface TagPair {
  a: string
  b: string
  count: number
}

export interface ColorSwatch {
  color: string
  count: number
  /** ids of observations that contributed this swatch */
  ids: string[]
}

export interface RelatedGroup {
  tag: string
  observations: Observation[]
}

export interface CadenceInsight {
  thisWeek: number
  lastWeek: number
  delta: number
  streakDays: number
  busiestDay: string | null
  busiestPartOfDay: string | null
}

export interface PatternInsights {
  total: number
  topTags: TagCount[]
  typeDistribution: TypeCount[]
  tagPairs: TagPair[]
  colors: ColorSwatch[]
  cadence: CadenceInsight
  related: RelatedGroup[]
}

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

function startOfDay(ts: number): number {
  const d = new Date(ts)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function partOfDay(hour: number): string {
  if (hour < 6) return 'late night'
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  if (hour < 21) return 'evening'
  return 'night'
}

export function computeTopTags(observations: Observation[], limit = 12): TagCount[] {
  const counts = new Map<string, number>()
  for (const o of observations) {
    for (const t of o.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
    .slice(0, limit)
}

export function computeTypeDistribution(observations: Observation[]): TypeCount[] {
  const counts = new Map<ObservationType, number>()
  for (const o of observations) counts.set(o.type, (counts.get(o.type) ?? 0) + 1)
  return [...counts.entries()]
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
}

export function computeTagPairs(observations: Observation[], limit = 6): TagPair[] {
  const counts = new Map<string, number>()
  for (const o of observations) {
    const tags = [...o.tags].sort()
    for (let i = 0; i < tags.length; i++) {
      for (let j = i + 1; j < tags.length; j++) {
        const key = `${tags[i]}\u0000${tags[j]}`
        counts.set(key, (counts.get(key) ?? 0) + 1)
      }
    }
  }
  return [...counts.entries()]
    .map(([key, count]) => {
      const [a, b] = key.split('\u0000')
      return { a, b, count }
    })
    .filter((p) => p.count > 1)
    .sort((x, y) => y.count - x.count)
    .slice(0, limit)
}

export function computeColors(observations: Observation[]): ColorSwatch[] {
  const map = new Map<string, ColorSwatch>()
  for (const o of observations) {
    if (o.type === 'color' && o.color) {
      const key = o.color.toLowerCase()
      const existing = map.get(key)
      if (existing) {
        existing.count += 1
        existing.ids.push(o.id)
      } else {
        map.set(key, { color: o.color, count: 1, ids: [o.id] })
      }
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count)
}

export function computeCadence(observations: Observation[]): CadenceInsight {
  const now = Date.now()
  const weekAgo = now - 7 * DAY
  const twoWeeksAgo = now - 14 * DAY

  let thisWeek = 0
  let lastWeek = 0
  const dayCounts = new Array(7).fill(0)
  const partCounts = new Map<string, number>()
  const activeDays = new Set<number>()

  for (const o of observations) {
    if (o.createdAt >= weekAgo) thisWeek++
    else if (o.createdAt >= twoWeeksAgo) lastWeek++

    const d = new Date(o.createdAt)
    dayCounts[d.getDay()]++
    const part = partOfDay(d.getHours())
    partCounts.set(part, (partCounts.get(part) ?? 0) + 1)
    activeDays.add(startOfDay(o.createdAt))
  }

  // current streak: consecutive days (ending today or yesterday) with an entry
  let streakDays = 0
  let cursor = startOfDay(now)
  // allow streak to count if today has no entry yet but yesterday does
  if (!activeDays.has(cursor)) cursor -= DAY
  while (activeDays.has(cursor)) {
    streakDays++
    cursor -= DAY
  }

  let busiestDay: string | null = null
  let maxDay = 0
  dayCounts.forEach((c, i) => {
    if (c > maxDay) {
      maxDay = c
      busiestDay = DAY_NAMES[i]
    }
  })

  let busiestPartOfDay: string | null = null
  let maxPart = 0
  for (const [part, c] of partCounts) {
    if (c > maxPart) {
      maxPart = c
      busiestPartOfDay = part
    }
  }

  return {
    thisWeek,
    lastWeek,
    delta: thisWeek - lastWeek,
    streakDays,
    busiestDay,
    busiestPartOfDay,
  }
}

export function computeRelated(
  observations: Observation[],
  limit = 3,
): RelatedGroup[] {
  const top = computeTopTags(observations, limit)
  return top
    .map(({ tag }) => ({
      tag,
      observations: observations
        .filter((o) => o.tags.includes(tag))
        .sort((a, b) => b.createdAt - a.createdAt),
    }))
    .filter((g) => g.observations.length > 1)
}

export function computeInsights(observations: Observation[]): PatternInsights {
  return {
    total: observations.length,
    topTags: computeTopTags(observations),
    typeDistribution: computeTypeDistribution(observations),
    tagPairs: computeTagPairs(observations),
    colors: computeColors(observations),
    cadence: computeCadence(observations),
    related: computeRelated(observations),
  }
}
