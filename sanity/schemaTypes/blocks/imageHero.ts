import { defineType, defineField } from 'sanity'

export const imageHero = defineType({
  name: 'imageHero',
  title: 'Hero — image',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
      validation: (r) => r.max(40),
    }),
    defineField({
      name: 'heading',
      type: 'string',
      validation: (r) => r.max(70),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (r) => r.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare: ({ title, media }) => ({
      title: title || 'Hero — image',
      subtitle: 'Hero — image',
      media,
    }),
  },
})
