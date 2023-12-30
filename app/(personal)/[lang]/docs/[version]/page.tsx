import { toPlainText } from '@portabletext/react'
import { Page } from 'components/pages/page/Page'
import PagePreview from 'components/pages/page/PagePreview'
import {
  getSettings,
  getDocBySlugAndLang,
  getDocsPathsWithLang,
} from 'lib/sanity.fetch'
import { docsBySlugAndLangQuery } from 'lib/sanity.queries'
import { defineMetadata } from 'lib/utils.metadata'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'

type Props = {
  params: { lang: string; version: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, version } = params

  const [settings, page] = await Promise.all([
    getSettings(),
    getDocBySlugAndLang('/', lang, version),
  ])

  return defineMetadata({
    baseTitle: 'Docs',
    description: page?.overview ? toPlainText(page.overview) : '',
    image: settings?.ogImage,
    title: page?.title,
  })
}

interface Doc {
  slug: string
  language: string
  version: string
}

interface LanguageVersionCombination {
  lang: string
  version: string
}

function getUniqueLanguageVersionCombinations(
  docs: Doc[],
): LanguageVersionCombination[] {
  const uniqueCombinations = new Set<string>()

  docs.forEach((doc) => {
    uniqueCombinations.add(`${doc.language}-${doc.version}`)
  })

  return Array.from(uniqueCombinations).map((combination) => {
    const [language, version] = combination.split('-')
    return { lang: language, version }
  })
}

export async function generateStaticParams() {
  const docPaths = await getDocsPathsWithLang()

  return getUniqueLanguageVersionCombinations(docPaths)
}

export default async function PageSlugRoute({ params }: Props) {
  const data = await getDocBySlugAndLang('/', params.lang, params.version)
  if (!data && !draftMode().isEnabled) {
    notFound()
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={docsBySlugAndLangQuery}
      params={{ slug: '/', lang: params.lang, version: params.version }}
      initialData={data}
      as={PagePreview}
    >
      <Page data={data} />
    </LiveQuery>
  )
}
