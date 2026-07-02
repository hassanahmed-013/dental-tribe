export const NAV_OFFSET = 96

export function scrollToSection(id, behavior = 'smooth') {
  const el = document.getElementById(id)
  if (!el) return false

  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top, behavior })
  return true
}

export function scrollToSectionWhenReady(id, maxAttempts = 30) {
  let attempts = 0

  const tryScroll = () => {
    if (scrollToSection(id)) return
    attempts += 1
    if (attempts < maxAttempts) {
      requestAnimationFrame(tryScroll)
    }
  }

  tryScroll()
}

export function scrollToTop(behavior = 'smooth') {
  window.scrollTo({ top: 0, behavior })
}
