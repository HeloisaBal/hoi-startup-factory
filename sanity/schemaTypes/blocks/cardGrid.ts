import { defineType, defineField, defineArrayMember } from 'sanity'

export const cardGrid = defineType({
  name: 'cardGrid',
  title: 'Card grid',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string' }),
    defineField({
      name: 'cards',
      type: 'array',
      validation: (r) => r.min(2).max(4),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'body', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Card grid', subtitle: 'Card grid' }),
  },
})