import { Header } from 'components/shared/Header'
import Link from 'next/link'
import type { HomePagePayload } from 'types'

export interface HomePageProps {
  data: HomePagePayload | null
}

export function HomePage({ data }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], title = '' } = data ?? {}

  return (
    <div className="flex">
      <div className="flex-1 p-10">
        {title && <Header centered title={title} description={overview} />}
      </div>
    </div>
  )
}

export default HomePage
