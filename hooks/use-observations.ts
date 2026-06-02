'use client'

import { useEffect, useSyncExternalStore } from 'react'
import {
  subscribe,
  getSnapshot,
  hydrate,
  addObservation,
  updateObservation,
  deleteObservation,
  updateSettings,
  reloadSamples,
  clearAll,
} from '@/lib/store'

const SERVER_SNAPSHOT = {
  observations: [],
  settings: {
    onboardingDismissed: false,
    samplesSeeded: false,
    samplesCleared: false,
  },
  hydrated: false,
} as const

export function useObservations() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => SERVER_SNAPSHOT,
  )

  useEffect(() => {
    hydrate()
  }, [])

  return {
    observations: snapshot.observations,
    settings: snapshot.settings,
    hydrated: snapshot.hydrated,
    addObservation,
    updateObservation,
    deleteObservation,
    updateSettings,
    reloadSamples,
    clearAll,
  }
}
