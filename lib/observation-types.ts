import {
  type LucideIcon,
  PenLine,
  Image as ImageIcon,
  Link2,
  Palette,
  Quote,
  Lightbulb,
} from 'lucide-react'
import type { ObservationType } from './types'

export interface TypeConfig {
  type: ObservationType
  label: string
  /** short verb-y prompt used in the composer */
  prompt: string
  icon: LucideIcon
  /** tailwind text color class bound to the CSS var accent */
  colorClass: string
  /** tailwind bg tint class */
  tintClass: string
}

export const OBSERVATION_TYPES: Record<ObservationType, TypeConfig> = {
  text: {
    type: 'text',
    label: 'Note',
    prompt: 'a passing thought',
    icon: PenLine,
    colorClass: 'text-[var(--type-text)]',
    tintClass: 'bg-[var(--type-text)]/10',
  },
  image: {
    type: 'image',
    label: 'Image',
    prompt: 'something you saw',
    icon: ImageIcon,
    colorClass: 'text-[var(--type-image)]',
    tintClass: 'bg-[var(--type-image)]/10',
  },
  link: {
    type: 'link',
    label: 'Link',
    prompt: 'a reference to keep',
    icon: Link2,
    colorClass: 'text-[var(--type-link)]',
    tintClass: 'bg-[var(--type-link)]/10',
  },
  color: {
    type: 'color',
    label: 'Color',
    prompt: 'a color that caught you',
    icon: Palette,
    colorClass: 'text-[var(--type-color)]',
    tintClass: 'bg-[var(--type-color)]/10',
  },
  quote: {
    type: 'quote',
    label: 'Quote',
    prompt: 'words worth keeping',
    icon: Quote,
    colorClass: 'text-[var(--type-quote)]',
    tintClass: 'bg-[var(--type-quote)]/10',
  },
  idea: {
    type: 'idea',
    label: 'Idea',
    prompt: 'a spark to chase later',
    icon: Lightbulb,
    colorClass: 'text-[var(--type-idea)]',
    tintClass: 'bg-[var(--type-idea)]/10',
  },
}

export const TYPE_ORDER: ObservationType[] = [
  'text',
  'image',
  'link',
  'color',
  'quote',
  'idea',
]

export function getTypeConfig(type: ObservationType): TypeConfig {
  return OBSERVATION_TYPES[type]
}
