import { Header } from 'components/shared/Header'
import ImageBox from 'components/shared/ImageBox'
import Link from 'next/link'
import type { HomePagePayload } from 'types'

export interface HomePageProps {
  data: HomePagePayload | null
}

export function HomePage({ data }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { features, overview = [], title = '' } = data ?? {}

  return (
    <div className="flex flex-col py-6">
      <div className="py-4">
        <div>
          {title && <Header centered title={title} description={overview} />}
        </div>
        <div className="text-center">
          {' '}
          <button type="button">
            <Link
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              href="/en/docs/v1/introduction"
            >
              Get Started
            </Link>
          </button>
        </div>
      </div>

      <div className="text-center text-5xl font-bold py-4">Features</div>
      <div className="mx-auto max-w-screen-2xl">
        <div className="grid md:grid-cols-3 md:gap-16 px-4">
          {features &&
            features.map(({ title, description, image }) => {
              return (
                <div className="flex flex-col">
                  <ImageBox
                    image={image}
                    alt={'value.alt'}
                    classesWrapper="rounded-lg"
                  />
                  <div className="font-bold text-2xl text-center py-3">
                    {title}
                  </div>
                  <div className="text-center text-base">{description}</div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default HomePage
