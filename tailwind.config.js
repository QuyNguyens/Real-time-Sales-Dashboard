/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "black-primary": "#19191c",
        "black-secondary": "#2d2d30",
      },
      fontSize: {
        base10: "10px",
      },
    },
  },
  plugins: [scrollbar()],
};
