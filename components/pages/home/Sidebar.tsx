import { resolveHref } from 'lib/sanity.links'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import React from 'react'
import { TOCLink } from 'types'

interface SidebarProps {
  groupedLinks: TOCLink[]
  languag: string
}

const Sidebar: React.FC<SidebarProps> = ({ groupedLinks, languag }) => {
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

  return <nav>{renderLinks(groupedLinks)}</nav>
}

export default Sidebar
