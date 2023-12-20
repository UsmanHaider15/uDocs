import { previewSecretId } from 'lib/sanity.api'
import { client } from 'lib/sanity.client'
import { token } from 'lib/sanity.fetch'
import { resolveHref } from 'lib/sanity.links'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { isValidSecret } from 'sanity-plugin-iframe-pane/is-valid-secret'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const documentType = searchParams.get('type')
  const language = searchParams.get('language')
  const versionRef = searchParams.get('versionRef')

  if (!token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required.',
    )
  }
  if (!secret) {
    return new Response('Invalid secret', { status: 401 })
  }

  const authenticatedClient = client.withConfig({ token })
  const validSecret = await isValidSecret(
    authenticatedClient,
    previewSecretId,
    secret,
  )
  if (!validSecret) {
    return new Response('Invalid secret', { status: 401 })
  }

  // Fetch version slug
  let versionSlug = ''
  if (versionRef) {
    const tocDoc = await authenticatedClient.fetch(
      `*[_type == "toc" && _id == $versionRef]{slug}[0]`,
      { versionRef },
    )
    versionSlug = tocDoc?.slug?.current || ''
  }

  const fullSlug = slug === '/' ? `${versionSlug}` : `${versionSlug}/${slug}`
  const href = resolveHref(documentType!, `${fullSlug}`!)

  if (!href) {
    return new Response(
      'Unable to resolve preview URL based on the current document type and slug',
      { status: 400 },
    )
  }

  draftMode().enable()

  redirect('/' + language + href)
}
