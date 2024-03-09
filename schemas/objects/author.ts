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
      name: 'bio',
      type: 'text',
      title: 'Biography',
      // Optional: If you want the bio to support rich text (bold, italic, links)
      of: [{ type: 'block' }],
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
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
