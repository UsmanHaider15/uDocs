import * as React from 'react'

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

export const TableOfContents = ({ headings }) => {
  const toc = createToC(headings)

  return (
    <ul
      className="overflow-y-auto py-2 px-0 m-0 text-sm leading-5 text-gray-800"
      style={{ listStyle: 'none', maxHeight: '70vh' }}
    >
      {toc.map((h2) => (
        <li key={h2.id} className="mt-2 mb-0">
          <a
            href={`#${h2.id}`}
            className="block text-gray-800 hover:text-blue-400 transition-colors duration-200 ease-in-out"
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
                    className="block text-neutral-400 hover:text-blue-400 transition-colors duration-200 ease-in-out"
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
