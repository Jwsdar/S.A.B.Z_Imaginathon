/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sabz-primary': '#7B9669',
        'sabz-light': '#E6E6E6',
        'sabz-teal': '#6C8480',
        'sabz-mint': '#BAC8B1',
        'sabz-dark': '#404E3B',
      }
    },
  },
  plugins: [],
}