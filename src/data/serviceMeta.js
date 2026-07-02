export const SERVICE_CATEGORIES = [
  'Restorative',
  'Cosmetic',
  'Cosmetic & Restorative',
  'Pediatric',
  'Surgical',
  'Preventive',
  'Prosthodontics',
]

// One accent gradient per category so treatment cards/icons read as
// distinct at a glance instead of every card wearing the same teal badge.
export const CATEGORY_COLORS = {
  Restorative: 'from-teal-500 to-cyan-500',
  Cosmetic: 'from-fuchsia-500 to-pink-500',
  'Cosmetic & Restorative': 'from-violet-500 to-teal-500',
  Pediatric: 'from-amber-500 to-orange-500',
  Surgical: 'from-rose-500 to-red-500',
  Preventive: 'from-emerald-500 to-teal-500',
  Prosthodontics: 'from-blue-500 to-indigo-500',
}

export const SERVICE_ICON_TYPES = [
  { value: 'filling', label: 'Filling / Aesthetic' },
  { value: 'root-canal', label: 'Root Canal' },
  { value: 'crown', label: 'Crown' },
  { value: 'extraction', label: 'Extraction' },
  { value: 'scaling', label: 'Scaling / Cleaning' },
  { value: 'denture', label: 'Denture' },
  { value: 'implant', label: 'Implant' },
  { value: 'whitening', label: 'Whitening' },
  { value: 'veneer', label: 'Veneer' },
]

export const EMPTY_SERVICE = {
  name: '',
  slug: '',
  shortName: '',
  duration: '',
  visits: '',
  iconType: 'filling',
  category: 'Restorative',
  tagline: '',
  description: '',
  highlights: [],
  order: 0,
  active: true,
}
