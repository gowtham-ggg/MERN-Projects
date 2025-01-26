/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{html,js,jsx,ts,tsx,vue}', // Adjust paths as needed
    ],
    theme: {
      extend: {
        // You can extend the default theme here, for example:
        colors: {
          customColor: '#123456',
        },
        fontFamily: {
          customFont: ['"Helvetica Neue"', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  