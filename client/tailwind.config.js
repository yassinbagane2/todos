/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ["Inter", "sans - serif"],
      },
      colors: {
        "custom-purple": "#713fff",
        "custom-gray": "#f0f2f5",
      },
    },
  },
  plugins: [],
};
