/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Official clinic palette (from brand style guide): base #31AABE,
        // hover #2898AA, active #207D8B. The full teal scale below is
        // interpolated around those three anchor points so every existing
        // teal-* utility across the app now renders in the real brand hue.
        teal: {
          50: '#EFFAFB',
          100: '#DBF3F6',
          200: '#B7E7ED',
          300: '#8CD8E1',
          400: '#57C2CF',
          500: '#31AABE',
          600: '#2898AA',
          700: '#207D8B',
          800: '#195F69',
          900: '#123D43',
          950: '#0B2528',
          DEFAULT: '#31AABE',
        },
        // Same three brand anchors, exposed directly (bg-brand,
        // hover:bg-brand-hover, active:bg-brand-active) for places that
        // should reference the style guide values explicitly.
        navy: {
          DEFAULT: '#002147',
          light: '#0a3d5c',
          dark: '#001530',
        },
        'nav-light': '#E8F6FA',
        brand: {
          DEFAULT: '#31AABE',
          hover: '#2898AA',
          active: '#207D8B',
        },
        cyan: {
          400: '#00C2D1',
          500: '#00A8B5',
        },
        silver: {
          50: '#F8FAFA',
          100: '#F1F4F5',
          200: '#E4E9EA',
          300: '#CBD5D6',
          400: '#9FADAF',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Poppins', 'system-ui', 'sans-serif'],
        display: ['"Clash Display"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(4deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(-3deg)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        floatSlow: 'floatSlow 8s ease-in-out infinite',
        blob: 'blob 12s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
      boxShadow: {
        glow: '0 0 40px rgba(49, 170, 190, 0.35)',
        card: '0 8px 30px rgba(9, 45, 51, 0.12)',
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle, rgba(49,170,190,0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
