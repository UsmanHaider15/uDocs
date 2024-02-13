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
      body: any
    }>(req, revalidateSecret)
    if (!isValidSignature) {
      const message = 'Invalid signature'
      return new Response(message, { status: 401 })
    }

    if (
      !body?._type ||
      !body?._id ||
      !body?.title ||
      !body?.slug ||
      !body?.language ||
      !body?.version ||
      !body?.body
    ) {
      return new Response('Bad Request', { status: 400 })
    }

    const algoliaIndex = algolia.initIndex('docs')

    await deleteRecordsBySanityDocumentId(body._id, algoliaIndex)
    try {
      const response = await algoliaIndex
        .saveObjects(generateAlgoliaRecords(body))
        .wait()
      console.log('Algolia response', response)
    } catch (error) {
      console.error('Algolia error', error)
      return new Response('Error updating Algolia', { status: 500 })
    }

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

    await deleteRecordsBySanityDocumentId(body._id, algoliaIndex)

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

function generateAlgoliaRecords(doc) {
  const records: any = []
  // Initialize baseObjectID with a high-resolution timestamp to ensure uniqueness
  let baseObjectID = Date.now() * 1000 // Multiply to simulate a higher resolution

  const baseHierarchy = {
    lvl0: `${doc.language} / ${doc.version}`,
    lvl1: doc.title,
  }

  const baseRecord = {
    hierarchy: { ...baseHierarchy },
    url: `/${doc.language}/docs/${doc.version}/${doc.slug}`,
    language: doc.language,
    version: doc.version,
    sanityDocumentId: doc._id,
  }

  // First record for lvl1
  const pageRecord = {
    ...baseRecord,
    type: 'lvl1',
    objectID: `${baseObjectID--}`, // Ensure descending order
  }

  records.push(pageRecord)

  doc.body.forEach((block) => {
    if (block._type === 'block' && block.style === 'h2') {
      // Record for lvl2
      const headingRecord = {
        ...baseRecord,
        hierarchy: {
          ...baseRecord.hierarchy,
          lvl2: block.children?.[0]?.text,
        },
        url: `${baseRecord.url}#${block._key}`,
        type: 'lvl2',
        objectID: `${baseObjectID--}`,
      }
      records.push(headingRecord)
    } else if (block._type === 'block' && block.children?.[0]?.text !== '') {
      // Record for content
      const contentRecord = {
        ...baseRecord,
        url: `${baseRecord.url}#${block._key}`,
        type: 'content',
        content: block.children?.[0]?.text,
        objectID: `${baseObjectID--}`,
      }
      records.push(contentRecord)
    }
  })

  return records
}

async function deleteRecordsBySanityDocumentId(sanityDocumentId, algoliaIndex) {
  try {
    // Custom function to asynchronously accumulate hits from browsing
    async function accumulateHits() {
      let hits: any = []
      await algoliaIndex.browseObjects({
        query: '', // Empty query will match all records
        filters: `sanityDocumentId:${sanityDocumentId}`,
        batch: (batch) => {
          hits = hits.concat(batch)
        },
      })
      return hits
    }

    // Use the custom function to get all hits
    const hits = await accumulateHits()
    console.log('hits', hits)

    // Extract objectIDs from the hits
    const objectIDs = hits.map((hit) => hit.objectID)
    console.log('objectIDs', objectIDs)

    // Check if there are any objectIDs to delete
    if (objectIDs.length > 0) {
      // Use the list of objectIDs to delete the records
      await algoliaIndex.deleteObjects(objectIDs)
      console.log(`Deleted records with sanityDocumentId: ${sanityDocumentId}`)
    } else {
      console.log('No records found to delete.')
    }
  } catch (err) {
    console.error('Error during deletion process:', err)
  }
}
