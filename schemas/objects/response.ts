import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'response',
  title: 'Response',
  type: 'object',
  fields: [
    defineField({
      name: 'statusCode',
      title: 'Status Code',
      type: 'number',
      description: 'The HTTP status code of the response.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of what the response indicates.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'code',
      description: 'An example or schema of the response body.',
      options: {
        language: 'json',
      },
    }),
  ],
})
