/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  experimental: {
    optimizeUniversalDefaults: false
  },
  content: ["./theme/**/*.php", './src/**/*.{js,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-pill': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' }, // phóng to 8%
        },
        
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',            // Hình 2-1
        'fade-in-delayed': 'fade-in 0.8s ease-out 0.5s forwards', // Hình 2-2 (trễ 0.5s)
        'pulse-pill': 'pulse-pill 3s ease-in-out infinite',
        'pulse-pill-header': 'pulse-pill 2s ease-in-out infinite',
      },
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
          ssm: '400px',
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
        'ip':'400px',
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