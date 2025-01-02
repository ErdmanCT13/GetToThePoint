/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // main: {
        //   light: '#2364AA',
        //   DEFAULT: '#2364AA',
        //   dark: '#061423',
        // },
        main: {
          light: '#1a1a1a',
          DEFAULT: '#F8F32B',
          dark: '#0d0d0d',
        },
        accent: {
          light: '#F8F32B',
          DEFAULT: '#F8F32B',
          dark: '#777303',
        },
      },
    },
  },
  plugins: [],
}

