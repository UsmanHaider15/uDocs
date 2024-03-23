import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { toPlainText } from '@portabletext/react'

import { urlForImage } from 'lib/sanity.image'
import { getRecentBlogsSlugs } from 'lib/sanity.fetch'
import { defineMetadata } from 'lib/utils.metadata'
import ImageBox from 'components/shared/ImageBox'

// Type definition at the top
type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return defineMetadata({
    description: 'List of all Recent Blogs',
    title: 'Blogs Page',
  })
}

export default async function BlogSlugRoute({ params }: Props) {
  const data = await getRecentBlogsSlugs(params.lang)

  return (
    <div className="w-full">
      <div className="flex gap-4 flex-col md:flex-row">
        {data &&
          data.map((blog, index) => (
            <div
              key={index}
              className="p-4 max-w-sm bg-dark-secondary dark:bg-dark-secondary border border-light-secondary rounded-lg shadow-md hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <Link href={`/${params.lang}/blogs/${blog.slug}`}>
                <ImageBox image={blog.coverImage} alt={blog.title} />
                <div className="py-4">
                  <h5 className="text-lg font-bold leading-5 tracking-tight text-light-text dark:text-dark-text mb-2">
                    {blog.title}
                  </h5>
                  <div className="text-sm leading-4 mb-2">
                    {truncateTextAtWord(blog.overview, 150)} ...
                  </div>
                  {blog.author && (
                    <div className="text-sm flex">
                      {blog.author.authorImage && (
                        <Image
                          alt={'alt'}
                          src={urlForImage(blog.author.authorImage)
                            ?.fit('crop')
                            .url()}
                          width={3500}
                          height={2000}
                          sizes={'100vw'}
                          className="rounded-full w-12 h-12 mr-2 overflow-hidden"
                        />
                      )}
                      <div>
                        <p className="font-semibold !m-0">{blog.author.name}</p>
                        <div>
                          {formatIsoTimestampToCustomFormat(blog._createdAt)} .{' '}
                          {blog.estimatedReadingTime} min read
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

function formatIsoTimestampToCustomFormat(isoTimestamp: string): string {
  const date = new Date(isoTimestamp)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-US', options)
}

function truncateTextAtWord(content, maxLength) {
  // Convert to plain text
  const plainText = toPlainText(content)

  // Initial slice
  let sliceEnd = maxLength
  let textSlice = plainText.slice(0, sliceEnd)

  // Check if we're cutting off in the middle of a word and if so, truncate at the last space
  if (
    sliceEnd < plainText.length &&
    plainText[sliceEnd] !== ' ' &&
    textSlice[sliceEnd - 1] !== ' '
  ) {
    let lastSpaceIndex = textSlice.lastIndexOf(' ')
    if (lastSpaceIndex > 0) {
      textSlice = textSlice.slice(0, lastSpaceIndex)
    }
  }

  return textSlice
}
