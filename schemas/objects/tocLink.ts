// schemas/objects/tocLink.js

export default {
  title: 'TOC link',
  name: 'tocLink',
  type: 'object',
  fields: [
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
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'array',
      name: 'links',
      title: 'Links',
      of: [{ type: 'tocLink' }],
    },
  ],
}
