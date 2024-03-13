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
      {/* Uncomment and adjust the heading as needed. */}
      {/* <div className="my-6 text-4xl font-bold text-center text-gray-900 dark:text-gray-100">Recent Blogs</div> */}
      <div className="flex gap-4 flex-col md:flex-row">
        {data &&
          data.map((blog, index) => (
            <div
              key={index}
              className="max-w-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow"
            >
              <Link href={`/${params.lang}/blogs/${blog.slug}`}>
                {/* Assuming blog.coverImage is the path to your blog's image. Adjust as necessary. */}
                <ImageBox image={blog.converImage} alt={blog.title} />
              </Link>
              <div className="p-5">
                <Link href={`/${params.lang}/blogs/${blog.slug}`}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    {blog.title}
                  </h5>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
