import { defineType, defineField, defineArrayMember } from 'sanity'

export const logoWall = defineType({
  name: 'logoWall',
  title: 'Partner logos',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', validation: (r) => r.max(40) }),
    defineField({ name: 'heading', type: 'string', validation: (r) => r.max(80) }),
    defineField({
      name: 'logos', type: 'array',
      validation: (r) => r.min(3),
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'image', type: 'image', validation: (r) => r.required() }),
          defineField({ name: 'href', title: 'Website (optional)', type: 'url' }),
        ],
        preview: { select: { title: 'name', media: 'image' } },
      })],
    }),
    defineField({
      name: 'scroll', title: 'Scroll automatically', type: 'boolean',
      initialValue: true,
      description: 'On: logos glide across. Off: static grid.',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Partner logos', subtitle: 'Partner logos' }),
  },
})
