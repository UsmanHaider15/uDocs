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

  const linkBaseClasses = 'py-1.5'
  const activeClasses =
    'text-light-base dark:text-dark-base font-semibold bg-light-primary dark:bg-dark-primary rounded'
  const hoverClasses =
    'hover:text-light-base hover:dark:text-dark-base hover:font-semibold hover:bg-light-primary dark:hover:bg-dark-primary rounded hover:opacity-75'
  const fontClasses = hasNestedLinks
    ? 'font-semibold text-base'
    : 'font-light text-sm'

  const toggleNestedLinks = () => setIsOpen(!isOpen)

  return (
    <div>
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
