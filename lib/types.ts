export type ObservationType =
  | 'text'
  | 'image'
  | 'link'
  | 'color'
  | 'quote'
  | 'idea'

export interface Observation {
  id: string
  type: ObservationType
  /** Main content: the note, the quote, the idea, an image caption, a link description */
  body: string
  /** Optional title — used for links, or a short heading for ideas */
  title?: string
  /** URL for link type, or remote image URL for image type */
  url?: string
  /** base64 data URL for uploaded images */
  imageData?: string
  /** hex color for color type, e.g. "#c98a5e" */
  color?: string
  /** attribution for quotes, or where/how it was noticed */
  source?: string
  tags: string[]
  createdAt: number
  updatedAt: number
}

export interface NoticedSettings {
  onboardingDismissed: boolean
  /** Whether the curated sample data has been seeded already */
  samplesSeeded: boolean
  /** When true, samples were intentionally cleared and should not be re-seeded */
  samplesCleared: boolean
}

export type SortOption = 'newest' | 'oldest'
