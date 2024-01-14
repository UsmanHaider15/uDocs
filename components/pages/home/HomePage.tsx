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
    <div className="flex flex-col">
      <div>
        {title && <Header centered title={title} description={overview} />}
      </div>
      <div className="mx-auto max-w-screen-2xl p-2 md:p-0">
        <div className="grid md:grid-cols-4 gap-4">
          {features &&
            features.map(({ title, description, image }) => {
              return (
                <div className="flex flex-col">
                  <div>
                    <ImageBox
                      image={image}
                      alt={'value.alt'}
                      classesWrapper=""
                    />
                  </div>
                  <div className="text-3xl">{title}</div>
                  <div>{description}</div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default HomePage
