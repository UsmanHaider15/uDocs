import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'apiEndpoint',
  title: 'API Endpoint',
  type: 'document',
  fields: [
    defineField({
      name: 'method',
      title: 'HTTP Method',
      type: 'string',
      description: 'The HTTP method used for the endpoint.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'path',
      title: 'Path',
      type: 'string',
      description: 'The URL path of the endpoint.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of what the endpoint does.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parameters',
      title: 'Parameters',
      type: 'array',
      of: [defineArrayMember({ type: 'parameter' })],
    }),
    defineField({
      name: 'responses',
      title: 'Responses',
      type: 'array',
      of: [defineArrayMember({ type: 'response' })],
    }),
    // You can add more fields as needed
  ],
})
