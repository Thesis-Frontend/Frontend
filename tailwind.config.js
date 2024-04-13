/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        landingBackgroundColor: "#f3f3f3", // Example color code
      },
    },
  },
  plugins: [],
};
