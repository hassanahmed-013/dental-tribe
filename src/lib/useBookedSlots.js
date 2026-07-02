import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from './firebaseConfig'

// Real-time listener: returns which time slots are already booked on a given date.
export function useBookedSlots(date) {
  const [booked, setBooked] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!date) {
      setBooked([])
      setLoading(false)
      return
    }

    setLoading(true)
    const appointmentsOnDate = query(collection(db, 'appointments'), where('date', '==', date))

    const unsubscribe = onSnapshot(
      appointmentsOnDate,
      (snapshot) => {
        const slots = snapshot.docs.map((doc) => doc.data().timeSlot).filter(Boolean)
        setBooked(slots)
        setLoading(false)
      },
      () => {
        setBooked([])
        setLoading(false)
      }
    )

    return unsubscribe
  }, [date])

  return { booked, loading }
}
