import * as React from 'react'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import Link from 'next/link'
import type { DocPagePayload, TOCLink } from 'types'
import { TableOfContents } from 'components/shared/TableOfContent'

export interface DocPageProps {
  data: DocPagePayload | null
  docNavigation: TOCLink[] | null
}

export function DocPage({ data, docNavigation }: DocPageProps) {
  const { body, title, headings, previousDoc, nextDoc } = data ?? {}

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
        <div className="flex justify-between px-2 py-4">
          {previousDoc?.title && (
            <Link
              href={`/en/docs/v1/${previousDoc.slug}`}
              className="text-blue-600 hover:text-blue-800"
            >
              ← {previousDoc.title}
            </Link>
          )}

          {nextDoc?.title && (
            <Link
              href={`/en/docs/v1/${nextDoc.slug}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {nextDoc.title} →
            </Link>
          )}
        </div>
      </article>
    </>
  )
}

export default DocPage
