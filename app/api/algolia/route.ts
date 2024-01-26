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
            "body": pt::text(body),
            language,
            "version": version->slug.current
          }`,
        },
      },
      (document: SanityDocumentStub) => {
        switch (document._type) {
          case 'doc':
            // Transform the document into the desired Algolia record structure
            return Object.assign({}, document, {
              objectID: document._id,
              hierarchy: {
                lvl0: document.title,
                lvl1: document.title, // or some other field from your document
                lvl2: document.title, // or some other field from your document
              },
              content: document.body,
              url: fullSlug,
              // anchor: document.slug, // or any other suitable field
              // type: 'lvl2', // Adjust based on your data
              language: document.language,
              version: document.version,
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

const doc = {
  objectID: 'subsection-003',
  hierarchy: {
    lvl0: 'Introduction to Our Product',
    lvl1: 'Getting Started',
    lvl2: 'Installation Guide',
  },
  content:
    'Detailed step-by-step guide on how to install our product on various platforms.',
  url: 'https://example.com/docs/introduction/getting-started/installation',
  anchor: 'installation-guide',
  type: 'lvl2',
  tags: ['installation', 'guide'],
  language: 'en',
}
