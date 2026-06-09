import type { Observation } from './types'
import { OBSERVATION_TYPES } from './observation-types'
import {
  computeTopTags,
  computeTypeDistribution,
  type TagCount,
} from './patterns'

const DAY = 24 * 60 * 60 * 1000

export interface WeeklyReport {
  hasActivity: boolean
  count: number
  lastWeekCount: number
  rangeLabel: string
  topTags: TagCount[]
  dominantTypeLabel: string | null
  highlight: Observation | null
  /** natural-language paragraphs built from real data */
  paragraphs: string[]
  observations: Observation[]
}

function formatRange(start: number, end: number): string {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  const s = new Date(start).toLocaleDateString(undefined, opts)
  const e = new Date(end).toLocaleDateString(undefined, opts)
  return `${s} – ${e}`
}

function joinTags(tags: TagCount[], max = 3): string {
  const names = tags.slice(0, max).map((t) => `“${t.tag}”`)
  if (names.length === 0) return ''
  if (names.length === 1) return names[0]
  if (names.length === 2) return `${names[0]} and ${names[1]}`
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`
}

export function buildWeeklyReport(observations: Observation[]): WeeklyReport {
  const now = Date.now()
  const weekStart = now - 7 * DAY
  const prevStart = now - 14 * DAY

  const week = observations.filter((o) => o.createdAt >= weekStart)
  const prev = observations.filter(
    (o) => o.createdAt >= prevStart && o.createdAt < weekStart,
  )

  const count = week.length
  const lastWeekCount = prev.length
  const rangeLabel = formatRange(weekStart, now)
  const topTags = computeTopTags(week, 5)
  const types = computeTypeDistribution(week)
  const dominantType = types[0]
  const dominantTypeLabel = dominantType
    ? OBSERVATION_TYPES[dominantType.type].label
    : null

  const highlight = [...week].sort((a, b) => b.tags.length - a.tags.length)[0] ?? null

  const paragraphs: string[] = []

  if (count === 0) {
    return {
      hasActivity: false,
      count,
      lastWeekCount,
      rangeLabel,
      topTags,
      dominantTypeLabel,
      highlight: null,
      paragraphs: [],
      observations: week,
    }
  }

  // Opening line
  const noun = count === 1 ? 'observation' : 'observations'
  let opening = `This week you noticed ${count} ${noun}.`
  if (lastWeekCount > 0) {
    if (count > lastWeekCount) {
      opening += ` That's ${count - lastWeekCount} more than the week before — your attention has been wide open.`
    } else if (count < lastWeekCount) {
      opening += ` A quieter week than the last (${lastWeekCount}), and quiet weeks count too.`
    } else {
      opening += ` The same as last week — a steady, even rhythm.`
    }
  } else {
    opening += ` A fresh start to look back on.`
  }
  paragraphs.push(opening)

  // Themes line
  if (topTags.length > 0) {
    const lead = topTags[0]
    let themes = `You kept returning to ${joinTags(topTags)}.`
    if (lead.count > 1) {
      themes += ` ${capitalize(lead.tag)} alone showed up ${lead.count} times — clearly on your mind.`
    }
    paragraphs.push(themes)
  }

  // Type / form line
  if (dominantType && dominantTypeLabel) {
    const label = dominantTypeLabel.toLowerCase()
    const plural = dominantType.count === 1 ? label : `${label}s`
    paragraphs.push(
      `Most of what you kept took the form of ${dominantType.count} ${plural}. It says something about how you've been paying attention lately.`,
    )
  }

  // Closing reflection
  paragraphs.push(
    `Nothing here needs to become anything. It's enough that you noticed it.`,
  )

  return {
    hasActivity: true,
    count,
    lastWeekCount,
    rangeLabel,
    topTags,
    dominantTypeLabel,
    highlight,
    paragraphs,
    observations: week.sort((a, b) => b.createdAt - a.createdAt),
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
