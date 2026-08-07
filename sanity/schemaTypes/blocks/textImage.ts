import { defineType, defineField, defineArrayMember } from 'sanity'

export const textImage = defineType({
  name: 'textImage',
  title: 'Text + image',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', validation: (r) => r.max(40) }),
    defineField({ name: 'heading', type: 'string', validation: (r) => r.required().max(80) }),
    defineField({ name: 'body', type: 'text', rows: 6, validation: (r) => r.max(700) }),
    defineField({
      name: 'bullets', title: 'Bullet points', type: 'array',
      validation: (r) => r.max(5),
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'image', type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'imageSide', title: 'Image position', type: 'string',
      options: { list: [{ title: 'Right', value: 'right' }, { title: 'Left', value: 'left' }], layout: 'radio' },
      initialValue: 'right',
    }),
    defineField({
      name: 'background', title: 'Background', type: 'string',
      options: { list: [{ title: 'White', value: 'white' }, { title: 'Light grey', value: 'surface' }], layout: 'radio' },
      initialValue: 'white',
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare: ({ title, media }) => ({ title: title || 'Text + image', subtitle: 'Text + image', media }),
  },
})
