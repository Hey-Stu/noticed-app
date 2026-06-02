import type { Observation } from './types'
import { createId } from './observations'

const DAY = 24 * 60 * 60 * 1000
const HOUR = 60 * 60 * 1000

/** Build a timestamp `daysAgo` days back, offset by `hour` of day. */
function at(daysAgo: number, hour = 10): number {
  const base = Date.now() - daysAgo * DAY
  const d = new Date(base)
  d.setHours(hour, Math.floor(Math.random() * 50), 0, 0)
  return d.getTime()
}

type Seed = Omit<Observation, 'id' | 'createdAt' | 'updatedAt'> & {
  daysAgo: number
  hour?: number
}

const SEEDS: Seed[] = [
  {
    type: 'quote',
    body: 'Attention is the rarest and purest form of generosity.',
    source: 'Simone Weil',
    tags: ['attention', 'writing'],
    favorite: true,
    daysAgo: 0,
    hour: 8,
  },
  {
    type: 'color',
    body: 'The exact orange of the streetlight before it fully warms up.',
    color: '#d98a4f',
    tags: ['light', 'color-study', 'evening'],
    daysAgo: 0,
    hour: 20,
  },
  {
    type: 'text',
    body: 'A stranger refolded a map the wrong way and seemed completely at peace with it. Felt like a small lesson in letting things be imperfect.',
    tags: ['people', 'attention'],
    daysAgo: 1,
    hour: 13,
  },
  {
    type: 'idea',
    title: 'Tiny "noticing" widget',
    body: 'A one-tap capture that only asks a single question and never shows you a feed. The reward is the noticing, not the scrolling.',
    tags: ['product', 'design', 'attention'],
    favorite: true,
    daysAgo: 1,
    hour: 22,
  },
  {
    type: 'link',
    title: 'On the importance of slow looking',
    url: 'https://example.com/slow-looking',
    body: 'An essay about spending ten uninterrupted minutes with a single image.',
    tags: ['reading', 'attention'],
    daysAgo: 2,
    hour: 9,
  },
  {
    type: 'color',
    body: 'Faded ledger green on an old shopfront sign. Want this in a UI someday.',
    color: '#6f8f6a',
    tags: ['color-study', 'typography', 'signage'],
    daysAgo: 2,
    hour: 16,
  },
  {
    type: 'image',
    title: 'Morning shadow on the kitchen wall',
    url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=70',
    body: 'The blinds cut the light into a staircase. Kept looking back at it.',
    tags: ['light', 'home', 'composition'],
    daysAgo: 3,
    hour: 7,
  },
  {
    type: 'text',
    body: 'Overheard: "I am not lost, I am just early to somewhere I have not decided yet."',
    source: 'cafe near the station',
    tags: ['people', 'overheard'],
    daysAgo: 3,
    hour: 11,
  },
  {
    type: 'quote',
    body: 'The details are not the details. They make the design.',
    source: 'Charles Eames',
    tags: ['design', 'craft'],
    daysAgo: 4,
    hour: 15,
  },
  {
    type: 'idea',
    title: 'Weekly "what did I keep noticing" review',
    body: 'A gentle Sunday summary that surfaces the themes I returned to, without scoring or streak-shaming.',
    tags: ['product', 'design', 'reflection'],
    daysAgo: 5,
    hour: 19,
  },
  {
    type: 'link',
    title: 'A field guide to everyday textures',
    url: 'https://example.com/textures',
    body: 'Photos of concrete, linen, oxidized copper. Good reference dump.',
    tags: ['reference', 'texture', 'craft'],
    daysAgo: 6,
    hour: 10,
  },
  {
    type: 'color',
    body: 'Dried-clay terracotta from a planter in the courtyard.',
    color: '#b5613e',
    tags: ['color-study', 'craft'],
    favorite: true,
    daysAgo: 8,
    hour: 12,
  },
  {
    type: 'text',
    body: 'Noticed I take more notes when it rains. The slower pace makes more room for looking.',
    tags: ['reflection', 'weather'],
    daysAgo: 10,
    hour: 17,
  },
]

export function buildSampleObservations(): Observation[] {
  const now = Date.now()
  return SEEDS.map((seed) => {
    const { daysAgo, hour, ...rest } = seed
    const ts = at(daysAgo, hour)
    return {
      ...rest,
      id: createId(),
      createdAt: ts,
      updatedAt: Math.min(ts + HOUR, now),
    } satisfies Observation
  }).sort((a, b) => b.createdAt - a.createdAt)
}
