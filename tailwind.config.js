/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "health-primary-blue": "#175CD3",
        "health-off-white": "#D2E3FF",
        "health-secondary-cyan": "#009FC2",
        "health-primary": "#1659cc",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"]
    },
    },
  },
  plugins: [],
};
