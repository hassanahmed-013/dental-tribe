import { doc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { db } from './firebaseConfig'
import {
  DEFAULT_BEFORE_AFTER,
  DEFAULT_CLINIC,
  DEFAULT_DENTAL_PROBLEMS,
  DEFAULT_HOME,
  DEFAULT_REVIEWS,
  SITE_CONTENT_COLLECTION,
  SITE_CONTENT_DOC_IDS,
} from '../data/siteContentDefaults'

export async function seedSiteContent() {
  const batch = writeBatch(db)
  const timestamp = serverTimestamp()

  const payloads = {
    [SITE_CONTENT_DOC_IDS.clinic]: { ...DEFAULT_CLINIC, updatedAt: timestamp },
    [SITE_CONTENT_DOC_IDS.home]: { ...DEFAULT_HOME, updatedAt: timestamp },
    [SITE_CONTENT_DOC_IDS.dentalProblems]: { items: DEFAULT_DENTAL_PROBLEMS, updatedAt: timestamp },
    [SITE_CONTENT_DOC_IDS.beforeAfter]: { items: DEFAULT_BEFORE_AFTER, updatedAt: timestamp },
    [SITE_CONTENT_DOC_IDS.reviews]: { items: DEFAULT_REVIEWS, updatedAt: timestamp },
  }

  Object.entries(payloads).forEach(([docId, data]) => {
    batch.set(doc(db, SITE_CONTENT_COLLECTION, docId), data, { merge: true })
  })

  await batch.commit()

  return {
    clinic: 1,
    home: 1,
    dentalProblems: DEFAULT_DENTAL_PROBLEMS.length,
    beforeAfter: DEFAULT_BEFORE_AFTER.length,
    reviews: DEFAULT_REVIEWS.length,
  }
}
