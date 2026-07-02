/**
 * Firebase Storage image helpers.
 *
 * Strategy: store two objects per treatment image —
 *   services/{id}/image.jpg          (full, max ~1200px wide)
 *   services/{id}/thumb.jpg          (card preview, ~320px wide)
 *
 * Upload the thumbnail during "Add Treatment" so admin cards and the
 * public grid never download full-resolution files.
 */

const THUMB_MAX_WIDTH = 320
const FULL_MAX_WIDTH = 1200
const JPEG_QUALITY = 0.82

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = reject
    img.src = url
  })
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality)
  })
}

async function resizeImage(file, maxWidth) {
  const img = await loadImage(file)
  const scale = Math.min(1, maxWidth / img.width)
  const width = Math.round(img.width * scale)
  const height = Math.round(img.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, width, height)

  return canvasToBlob(canvas, 'image/jpeg', JPEG_QUALITY)
}

export async function buildTreatmentImageVariants(file) {
  const [full, thumb] = await Promise.all([
    resizeImage(file, FULL_MAX_WIDTH),
    resizeImage(file, THUMB_MAX_WIDTH),
  ])
  return { full, thumb }
}

/** Prefer thumbnail in lists; fall back to full image or icon-only cards. */
export function getTreatmentCardImageUrl(service) {
  return service?.imageThumbUrl || service?.thumbnailUrl || service?.imageUrl || null
}
