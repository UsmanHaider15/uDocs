'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { FaCaretDown } from 'react-icons/fa'
import ReactCountryFlag from 'react-country-flag'

// Assuming googleTranslateLanguages is correctly imported
import { googleTranslateLanguages } from 'settings'

interface LanguageDropdownProps {
  lang: string
}

const LanguageDropdown = ({ lang }: LanguageDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const router = useRouter()

  const currentLanguage = googleTranslateLanguages.find(
    (language) => language.id === lang,
  )

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const handleLanguageChange = (newLang) => {
    setIsDropdownOpen(false)
    router.push(`/${newLang}/docs`)
  }

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          id="dropdownNavbarLink"
          onClick={toggleDropdown}
          className="flex items-center w-full px-2 text-sm font-medium text-gray-700 hover:text-blue-500"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <ReactCountryFlag
            countryCode={currentLanguage?.countryCode}
            className="mr-1"
          />
          {currentLanguage ? currentLanguage.title : 'Select Language'}{' '}
          <FaCaretDown className="ml-1" />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            {googleTranslateLanguages.map(({ id, title, countryCode }) => (
              <a
                href="#"
                key={id}
                onClick={(e) => {
                  e.preventDefault()
                  handleLanguageChange(id)
                }}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              >
                <ReactCountryFlag countryCode={countryCode} className="mr-1" />
                {title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageDropdown
