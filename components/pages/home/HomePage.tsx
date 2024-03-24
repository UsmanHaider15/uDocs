import type { HomePagePayload } from 'types'
import MainFeatures from './MainFeatures'
import FeatureList from './FeatureList'
import IntroSection from './IntroSection'

export interface HomePageProps {
  data: HomePagePayload | null
  lang: string
}

export function HomePage({ data, lang }: HomePageProps) {
  const { features, title = '', body = [] } = data ?? {}

  return (
    <div className="flex flex-col mt-20 md:mt-40 mx-auto max-w-screen-xl md:px-0">
      <IntroSection title={title} body={body} lang={lang} />
      <MainFeatures />
      <FeatureList />
    </div>
  )
}

export default HomePage
