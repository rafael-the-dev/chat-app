module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],  
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          700: "#1F0EE1"
        },
        cyan: {
          300: "#F1F8F6",
          700: "#2597BB"
        },
        gray: {
          400: "#F4F2F2",
          500: "#DBD5D5"
        },
        green: {
          600: "#0EB83D"
        },
        red: {
          300: "#BB255B",
          500: "#BB255B",
          600: "#B80C0C"
        },
        stone: {
          600: "#393A4B",
          500: "#25273D",
          900: "#0d0e1a"
        }
      },
      fontSize: {
        "sm": "0.93rem"
      },
      spacing: {
        "5": "5%"
      }
    },
    screens: {
      'sm': '600px',
      // => @media (min-width: 640px) { ... }

      'md': '900px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}
