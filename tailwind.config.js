/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  experimental: {
    optimizeUniversalDefaults: false
  },
  content: ["./theme/**/*.php", './src/**/*.{js,tsx}'],
  theme: {
    extend: {
            fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-pill': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' }, // phóng to 8%
        },
        
        'slide-left': {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-left-delayed': {
          '0%': { opacity: '0', transform: 'translateX(-100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },

        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-right-delayed': {
          '0%': { opacity: '0', transform: 'translateX(100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },

        'slide-down':{
          '0%': { opacity: '0', transform: 'translateY(100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        'slide-up':{
          '0%': { opacity: '0', transform: 'translateY(-100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        
        'bounceIn': {
          '0%': {
            opacity: '1',
            transform: 'translateY(5px) scale(1.03)',
          },
          '60%': {
            opacity: '1',
            transform: 'translateY(5px) scale(1.03)', // vượt lên -> bounce
          },
          '80%': {
            transform: 'translateY(5px) scale(0.98)', // bật lại lần 2
          },
          '100%': {
            transform: 'translateY(5px) scale(0.98)', // ổn định
          },
        },

        'bounceIn-1': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px) scale(1.03)',
          },
          '60%': {
            opacity: '1',
            transform: 'translateY(-10px) scale(1.03)', // vượt lên -> bounce
          },
          '80%': {
            transform: 'translateY(5px) scale(0.98)', // bật lại lần 2
          },
          '100%': {
            transform: 'translateY(5px) scale(0.98)', // ổn định
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',            // Hình 2-1
        'fade-in-delayed': 'fade-in 0.8s ease-out 0.5s forwards', // Hình 2-2 (trễ 0.5s)
        'pulse-pill': 'pulse-pill 3s ease-in-out infinite',
        'pulse-pill-header': 'pulse-pill 2s ease-in-out infinite',
        'slide-left-then-pulse': 'slide-left-delayed 1s ease-out forwards, pulse-pill 3s ease-in-out infinite 1s',
        
        'slide-left': 'slide-left 0.6s ease-out forwards',
        'slide-left-delayed': 'slide-left-delayed 1.9s ease-out forwards',

        'slide-right': 'slide-right 0.6s ease-out forwards',
        'slide-right-delayed': 'slide-right-delayed 1.9s ease-out forwards',

        'slide-down':'slide-down 1s ease-out forwards',
        'slide-up':'slide-up 1s ease-out forwards',
        
        'bounceIn': 'bounceIn 0.8s cubic-bezier(.68,-0.55,.27,1.55) infinite',
        'bounceIn-1': 'bounceIn-1 0.8s cubic-bezier(.68,-0.55,.27,1.55) forwards',
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