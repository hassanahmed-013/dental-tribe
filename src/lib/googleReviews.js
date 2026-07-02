import { getClinic } from './siteContentCache'

/** Opens Google's review form directly (sign in → write review). */
export function getGoogleWriteReviewUrl() {
  const clinic = getClinic()
  const custom = import.meta.env.VITE_GOOGLE_REVIEWS_URL || clinic.googleReviewUrl
  if (custom?.trim()) return custom.trim()

  const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID || clinic.googlePlaceId
  if (placeId?.trim()) {
    return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId.trim())}`
  }

  return clinic.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${clinic.name} ${clinic.address}`
  )}`
}

function getApiKey() {
  return import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim() || ''
}

function mapGoogleReview(review, index) {
  return {
    id: `google-${index}-${review.publishTime || index}`,
    authorName: review.authorAttribution?.displayName || 'Google User',
    text: review.text?.text || review.originalText?.text || '',
    rating: review.rating || 5,
    relativeTime: review.relativePublishTimeDescription || 'Google review',
    photoUrl: review.authorAttribution?.photoUri || '',
    source: 'google',
  }
}

async function resolvePlaceId(apiKey) {
  const clinic = getClinic()
  const configured = import.meta.env.VITE_GOOGLE_PLACE_ID || clinic.googlePlaceId
  if (configured?.trim()) return configured.trim()

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.id,places.displayName',
    },
    body: JSON.stringify({
      textQuery: `${clinic.name} ${clinic.doctorFullName} ${clinic.address}`,
    }),
  })

  if (!res.ok) {
    throw new Error(`Google Places search failed: ${res.status}`)
  }

  const data = await res.json()
  const placeId = data.places?.[0]?.id
  if (!placeId) throw new Error('Clinic not found on Google Maps')
  return placeId.replace(/^places\//, '')
}

/** Fetch live reviews + rating from Google Places API (New). */
export async function fetchGooglePlaceReviews() {
  const clinic = getClinic()
  const apiKey = getApiKey()
  if (!apiKey) {
    return {
      reviews: [],
      rating: clinic.googleRating ?? null,
      totalCount: clinic.googleReviewCount ?? null,
    }
  }

  const rawPlaceId = await resolvePlaceId(apiKey)
  const id = rawPlaceId.startsWith('places/') ? rawPlaceId : `places/${rawPlaceId}`

  const res = await fetch(`https://places.googleapis.com/v1/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask':
        'reviews.text,reviews.originalText,reviews.authorAttribution,reviews.rating,reviews.relativePublishTimeDescription,reviews.publishTime,rating,userRatingCount',
    },
  })

  if (!res.ok) {
    throw new Error(`Google Places API error: ${res.status}`)
  }

  const data = await res.json()
  const reviews = (data.reviews || []).map(mapGoogleReview).filter((r) => r.text)

  return {
    reviews,
    rating: data.rating ?? clinic.googleRating ?? null,
    totalCount: data.userRatingCount ?? clinic.googleReviewCount ?? null,
  }
}
