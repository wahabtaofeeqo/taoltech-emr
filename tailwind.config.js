/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xsm': '385px',
      'xs': '395px',
      'xss': '410px',
      'sm': '520px',
      'ms': '728px',
      'md': '800px',
      'lg': '1024px', 
      'xl': '1200px',
    }
  },
  plugins: [],
}