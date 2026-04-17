import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep space dark — primary backgrounds
        dark: {
          950: '#010810',
          900: '#020C1B',
          800: '#061424',
          700: '#0A1E30',
          600: '#0F2840',
          500: '#163350',
          400: '#1E4060',
          300: '#2A5070',
        },
        // Cyan accent — primary brand accent
        cyan: {
          50:  '#E0FBFF',
          100: '#B3F4FC',
          200: '#80EDF9',
          300: '#4DE4F5',
          400: '#1AD8F0',
          500: '#00CCEE',
          600: '#00A2BE',
          700: '#007A8E',
          800: '#00515E',
          900: '#00282F',
        },
        // Keep legacy references so existing data files work
        navy:  { 500: '#163350', 600: '#0F2840', 700: '#0A1E30', 900: '#061424', 950: '#020C1B' },
        gold:  { 400: '#E8AF3C', 500: '#C9922A', 600: '#A67520' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        // Keep hero-gradient key so older HeroSection ref still compiles
        'hero-gradient':    'linear-gradient(135deg, #010810 0%, #020C1B 60%, #061424 100%)',
        'card-gradient':    'linear-gradient(145deg, rgba(0,204,238,0.04) 0%, rgba(0,80,200,0.02) 100%)',
        'cyan-gradient':    'linear-gradient(135deg, #00CCEE 0%, #0055CC 100%)',
        'dark-gradient':    'linear-gradient(180deg, #020C1B 0%, #010810 100%)',
        'glow-gradient':    'radial-gradient(ellipse at center, rgba(0,204,238,0.15) 0%, transparent 70%)',
        // legacy refs
        'navy-gradient':    'linear-gradient(135deg, #061424 0%, #163350 100%)',
        'gold-gradient':    'linear-gradient(135deg, #C9922A 0%, #E8AF3C 100%)',
      },
      boxShadow: {
        'glow-xs':  '0 0 10px rgba(0,204,238,0.15)',
        'glow-sm':  '0 0 18px rgba(0,204,238,0.22)',
        'glow':     '0 0 30px rgba(0,204,238,0.28)',
        'glow-lg':  '0 0 60px rgba(0,204,238,0.32)',
        'glow-xl':  '0 0 90px rgba(0,204,238,0.38)',
        'card':     '0 4px 24px rgba(0,0,0,0.45)',
        'card-hover':'0 8px 40px rgba(0,0,0,0.55)',
        'premium':  '0 20px 80px rgba(0,0,0,0.5)',
        // legacy
        'gold':     '0 4px 20px rgba(201,146,42,0.35)',
        'gold-lg':  '0 8px 40px rgba(201,146,42,0.40)',
      },
      animation: {
        'aurora':        'aurora 20s ease infinite alternate',
        'aurora-slow':   'aurora 32s ease infinite alternate-reverse',
        'aurora-fast':   'aurora 14s ease infinite alternate',
        'glow-pulse':    'glowPulse 3s ease-in-out infinite',
        'glow-pulse-slow':'glowPulse 5.5s ease-in-out infinite',
        'float':         'float 7s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 3.5s infinite',
        'beam':          'beam 9s linear infinite',
        'spin-slow':     'spin 22s linear infinite',
        'shimmer':       'shimmer 2.8s linear infinite',
        // legacy
        'pulse-slow':    'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        aurora: {
          '0%':   { transform: 'translate(0%,0%) scale(1)',     opacity: '0.50' },
          '33%':  { transform: 'translate(8%,-9%) scale(1.12)', opacity: '0.65' },
          '66%':  { transform: 'translate(-7%,8%) scale(0.92)', opacity: '0.45' },
          '100%': { transform: 'translate(4%,-3%) scale(1.06)', opacity: '0.55' },
        },
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 18px rgba(0,204,238,0.15), 0 0 40px rgba(0,204,238,0.05)' },
          '50%':     { boxShadow: '0 0 40px rgba(0,204,238,0.40), 0 0 80px rgba(0,204,238,0.18)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
        beam: {
          '0%':   { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(450%) skewX(-15deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}

export default config
