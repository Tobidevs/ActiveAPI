/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customBlack: '#0c0c0e', // Custom black color
        customDarkPurple: '#0f081b', // Custom dark purple color
        customPurple: '#8c52ff', // Custom purple color
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Add the Poppins font
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

