// schemas/objects/tocLink.js

export default {
  title: 'TOC link',
  name: 'tocLink',
  type: 'object',
  fields: [
    {
      type: 'reference',
      name: 'target',
      title: 'Target',
      to: [{ type: 'doc' }],
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
