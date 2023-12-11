import { toPlainText } from '@portabletext/react'
import { Page } from 'components/pages/page/Page'
import PagePreview from 'components/pages/page/PagePreview'
import {
  getHomePageTitle,
  getDocBySlugAndLang,
  getPagesPaths,
  getDocsPathsWithLang,
  getSettings,
  getPageBySlugAndLang,
} from 'lib/sanity.fetch'
import {
  docsBySlugAndLangQuery,
  pageBySlugAndLangQuery,
} from 'lib/sanity.queries'
import { defineMetadata } from 'lib/utils.metadata'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'
import { i18n } from 'languages'

export const runtime = 'edge'

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = params

  const [settings, page] = await Promise.all([
    getSettings(),
    getPageBySlugAndLang('docs', lang),
  ])

  return defineMetadata({
    baseTitle: 'Docs',
    description: page?.overview ? toPlainText(page.overview) : '',
    image: settings?.ogImage,
    title: page?.title,
  })
}

export async function generateStaticParams() {
  return i18n.languages.map((language) => {
    return {
      lang: language.id,
      slug: 'docs',
    }
  })
}

export default async function PageSlugRoute({ params }: Props) {
  const data = await getPageBySlugAndLang('docs', params.lang)

  if (!data && !draftMode().isEnabled) {
    notFound()
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={pageBySlugAndLangQuery}
      params={{ slug: 'docs', lang: params.lang }}
      initialData={data}
      as={PagePreview}
    >
      <Page data={data} />
    </LiveQuery>
  )
}
