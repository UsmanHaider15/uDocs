import React from 'react'
import Link from 'next/link'
import { TOCLink } from 'types'

interface SidebarProps {
  data: {
    title: string
    slug: string
    links: TOCLink[]
  }
  language: string
}

const Sidebar: React.FC<SidebarProps> = ({ data, language, version }) => {
  const renderLinks = (links: TOCLink[]) => (
    <ul>
      {links.map((link) => (
        <li key={link.slug}>
          <Link href={`/${language}/docs/${version}/${link.slug}`}>
            {link.title}
          </Link>
          {link.links && link.links.length > 0 && renderLinks(link.links)}
        </li>
      ))}
    </ul>
  )

  return (
    <nav>
      <h2>{data.title}</h2>
      {renderLinks(data.links)}
    </nav>
  )
}

export default Sidebar
