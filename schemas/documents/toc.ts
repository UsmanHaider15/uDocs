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
      name: 'value',
      type: 'string',
      title: 'Value',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'language',
      type: 'string',
      readOnly: true,
    },
    {
      title: 'Target',
      name: 'target',
      type: 'reference',
      to: [{ type: 'doc' }],
      options: {
        filter: ({ document }) => {
          // Use the 'value' field of the 'toc' document for filtering
          const valueStart = document?.value ? `${document.value}*` : '*'
          return {
            filter: 'language == $language && slug.current match $valueStart',
            params: {
              language: document?.language,
              valueStart: valueStart,
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
