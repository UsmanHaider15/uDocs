const { theme } = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // This enables class-based dark mode.
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Use extend to customize your theme
      colors: {
        // Define your color palette for light theme
        primary: '#007bff', // Example primary color
        secondary: '#6c757d', // Example secondary color
        accent: '#17a2b8', // Example accent color
        // Add more colors as needed
      },
      // Define a separate color palette for dark mode
      dark: {
        primary: '#0d6efd', // Dark mode primary color
        secondary: '#495057', // Dark mode secondary color
        accent: '#20c997', // Dark mode accent color
        // Add more dark mode specific colors as needed
      },
    },
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
    ...theme,
  },
  plugins: [require('@tailwindcss/typography')],
}
