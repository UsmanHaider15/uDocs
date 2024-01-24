import { revalidateSecret } from 'lib/sanity.api'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
import algoliasearch from 'algoliasearch'
import { client } from 'lib/sanity.client'
import indexer from 'sanity-algolia'
import { type SanityDocumentStub } from '@sanity/client'

export const runtime = 'nodejs'

const algolia = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID as string,
  process.env.ALGOLIA_ADMIN_API_KEY as string,
)

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      _id: string
      title: string
      slug: string
      language: string
      version: string
    }>(req, revalidateSecret)
    if (!isValidSignature) {
      const message = 'Invalid signature'
      return new Response(message, { status: 401 })
    }

    if (!body?._type || !body?._id || !body?.title || !body?.slug) {
      return new Response('Bad Request', { status: 400 })
    }

    const algoliaIndex = algolia.initIndex('docs')
    const fullSlug = `/${body.language}/docs/${body.version}/${body.slug}`

    const sanityAlgolia = indexer(
      {
        doc: {
          index: algoliaIndex,
          projection: `{
          title,
          "overview": pt::text(overview),
          "body": pt::text(body)
        }`,
        },
      },

      (document: SanityDocumentStub) => {
        switch (document._type) {
          case 'doc':
            return Object.assign({}, document, {
              slug: fullSlug,
            })
          default:
            return document
        }
      },
    )

    return sanityAlgolia
      .webhookSync(client, {
        ids: { created: [], updated: [body._id], deleted: [] },
      })
      .then(() => {
        return NextResponse.json({
          status: 200,
          now: Date.now(),
          body,
        })
      })
      .catch((err) => {
        return new Response(err.message, { status: 500 })
      })
  } catch (err: any) {
    console.error(err)
    return new Response(err.message, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      _id: string
    }>(req, revalidateSecret)
    if (!isValidSignature) {
      const message = 'Invalid signature'
      return new Response(message, { status: 401 })
    }

    if (!body?._id) {
      return new Response('Bad Request', { status: 400 })
    }

    const algoliaIndex = algolia.initIndex('docs')

    const sanityAlgolia = indexer(
      {
        doc: {
          index: algoliaIndex,
          projection: `{
            title,
            "overview": pt::text(overview),
            "body": pt::text(body)
          }`,
        },
      },

      (document: SanityDocumentStub) => {
        switch (document._type) {
          case 'doc':
            return Object.assign({}, document)
          default:
            return document
        }
      },
    )

    return sanityAlgolia
      .webhookSync(client, {
        ids: { created: [], updated: [], deleted: [body._id] },
      })
      .then(() => {
        return NextResponse.json({
          status: 200,
          now: Date.now(),
          body,
        })
      })
      .catch((err) => {
        return new Response(err.message, { status: 500 })
      })
  } catch (err: any) {
    console.error(err)
    return new Response(err.message, { status: 500 })
  }
}
