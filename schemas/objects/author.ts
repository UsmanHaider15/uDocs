import { defineType } from 'sanity'

export default defineType({
  name: 'author',
  type: 'document',
  title: 'Author',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      type: 'string',
      title: 'Role',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bio',
      type: 'text',
      title: 'Biography',
      // Optional: If you want the bio to support rich text (bold, italic, links)
      // @ts-ignore
      of: [{ type: 'block' }],
    },
    {
      name: 'authorImage',
      type: 'image',
      title: 'Author Image',
      options: {
        hotspot: true, // Enables image cropping
      },
    },
    // Optional: Include more fields as needed, such as social media links
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
