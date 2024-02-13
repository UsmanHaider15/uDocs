import React from 'react'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import Link from 'next/link'
import type { DocPagePayload, TOCLink } from 'types'
import { TableOfContents } from 'components/shared/TableOfContents'

export function DocPage({ data, lang, version, docNavigation }: DocPageProps) {
  const { body, title, headings, previousDoc, nextDoc } = data ?? {}

  return (
    <div className="flex flex-col md:flex-row">
      <article className="grow p-3 py-6">
        <div className="mb-4">
          {docNavigation &&
            docNavigation.map((link, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-gray-500"> / </span>}
                <Link
                  href={`/${lang}/docs/${version}/${link.slug}`}
                  className="text-blue-700 hover:underline hover:font-semibold"
                >
                  {link.title}
                </Link>
              </React.Fragment>
            ))}
        </div>

        {title && <h1 className="text-4xl font-bold mb-4">{title}</h1>}
        {body && (
          <CustomPortableText paragraphClasses="max-w-3xl mb-4" value={body} />
        )}

        <div className="flex justify-between items-center px-2 py-4">
          {previousDoc && (
            <Link
              href={`/${lang}/docs/${version}/${previousDoc.slug}`}
              className="text-blue-700 hover:underline hover:font-semibold"
            >
              ← {previousDoc.title}
            </Link>
          )}
          {nextDoc && (
            <Link
              href={`/${lang}/docs/${version}/${nextDoc.slug}`}
              className="text-blue-700 hover:underline hover:font-semibold"
            >
              {nextDoc.title} →
            </Link>
          )}
        </div>
      </article>

      <nav className="flex-none w-56 sticky top-20 h-screen overflow-y-auto p-4 hidden md:block">
        {headings && headings.length > 0 && (
          <TableOfContents headings={headings} />
        )}
      </nav>
    </div>
  )
}

export default DocPage
