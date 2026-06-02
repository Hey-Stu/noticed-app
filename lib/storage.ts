'use client'

/**
 * Tiny SSR-safe wrapper over localStorage with JSON serialization.
 * All access is guarded so it never throws during server render.
 */

const PREFIX = 'noticed:'

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch (err) {
    // Most likely a quota error (large base64 images).
    console.log('[v0] storage write failed:', (err as Error).message)
    throw err
  }
}

export function removeStorage(key: string): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(PREFIX + key)
  } catch {
    // ignore
  }
}

/** Approximate size of all Noticed data in bytes. */
export function approximateStorageSize(): number {
  if (typeof window === 'undefined') return 0
  let total = 0
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i)
      if (key && key.startsWith(PREFIX)) {
        const val = window.localStorage.getItem(key) ?? ''
        total += key.length + val.length
      }
    }
  } catch {
    return 0
  }
  // 2 bytes per char (UTF-16)
  return total * 2
}

export const STORAGE_KEYS = {
  observations: 'observations',
  settings: 'settings',
} as const
