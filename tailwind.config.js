/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050816',
        surface: {
          DEFAULT: '#0B1026',
          light: '#111936',
          card: '#161F42',
          border: '#232E58',
          hover: '#1B2652',
        },
        primary: {
          DEFAULT: '#6D5DFB',
          hover: '#5A49F0',
          light: '#8B7FFF',
          glow: 'rgba(109, 93, 251, 0.4)',
        },
        gold: {
          DEFAULT: '#F4C95D',
          hover: '#E5B845',
          light: '#FFE28A',
          glow: 'rgba(244, 201, 93, 0.45)',
          dark: '#B3861B',
        },
        success: {
          DEFAULT: '#22C55E',
          glow: 'rgba(34, 197, 94, 0.45)',
          dark: '#15803D',
        },
        danger: {
          DEFAULT: '#EF4444',
          glow: 'rgba(239, 68, 68, 0.45)',
          dark: '#B91C1C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'suspense': 'suspensePulse 1s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(109, 93, 251, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(109, 93, 251, 0.7)' },
        },
        suspensePulse: {
          '0%, 100%': { transform: 'scale(1)', borderColor: '#F4C95D' },
          '50%': { transform: 'scale(1.02)', borderColor: '#FFE28A', boxShadow: '0 0 25px rgba(244, 201, 93, 0.6)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-8px)' },
          '40%, 80%': { transform: 'translateX(8px)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
