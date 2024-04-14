import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'parameter',
  title: 'Parameter',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The name of the parameter.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'in',
      title: 'Location',
      type: 'string',
      description:
        'Where the parameter is expected (query, header, path, cookie).',
      options: {
        list: ['query', 'header', 'path', 'cookie'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of the parameter.',
    }),
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
      description: 'Whether the parameter is required or optional.',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'The data type of the parameter.',
      options: {
        list: ['string', 'number', 'boolean', 'array', 'object'],
      },
      validation: (Rule) => Rule.required(),
    }),
    // Additional fields for parameter specifications can be added here
  ],
})
