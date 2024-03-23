import React from 'react'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import type { BlogPagePayload } from 'types'
import ImageBox from 'components/shared/ImageBox'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

export interface BlogPageProps {
  data: BlogPagePayload | null
  lang: string
}

export function BlogPage({ data, lang }: BlogPageProps) {
  const { title, coverImage, body, author, _createdAt } = data ?? {}

  let formattedDate = ''
  if (_createdAt) {
    const date = new Date(_createdAt)
    formattedDate = date.toLocaleDateString('en-US', {
      month: 'long', // full month name
      day: 'numeric', // numeric day
      year: 'numeric', // 4 digit year
    })
  }

  const authorImageUrl =
    author && urlForImage(author.authorImage)?.fit('crop').url()

  return (
    <div className="flex mx-auto max-w-screen-sm">
      <article className="grow p-3">
        <div>{formattedDate}</div>
        {title && <h1 className="text-4xl font-bold mb-4">{title}</h1>}

        {author && (
          <div className="flex">
            {authorImageUrl && (
              <Image
                alt={'alt'}
                src={authorImageUrl}
                width={3500}
                height={2000}
                sizes={'100vw'}
                className="rounded-full w-12 h-12 mr-2 overflow-hidden"
              />
            )}
            <div className="text-sm">
              <p className="font-semibold !m-0">{author.name}</p>
              <p className="">{author.role}</p>
            </div>
          </div>
        )}

        <div className="py-4">
          <ImageBox image={coverImage} alt={title} />
        </div>

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
