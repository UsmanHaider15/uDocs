'use client'

import React from 'react'
import { useTheme } from '../../../app/theme-provider'
import { FaSun, FaMoon } from 'react-icons/fa' // Importing icons for light and dark mode

const ThemeSwitcher = () => {
  // @ts-ignore
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center gap-2 bg-transparent border-none cursor-pointer p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  )
}

export default ThemeSwitcher
