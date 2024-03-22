import { getRecentBlogsSlugs } from 'lib/sanity.fetch'
import { toPlainText } from '@portabletext/react'
import { defineMetadata } from 'lib/utils.metadata'
import { Metadata } from 'next'
import { urlForImage } from 'lib/sanity.image'
import Link from 'next/link'
import ImageBox from 'components/shared/ImageBox'
import Image from 'next/image'

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
      {/* Uncomment and adjust the heading as needed. */}
      {/* <div className="my-6 text-4xl font-bold text-center text-light-text dark:text-dark-text">Recent Blogs</div> */}
      <div className="flex gap-4 flex-col md:flex-row">
        {data &&
          data.map((blog, index) => (
            <div
              key={index}
              className="p-4 max-w-sm bg-dark-secondary dark:bg-dark-secondary border border-light-secondary rounded-lg shadow-md hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <Link href={`/${params.lang}/blogs/${blog.slug}`}>
                {/* Assuming blog.coverImage is the path to your blog's image. Adjust as necessary. */}
                <ImageBox image={blog.converImage} alt={blog.title} />
              </Link>
              <div className="py-4">
                <Link href={`/${params.lang}/blogs/${blog.slug}`}>
                  <h5 className="text-lg  font-bold tracking-tight text-light-text dark:text-dark-text mb-2">
                    {blog.title}
                  </h5>
                </Link>
                <div className="text-sm mb-2">
                  {truncateTextAtWord(blog.overview, 150)} ...
                </div>
                <div className="text-sm">
                  {blog.author && (
                    <div className="flex">
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
                        <p className="font-semibold text-sm !m-0">
                          {blog.author.name}
                        </p>
                        <div className="text-sm">
                          {formatIsoTimestampToCustomFormat(blog._createdAt)} .{' '}
                          {blog.estimatedReadingTime} min read
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
