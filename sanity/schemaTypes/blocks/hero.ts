import { defineType, defineField, defineArrayMember } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow (small label above heading)', type: 'string', validation: (r) => r.max(40) }),
    defineField({ name: 'heading', type: 'string', validation: (r) => r.required().max(70) }),
    defineField({
      name: 'headingMark',
      title: 'Highlighted words (blue box)',
      type: 'string',
      description: 'Optional. Appears after the heading in a blue highlight box, like the current site.',
      validation: (r) => r.max(40),
    }),
    defineField({ name: 'subheading', type: 'text', rows: 3, validation: (r) => r.max(240) }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      validation: (r) => r.max(2),
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', validation: (r) => r.required().max(28) }),
          defineField({ name: 'href', title: 'Link', type: 'string', validation: (r) => r.required() }),
          defineField({
            name: 'style', type: 'string',
            options: { list: [{ title: 'Solid', value: 'solid' }, { title: 'Outline', value: 'outline' }], layout: 'radio' },
            initialValue: 'solid',
          }),
        ],
        preview: { select: { title: 'label', subtitle: 'href' } },
      })],
    }),
    defineField({
      name: 'image', type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare: ({ title, media }) => ({ title: title || 'Hero', subtitle: 'Hero', media }),
  },
})
