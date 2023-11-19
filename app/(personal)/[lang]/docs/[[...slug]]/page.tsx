import { toPlainText } from '@portabletext/react'
import { Page } from 'components/pages/page/Page'
import PagePreview from 'components/pages/page/PagePreview'
import {
  getHomePageTitle,
  getDocBySlugAndLang,
  getPagesPaths,
  getDocsPathsWithLang,
  getSettings,
} from 'lib/sanity.fetch'
import { docsBySlugAndLangQuery } from 'lib/sanity.queries'
import { defineMetadata } from 'lib/utils.metadata'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'

export const runtime = 'edge'

type Props = {
  params: { slug: string[]; lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = params

  const [settings, page, homePageTitle] = await Promise.all([
    getSettings(),
    getDocBySlugAndLang(`${slug.join('/')}`, lang),
    getHomePageTitle(),
  ])

  return defineMetadata({
    baseTitle: homePageTitle ?? undefined,
    description: page?.overview ? toPlainText(page.overview) : '',
    image: settings?.ogImage,
    title: page?.title,
  })
}

export async function generateStaticParams() {
  const docPaths = await getDocsPathsWithLang()
  return docPaths.map(({ slug, language }) => {
    return {
      lang: language,
      slug: slug.split('/'),
    }
  })
}

export default async function PageSlugRoute({ params }: Props) {
  const data = await getDocBySlugAndLang(params.slug.join('/'), params.lang)

  if (!data && !draftMode().isEnabled) {
    notFound()
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={docsBySlugAndLangQuery}
      params={{ slug: params.slug.join('/'), lang: params.lang }}
      initialData={data}
      as={PagePreview}
    >
      <Page data={data} />
    </LiveQuery>
  )
}
