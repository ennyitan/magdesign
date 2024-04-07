/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: '#f8f9fa',
        grey: '#999',
        lightGrey: '#ccc',
        primaryGrey: '#888',
        orange: '#f79918'
      }
    },
  },
  plugins: [],
}