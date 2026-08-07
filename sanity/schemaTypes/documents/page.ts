import { defineType, defineField, defineArrayMember } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug', type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
      description: 'Use "home" for the homepage.',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({ type: 'hero' }),
        defineArrayMember({ type: 'featureGrid' }),
        defineArrayMember({ type: 'stats' }),
        defineArrayMember({ type: 'textImage' }),
        defineArrayMember({ type: 'logoWall' }),
        defineArrayMember({ type: 'cta' }),
      ],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
})
