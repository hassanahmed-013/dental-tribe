import { DEFAULT_BEFORE_AFTER } from './siteContentDefaults'
import { resolveImage } from '../lib/imageAssets'

export const BEFORE_AFTER_CASES = DEFAULT_BEFORE_AFTER.map((item) => ({
  ...item,
  beforeImage: resolveImage(item.beforeImageKey),
  afterImage: resolveImage(item.afterImageKey),
}))
