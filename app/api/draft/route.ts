import { previewSecretId } from 'lib/sanity.api'
import { client } from 'lib/sanity.client'
import { token } from 'lib/sanity.fetch'
import { resolveHref } from 'lib/sanity.links'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { isValidSecret } from 'sanity-plugin-iframe-pane/is-valid-secret'

export const runtime = 'nodejs'

async function authenticateClient(secret) {
  if (!token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required.',
    )
  }
  if (!secret) {
    throw new Response('Invalid secret', { status: 401 })
  }

  const authenticatedClient = client.withConfig({ token })
  const validSecret = await isValidSecret(
    authenticatedClient,
    previewSecretId,
    secret,
  )
  if (!validSecret) {
    throw new Response('Invalid secret', { status: 401 })
  }

  return authenticatedClient
}

async function fetchVersionSlug(authenticatedClient, versionRef) {
  if (versionRef) {
    const tocDoc = await authenticatedClient.fetch(
      `*[_type == "toc" && _id == $versionRef]{slug}[0]`,
      { versionRef },
    )
    return tocDoc?.slug?.current || ''
  }
  return ''
}

async function resolveAndRedirect(documentType, slug, language) {
  const resolvedHref = resolveHref(documentType, slug)
  if (!resolvedHref) {
    throw new Response(
      'Unable to resolve preview URL based on the current document type and slug',
      { status: 400 },
    )
  }

  draftMode().enable()
  console.log('draftMode().isEnabled()', draftMode().isEnabled)
  redirect(`/${language}${resolvedHref}`)
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const documentType = searchParams.get('type')
  const language = searchParams.get('language')

  const authenticatedClient = await authenticateClient(secret)

  if (documentType === 'doc') {
    const versionRef = searchParams.get('versionRef')
    const versionSlug = await fetchVersionSlug(authenticatedClient, versionRef)
    const fullSlug = slug === '/' ? versionSlug : `${versionSlug}/${slug}`
    await resolveAndRedirect(documentType, fullSlug, language)
  } else if (documentType === 'page') {
    await resolveAndRedirect(documentType, slug, language)
  }
}
