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
  /** True for curated example notes seeded by the app (not user-created) */
  sample?: boolean
}

export interface NoticedSettings {
  onboardingDismissed: boolean
  /** Whether the curated sample data has been seeded already */
  samplesSeeded: boolean
  /** When true, samples were intentionally cleared and should not be re-seeded */
  samplesCleared: boolean
  /** Slider-controlled size of saved items in the library */
  libraryCardSize: number
  /** Slider-controlled spacing between saved items in the library */
  libraryCardPadding: number
}

export type SortOption = 'newest' | 'oldest'
