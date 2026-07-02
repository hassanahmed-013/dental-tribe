import { DEFAULT_DENTAL_PROBLEMS } from './siteContentDefaults'
import { resolveImage } from '../lib/imageAssets'

export const DENTAL_PROBLEMS = DEFAULT_DENTAL_PROBLEMS.map((item) => ({
  ...item,
  image: resolveImage(item.imageKey),
}))
