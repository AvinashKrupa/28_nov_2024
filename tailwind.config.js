/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-100': '#1A1B26',
        'dark-200': '#24283B',
        'dark-300': '#414868',
        'accent-100': '#7AA2F7',
        'accent-200': '#BB9AF7',
        'light-100': '#F7F9FC',
        'light-200': '#E4E9F2',
        'light-300': '#D1D8E6',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, var(--accent-100), var(--accent-200))',
        'gradient-dark': 'linear-gradient(180deg, var(--dark-100), var(--dark-200))',
      },
      boxShadow: {
        'glow': '0 0 30px -5px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [],
};