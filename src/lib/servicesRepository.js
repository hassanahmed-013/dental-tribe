import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getDocsFromCache,
  getDocsFromServer,
  onSnapshot,
} from 'firebase/firestore'
import { db } from './firebaseConfig'

/**
 * IMPORTANT: Admin writes and the public grid both use this exact path.
 * The UI label is "Treatments" but the Firestore collection is `services`.
 */
export const SERVICES_COLLECTION = 'services'
export const SERVICES_PAGE_SIZE = 10

const FETCH_TIMEOUT_MS = 20000

function mapDoc(docSnap) {
  return { id: docSnap.id, ...docSnap.data() }
}

export function sortServices(list) {
  return [...list].sort((a, b) => {
    const orderA = Number.isFinite(Number(a.order)) ? Number(a.order) : 9999
    const orderB = Number.isFinite(Number(b.order)) ? Number(b.order) : 9999
    if (orderA !== orderB) return orderA - orderB
    return (a.name || '').localeCompare(b.name || '')
  })
}

export function filterServices(list, { includeInactive = false } = {}) {
  if (includeInactive) return list
  // Treat missing `active` as visible; only explicit false hides a treatment.
  return list.filter((service) => service.active !== false && service.active !== 'false')
}

function servicesCollection() {
  return collection(db, SERVICES_COLLECTION)
}

function servicesBaseQuery() {
  return servicesCollection()
}

function servicesOrderedQuery() {
  return query(servicesCollection(), orderBy('order', 'asc'))
}

function servicesPageQuery(pageSize, cursor) {
  const base = servicesCollection()
  if (cursor) {
    return query(base, orderBy('order', 'asc'), startAfter(cursor), limit(pageSize))
  }
  return query(base, orderBy('order', 'asc'), limit(pageSize))
}

function withTimeout(promise, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(
        () => reject(new Error(`${label} timed out after ${FETCH_TIMEOUT_MS / 1000}s`)),
        FETCH_TIMEOUT_MS
      )
    }),
  ])
}

function mapSnapshot(snapshot) {
  return sortServices(snapshot.docs.map(mapDoc))
}

function logFetch(source, count) {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info(`[services] ${count} document(s) from ${source}`)
  }
}

/** Instant paint from IndexedDB — returns null when cache is cold. */
export async function fetchServicesFromCache() {
  try {
    const snapshot = await getDocsFromCache(servicesBaseQuery())
    const data = mapSnapshot(snapshot)
    if (data.length) logFetch('cache', data.length)
    return data.length ? data : null
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Firestore cache read:', err.message)
    return null
  }
}

/**
 * Always hits the server first so a stale empty IndexedDB cache cannot
 * block the public grid after admin imports treatments.
 */
export async function fetchAllServices() {
  const col = servicesBaseQuery()

  try {
    const snapshot = await withTimeout(getDocsFromServer(col), 'fetchAllServices (server)')
    const data = mapSnapshot(snapshot)
    logFetch('server', data.length)
    return data
  } catch (serverErr) {
    // eslint-disable-next-line no-console
    console.error('Firestore Error (server):', serverErr.message, serverErr)

    if (serverErr.code === 'permission-denied') {
      throw new Error(
        'Permission denied reading treatments. Deploy firestore.rules with `allow read: if true` for the services collection.'
      )
    }

    try {
      const snapshot = await withTimeout(getDocs(col), 'fetchAllServices (cache/network)')
      const data = mapSnapshot(snapshot)
      logFetch('cache/network', data.length)
      return data
    } catch (cacheErr) {
      // eslint-disable-next-line no-console
      console.error('Firestore Error (fallback):', cacheErr.message, cacheErr)
      throw cacheErr
    }
  }
}

export async function fetchServicesPage({ pageSize = SERVICES_PAGE_SIZE, cursor = null } = {}) {
  try {
    const snapshot = await getDocs(servicesPageQuery(pageSize, cursor))
    const docs = snapshot.docs
    return {
      items: docs.map(mapDoc),
      cursor: docs.length ? docs[docs.length - 1] : null,
      hasMore: docs.length === pageSize,
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Firestore Error (admin page):', err.message, err)
    const snapshot = await getDocs(query(servicesCollection(), limit(pageSize)))
    const docs = snapshot.docs
    return {
      items: docs.map(mapDoc),
      cursor: docs.length ? docs[docs.length - 1] : null,
      hasMore: docs.length === pageSize,
    }
  }
}

const listeners = new Set()
let servicesUnsubscribe = null

function dispatchSuccess(snapshot) {
  const data = mapSnapshot(snapshot)
  const meta = {
    fromCache: snapshot.metadata.fromCache,
    hasPendingWrites: snapshot.metadata.hasPendingWrites,
  }
  listeners.forEach((listener) => listener.onData(data, meta))
}

function dispatchError(error) {
  // eslint-disable-next-line no-console
  console.error('Firestore Error (onSnapshot):', error.message, error)
  listeners.forEach((listener) => listener.onError?.(error))
}

function attachListener() {
  if (servicesUnsubscribe) {
    servicesUnsubscribe()
    servicesUnsubscribe = null
  }

  servicesUnsubscribe = onSnapshot(
    servicesBaseQuery(),
    { includeMetadataChanges: true },
    (snapshot) => {
      // Ignore stale empty cache — admin may have just imported on another tab.
      if (snapshot.metadata.fromCache && snapshot.empty) return
      dispatchSuccess(snapshot)
    },
    (error) => {
      if (error.code === 'permission-denied') {
        dispatchError(
          new Error(
            'Permission denied reading treatments. Deploy firestore.rules so services allow public read.'
          )
        )
        return
      }
      dispatchError(error)
    }
  )
}

function ensureServicesListener() {
  if (!servicesUnsubscribe) attachListener()
}

function teardownServicesListenerIfIdle() {
  if (listeners.size === 0 && servicesUnsubscribe) {
    servicesUnsubscribe()
    servicesUnsubscribe = null
  }
}

/** Shared realtime listener — keeps admin and public site in sync. */
export function subscribeAllServices(onData, onError) {
  const entry = { onData, onError }
  listeners.add(entry)
  ensureServicesListener()

  return () => {
    listeners.delete(entry)
    teardownServicesListenerIfIdle()
  }
}

export function getServicesCollectionPath() {
  return SERVICES_COLLECTION
}
