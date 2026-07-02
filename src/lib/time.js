// Shared clinic-hours helpers — clinic is open 5:00 PM (17:00) to 10:00 PM (22:00) daily.

export function isClinicOpen(date = new Date()) {
  const hour = date.getHours() + date.getMinutes() / 60
  return hour >= 17 && hour < 22
}

// Half-hour slots from 5:00 PM to 9:30 PM (last booking 30 min before close).
export const TIME_SLOTS = [
  '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM',
]

/** Local calendar date as YYYY-MM-DD (avoids UTC off-by-one in date inputs). */
export function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function isPastDate(dateISO) {
  if (!dateISO) return true
  return dateISO < todayISO()
}

function slotToMinutes(slot) {
  const match = slot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return null

  let hours = Number(match[1])
  const minutes = Number(match[2])
  const period = match[3].toUpperCase()

  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0

  return hours * 60 + minutes
}

/** True when the slot time has already passed today. */
export function isSlotInPast(slot, dateISO) {
  if (!dateISO || dateISO !== todayISO()) return false
  const slotMinutes = slotToMinutes(slot)
  if (slotMinutes == null) return false

  const now = new Date()
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  return slotMinutes <= nowMinutes
}

/**
 * Slots the patient may book: not already reserved, not in the past (if today).
 */
export function getSelectableSlots(dateISO, bookedSlots = []) {
  if (!dateISO || isPastDate(dateISO)) return []

  return TIME_SLOTS.filter(
    (slot) => !bookedSlots.includes(slot) && !isSlotInPast(slot, dateISO)
  )
}
