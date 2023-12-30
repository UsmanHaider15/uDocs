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
} from 'lib/sanity.queries'
import { draftMode } from 'next/headers'
import type {
  HomePagePayload,
  PagePayload,
  SettingsPayload,
  TOCLink,
} from 'types'

import { revalidateSecret } from './sanity.api'

export const token = process.env.SANITY_API_READ_TOKEN

const DEFAULT_PARAMS = {} as QueryParams
const DEFAULT_TAGS = [] as string[]

// export async function sanityFetch<QueryResponse>({
//   query,
//   params = DEFAULT_PARAMS,
//   tags = DEFAULT_TAGS,
// }: {
//   query: string
//   params?: QueryParams
//   tags: string[]
// }): Promise<QueryResponse> {
//   const isDraftMode = draftMode().isEnabled
//   if (isDraftMode && !token) {
//     throw new Error(
//       'The `SANITY_API_READ_TOKEN` environment variable is required.',
//     )
//   }

//   const sanityClient = client.withConfig({
//     useCdn: false,
//     token: isDraftMode ? token : undefined,
//   })

//   return sanityClient.fetch<QueryResponse>(query, params, {
//     cache: 'no-store', // Always disable caching
//     next: {
//       ...(isDraftMode && { revalidate: 30 }),
//       tags,
//     },
//   })
// }
export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
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
    cache: revalidateSecret ? 'force-cache' : 'no-store',
    ...(isDraftMode && {
      cache: undefined,
      token: token,
      perspective: 'previewDrafts',
    }),
    next: {
      ...(isDraftMode && { revalidate: 30 }),
      // add tags only when they are defined
      ...(tags && tags.length > 0 && { tags }),
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
    tags: [`page:${slug}`],
  })
}

export function getDocBySlugAndLang(
  slug: string,
  lang?: string,
  version?: string,
) {
  return sanityFetch<PagePayload | null>({
    query: docsBySlugAndLangQuery,
    params: { slug, lang, version },
    tags: [`doc:${lang}${version}`],
  })
}

export function getPageBySlugAndLang(slug: string, lang?: string) {
  return sanityFetch<PagePayload | null>({
    query: pageBySlugAndLangQuery,
    params: { slug, lang },
    tags: [`page:${slug}`],
  })
}

export function getHomePage() {
  return sanityFetch<HomePagePayload | null>({
    query: homePageQuery,
    tags: ['home'],
  })
}

export function getTocs(lang: string, version?: string) {
  return sanityFetch<{
    title: string
    slug: string
    links: TOCLink[]
  } | null>({
    query: tocQuery,
    params: { lang, version },
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
