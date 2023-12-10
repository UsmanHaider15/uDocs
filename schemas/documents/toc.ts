// schemas/documents/toc.js

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
      // readOnly: true,
    },
    {
      type: 'reference',
      name: 'target',
      title: 'Target',
      to: [{ type: 'doc' }],
    },
    {
      type: 'array',
      name: 'links',
      title: 'Links',
      of: [{ type: 'tocLink' }],
    },
  ],
}
