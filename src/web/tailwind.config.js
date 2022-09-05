module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
      fontWeight: {
        hairline: 50,
      },
      colors: {
        dark: 'rgb(24 24 27)',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}
