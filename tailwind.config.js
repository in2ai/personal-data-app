/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {},
    extend: {
      colors: {
        h1Color: '#3c7c8c',
        defaultAppBgColor: '#ffffff',
        defaultTextColor: '#333',
      },
    },
  },
  plugins: [],
};
