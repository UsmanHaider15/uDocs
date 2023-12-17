'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { resolveHref } from 'lib/sanity.links'
import { TOCLink } from 'types'

interface SidebarProps {
  groupedLinks: TOCLink[]
  languag: string
}

const Sidebar: React.FC<SidebarProps> = ({ groupedLinks, languag }) => {
  // State to keep track of the selected version
  const [selectedVersion, setSelectedVersion] = useState(
    groupedLinks[0]?.title || '',
  )

  const renderLinks = (links: TOCLink[]) => (
    <ul>
      {links.map((link) => (
        <li key={link.slug}>
          <Link href={`/${languag}${resolveHref('doc', link.slug)}`} passHref>
            {link.title}
          </Link>
          {link.links && link.links.length > 0 && renderLinks(link.links)}
        </li>
      ))}
    </ul>
  )

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(e.target.value)
  }

  // Filter the links based on the selected version
  const filteredLinks =
    groupedLinks.find((group) => group.title === selectedVersion)?.links || []

  return (
    <nav>
      <select value={selectedVersion} onChange={handleVersionChange}>
        {groupedLinks.map((group) => (
          <option key={group.title} value={group.title}>
            {group.title}
          </option>
        ))}
      </select>
      {renderLinks(filteredLinks)}
    </nav>
  )
}

export default Sidebar
