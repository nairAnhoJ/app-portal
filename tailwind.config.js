/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    extend: {
      animation: {
        pulse2: 'pulse2 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        pulse3: 'pulse3 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse2: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.65)' },
        },
        pulse3: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(2)' },
        },
      },
    },
  },
  plugins: [],
}

