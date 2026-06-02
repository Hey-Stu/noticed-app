import type { Observation, ObservationType, SortOption } from './types'

export function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `obs_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

export type NewObservationInput = {
  type: ObservationType
  body: string
  title?: string
  url?: string
  imageData?: string
  color?: string
  source?: string
  tags?: string[]
}

export function makeObservation(input: NewObservationInput): Observation {
  const now = Date.now()
  return {
    id: createId(),
    type: input.type,
    body: input.body.trim(),
    title: input.title?.trim() || undefined,
    url: input.url?.trim() || undefined,
    imageData: input.imageData || undefined,
    color: input.color || undefined,
    source: input.source?.trim() || undefined,
    tags: normalizeTags(input.tags ?? []),
    createdAt: now,
    updatedAt: now,
  }
}

export function normalizeTags(tags: string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const raw of tags) {
    const t = raw.trim().toLowerCase().replace(/^#/, '')
    if (t && !seen.has(t)) {
      seen.add(t)
      out.push(t)
    }
  }
  return out
}

/** All distinct tags across observations, ranked by frequency. */
export function allTags(observations: Observation[]): string[] {
  const counts = new Map<string, number>()
  for (const o of observations) {
    for (const t of o.tags) {
      counts.set(t, (counts.get(t) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([t]) => t)
}

interface FilterOptions {
  query?: string
  types?: ObservationType[]
  tags?: string[]
  sort?: SortOption
}

export function filterObservations(
  observations: Observation[],
  { query = '', types = [], tags = [], sort = 'newest' }: FilterOptions,
): Observation[] {
  const q = query.trim().toLowerCase()
  let result = observations.filter((o) => {
    if (types.length && !types.includes(o.type)) return false
    if (tags.length && !tags.every((t) => o.tags.includes(t))) return false
    if (q) {
      const haystack = [o.body, o.title, o.source, o.url, ...o.tags]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  result = [...result].sort((a, b) => {
    if (sort === 'oldest') return a.createdAt - b.createdAt
    return b.createdAt - a.createdAt
  })

  return result
}

const OBSERVATION_TYPES: ObservationType[] = [
  'text',
  'image',
  'link',
  'color',
  'quote',
  'idea',
]

/**
 * Validate and normalize a single observation coming from an imported file.
 * Returns a clean Observation, or null if the record is unusable.
 */
export function sanitizeImportedObservation(raw: unknown): Observation | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  const type = o.type
  if (typeof type !== 'string' || !OBSERVATION_TYPES.includes(type as ObservationType)) {
    return null
  }

  const str = (v: unknown): string | undefined =>
    typeof v === 'string' && v.trim() ? v.trim() : undefined

  const body = typeof o.body === 'string' ? o.body : ''
  const tags = Array.isArray(o.tags)
    ? normalizeTags(o.tags.filter((t): t is string => typeof t === 'string'))
    : []

  const createdAt =
    typeof o.createdAt === 'number' && Number.isFinite(o.createdAt)
      ? o.createdAt
      : Date.now()
  const updatedAt =
    typeof o.updatedAt === 'number' && Number.isFinite(o.updatedAt)
      ? o.updatedAt
      : createdAt

  // A record must carry *some* meaningful content to be worth importing.
  const hasContent =
    body.trim() ||
    str(o.title) ||
    str(o.url) ||
    str(o.imageData) ||
    str(o.color)
  if (!hasContent) return null

  return {
    id: str(o.id) ?? createId(),
    type: type as ObservationType,
    body,
    title: str(o.title),
    url: str(o.url),
    imageData: typeof o.imageData === 'string' ? o.imageData : undefined,
    color: str(o.color),
    source: str(o.source),
    tags,
    createdAt,
    updatedAt,
  }
}

/** A short, human-readable preview string for any observation. */
export function previewText(o: Observation): string {
  if (o.body) return o.body
  if (o.type === 'color' && o.color) return o.color.toUpperCase()
  if (o.type === 'link') return o.title || o.url || 'Untitled link'
  if (o.type === 'image') return o.title || 'Image'
  return o.title || 'Untitled'
}
