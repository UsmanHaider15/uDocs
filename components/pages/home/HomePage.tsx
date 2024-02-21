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
          {/* {title && <Header centered title={title} description={overview} />} */}
          <div
            style={{
              fontSize: 49,
              fontWeight: 500,
              letterSpacing: -0.5,
              lineHeight: '52px',
              marginBottom: 24.5,
              color: 'rgb(16, 17, 18)',
            }}
          >
            Next Gen Documentation Website
          </div>
          <div
            className="mx-auto"
            style={{
              fontSize: 20,
              fontWeight: 500,
              lineHeight: '32px',
              maxWidth: 640,
              color: 'rgb(86, 93, 103)',
            }}
          >
            An optimized site generator in Next.js and Sanity CMS. uDocs helps
            you to move fast and write content. Build documentation websites,
            blogs, marketing pages, and more.
          </div>
        </div>
        <div
          className="flex justify-center space-x-4"
          style={{ marginTop: 32 }}
        >
          {' '}
          {/* Adjusted for consistency */}
          <div className="text-center">
            <button
              type="button"
              className="text-white bg-gray-800 border-2 border-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-3 mb-2"
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
              className="text-gray-800 bg-white border border-gray-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-3 mb-2"
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
        <div
          className="text-center"
          style={{
            fontSize: 39,
            fontWeight: 500,
            lineHeight: '44px',
            marginBottom: 24.5,
            color: 'rgb(16, 17, 18)',
          }}
        >
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
                    <div
                      style={{
                        fontSize: 25,
                        fontWeight: 500,
                        lineHeight: '28px',
                        marginBottom: 19.5,
                        color: 'rgb(16, 17, 18)',
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        lineHeight: '28px',
                        color: 'rgb(86, 93, 103)',
                      }}
                    >
                      {description}
                    </div>{' '}
                    {/* Removed font-serif for consistency */}
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
          <div
            className="text-center"
            style={{
              fontSize: 39,
              fontWeight: 500,
              lineHeight: '44px',
              marginBottom: 24.5,
              color: 'rgb(16, 17, 18)',
            }}
          >
            More features developers love
          </div>
        </div>
        <FeatureGrid />
      </div>
    </div>
  )
}

export default HomePage
