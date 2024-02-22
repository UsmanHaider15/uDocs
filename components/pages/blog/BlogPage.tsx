import React from 'react'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import Link from 'next/link'
import type { DocPagePayload, TOCLink } from 'types'
import { TableOfContents } from 'components/shared/TableOfContent'

export interface BlogPageProps {
  data: DocPagePayload | null
  lang: string
}

export function BlogPage({ data, lang }: BlogPageProps) {
  const { body, title, headings, previousDoc, nextDoc } = data ?? {}

  return (
    <div className="flex flex-col md:flex-row grow">
      <article className="grow p-3">
        {title && <h1 className="text-4xl font-bold mb-4">{title}</h1>}
        {body && (
          <CustomPortableText
            paragraphClasses="max-w-3xl mb-4"
            value={body}
            lang={lang}
          />
        )}

        <div className="flex justify-between items-center px-2 py-4">
          {previousDoc && previousDoc.slug && previousDoc.title ? (
            <Link
              href={`/${lang}/blogs/${previousDoc.slug}`}
              className="text-blue-700 hover:underline hover:font-semibold"
            >
              ← {previousDoc.title}
            </Link>
          ) : (
            <span></span> // Placeholder to keep the layout but not display anything
          )}
          {nextDoc && nextDoc.slug && nextDoc.title ? (
            <Link
              href={`/${lang}/blogs/${nextDoc.slug}`}
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

export default BlogPage
