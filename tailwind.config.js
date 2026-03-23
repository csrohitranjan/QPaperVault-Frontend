/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themeBg: "#161720", 
        cardBg: "#222532",   
        primaryOrange: "#fe5238", 
        textMuted: "#858da0",
      }
    },
  },
  plugins: [],
}
