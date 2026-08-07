import { defineType, defineField } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'subheading',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(200),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare: ({ title, media }) => ({ title: title || 'Hero', subtitle: 'Hero', media }),
  },
})