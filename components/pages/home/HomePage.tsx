import { Header } from 'components/shared/Header'
import ImageBox from 'components/shared/ImageBox'
import Link from 'next/link'
import type { HomePagePayload } from 'types'
import FeatureGrid from './FeatureGrid'

export interface HomePageProps {
  data: HomePagePayload | null
  lang: string
}

export function HomePage({ data, lang }: HomePageProps) {
  const { features, overview = [], title = '' } = data ?? {}

  return (
    <div className="flex flex-col px-2 py-4 mx-auto max-w-screen-lg md:px-0">
      <div className="py-4">
        <div>
          {title && <Header centered title={title} description={overview} />}
        </div>
        <div className="flex justify-center space-x-4">
          {' '}
          {/* Adjusted for consistency */}
          <div className="text-center">
            <button
              type="button"
              className="text-white bg-gray-800 border-2 border-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-3 mb-2"
            >
              <Link href={`/${lang}/docs/v1/introduction`}>Get Started</Link>
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="text-gray-800 bg-white border border-gray-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-3 mb-2"
            >
              <Link href={`https://github.com/UsmanHaider15/uDocs`}>
                Go to Github
              </Link>
            </button>
          </div>
        </div>
      </div>

      <div className="py-2 md:py-5"></div>
      <div>
        <div className="text-2xl text-center md:text-4xl font-extrabold tracking-tight">
          What&apos;s special in uDocs
        </div>
        <div>
          {features &&
            features.map(({ title, description, image }, index) => {
              const isEven = index % 2 === 0

              return (
                <div
                  className={`flex flex-col gap-4 py-2 md:flex-row ${
                    isEven ? '' : 'md:flex-row-reverse'
                  } md:py-5`}
                  key={title}
                >
                  <div className="text-left basis-1/2">
                    <div className="text-xl md:text-2xl font-semibold py-4 tracking-tight">
                      {title}
                    </div>
                    <div className="md:text-lg">{description}</div>{' '}
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

      <div className="flex flex-col items-center pt-6 pb-2">
        <div className="text-xl text-center md:text-2xl font-extrabold tracking-tight py-2 md:py-5">
          MORE FEATURES DEVELOPERS LOVE
        </div>
      </div>
      <FeatureGrid />
      <div className="py-4 md:py-6"></div>
    </div>
  )
}

export default HomePage
