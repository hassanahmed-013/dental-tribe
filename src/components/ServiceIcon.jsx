// Custom line-art dental icons traced from the clinic's real branding —
// replaces generic lucide-react icons on treatment cards and detail pages.

const toothCrown = 'M50,28 C38,14 28,10 20,12 C12,14 8,26 10,40 C11,50 16,58 24,64 C20,72 20,82 22,90 C24,98 32,104 38,102 C44,100 46,88 48,80 C49,76 54,74 60,75 C66,76 70,78 70,82 C70,78 74,76 80,75 C86,74 91,76 92,80 C94,88 96,100 102,102 C108,104 116,98 118,90 C120,82 120,72 116,64 C124,58 129,50 130,40 C132,26 128,14 120,12 C112,10 102,14 90,28 C80,18 70,18 60,22 C55,24 52,26 50,28 Z'

export const SERVICE_ICON_TYPES = [
  'filling', 'root-canal', 'crown', 'extraction',
  'scaling', 'denture', 'implant', 'whitening', 'veneer',
]

export default function ServiceIcon({ type = 'filling', className = '' }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d={toothCrown} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

      {type === 'filling' && (
        <>
          <path d="M42,48 L50,42 L58,48 L56,56 L44,56 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M68,22 L72,16 M74,20 L68,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {type === 'root-canal' && (
        <>
          <circle cx="72" cy="24" r="8" stroke="currentColor" strokeWidth="2.5" />
          <path d="M72,32 L72,42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M68,38 L76,38 M70,42 L74,42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {type === 'crown' && (
        <>
          <path d="M38,30 L50,22 L62,30 L60,38 L40,38 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M44,38 L44,44 M56,38 L56,44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {type === 'extraction' && (
        <>
          <path d="M30,70 L70,30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M26,66 L34,74 M66,26 L74,34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {type === 'scaling' && (
        <>
          <circle cx="72" cy="72" r="6" stroke="currentColor" strokeWidth="2.5" />
          <path d="M72,66 L72,60 M69,69 L64,72 M75,69 L80,72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M68,18 L70,14 M74,16 L72,20 M76,20 L78,16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}

      {type === 'denture' && (
        <>
          <path d="M30,68 Q50,78 70,68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M34,68 L34,62 M42,70 L42,64 M50,72 L50,66 M58,70 L58,64 M66,68 L66,62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {type === 'implant' && (
        <>
          <path d="M46,72 L46,88 M54,72 L54,88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M44,80 L56,80 M44,84 L56,84" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="88" x2="58" y2="88" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {type === 'whitening' && (
        <>
          <path d="M66,18 L70,12 M74,16 L68,14 M78,22 L84,20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="28" cy="72" r="7" stroke="currentColor" strokeWidth="2.5" />
          <path d="M28,65 L28,60 M24,69 L20,72 M32,69 L36,72" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}

      {type === 'veneer' && (
        <>
          <rect x="62" y="58" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2.5" transform="rotate(-30 71 63)" />
          <path d="M58,66 L48,72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}
