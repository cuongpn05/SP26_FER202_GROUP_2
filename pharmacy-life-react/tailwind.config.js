/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#EEF4FC",
          100: "#D5E5F8",
          200: "#ABCBF1",
          300: "#80B1EA",
          400: "#5697E3",
          500: "#4F81E1",
          600: "#2E63C8",
          700: "#234CA0",
          800: "#183578",
          900: "#0E2050",
        },
        accent: "#22C55E",
        surface: "#F8FAFF",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 20px rgba(79,129,225,0.10)",
        "card-hover": "0 8px 32px rgba(79,129,225,0.20)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease both",
        "slide-in": "slideIn 0.4s ease both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
