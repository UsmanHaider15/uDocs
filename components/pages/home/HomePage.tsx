import { Header } from 'components/shared/Header'
import ImageBox from 'components/shared/ImageBox'
import Link from 'next/link'
import type { HomePagePayload } from 'types'
import FeatureGrid from './FeatureGrid'
import { FaArrowRightLong } from 'react-icons/fa6'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'

export interface HomePageProps {
  data: HomePagePayload | null
  lang: string
}

export function HomePage({ data, lang }: HomePageProps) {
  const { features, overview = [], title = '' } = data ?? {}

  return (
    <div className="flex flex-col px-2 py-4 mx-auto max-w-screen-xl md:px-0">
      <div className="mb-24 mt-5">
        <div className="text-center">
          <div className="text-6xl font-medium leading-tight mb-4">
            Next Gen Documentation Website
          </div>
          <div className="mx-auto text-lg font-medium leading-relaxed max-w-2xl text-gray-600 dark:text-gray-400 mb-4">
            An optimized site generator in Next.js and Sanity CMS. uDocs helps
            you to move fast and write content. Build documentation websites,
            blogs, marketing pages, and more.
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <div className="text-center">
            <button
              type="button"
              className="inline-flex justify-center items-center px-5 py-3 border-2 font-medium text-sm bg-light-primary border-light-primary text-white hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-light-primary rounded-lg mb-2 dark:bg-dark-primary dark:border-dark-primary dark:hover:bg-dark-secondary dark:focus:ring-dark-primary"
            >
              <Link
                href={`/${lang}/docs/v1/introduction`}
                className="flex justify-center items-center"
              >
                Documentation <FaArrowRightLong className="ml-2" />
              </Link>
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="inline-flex justify-center items-center px-5 py-3 border font-medium text-sm bg-accent text-primary hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-accent rounded-lg mb-2 dark:bg-dark-accent dark:text-dark-primary dark:hover:shadow-lg dark:focus:ring-dark-accent"
            >
              <Link
                href={`https://github.com/UsmanHaider15/uDocs`}
                className="flex justify-center items-center"
              >
                Github <FaArrowUpRightFromSquare className="ml-2" />
              </Link>
            </button>
          </div>
        </div>
      </div>

      <div className="mb-24">
        <div className="text-center text-5xl font-medium leading-tight mb-6">
          Features you&apos;ll love
        </div>
        <div>
          {features &&
            features.map(({ title, description, image }, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  className={`flex flex-col gap-4 py-2 md:flex-row ${
                    isEven ? '' : 'md:flex-row-reverse'
                  } md:py-4`}
                  key={title}
                >
                  <div className="text-left basis-1/2">
                    <div className="text-4xl font-medium leading-tight mb-5 text-light-text dark:text-dark-text">
                      {title}
                    </div>
                    <div className="text-lg font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                      {description}
                    </div>
                  </div>
                  <ImageBox
                    image={image}
                    alt={'value.alt'}
                    classesWrapper="rounded-lg ml-5 basis-1/2"
                  />
                </div>
              )
            })}
        </div>
      </div>

      <div className="mb-24">
        <div className="flex flex-col items-center">
          <div className="text-center text-5xl font-medium leading-tight mb-6 text-light-text dark:text-dark-text">
            More features developers love
          </div>
        </div>
        <FeatureGrid />
      </div>
    </div>
  )
}

export default HomePage
