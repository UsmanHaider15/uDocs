import * as React from 'react'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import Link from 'next/link'
import type { PagePayload, TOCLink } from 'types'

export interface PageProps {
  data: PagePayload | null
  docNavigation: TOCLink[] | null
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

const TableOfContents = ({ headings }) => {
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

export function DocPage({ data, docNavigation }: PageProps) {
  const { body, title, headings } = data ?? {}

  return (
    <>
      <nav className="order-last hidden w-56 shrink-0 lg:block p-2">
        <div className="sticky top-[126px] h-[calc(100vh-121px)]">
          {headings ? <TableOfContents headings={headings} /> : null}
        </div>
      </nav>

      <article className="w-full min-w-0 max-w-6xl mx-auto p-2">
        <div className="py-2">
          {docNavigation &&
            docNavigation.map((link, index) => (
              <React.Fragment key={link.slug}>
                {index > 0 && <span className="text-gray-500">/</span>}
                <Link
                  href={`/en/docs/v1/${link.slug}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {link.title}
                </Link>
              </React.Fragment>
            ))}
        </div>

        {title && (
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{title}</h1>
        )}
        {body && (
          <CustomPortableText
            paragraphClasses="max-w-3xl mx-auto mb-4"
            value={body}
          />
        )}
      </article>
    </>
  )
}

export default DocPage
