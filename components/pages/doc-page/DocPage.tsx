import React from 'react'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import Link from 'next/link'
import type { DocPagePayload, TOCLink } from 'types'
import { TableOfContents } from 'components/shared/TableOfContent'
import { IoMdHome } from 'react-icons/io'

export interface DocPageProps {
  data: DocPagePayload | null
  docNavigation: TOCLink[] | null
  lang: string
  version: string
}

export function DocPage({ data, lang, version, docNavigation }: DocPageProps) {
  const { body, title, headings, previousDoc, nextDoc } = data ?? {}

  return (
    <div className="flex flex-col md:flex-row grow">
      <article className="grow p-3">
        <div className="flex item-center mb-4">
          <Link
            href={`/${lang}`}
            className="text-blue-700 hover:underline hover:font-semibold"
          >
            <IoMdHome size={22} />
          </Link>
          <span className="text-gray-500 px-2"> / </span>
          {docNavigation &&
            docNavigation.map((link, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-gray-500 px-2"> / </span>}
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
          <CustomPortableText
            paragraphClasses="max-w-3xl mb-4"
            value={body}
            lang={lang}
            version={version}
          />
        )}

        <div className="flex justify-between items-center px-2 py-4">
          {previousDoc && previousDoc.slug && previousDoc.title ? (
            <Link
              href={`/${lang}/docs/${version}/${previousDoc.slug}`}
              className="text-blue-700 hover:underline hover:font-semibold"
            >
              ← {previousDoc.title}
            </Link>
          ) : (
            <span></span> // Placeholder to keep the layout but not display anything
          )}
          {nextDoc && nextDoc.slug && nextDoc.title ? (
            <Link
              href={`/${lang}/docs/${version}/${nextDoc.slug}`}
              className="text-blue-700 hover:underline hover:font-semibold"
            >
              {nextDoc.title} →
            </Link>
          ) : (
            <span></span>
          )}
        </div>
      </article>

      <nav className="flex-none w-56 sticky top-20 h-screen overflow-y-auto p-2 hidden md:block">
        {headings && headings.length > 0 && (
          <TableOfContents headings={headings} />
        )}
      </nav>
    </div>
  )
}

export default DocPage
