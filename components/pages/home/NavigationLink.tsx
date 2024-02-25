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

  const linkBaseClasses =
    'block px-2 py-1 text-base transition-colors duration-150 ease-in-out'
  const activeClasses = 'text-blue-700 font-semibold'
  const hoverClasses = 'hover:text-blue-700 hover:font-semibold'
  const fontClasses = hasNestedLinks ? 'font-semibold' : 'font-normal'
  const toggleNestedLinks = () => setIsOpen(!isOpen)

  return (
    <div className={`mt-1 ${hasNestedLinks ? 'mb-1' : 'mb-1'}`}>
      <div className="flex items-center justify-between">
        <Link href={href}>
          <div
            className={`${linkBaseClasses} ${fontClasses} ${
              isActive ? activeClasses : hoverClasses
            } cursor-pointer`}
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
