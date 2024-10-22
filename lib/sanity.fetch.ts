import 'server-only'

import type { QueryParams } from '@sanity/client'
import { client } from 'lib/sanity.client'
import {
  homePageQuery,
  homePageTitleQuery,
  pagePaths,
  docPathsWithLang,
  docsBySlugAndLangQuery,
  pagesBySlugQuery,
  settingsQuery,
  tocQuery,
  pageBySlugAndLangQuery,
  blogsBySlugAndLangQuery,
  blogPathsWithLang,
  recentBlogs,
} from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import type {
  BlogListPayload,
  BlogPagePayload,
  DocPagePayload,
  HomePagePayload,
  PagePayload,
  SettingsPayload,
  TOCLink,
} from 'types'

export const token = process.env.SANITY_API_READ_TOKEN

const DEFAULT_PARAMS = {} as QueryParams
const DEFAULT_TAGS = [] as string[]

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string
  params?: QueryParams
  tags: string[]
}): Promise<QueryResponse> {
  const isDraftMode = draftMode().isEnabled
  if (isDraftMode && !token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required.',
    )
  }

  // @TODO this won't be necessary after https://github.com/sanity-io/client/pull/299 lands
  const sanityClient =
    client.config().useCdn && isDraftMode
      ? client.withConfig({ useCdn: false })
      : client
  return sanityClient.fetch<QueryResponse>(query, params, {
    // We only cache if there's a revalidation webhook setup
    // cache: revalidateSecret ? 'force-cache' : 'no-store',
    cache: 'no-store',
    ...(isDraftMode && {
      cache: undefined,
      token: token,
      perspective: 'previewDrafts',
    }),
    next: {
      ...(isDraftMode && { revalidate: 30 }),
      tags,
    },
  })
}

export function getSettings() {
  return sanityFetch<SettingsPayload>({
    query: settingsQuery,
    tags: ['settings', 'home', 'page'],
  })
}

export function getPageBySlug(slug: string) {
  return sanityFetch<PagePayload | null>({
    query: pagesBySlugQuery,
    params: { slug },
    tags: ['page', 'slug'],
  })
}

export function getDocBySlugAndLang(
  slug: string,
  lang?: string,
  version?: string,
) {
  return sanityFetch<DocPagePayload | null>({
    query: docsBySlugAndLangQuery,
    params: { slug, lang, version },
    tags: [`/${lang}/docs/${version}/${slug}`],
  })
}

export function getBlogBySlugAndLang(slug: string, lang?: string) {
  return sanityFetch<BlogPagePayload | null>({
    query: blogsBySlugAndLangQuery,
    params: { slug, lang },
    tags: [`/${lang}/blog//${slug}`],
  })
}

export function getPageBySlugAndLang(slug: string, lang?: string) {
  return sanityFetch<PagePayload | null>({
    query: pageBySlugAndLangQuery,
    params: { slug, lang },
    tags: [`page:${slug}`],
  })
}

export function getHomePage(lang) {
  return sanityFetch<HomePagePayload | null>({
    query: homePageQuery,
    params: { lang },
    tags: ['home'],
  })
}

export function getTocs(lang: string, version?: string) {
  return sanityFetch<TOCLink | null>({
    query: tocQuery,
    params: { lang, version },
    tags: [`/${lang}/docs/${version}/[...slug]`],
  })
}

export function getRecentBlogsSlugs(lang: string) {
  return sanityFetch<BlogListPayload[] | null>({
    query: recentBlogs,
    params: { lang },
    tags: [`/${lang}/blogs/[slug]`],
  })
}

export function getHomePageTitle() {
  return sanityFetch<string | null>({
    query: homePageTitleQuery,
    tags: ['home'],
  })
}

export function getPagesPaths() {
  return client.fetch<string[]>(
    pagePaths,
    {},
    { token, perspective: 'published' },
  )
}

export function getDocsPathsWithLang() {
  return client.fetch<{ language: string; slug: string; version: string }[]>(
    docPathsWithLang,
    {},
    { token, perspective: 'published' },
  )
}

export function getBlogsPathsWithLang() {
  return client.fetch<{ language: string; slug: string }[]>(
    blogPathsWithLang,
    {},
    { token, perspective: 'published' },
  )
}
