/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkgreen: '#00710f',
        lightgreen: '#2db84c',
        normalgreen:'#00bc2a',
        lightblue: '#3F51B5',
      }
    },
    plugins: [],
  }
}