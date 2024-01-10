'use client'
import React, { useState, FC } from 'react'
import { TOCLink } from 'types'
import NavigationLink from './NavigationLink'

interface SidebarProps {
  toc: TOCLink
  language: string
  version: string
}

const Sidebar: FC<SidebarProps> = ({ toc, language, version }) => {
  // State to manage the visibility of the sidebar on small screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="md:sticky md:w-[284px] md:flex md:shrink-0 md:flex-col md:justify-between">
      {/* Button to toggle sidebar visibility on small screens */}
      <button
        className="md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? 'Close' : 'Menu'}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white w-full md:w-64 min-h-screen border-r border-gray-200 p-2 transition-all ease-in-out duration-300 ${
          isSidebarOpen ? 'w-64' : 'hidden md:block'
        }`}
      >
        {toc.links &&
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
