/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  variants: {
    extend: {
      fill: ['hover', 'group-hover'],
      visibility: ['hover', 'group-hover'],
    },
  },
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')]
};