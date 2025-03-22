/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-500': '#22c55e',
        'green-800': '#166534',
      },
    },
  },
  plugins: [],
};
