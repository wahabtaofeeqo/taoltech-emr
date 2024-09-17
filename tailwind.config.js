/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "health-primary-blue": "#175CD3",
        "health-off-white": "#D2E3FF",
        "health-secondary-cyan": "#009FC2",
      },
    },
    screens: {
      'xsm': '385px',
      'xs': '395px',
      'xss': '410px',
      'smm': '520px',
      'ms': '728px',
      'md': '768px',
      'mdd': '800px',
      'lgg': '1024px',
      'lg':	'1024px', 
      'xll': '1200px',
      'xl':	'1280px',
    }
  },
  plugins: [],
};
