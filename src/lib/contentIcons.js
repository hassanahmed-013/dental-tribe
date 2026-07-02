import {
  Trophy,
  Shield,
  Users,
  Star,
  Phone,
  ClipboardList,
  CalendarCheck,
  ShieldCheck,
  Microscope,
  HeartHandshake,
  Clock3,
} from 'lucide-react'

const ICONS = {
  trophy: Trophy,
  shield: Shield,
  users: Users,
  star: Star,
  phone: Phone,
  clipboard: ClipboardList,
  calendar: CalendarCheck,
  shieldCheck: ShieldCheck,
  microscope: Microscope,
  heart: HeartHandshake,
  clock: Clock3,
}

export function resolveContentIcon(name, fallback = Shield) {
  return ICONS[name] || fallback
}
