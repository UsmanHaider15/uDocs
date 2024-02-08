'use client'
// Add the import statement at the top of your file
import { useState, FC } from 'react'
import { TOCLink } from 'types'
import NavigationLink from './NavigationLink'
import { FiMenu, FiX } from 'react-icons/fi' // Importing icons

interface SidebarProps {
  toc: TOCLink
  language: string
  version: string
}

const Sidebar: FC<SidebarProps> = ({ toc, language, version }) => {
  // State to manage the visibility of the NavigationLink components
  const [isLinksVisible, setIsLinksVisible] = useState(true)

  // Function to toggle the visibility state
  const toggleLinksVisibility = () => {
    setIsLinksVisible(!isLinksVisible)
  }

  return (
    <div className="flex-none md:w-56 md:sticky md:top-20 md:h-screen">
      {/* Sidebar */}
      <aside>
        {/* Toggle Button with Icon */}
        <button
          onClick={toggleLinksVisibility}
          className="w-full flex border-b-2 p-3 md:hidden"
        >
          {isLinksVisible ? <FiX /> : <FiMenu />}{' '}
        </button>

        {/* Conditionally render NavigationLinks based on isLinksVisible state */}
        {isLinksVisible &&
          toc.links &&
          toc.links.map((link) => (
            <NavigationLink
              key={link.slug}
              link={link}
              language={language}
              version={version}
            />
          ))}
      </aside>
    </div>
  )
}

export default Sidebar
