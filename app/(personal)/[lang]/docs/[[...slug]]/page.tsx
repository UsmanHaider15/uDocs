import { toPlainText } from '@portabletext/react'
import { Page } from 'components/pages/page/Page'
import PagePreview from 'components/pages/page/PagePreview'
import {
  getHomePageTitle,
  getPageBySlugAndLang,
  getPagesPaths,
  getSettings,
} from 'lib/sanity.fetch'
import { pagesBySlugQuery } from 'lib/sanity.queries'
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
    getPageBySlugAndLang(`docs/${slug.join('/')}`, lang),
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
  const slugs = await getPagesPaths()
  return slugs.map((slug) => ({ slug }))
}

export default async function PageSlugRoute({ params }: Props) {
  console.log('params it is', params)
  const data = await getPageBySlugAndLang(
    `docs/${params.slug.join('/')}`,
    params.lang,
  )

  if (!data && !draftMode().isEnabled) {
    notFound()
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={pagesBySlugQuery}
      params={{ slug: `docs/${params.slug.join('/')}` }}
      initialData={data}
      as={PagePreview}
    >
      <Page data={data} />
    </LiveQuery>
  )
}
