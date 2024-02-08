import * as React from 'react'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import Link from 'next/link'
import type { DocPagePayload, TOCLink } from 'types'
import { TableOfContents } from 'components/shared/TableOfContent'

export interface DocPageProps {
  data: DocPagePayload | null
  docNavigation: TOCLink[] | null
  lang: string
  version: string
}

export function DocPage({ data, lang, version, docNavigation }: DocPageProps) {
  const { body, title, headings, previousDoc, nextDoc } = data ?? {}

  return (
    <>
      <article className="grow p-3">
        <div>
          {docNavigation &&
            docNavigation.map((link, index) => (
              <React.Fragment key={link.slug}>
                {index > 0 && <span className="text-gray-500"> / </span>}
                <Link
                  href={`/${lang}/docs/${version}/${link.slug}`}
                  className="text-blue-600 hover:text-blue-800"
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
        <div className="flex justify-between px-2 py-4">
          {previousDoc?.title && (
            <Link
              href={`/${lang}/docs/${version}/${previousDoc.slug}`}
              className="text-blue-600 hover:text-blue-800"
            >
              ← {previousDoc.title}
            </Link>
          )}

          {nextDoc?.title && (
            <Link
              href={`/${lang}/docs/${version}/${nextDoc.slug}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {nextDoc.title} →
            </Link>
          )}
        </div>
      </article>
      <nav className="flex-none hidden md:block w-56 sticky top-20 h-screen">
        <div>
          {headings && headings.length ? (
            <TableOfContents headings={headings} />
          ) : null}
        </div>
      </nav>
    </>
  )
}

export default DocPage
