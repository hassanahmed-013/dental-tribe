// Traced from the clinic's real logo mark: a bold, hand-drawn-style tooth
// outline with a heart-shaped double-peak crown (dipping at the center top)
// and two split roots — plus the small comet-tail swoosh accent on the
// right root that appears in the real artwork. Stroke-only, currentColor,
// so it drops straight into any text-color utility (text-white, text-teal-500/10, etc).
export default function ToothIcon({ className = '', strokeWidth = 10, accent = true }) {
  return (
    <svg
      viewBox="0 0 240 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M120,66 C100,38 80,24 58,22 C34,20 18,58 20,94 C22,122 34,140 52,154 C44,170 44,188 46,202 C48,220 62,230 70,226 C78,222 82,204 86,188 C88,180 98,176 108,178 C116,179 120,182 120,186 C120,182 124,179 132,178 C142,176 152,180 154,188 C158,204 162,222 170,226 C178,230 192,220 194,202 C196,188 196,170 188,154 C206,140 218,122 220,94 C222,58 206,20 182,22 C160,24 140,38 120,66 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {accent && (
        <path
          d="M176,34 C196,46 208,66 206,92"
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.6}
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  )
}
