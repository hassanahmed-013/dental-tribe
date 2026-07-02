import { collection, doc, getDoc, getDocs, getDocsFromServer } from 'firebase/firestore'
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
import { resolveImage } from './imageAssets'

function deepMerge(base, patch) {
  if (!patch || typeof patch !== 'object') return base
  const out = Array.isArray(base) ? [...base] : { ...base }
  for (const [key, value] of Object.entries(patch)) {
    if (value && typeof value === 'object' && !Array.isArray(value) && base?.[key] && typeof base[key] === 'object') {
      out[key] = deepMerge(base[key], value)
    } else if (value !== undefined) {
      out[key] = value
    }
  }
  return out
}

function mapDentalProblems(items = DEFAULT_DENTAL_PROBLEMS) {
  return items.map((item) => ({
    ...item,
    image: resolveImage(item.imageKey),
  }))
}

function mapBeforeAfter(items = DEFAULT_BEFORE_AFTER) {
  return items.map((item) => ({
    ...item,
    beforeImage: resolveImage(item.beforeImageKey, resolveImage('smile-before')),
    afterImage: resolveImage(item.afterImageKey, resolveImage('smile-after')),
  }))
}

function mapReviews(items = DEFAULT_REVIEWS) {
  return items.map((item) => ({
    ...item,
    id: item.id || `review-${item.authorName}`,
    source: 'google',
  }))
}

export function buildSiteContentState(docs = {}) {
  const clinic = deepMerge(DEFAULT_CLINIC, docs.clinic)
  const home = deepMerge(DEFAULT_HOME, docs.home)
  const dentalProblems = mapDentalProblems(docs.dentalProblems?.items || DEFAULT_DENTAL_PROBLEMS)
  const beforeAfterCases = mapBeforeAfter(docs.beforeAfter?.items || DEFAULT_BEFORE_AFTER)
  const reviews = mapReviews(docs.reviews?.items || DEFAULT_REVIEWS)

  return {
    clinic,
    home,
    dentalProblems,
    beforeAfterCases,
    reviews,
    source: docs.clinic ? 'firestore' : 'defaults',
  }
}

export async function fetchSiteContentFromServer() {
  const snapshot = await getDocsFromServer(collection(db, SITE_CONTENT_COLLECTION))
  const docs = {}
  snapshot.docs.forEach((docSnap) => {
    docs[docSnap.id] = docSnap.data()
  })
  return buildSiteContentState(docs)
}

export async function fetchSiteContentDoc(docId) {
  const snap = await getDoc(doc(db, SITE_CONTENT_COLLECTION, docId))
  return snap.exists() ? snap.data() : null
}

export async function hasSiteContentInFirestore() {
  const snap = await getDocs(collection(db, SITE_CONTENT_COLLECTION))
  return !snap.empty
}

export { SITE_CONTENT_DOC_IDS, SITE_CONTENT_COLLECTION }
