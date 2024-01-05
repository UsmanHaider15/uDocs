'use client'
import React, { useState } from 'react'

interface VersionDropdownProps {
  lang: string
  version: string
}
const VersionDropdown = ({ lang, version }) => {
  const [selectedVersion, setSelectedVersion] = useState('v1')

  const versions = ['v1', 'v2']

  return (
    <select
      id="version-select"
      className="p-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      value={selectedVersion}
      onChange={(e) => setSelectedVersion(e.target.value)}
    >
      {versions.map((version, index) => (
        <option key={index} value={version}>
          {version}
        </option>
      ))}
    </select>
  )
}

export default VersionDropdown
