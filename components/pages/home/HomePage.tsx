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
  // Default to an empty object to allow previews on non-existent documents
  const { features, overview = [], title = '' } = data ?? {}

  return (
    <div>
      <div className="flex flex-col py-4 mx-auto max-w-screen-lg">
        <div className="py-4">
          <div>
            {title && <Header centered title={title} description={overview} />}
          </div>
          <div className="flex justify-center">
            <div className="text-center">
              <button
                type="button"
                className="text-white bg-gray-800 border-2 border-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-3 me-2 mb-2"
              >
                <Link href={`/${lang}/docs/v1/introduction`}>Get Started</Link>
              </button>
            </div>
            <div className="text-center">
              {' '}
              <button
                type="button"
                className="text-gray-800 bg-white border border-gray-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-3 me-2 mb-2"
              >
                <Link href={`/${lang}/docs/v1/introduction`}>
                  Explore the Demo
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="py-2 md:py-5"></div>
        <div className="py-4">
          <div className="text-3xl text-center md:text-5xl font-semibold tracking-tight">
            What's special in uDocs
          </div>
          <div className="mx-auto max-w-screen-lg py-2 md:py-4">
            <div>
              {features &&
                features.map(({ title, description, image }, index) => {
                  const isEven = index % 2 === 0

                  return (
                    <div
                      className={`flex gap-4 py-4 ${
                        isEven ? 'flex-row' : 'flex-row-reverse'
                      }`}
                      key={title}
                    >
                      <div className="text-left basis-1/2">
                        <div className="text-4xl font-semibold py-4">
                          {title}
                        </div>
                        <div className="text-lg font-serif">{description}</div>
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
        </div>

        <div className="flex flex-col item-center py-6">
          <div className="text-2xl text-center md:text-3xl font-semibold tracking-tight py-4">
            MORE FEATURES DEVELOPERS LOVE
          </div>{' '}
          <FeatureGrid />
        </div>
      </div>
    </div>
  )
}

export default HomePage
