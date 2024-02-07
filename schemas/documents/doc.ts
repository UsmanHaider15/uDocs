import { DocumentIcon, ImageIcon } from '@sanity/icons'
import {
  SlugValidationContext,
  defineArrayMember,
  defineField,
  defineType,
} from 'sanity'

export default defineType({
  type: 'document',
  name: 'doc',
  title: 'Doc',
  icon: DocumentIcon,
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
        isUnique: isUniqueOtherThanLanguageAndVersion,
      },
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'version',
      type: 'reference',
      to: [{ type: 'toc' }],
      options: {
        filter: ({ document }) => {
          return {
            filter: 'language == $language',
            params: {
              language: document?.language,
            },
          }
        },
      },
    }),
    defineField({
      name: 'overview',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader.',
      title: 'Overview',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
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
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'H6', value: 'h6' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
        }),
        defineField({
          type: 'image',
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              imageUrl: 'asset.url',
              title: 'caption',
            },
          },
          fields: [
            defineField({
              title: 'Caption',
              name: 'caption',
              type: 'string',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description:
                'Alternative text for screenreaders. Falls back on caption if not set',
            }),
          ],
        }),
        defineField({
          type: 'code',
          name: 'code',
          title: 'Code',
        }),
        defineField({
          title: 'Button',
          name: 'button',
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
            },
            {
              name: 'href',
              type: 'url',
              title: 'Button Href',
            },
            {
              name: 'style',
              type: 'string',
              title: 'Button Style',
              description: 'CSS class for styling the button',
            },
          ],
        }),
        defineArrayMember({
          type: 'youtube',
        }),
      ],
    }),
    defineField({
      name: 'previousDoc',
      title: 'Previous Doc',
      type: 'reference',
      to: [{ type: 'doc' }],
      description: 'Reference to the previous document',
      options: {
        filter: ({ document }) => {
          return {
            filter: 'language == $language',
            params: {
              language: document?.language,
            },
          }
        },
      },
    }),
    defineField({
      name: 'nextDoc',
      title: 'Next Doc',
      type: 'reference',
      to: [{ type: 'doc' }],
      description: 'Reference to the next document',
      options: {
        filter: ({ document }) => {
          return {
            filter: 'language == $language',
            params: {
              language: document?.language,
            },
          }
        },
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      version: 'version.slug.current',
    },
    prepare(props: any) {
      const { version, subtitle } = props
      return {
        title: props.title,
        subtitle: `${version} - ${subtitle}`,
      }
    },
  },
})

export async function isUniqueOtherThanLanguageAndVersion(
  slug: string,
  context: SlugValidationContext,
) {
  const { document, getClient } = context
  if (!document?.language || !document?.version) {
    return true
  }

  const client = getClient({ apiVersion: '2023-04-24' })
  const id = document._id.replace(/^drafts\./, '')
  // @ts-ignore
  const versionId = document.version._ref || document.version._id // Assuming version is a reference to 'toc'

  const params = {
    draft: `drafts.${id}`,
    published: id,
    language: document.language,
    version: versionId,
    slug,
  }

  const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    language == $language &&
    version._ref == $version
  ][0]._id)`

  const result = await client.fetch(query, params)
  return result
}
