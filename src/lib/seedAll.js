import { importFlyerTreatments } from './seedServices'
import { seedSiteContent } from './seedSiteContent'

/** Push every default dataset into Firestore (treatments + all homepage content). */
export async function seedAllFirestoreData() {
  const [treatments, siteContent] = await Promise.all([
    importFlyerTreatments(),
    seedSiteContent(),
  ])

  return {
    treatments: treatments.count,
    siteContent,
  }
}
