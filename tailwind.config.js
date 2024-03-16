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
      colors: {
        // Light Theme Colors
        'light-base': '#E9F5EC', // A soft greenish off-white, for a clean and serene background
        'light-primary': '#38A169', // A calming green, for call-to-actions and details
        'light-secondary': 'rgba(56, 161, 105, 0.05)', // Very light green, for secondary buttons/cards
        'light-text': '#2D3748', // Dark slate gray, for readable text

        // Dark Theme Colors
        'dark-base': '#121212', // A deep gray or off-black, for the background
        'dark-primary': '#0DCAF0', // A bright cyan, for contrast against dark backgrounds
        'dark-secondary': 'rgba(13, 202, 240, 0.05)', // Very light cyan, for secondary elements
        'dark-text': '#E0E0E0', // Light gray, ensuring text readability
      },
    },
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
