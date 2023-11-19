import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import React from 'react'

type Link = {
  title: string
  slug: string
  links?: Link[] // Optional nested links
}

interface SidebarProps {
  groupedLinks: Link[] // Use the Link type here
}

const Sidebar: React.FC<SidebarProps> = ({ groupedLinks }) => {
  const renderLinks = (links: Link[]) => (
    <ul>
      {links.map((link) => (
        <li key={link.slug}>
          <Link href={resolveHref('doc', link.slug)} passHref>
            {link.title}
          </Link>
          {link.links && link.links.length > 0 && renderLinks(link.links)}
        </li>
      ))}
    </ul>
  )

  return <nav>{renderLinks(groupedLinks)}</nav>
}

export default Sidebar
