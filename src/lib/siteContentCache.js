import { DEFAULT_CLINIC } from '../data/siteContentDefaults'

let clinicCache = DEFAULT_CLINIC

export function setClinicCache(clinic) {
  clinicCache = clinic || DEFAULT_CLINIC
}

export function getClinic() {
  return clinicCache
}
