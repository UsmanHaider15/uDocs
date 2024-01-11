'use client'
import React, { useState, FC } from 'react'
import { TOCLink } from 'types'
import NavigationLink from './NavigationLink'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

interface SidebarProps {
  toc: TOCLink
  language: string
  version: string
}

const Sidebar: FC<SidebarProps> = ({ toc, language, version }) => {
  // State to manage the visibility of the sidebar on small screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="md:sticky md:top-[126px] md:h-[calc(100vh-121px)] md:w-[284px] md:flex md:shrink-0 md:flex-col md:justify-between border-b-2">
      {/* Button to toggle sidebar visibility on small screens */}
      <div className="w-full pb-2">
        <button
          className="md:hidden flex items-center justify-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}{' '}
          <span>Menu</span>
        </button>
      </div>

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
