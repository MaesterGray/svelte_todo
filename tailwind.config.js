/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    
    extend: {
      fontFamily:{
        'Inter':['Inter','sans'],
        'Square':['Nova Square','sans']

      }
    },
  },
  plugins: [],
}

