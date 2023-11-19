// ./schemas/category.js

import { defineField, defineType } from 'sanity'

// Install lucide.dev icons with "npm install lucide-react"
import { TagIcon } from 'lucide-react'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: () => Promise.resolve(true),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'parent',
      type: 'reference',
      to: [{ type: 'category' }],
      // This ensures we cannot select other "children"
    }),
  ],
  // Customize the preview so parents are visualized in the studio
  preview: {
    select: {
      title: 'title',
      // subtitle: 'parent.parent.parent.title',
      parent: 'parent.title',
      grandParent: 'parent.parent.title',
      greatGrandParent: 'parent.parent.parent.title',
    },
    prepare: (props: any) => {
      let subtitleParts: any = []

      if (props.greatGrandParent) {
        subtitleParts.push(props.greatGrandParent)
      }
      if (props.grandParent) {
        subtitleParts.push(props.grandParent)
      }
      if (props.parent) {
        subtitleParts.push(props.parent)
      }

      // Join the parts with ' - ' only if there are any parts to join
      const subtitle =
        subtitleParts.length > 0 ? `– ${subtitleParts.join(' - ')}` : ''

      return {
        title: props.title,
        subtitle: subtitle,
      }
    },
  },
})
