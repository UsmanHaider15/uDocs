import { client } from 'lib/sanity.client'

export async function isUniqueSlug(
  slug: string,
  context: { document?: any; [key: string]: any },
) {
  if (!context.document) {
    console.error('Document is undefined')
    return false
  }

  const id = context.document._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    language: context.document.language,
    slug,
  }

  const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`

  const result = await client.fetch(query, params)
  return result
}
