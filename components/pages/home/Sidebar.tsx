import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import React from 'react'

type Link = {
  title: string
  slug: string
}

type GroupedLink = {
  title: string
  slug: string
  links: Link[]
}

interface SidebarProps {
  groupedLinks: GroupedLink[]
}

const Sidebar: React.FC<SidebarProps> = ({ groupedLinks }) => {
  const renderLinks = (links: GroupedLink[] | Link[]) => (
    <ul>
      {links.map((link) => (
        <li key={link.slug}>
          <Link href={resolveHref('doc', link.slug)}>{link.title}</Link>
          {link.links && link.links.length > 0 && renderLinks(link.links)}
        </li>
      ))}
    </ul>
  )

  return <nav>{renderLinks(groupedLinks)}</nav>
}
export default Sidebar
