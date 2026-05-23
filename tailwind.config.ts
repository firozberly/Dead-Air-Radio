import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { bg: '#090909', ink: '#d4ffd2', neon: '#6eff8f' } } },
  plugins: []
} satisfies Config;
