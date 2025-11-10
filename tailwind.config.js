/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  experimental: {
    optimizeUniversalDefaults: false
  },
  content: ["./theme/**/*.php", './src/**/*.{js,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F3C11B',
        secondary: '#3DA7F2',
        lightblue: '#C4E1F5'
      },
      fontFamily: {
        sans: 'Manrope'
      },
      container: {
        center: true,
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
          '4xl': '2560px',
          '6xl': '3840px',
          '8xl': '5120px'
        }
      },
      screens: {
        'ipadpro':'1024px',
        'ipadproplus':'1030px',
        'xxl':'1535px',
        '4xl': '2560px', 
        '6xl': '3840px', 
        '8xl': '5120px',
      },
    }
  },
  corePlugins: {
    // preflight: false
  },
  plugins: [
      require('@tailwindcss/typography')
  ],
}