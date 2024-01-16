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
      <div className="mx-auto max-w-screen-2xl md:p-24">
        <div className="grid md:grid-cols-3 md:gap-16">
          {features &&
            features.map(({ title, description, image }) => {
              return (
                <div className="flex flex-col">
                  <ImageBox
                    image={image}
                    alt={'value.alt'}
                    classesWrapper="p-2"
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
