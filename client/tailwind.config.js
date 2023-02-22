/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        dracula: {
          ...require('daisyui/src/colors/themes')['[data-theme=dracula]'],
          'base-100': '#1D1D1B'
        }
      }
    ]
  },
  plugins: [require('daisyui')]
}
