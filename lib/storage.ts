'use client'

/**
 * SSR-safe async key-value layer backed by IndexedDB, with JSON-friendly
 * values. IndexedDB has a far larger quota than localStorage (~5MB), which
 * matters because uploaded images are stored inline as base64 strings.
 *
 * The public API mirrors the previous localStorage wrapper but is async.
 */

const DB_NAME = 'noticed-db'
const DB_VERSION = 1
const STORE_NAME = 'kv'

export const STORAGE_KEYS = {
  observations: 'observations',
  settings: 'settings',
} as const

// Legacy localStorage keys, used for a one-time migration into IndexedDB.
const LEGACY_PREFIX = 'noticed:'

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof indexedDB !== 'undefined'
}

let dbPromise: Promise<IDBDatabase> | null = null

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

  return dbPromise
}

function idbRequest<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest,
): Promise<T> {
  return openDB().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, mode)
        const store = tx.objectStore(STORE_NAME)
        const request = run(store)
        request.onsuccess = () => resolve(request.result as T)
        request.onerror = () => reject(request.error)
      }),
  )
}

/**
 * Copy any legacy localStorage values into IndexedDB exactly once, then clear
 * them. Keeps existing users' data when upgrading from the old storage layer.
 */
let migrationPromise: Promise<void> | null = null

function migrateFromLocalStorage(): Promise<void> {
  if (migrationPromise) return migrationPromise

  migrationPromise = (async () => {
    if (!isBrowser() || typeof localStorage === 'undefined') return

    for (const key of Object.values(STORAGE_KEYS)) {
      const legacyKey = LEGACY_PREFIX + key
      const raw = localStorage.getItem(legacyKey)
      if (raw == null) continue

      // Only migrate if IndexedDB doesn't already hold this key.
      const existing = await idbRequest<unknown>('readonly', (store) =>
        store.get(key),
      )
      if (existing === undefined) {
        try {
          await idbRequest('readwrite', (store) =>
            store.put(JSON.parse(raw), key),
          )
        } catch {
          // Ignore malformed legacy data.
        }
      }
      localStorage.removeItem(legacyKey)
    }
  })()

  return migrationPromise
}

export async function readStorage<T>(key: string, fallback: T): Promise<T> {
  if (!isBrowser()) return fallback
  try {
    await migrateFromLocalStorage()
    const value = await idbRequest<T | undefined>('readonly', (store) =>
      store.get(key),
    )
    return value === undefined ? fallback : value
  } catch (err) {
    console.log('[noticed] storage read failed:', (err as Error).message)
    return fallback
  }
}

export async function writeStorage<T>(key: string, value: T): Promise<void> {
  if (!isBrowser()) return
  try {
    await idbRequest('readwrite', (store) => store.put(value, key))
  } catch (err) {
    console.log('[noticed] storage write failed:', (err as Error).message)
    throw err
  }
}

export async function removeStorage(key: string): Promise<void> {
  if (!isBrowser()) return
  try {
    await idbRequest('readwrite', (store) => store.delete(key))
  } catch {
    // ignore
  }
}

/** Approximate size of all Noticed data in bytes (serialized value length). */
export async function approximateStorageSize(): Promise<number> {
  if (!isBrowser()) return 0
  try {
    const values = await Promise.all(
      Object.values(STORAGE_KEYS).map((key) =>
        idbRequest<unknown>('readonly', (store) => store.get(key)),
      ),
    )
    return values.reduce<number>((total, value) => {
      if (value === undefined) return total
      return total + new Blob([JSON.stringify(value)]).size
    }, 0)
  } catch {
    return 0
  }
}
