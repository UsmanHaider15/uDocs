import { defineType } from 'sanity'

export const docLink = defineType({
  name: 'docLink',
  title: 'Document Link',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'docRef',
      type: 'reference',
      title: 'Document Reference',
      to: [{ type: 'doc' }],
      validation: (Rule) => Rule.required(),
      options: {
        // Use a filter to dynamically limit the reference options
        filter: ({ document }) => {
          // Ensure we have access to the current document's language and version
          // @ts-ignore
          if (!document?.language || !document?.version?._ref) {
            return {
              filter: '',
              params: {},
            }
          }

          return {
            // Filter by language and version
            filter: 'language == $language && version._ref == $versionRef',
            params: {
              language: document.language,
              // @ts-ignore
              versionRef: document.version._ref,
            },
          }
        },
      },
    },
  ],
})
