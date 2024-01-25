'use client'
import { useRouter } from 'next/navigation'
import { versions } from 'settings'

interface VersionDropdownProps {
  lang: string
  version: string
}

const VersionDropdown = ({ lang, version }: VersionDropdownProps) => {
  const router = useRouter()

  const handleVersionChange = (e) => {
    const newVersion = e.target.value
    router.push(`/${lang}/docs/${newVersion}`)
  }

  return (
    <div className="relative w-12">
      {' '}
      {/* Matched width with LanguageDropdown */}
      <select
        id="version-select"
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-1 text-sm rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        onChange={handleVersionChange}
      >
        {versions.map((versionObj) => (
          <option key={versionObj.id} value={versionObj.id}>
            {versionObj.title}
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

export default VersionDropdown
