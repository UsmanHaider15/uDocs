'use client'
import { useRouter } from 'next/navigation'

interface VersionDropdownProps {
  lang: string
  version: string
}

const VersionDropdown = ({ lang, version }: VersionDropdownProps) => {
  const router = useRouter()

  const versions = ['v1', 'v2']

  const handleVersionChange = (e) => {
    const newVersion = e.target.value
    router.push(`/${lang}/docs/${newVersion}`)
  }

  return (
    <select
      id="version-select"
      className="p-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      onChange={handleVersionChange}
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
