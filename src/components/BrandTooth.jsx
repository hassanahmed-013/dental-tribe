// Premium hand-crafted tooth mark — gradient arcs like a specialist dental brand.
// Not a Lucide icon; pure SVG for navbar, hero, and floating accents.
export default function BrandTooth({ className = '', size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bt-arc1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#31AABE" />
          <stop offset="100%" stopColor="#00C2D1" />
        </linearGradient>
        <linearGradient id="bt-arc2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5B8DEF" />
          <stop offset="100%" stopColor="#31AABE" />
        </linearGradient>
        <linearGradient id="bt-fill" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#EFFAFB" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* Outer glow ring */}
      <circle cx="40" cy="40" r="36" stroke="url(#bt-arc1)" strokeWidth="1.5" strokeOpacity="0.35" />

      {/* Colorful brand arcs */}
      <path
        d="M18 42 C18 22 28 12 40 12 C52 12 62 22 62 42"
        stroke="url(#bt-arc1)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 48 C22 58 30 66 40 66 C50 66 58 58 58 48"
        stroke="url(#bt-arc2)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Tooth body */}
      <path
        d="M40 18 C32 18 26 24 24 34 C22 42 26 50 32 54 C30 58 30 62 32 66 C34 70 38 72 40 72 C42 72 46 70 48 66 C50 62 50 58 48 54 C54 50 58 42 56 34 C54 24 48 18 40 18 Z"
        fill="url(#bt-fill)"
        stroke="url(#bt-arc1)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Shine highlight */}
      <path
        d="M34 28 C36 24 40 22 44 26"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />

      {/* Sparkle */}
      <circle cx="54" cy="22" r="2" fill="#00C2D1" />
      <path d="M54 18 V26 M50 22 H58" stroke="#00C2D1" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
