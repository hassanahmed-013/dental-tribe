import toothDecayImg from '../assets/problems/tooth-decay.jpg'
import bleedingGumsImg from '../assets/problems/bleeding-gums.jpg'
import missingToothImg from '../assets/problems/missing-tooth.jpg'
import brokenToothImg from '../assets/problems/broken-tooth.jpg'
import looseDentureImg from '../assets/problems/loose-denture.jpg'
import stainedTeethImg from '../assets/problems/stained-teeth.jpg'
import beforeImg from '../assets/smile-before.jpg'
import afterImg from '../assets/smile-after.jpg'

const IMAGE_ASSETS = {
  'tooth-decay': toothDecayImg,
  'bleeding-gums': bleedingGumsImg,
  'missing-tooth': missingToothImg,
  'broken-tooth': brokenToothImg,
  'loose-denture': looseDentureImg,
  'stained-teeth': stainedTeethImg,
  'smile-before': beforeImg,
  'smile-after': afterImg,
}

export function resolveImage(key, fallback = beforeImg) {
  if (!key) return fallback
  return IMAGE_ASSETS[key] || fallback
}
