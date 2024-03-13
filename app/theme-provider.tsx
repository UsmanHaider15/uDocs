'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light') // Default theme is light

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme) // Save theme preference
    setTheme(newTheme)
  }

  // Load theme preference from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      // Optional: Respect the user's preference in OS level
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    const classList = document.documentElement.classList
    const themeToAdd = theme
    const themeToRemove = theme === 'light' ? 'dark' : 'light'

    if (!classList.contains(themeToAdd)) {
      classList.add(themeToAdd)
    }
    if (classList.contains(themeToRemove)) {
      classList.remove(themeToRemove)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
