'use client'
import React, { useState, useEffect } from 'react'
import { googleTranslateLanguages } from 'settings'
import { useRouter } from 'next/navigation'

interface LanguageDropdownProps {
  lang: string
}

const LanguageDropdown = ({ lang }: LanguageDropdownProps) => {
  // Find the language title from the ID.
  const initialLanguageTitle =
    googleTranslateLanguages.find((language) => language.id === lang)?.title ||
    'English'
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguageTitle)
  const router = useRouter()

  useEffect(() => {
    // Update the selected language when the lang prop changes.
    const updatedLanguageTitle =
      googleTranslateLanguages.find((language) => language.id === lang)
        ?.title || 'English'
    setSelectedLanguage(updatedLanguageTitle)
  }, [lang])

  const handleLanguageChange = (e) => {
    const newLanguageTitle = e.target.value
    setSelectedLanguage(newLanguageTitle)

    const languageOption = googleTranslateLanguages.find(
      (language) => language.title === newLanguageTitle,
    )
    if (languageOption) {
      router.push(`/${languageOption.id}/docs`)
    }
  }

  return (
    <select
      id="language-select"
      className="border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      value={selectedLanguage}
      onChange={handleLanguageChange}
    >
      {googleTranslateLanguages.map(({ id, title }) => (
        <option key={id} value={title}>
          {title}
        </option>
      ))}
    </select>
  )
}

export default LanguageDropdown
