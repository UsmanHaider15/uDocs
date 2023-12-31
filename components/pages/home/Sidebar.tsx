import Link from 'next/link'
import React, { FC } from 'react'

// Define the interface for the link structure
interface Link {
  title: string
  slug: string
  links?: Link[]
}

interface SidebarProps {
  links: Link[]
  language: string
  version: string
}

// The NavigationLink component as a stateless component
const NavigationLink: FC<{ link: Link; language: string; version: string }> = ({
  link,
  language,
  version,
}) => {
  const hasNestedLinks = link.links && link.links.length > 0

  return (
    <div>
      <Link
        className={`w-full text-left ${
          hasNestedLinks ? 'font-bold' : 'font-normal'
        }`}
        href={`/${language}/docs/${version}/${link.slug}`}
      >
        {link.title}
      </Link>
      {hasNestedLinks && (
        <div className="pl-4">
          {link.links?.map((nestedLink) => (
            <NavigationLink
              key={nestedLink.slug}
              link={nestedLink}
              language={language}
              version={version}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// The Sidebar component that takes in the links props and renders the NavigationLink component
const Sidebar: FC<SidebarProps> = ({ links, language, version }) => {
  return (
    <aside>
      {links.map((link) => (
        <NavigationLink
          key={link.slug}
          link={link}
          language={language}
          version={version}
        />
      ))}
    </aside>
  )
}

export default Sidebar
