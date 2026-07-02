import {
  collection,
  doc,
  writeBatch,
  serverTimestamp,
  getDocs,
  query,
  limit,
} from 'firebase/firestore'
import { db } from './firebaseConfig'
import { SERVICES_COLLECTION } from './servicesRepository'
import { DEFAULT_SERVICES } from '../data/defaultServices'

function buildServicePayload(service, index, { isNew }) {
  const payload = {
    ...service,
    order: service.order ?? index + 1,
    active: service.active ?? true,
    updatedAt: serverTimestamp(),
  }

  if (isNew) {
    payload.createdAt = serverTimestamp()
  }

  return payload
}

/**
 * Import all 18 flyer treatments in one batch.
 * - Empty collection: writes immediately (no full scan).
 * - Existing data: upserts by slug.
 */
export async function importFlyerTreatments() {
  const peek = await getDocs(query(collection(db, SERVICES_COLLECTION), limit(1)))

  if (peek.empty) {
    const batch = writeBatch(db)
    DEFAULT_SERVICES.forEach((service, index) => {
      batch.set(doc(collection(db, SERVICES_COLLECTION)), buildServicePayload(service, index, { isNew: true }))
    })
    await batch.commit()
    return { count: DEFAULT_SERVICES.length }
  }

  const existing = await getDocs(collection(db, SERVICES_COLLECTION))
  const bySlug = new Map()

  existing.docs.forEach((snapshot) => {
    const slug = snapshot.data().slug
    if (slug) bySlug.set(slug, snapshot.id)
  })

  const batch = writeBatch(db)

  DEFAULT_SERVICES.forEach((service, index) => {
    const existingId = bySlug.get(service.slug)
    const payload = buildServicePayload(service, index, { isNew: !existingId })

    if (existingId) {
      batch.update(doc(db, SERVICES_COLLECTION, existingId), payload)
    } else {
      batch.set(doc(collection(db, SERVICES_COLLECTION)), payload)
    }
  })

  await batch.commit()
  return { count: DEFAULT_SERVICES.length }
}

// Backwards-compatible alias
export const syncDefaultServices = importFlyerTreatments
