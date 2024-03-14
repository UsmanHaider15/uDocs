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
        'light-base': '#F0F2F5', // A soft off-white, for a clean background
        'light-primary': '#007BFF', // A vibrant blue, for call-to-actions and details
        'light-text': '#333333', // Dark gray, for readable text
        'light-secondary': 'rgba(0, 123, 255, 0.05)', // Very light blue, for secondary buttons/cards

        // Dark Theme Colors
        'dark-base': '#121212', // A deep gray or off-black, for the background
        'dark-primary': '#0DCAF0', // A bright cyan, for contrast against dark backgrounds
        'dark-text': '#E0E0E0', // Light gray, ensuring text readability
        'dark-secondary': 'rgba(13, 202, 240, 0.05)', // Very light cyan, for secondary elements

        // Opacity variations for text hierarchy might be handled via opacity utilities instead of color definitions
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
