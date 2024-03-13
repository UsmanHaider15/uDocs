import Link from 'next/link'
import React, { useState } from 'react'
import { TOCLink } from 'types'
import { usePathname } from 'next/navigation'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

const NavigationLink = ({
  link,
  language,
  version,
}: {
  link: TOCLink
  language: string
  version: string
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  const hasNestedLinks = link.links && link.links.length > 0

  const href = `/${language}/docs/${version}/${link.slug}`
  const isActive = pathname === href

  const linkBaseClasses = 'py-1.5 text-gray-900 dark:text-gray-100'
  const activeClasses =
    'text-primary dark:text-accent font-semibold bg-blue-100 dark:bg-gray-700 rounded' // Example modification
  const hoverClasses =
    'hover:font-semibold hover:bg-blue-100 dark:hover:bg-gray-700'
  const fontClasses = hasNestedLinks
    ? 'font-semibold text-base'
    : 'font-light text-sm'

  const toggleNestedLinks = () => setIsOpen(!isOpen)

  return (
    <div className="">
      <div
        className={`flex items-center justify-between ${
          isActive ? activeClasses : hoverClasses
        } px-2`}
      >
        <Link href={href}>
          <div
            className={`${linkBaseClasses} ${fontClasses}  cursor-pointer`}
            aria-current={isActive ? 'page' : undefined}
            // onClick={(e) => hasNestedLinks && e.preventDefault()}
          >
            {link.title}
          </div>
        </Link>
        {hasNestedLinks && (
          <button className="p-1" onClick={toggleNestedLinks}>
            {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>
        )}
      </div>
      {hasNestedLinks && isOpen && (
        <div className="pb-2">
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
