/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "blue-920": "#06293b",
      },
      fontSize: {
        base12: "12px",
        base16: "1rem",
        base18: "18px",
      },
    },
  },
  plugins: [],
};
