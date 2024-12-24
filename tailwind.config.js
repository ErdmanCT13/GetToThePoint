/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        main: {
          light: '#2364AA',
          DEFAULT: '#2364AA',
          dark: '#061423',
        },
      },
    },
  },
  plugins: [],
}

