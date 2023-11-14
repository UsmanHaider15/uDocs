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
  return (
    <nav>
      <ul>
        {groupedLinks.map((group) => (
          <li key={group.slug}>
            <Link href={`/docs/${group.slug}`}>{group.title}</Link>
            {group.links && group.links.length > 0 && (
              <ul>
                {group.links.map((link) => (
                  <li key={link.slug}>
                    <Link href={`/docs/${link.slug}`}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar
