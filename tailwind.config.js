/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#1E40AF",
        accent: "#DBEAFE",
        background: "#F9FAFB",
        text: "#1F2937"
      }
    },
  },
  plugins: [],
}
