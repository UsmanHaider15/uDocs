import { toPlainText } from '@portabletext/react'
import { DocPage } from 'components/pages/doc_page/DocPage'
import DocPagePreview from 'components/pages/doc_page/DocPagePreview'
import {
  getDocBySlugAndLang,
  getDocsPathsWithLang,
  getTocs,
} from 'lib/sanity.fetch'
import { docsBySlugAndLangQuery } from 'lib/sanity.queries'
import { defineMetadata } from 'lib/utils.metadata'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'
import { TOCLink } from 'types'

type Props = {
  params: { slug: string[]; lang: string; version: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang, version } = params

  const [page] = await Promise.all([
    getDocBySlugAndLang(`${slug.join('/')}`, lang, version),
  ])

  return defineMetadata({
    // baseTitle: homePageTitle ?? undefined,
    description: page?.overview ? toPlainText(page.overview) : '',
    // image: settings?.ogImage,
    title: page?.title,
  })
}

export async function generateStaticParams() {
  const docPaths = await getDocsPathsWithLang()
  return docPaths
    .filter(({ slug }) => slug !== '/')
    .map(({ slug, language, version }) => {
      return {
        lang: language,
        version: version,
        slug: slug.split('/'),
      }
    })
}

export default async function PageSlugRoute({ params }: Props) {
  const data = await getDocBySlugAndLang(
    params.slug.join('/'),
    params.lang,
    params.version,
  )
  let toc = await getTocs(params.lang, params.version)
  let docNavigation: TOCLink[] | null = null
  if (toc) {
    docNavigation = findSlugWithParents(toc, params.slug.join('/'))
  }

  if (!data && !draftMode().isEnabled) {
    notFound()
  }

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={docsBySlugAndLangQuery}
      params={{
        slug: params.slug.join('/'),
        lang: params.lang,
        version: params.version,
      }}
      initialData={data}
      as={DocPagePreview}
    >
      <DocPage
        data={data}
        docNavigation={docNavigation}
        lang={params.lang}
        version={params.version}
      />
    </LiveQuery>
  )
}

function findSlugWithParents(data: TOCLink, slug: string): TOCLink[] | null {
  function search(node: TOCLink, path: TOCLink[]): TOCLink[] | null {
    // Add the current node to the path
    path.push({ title: node.title, slug: node.slug })

    // Check if the current node is the target slug
    if (node.slug === slug) {
      return path
    }

    // If this node has links, search them recursively
    if (node.links) {
      for (const link of node.links) {
        const result = search(link, path.slice())
        if (result) return result
      }
    }

    // Slug not found in this branch
    return null
  }

  // Start the search from each child of the root node
  if (data.links) {
    for (const link of data.links) {
      const result = search(link, [])
      if (result) return result
    }
  }

  return null
}
