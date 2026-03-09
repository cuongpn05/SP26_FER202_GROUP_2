/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Modern Indigo
          light: '#EEF2FF',
          dark: '#3730A3',
        },
        secondary: {
          DEFAULT: '#22C55E', // Progress Green
          light: '#DCFCE7',
          dark: '#166534',
        },
        accent: {
          orange: '#F37021', // Original brand orange
        },
        text: {
          main: '#312E81', // Deep indigo text
          muted: '#6366F1',
        }
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'cursive'],
        body: ['Inter', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px rgba(0, 0, 0, 0.05)',
        'premium-hover': '0 15px 40px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
