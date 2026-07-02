import { getClinic } from './siteContentCache'

export function buildWhatsappUrl(message) {
  const clinic = getClinic()
  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`
}
