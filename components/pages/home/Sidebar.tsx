'use client'
import { useState, useEffect, FC } from 'react'
import { TOCLink } from 'types'
import NavigationLink from './NavigationLink'
import { FiMenu, FiX } from 'react-icons/fi' // Importing icons

interface SidebarProps {
  toc: TOCLink
  language: string
  version: string
}

const Sidebar: FC<SidebarProps> = ({ toc, language, version }) => {
  const [isLinksVisible, setIsLinksVisible] = useState(true)

  // Function to toggle the visibility state
  const toggleLinksVisibility = () => {
    setIsLinksVisible(!isLinksVisible)
  }

  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is greater than the Tailwind md breakpoint (768px by default)
      if (window.innerWidth >= 768) {
        setIsLinksVisible(true) // Ensure links are visible on larger screens
      }
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Call the handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty dependency array means this effect runs once on mount

  return (
    <div className="flex-none md:w-56 md:sticky md:top-20 md:h-screen">
      <aside>
        {/* Toggle Button with Icon - only shown on small screens */}
        <button
          onClick={toggleLinksVisibility}
          className="w-full flex border-b-2 p-3 md:hidden"
        >
          {isLinksVisible ? <FiX /> : <FiMenu />}
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
