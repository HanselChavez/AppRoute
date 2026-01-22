/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        principal: "#28a745",   // verde que te guste
        secundario: "#b42c14",  // tu rojo
        fondo: "#111111",
        texto: "#ffffff"
      },
    },
  },
  plugins: [],
}

