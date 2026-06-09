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
  clearSamples,
  clearAll,
  exportData,
  importData,
} from '@/lib/store'

const SERVER_SNAPSHOT: ReturnType<typeof getSnapshot> = {
  observations: [],
  settings: {
    onboardingDismissed: false,
    samplesSeeded: false,
    samplesCleared: false,
    libraryCardSize: 50,
    libraryCardPadding: 50,
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
    void hydrate()
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
    clearSamples,
    clearAll,
    exportData,
    importData,
  }
}
