import { DocumentIcon, ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'blog',
  title: 'Blog',
  icon: DocumentIcon, // You might want to change this icon to differentiate between Doc and Blog
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
        // isUnique: isUniqueSlug, // Adjust the uniqueness function for blogs
      },
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    // Removed the version field
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the website subheader.',
      title: 'Overview',
      type: 'array',
      of: [
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Strong', value: 'strong' },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
          styles: [
            { title: 'Normal', value: 'normal' },
            // Other styles as before
          ],
          lists: [
            // Lists as before
          ],
        }),
        // Other array members as before
      ],
    }),
    // Removed previousDoc and nextDoc fields
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      // Removed version from the preview
    },
    prepare(props: any) {
      // Adjusted to remove version from the prepare function
      const { subtitle } = props
      return {
        title: props.title,
        subtitle: subtitle,
      }
    },
  },
})

export async function isUniqueSlug(
  slug: string,
  { document, getClient }: { document: any; getClient: any },
) {
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
