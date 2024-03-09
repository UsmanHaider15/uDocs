import React from 'react'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import Link from 'next/link'
import type { BlogPagePayload, DocPagePayload, TOCLink } from 'types'
import { TableOfContents } from 'components/shared/TableOfContent'
import ImageBox from 'components/shared/ImageBox'

export interface BlogPageProps {
  data: BlogPagePayload | null
  lang: string
}

export function BlogPage({ data, lang }: BlogPageProps) {
  const { title, converImage, overview, body, author, _createdAt } = data ?? {}

  return (
    <div className="flex flex-col md:flex-row grow">
      <article className="grow p-3">
        {title && <h1 className="text-4xl font-bold mb-4">{title}</h1>}
        {author && author.name}
        {author && author.role}
        {author && author.authorImage && (
          <ImageBox image={author.authorImage} alt={author.name} />
        )}

        {overview && (
          <CustomPortableText
            paragraphClasses="max-w-3xl mb-4"
            value={overview}
            lang={lang}
          />
        )}

        <ImageBox image={converImage} alt={title} />

        {body && (
          <CustomPortableText
            paragraphClasses="max-w-3xl mb-4"
            value={body}
            lang={lang}
          />
        )}
      </article>
    </div>
  )
}

export default BlogPage
