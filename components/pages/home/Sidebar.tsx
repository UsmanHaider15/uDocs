import Link from 'next/link'
import React, { FC } from 'react'
import { TOCLink } from 'types'

// Define the interface for the link structure
interface Link {
  title: string
  slug: string
  links?: Link[]
}

interface SidebarProps {
  toc: TOCLink
  language: string
  version: string
}

const NavigationLink: FC<{
  link: TOCLink
  language: string
  version: string
}> = ({ link, language, version }) => {
  const hasNestedLinks = link.links && link.links.length > 0

  return (
    <div className={`mt-1 ${hasNestedLinks ? 'mb-1' : ''}`}>
      {' '}
      <Link
        className={`block px-2 py-1 text-sm text-gray-800 hover:bg-blue-50 hover:text-blue-700 ${
          hasNestedLinks ? 'font-semibold' : 'font-normal'
        }`} // Reduced padding and smaller text size
        href={`/${language}/docs/${version}/${link.slug}`}
      >
        {link.title}
      </Link>
      {hasNestedLinks && (
        <div className="ml-2">
          {' '}
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

const Sidebar: FC<SidebarProps> = ({ toc, language, version }) => {
  return (
    <aside className="bg-white w-64 min-h-screen border-r border-gray-200 p-2">
      {' '}
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
  )
}

export default Sidebar
