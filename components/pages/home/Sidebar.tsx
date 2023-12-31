'use client'
import React, { useState, FC } from 'react'

// Define the interface for the link structure
interface Link {
  title: string
  slug: string
  links?: Link[]
}

interface SidebarProps {
  links: Link[]
}

// The NavigationLink component that can recursively render itself to support nested links
const NavigationLink: FC<{ link: Link }> = ({ link }) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasNestedLinks = link.links && link.links.length > 0

  return (
    <div>
      <button
        className={`w-full text-left ${
          hasNestedLinks ? 'font-bold' : 'font-normal'
        }`}
        onClick={() => hasNestedLinks && setIsOpen(!isOpen)}
      >
        {link.title}
      </button>
      {hasNestedLinks && isOpen && (
        <div className="pl-4">
          {link.links &&
            link.links.map((nestedLink) => (
              <NavigationLink key={nestedLink.slug} link={nestedLink} />
            ))}
        </div>
      )}
    </div>
  )
}

// The Sidebar component that takes in the links props and renders the NavigationLink component
const Sidebar: FC<SidebarProps> = ({ links }) => {
  return (
    <aside>
      {links.map((link) => (
        <NavigationLink key={link.slug} link={link} />
      ))}
    </aside>
  )
}

export default Sidebar
