'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { versions } from 'settings'
import { FaCaretDown } from 'react-icons/fa'

interface VersionDropdownProps {
  lang: string
  version: string
}

const VersionDropdown = ({ lang, version }: VersionDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const router = useRouter()

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const handleVersionChange = (newVersion) => {
    setIsDropdownOpen(false) // Close the dropdown when a version is selected
    router.push(`/${lang}/docs/${newVersion}`)
  }

  const currentVersion = versions.find(
    (versionObj) => versionObj.id === version,
  )

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      // @ts-ignore
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
          {currentVersion ? currentVersion.title : 'Select Version'}{' '}
          <FaCaretDown className="ml-1" />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="none">
            {versions.map(({ id, title }) => (
              <a
                href="#"
                key={id}
                onClick={(e) => {
                  e.preventDefault()
                  handleVersionChange(id)
                }}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              >
                {title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default VersionDropdown
