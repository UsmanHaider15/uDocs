import { resolveHref } from 'lib/sanity.links'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import React from 'react'
import { TOCLink } from 'types'

interface SidebarProps {
  groupedLinks: TOCLink[]
}

const Sidebar: React.FC<SidebarProps> = ({ groupedLinks }) => {
  const renderLinks = (links: TOCLink[]) => (
    <ul>
      {links.map((link) => (
        <li key={link.slug}>
          <Link href={resolveHref('doc', link.slug) as Url} passHref>
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
