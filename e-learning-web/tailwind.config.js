/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A73E8', // Professional Google Blue
          light: '#E8F0FE',
          dark: '#1557B0',
        },
        secondary: {
          DEFAULT: '#E8F0FE', // Light Blue background/tag
          light: '#F8FAFF',
          dark: '#D1E3FF',
        },
        accent: {
          orange: '#F37021', // Keeping brand orange for accents if needed
        },
        text: {
          main: '#202124', // Near black
          muted: '#5F6368', // Grayish
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
