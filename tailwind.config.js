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
          light: '#262626',
          DEFAULT: '#F8F32B',
          dark: '#0d0d0d',
        },
      },
    },
  },
  plugins: [],
}

