'use client'
import React, { useState, useEffect } from 'react'
import { googleTranslateLanguages } from 'settings'
import { useRouter } from 'next/navigation'

interface LanguageDropdownProps {
  lang: string
}

const LanguageDropdown = ({ lang }: LanguageDropdownProps) => {
  const router = useRouter()

  const handleLanguageChange = (e) => {
    const newLang = e.target.value
    router.push(`/${newLang}/docs`)
  }

  return (
    <div className="relative w-24">
      <select
        id="language-select"
        value={lang}
        onChange={handleLanguageChange}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-1 text-sm rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {googleTranslateLanguages.map(({ id, title }) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <svg
          className="fill-current h-3 w-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.59 7l5 5 5-5H5.59z" />
        </svg>
      </div>
    </div>
  )
}

export default LanguageDropdown
