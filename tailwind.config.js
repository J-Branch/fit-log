/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          'primary-red-one': '#800020',
          'primary-red-two': '#972D43',
          'primary-white': '#F3EFF5',
          'primary-gray': '#454955',
          'primary-black': '#0D0A0B',
        }
      }
    },
    plugins: [],
  }
  