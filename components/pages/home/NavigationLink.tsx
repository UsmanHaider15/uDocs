'use client'
import Link from 'next/link'
import React, { FC } from 'react'
import { TOCLink } from 'types'
import { usePathname } from 'next/navigation'

const NavigationLink: FC<{
  link: TOCLink
  language: string
  version: string
}> = ({ link, language, version }) => {
  const pathname = usePathname()

  const hasNestedLinks = link.links && link.links.length > 0

  // Construct the href for comparison
  const href = `/${language}/docs/${version}/${link.slug}`

  // Check if the current pathname matches the link's href
  const isActive = pathname === href

  return (
    <div className={`mt-1 ${hasNestedLinks ? 'mb-1' : ''}`}>
      <Link
        className={`block px-2 py-1 text-sm hover:bg-blue-50 hover:text-blue-700 ${
          hasNestedLinks ? 'font-semibold' : 'font-normal'
        } ${isActive ? 'bg-blue-100 text-blue-700' : ''}`} // Add conditional styling for active link
        href={href}
      >
        {link.title}
      </Link>
      {hasNestedLinks && (
        <div className="ml-2">
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

export default NavigationLink
