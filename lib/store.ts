'use client'

import type { NoticedSettings, Observation } from './types'
import {
  readStorage,
  writeStorage,
  STORAGE_KEYS,
} from './storage'
import { makeObservation, type NewObservationInput } from './observations'
import { buildSampleObservations } from './sample-data'

const DEFAULT_SETTINGS: NoticedSettings = {
  onboardingDismissed: false,
  samplesSeeded: false,
  samplesCleared: false,
}

interface StoreState {
  observations: Observation[]
  settings: NoticedSettings
  hydrated: boolean
}

let state: StoreState = {
  observations: [],
  settings: DEFAULT_SETTINGS,
  hydrated: false,
}

const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

function setState(partial: Partial<StoreState>) {
  state = { ...state, ...partial }
  emit()
}

function persistObservations(observations: Observation[]) {
  // Fire-and-forget: in-memory state is the synchronous source of truth,
  // while IndexedDB writes settle in the background.
  void writeStorage(STORAGE_KEYS.observations, observations).catch((err) => {
    console.log('[v0] persist observations failed:', (err as Error).message)
  })
}

function persistSettings(settings: NoticedSettings) {
  void writeStorage(STORAGE_KEYS.settings, settings).catch((err) => {
    console.log('[v0] persist settings failed:', (err as Error).message)
  })
}

let hydrating: Promise<void> | null = null

/** Load persisted data; seed samples on first ever run. */
export function hydrate(): Promise<void> {
  if (state.hydrated) return Promise.resolve()
  if (hydrating) return hydrating

  hydrating = (async () => {
    const settings = await readStorage<NoticedSettings>(
      STORAGE_KEYS.settings,
      DEFAULT_SETTINGS,
    )
    let observations = await readStorage<Observation[]>(
      STORAGE_KEYS.observations,
      [],
    )

    // Seed the curated examples whenever the library is empty and the user
    // hasn't *explicitly* cleared everything via Settings. This auto-heals any
    // stuck "empty + already-seeded" states instead of leaving a blank Library.
    let nextSettings = settings
    if (!settings.samplesCleared && observations.length === 0) {
      observations = buildSampleObservations()
      persistObservations(observations)
      nextSettings = { ...settings, samplesSeeded: true }
      persistSettings(nextSettings)
    }

    setState({ observations, settings: nextSettings, hydrated: true })
  })()

  return hydrating
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getSnapshot(): StoreState {
  return state
}

// ---- Mutations -------------------------------------------------------------

export function addObservation(input: NewObservationInput): Observation {
  const obs = makeObservation(input)
  const next = [obs, ...state.observations]
  persistObservations(next)
  setState({ observations: next })
  return obs
}

export function updateObservation(
  id: string,
  patch: Partial<Observation>,
): void {
  const next = state.observations.map((o) =>
    o.id === id ? { ...o, ...patch, updatedAt: Date.now() } : o,
  )
  persistObservations(next)
  setState({ observations: next })
}

export function deleteObservation(id: string): void {
  const next = state.observations.filter((o) => o.id !== id)
  persistObservations(next)
  setState({ observations: next })
}

export function updateSettings(patch: Partial<NoticedSettings>): void {
  const next = { ...state.settings, ...patch }
  persistSettings(next)
  setState({ settings: next })
}

/** Re-seed the curated sample notes (keeps any user notes). */
export function reloadSamples(): void {
  const samples = buildSampleObservations()
  const next = [...samples, ...state.observations]
  persistObservations(next)
  const settings = { ...state.settings, samplesSeeded: true, samplesCleared: false }
  persistSettings(settings)
  setState({ observations: next, settings })
}

/** Wipe everything and mark samples as intentionally cleared. */
export function clearAll(): void {
  const settings = {
    ...state.settings,
    samplesSeeded: true,
    samplesCleared: true,
  }
  persistObservations([])
  persistSettings(settings)
  setState({ observations: [], settings })
}
