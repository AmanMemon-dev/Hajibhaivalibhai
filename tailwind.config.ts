import type { Config } from 'tailwindcss';
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        stone: 'rgb(var(--stone) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-ink': 'rgb(var(--accent-ink) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Arial Narrow', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: { sm: '1px', DEFAULT: '2px', md: '2px', lg: '3px', xl: '4px', '2xl': '4px' },
      boxShadow: {
        1: '0 1px 2px rgb(0 0 0 / .06)',
        2: '0 8px 24px -8px rgb(0 0 0 / .18)',
        3: '0 24px 60px -20px rgb(0 0 0 / .35)',
      },
      fontSize: {
        'step-0': 'clamp(0.95rem, 0.9rem + 0.25vw, 1.05rem)',
        'step-1': 'clamp(1.15rem, 1.05rem + 0.5vw, 1.4rem)',
        'step-2': 'clamp(1.5rem, 1.25rem + 1.2vw, 2.2rem)',
        'step-3': 'clamp(2rem, 1.5rem + 2.4vw, 3.6rem)',
        'step-4': 'clamp(2.6rem, 1.6rem + 4.6vw, 6rem)',
        'step-5': 'clamp(2.1rem, 0.2rem + 8.2vw, 8rem)',
      },
    },
  },
  plugins: [],
};
export default config;
