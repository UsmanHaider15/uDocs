import { getRecentBlogsSlugs } from 'lib/sanity.fetch'
import { toPlainText } from '@portabletext/react'
import { defineMetadata } from 'lib/utils.metadata'
import { Metadata } from 'next'

import Link from 'next/link'
import ImageBox from 'components/shared/ImageBox'

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
      <div className="my-6 text-4xl font-bold text-center">Recent Blogs</div>
      <div className="flex gap-4">
        {data &&
          data.map((blog) => (
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
              <Link href={`/${params.lang}/blogs/${blog.slug}`}>
                {/* Assuming blog.imageSrc is the path to your blog's image. Adjust as necessary. */}
                <ImageBox image={blog.poster} alt={blog.title} />
              </Link>
              <div className="p-5">
                <Link href={`/${params.lang}/blogs/${blog.slug}`}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {blog.title}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700">
                  {toPlainText(blog.overview)}
                </p>
                <Link
                  href={`/${params.lang}/blogs/${blog.slug}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
