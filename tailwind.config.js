// tailwind.config.js

/** @type {import('tailwindcss').Config} */
import preline from 'preline/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [
    preline,
  ],
}
