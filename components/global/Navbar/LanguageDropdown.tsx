'use client'
import React, { useState } from 'react'

interface LanguageDropdownProps {
  lang: string
}

const LanguageDropdown = ({ lang }: LanguageDropdownProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  const languages = ['English', 'French', 'Japanese']

  return (
    <select
      id="language-select"
      className="p-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
    >
      {languages.map((language, index) => (
        <option key={index} value={language}>
          {language}
        </option>
      ))}
    </select>
  )
}

export default LanguageDropdown
