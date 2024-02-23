import { toPlainText } from '@portabletext/react'
import BlogPagePreview from 'components/pages/blog/BlogPagePreview'
import {
  getBlogBySlugAndLang,
  getBlogsPathsWithLang,
  getSettings,
} from 'lib/sanity.fetch'
import { blogsBySlugAndLangQuery } from 'lib/sanity.queries'
import { defineMetadata } from 'lib/utils.metadata'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'
import BlogPage from 'components/pages/blog/BlogPage'

type Props = {
  params: { slug: string; lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = params

  const [page] = await Promise.all([getBlogBySlugAndLang(slug, lang)])

  return defineMetadata({
    // baseTitle: homePageTitle ?? undefined,
    description: page?.overview ? toPlainText(page.overview) : '',
    title: page?.title,
  })
}

export async function generateStaticParams() {
  const blogPaths = await getBlogsPathsWithLang()
  return blogPaths
    .filter(({ slug }) => slug !== '/')
    .map(({ slug, language }) => {
      return {
        lang: language,
        slug: slug,
      }
    })
}

export default async function PageSlugRoute({ params }: Props) {
  const data = await getBlogBySlugAndLang(params.slug, params.lang)

  if (!data && !draftMode().isEnabled) {
    notFound()
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={blogsBySlugAndLangQuery}
      params={{
        slug: params.slug,
        lang: params.lang,
      }}
      initialData={data}
      as={BlogPagePreview}
    >
      <BlogPage data={data} lang={params.lang} />
    </LiveQuery>
  )
}
