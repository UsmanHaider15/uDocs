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

    // get document of type doc by id
    const doc = await client.fetch(
      `*[_type == "doc" && _id == $id][0] {
        _id,
        title,
        body,
        "slug": slug.current,
        "headings": body[length(style) == 2 && string::startsWith(style, "h")],
      }`,
      { id: body._id },
    )

    deleteRecordsBySanityDocumentId(body._id, algoliaIndex)
    console.log('doc', generateAlgoliaRecords(doc))
    algoliaIndex
      .saveObjects(generateAlgoliaRecords(doc), {
        autoGenerateObjectIDIfNotExist: true,
      })
      .wait()

    return NextResponse.json({
      status: 200,
      now: Date.now(),
      body,
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
    // get document of type doc by id
    const doc = await client.fetch(
      `*[_type == "doc" && _id == $id][0] {
          _id,
        }`,
      { id: body._id },
    )

    deleteRecordsBySanityDocumentId(body._id, algoliaIndex)

    return NextResponse.json({
      status: 200,
      now: Date.now(),
      body,
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

// Function to generate Algolia records from a Sanity document
function generateAlgoliaRecords(doc) {
  const records: any = []

  // Assuming 'doc.title' contains the lvl1 heading (e.g., 'Installation')
  const baseHierarchy = {
    lvl0: 'Getting Started', // This seems to be static in your examples
    lvl1: doc.title,
  }

  // Base record structure for easier reuse
  const baseRecord = {
    hierarchy: { ...baseHierarchy },
    url: `/en/docs/v1/${doc.slug}`, // Assuming 'slug' can be used to generate the URL
    type: '',
    language: 'en',
    version: 'v1',
    sanityDocumentId: doc._id, // Adding a unique identifier for the Sanity document
  }

  const pageRecord = {
    ...baseRecord,
    type: 'lvl1',
  }

  records.push(pageRecord)

  // Assuming doc.body is an array of blocks (Portable Text or similar)
  doc.body.forEach((block) => {
    // Checking if the block is a heading (h2)
    if (block._type === 'block' && block.style === 'h2') {
      const headingRecord = {
        ...baseRecord,
        hierarchy: {
          ...baseRecord.hierarchy,
          lvl2: block.children?.[0]?.text, // Assuming first child contains the heading text
        },
        url: `${baseRecord.url}#${block._key}`, // Assuming '_key' can serve as an anchor
        type: 'lvl2',
      }
      records.push(headingRecord)
    } else if (block._type === 'block') {
      // Assuming this block is content
      const contentRecord = {
        ...baseRecord,
        type: 'content',
        content: block.children?.[0]?.text, // Assuming first child contains the content text
      }
      records.push(contentRecord)
    }
  })

  return records
}

// Function to delete records by sanityDocumentId
async function deleteRecordsBySanityDocumentId(sanityDocumentId, algoliaIndex) {
  // First, search for all records matching the sanityDocumentId
  const hits: any = []
  algoliaIndex
    .browseObjects({
      query: '', // Empty query will match all records
      filters: `sanityDocumentId:${sanityDocumentId}`,
      batch: (batch) => hits.push(...batch),
    })
    .then(() => {
      // Extract objectIDs from the hits
      console.log('hits', hits)
      const objectIDs = hits.map((hit) => hit.objectID)

      console.log('objectIDs', objectIDs)
      // Then, use the list of objectIDs to delete the records
      algoliaIndex
        .deleteObjects(objectIDs)
        .then(() => {
          console.log(
            `Deleted records with sanityDocumentId: ${sanityDocumentId}`,
          )
        })
        .catch((err) => {
          console.error('Error deleting records:', err)
        })
    })
    .catch((err) => {
      console.error('Error searching records:', err)
    })
}
