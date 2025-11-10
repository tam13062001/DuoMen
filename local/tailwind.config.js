/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  experimental: {
    optimizeUniversalDefaults: false
  },
  content: ["./php/**/*.php", './src/**/*.{js,tsx}'],
  theme: {
    extend: {
      fontFamily: {},
      colors: {}
    }
  },
  corePlugins: {
    preflight: true
  },
  plugins: [],
}
