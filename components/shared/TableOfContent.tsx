'use client'
import * as React from 'react'

export const TableOfContents = ({ headings }) => {
  const [activeId, setActiveId] = React.useState('')
  const toc = createToC(headings)

  const findActiveHeader = () => {
    let lastPassedHeaderId = ''
    for (let heading of headings) {
      const element = document.getElementById(heading._key)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.1) {
          // Adjust this threshold as needed
          lastPassedHeaderId = heading._key
        } else {
          break // Exit the loop once you find the first header below the threshold
        }
      }
    }
    return lastPassedHeaderId
  }

  React.useEffect(() => {
    const handleScroll = () => {
      const newActiveId = findActiveHeader()
      if (newActiveId !== activeId) {
        setActiveId(newActiveId)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings, activeId])

  return (
    <ul
      className="overflow-y-auto py-2 px-0 m-0 text-sm leading-5"
      style={{ listStyle: 'none', maxHeight: '70vh' }}
    >
      {toc.map((h2) => (
        <li key={h2.id} className="mt-2 mb-0">
          <a
            href={`#${h2.id}`}
            className={`block hover:text-blue-400 transition-colors duration-200 ease-in-out ${
              activeId === h2.id ? 'text-blue-600 font-bold' : ''
            }`}
            style={{ textDecoration: 'none', lineHeight: '1.6' }}
          >
            {h2.title}
          </a>
          {h2.children.length > 0 && (
            <ul className="pl-3">
              {h2.children.map((h3) => (
                <li key={h3.id} className="mt-2 mb-0">
                  <a
                    href={`#${h3.id}`}
                    className={`block text-neutral-400 hover:text-blue-400 transition-colors duration-200 ease-in-out ${
                      activeId === h3.id ? 'text-blue-600 font-bold' : ''
                    }`}
                    style={{ textDecoration: 'none', lineHeight: '1.6' }}
                  >
                    {h3.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

function createToC(headings: any[]) {
  const toc: any[] = []
  let currentH2: any = null

  headings.forEach((heading) => {
    if (heading._type === 'block' && heading.style === 'h2') {
      currentH2 = {
        title: heading.children[0].text,
        id: heading._key,
        children: [],
      }
      toc.push(currentH2)
    } else if (
      heading._type === 'block' &&
      heading.style === 'h3' &&
      currentH2
    ) {
      currentH2.children.push({
        title: heading.children[0].text,
        id: heading._key,
      })
    }
  })

  return toc
}
