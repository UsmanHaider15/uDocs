import { toPlainText } from '@portabletext/react'
import { Page } from 'components/pages/page/Page'
import PagePreview from 'components/pages/page/PagePreview'
import {
  getHomePageTitle,
  getPageBySlug,
  getPageBySlugAndLang,
  getPagesPaths,
} from 'lib/sanity.fetch'
import { pageBySlugAndLangQuery } from 'lib/sanity.queries'
import { defineMetadata } from 'lib/utils.metadata'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'

export const runtime = 'edge'

type Props = {
  params: { slug: string; lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params

  const [page, homePageTitle] = await Promise.all([
    getPageBySlug(slug),
    getHomePageTitle(),
  ])

  return defineMetadata({
    baseTitle: homePageTitle ?? undefined,
    description: page?.overview ? toPlainText(page.overview) : '',
    title: page?.title,
  })
}

export async function generateStaticParams() {
  const slugs = await getPagesPaths()
  return slugs.map((slug) => ({ slug }))
}

export default async function PageSlugRoute({ params }: Props) {
  const data = await getPageBySlugAndLang(params.slug, params.lang)
  if (!data && !draftMode().isEnabled) {
    notFound()
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={pageBySlugAndLangQuery}
      params={params}
      initialData={data}
      as={PagePreview}
    >
      <Page data={data} />
    </LiveQuery>
  )
}
