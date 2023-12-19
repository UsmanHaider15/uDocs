import { SlugValidationContext } from 'sanity'

export default {
  name: 'toc',
  type: 'document',
  title: 'Table of Contents',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      name: 'language',
      type: 'string',
      readOnly: true,
    },
    {
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        isUnique: isUniqueOtherThanLanguage,
      },
    },
    {
      title: 'Target',
      name: 'target',
      type: 'reference',
      to: [{ type: 'doc' }],
      options: {
        filter: ({ document }) => {
          // Use the 'slug.current' field of the 'toc' document for filtering
          const slugPattern = document?.slug?.current
            ? `${document.slug.current}*`
            : '*'
          return {
            filter:
              'language == $language && version->slug.current match $slugPattern',
            params: {
              language: document?.language,
              slugPattern: slugPattern,
            },
          }
        },
      },
    },
    {
      type: 'array',
      name: 'links',
      title: 'Links',
      of: [{ type: 'tocLink' }],
    },
  ],
}

export async function isUniqueOtherThanLanguage(
  slug: string,
  context: SlugValidationContext,
) {
  const { document, getClient } = context
  if (!document?.language) {
    return true
  }
  const client = getClient({ apiVersion: '2023-04-24' })
  const id = document._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    language: document.language,
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
