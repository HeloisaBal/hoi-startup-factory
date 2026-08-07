import { defineType, defineField, defineArrayMember } from 'sanity'

export const stats = defineType({
  name: 'stats',
  title: 'Stats band',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', validation: (r) => r.max(80) }),
    defineField({
      name: 'items',
      type: 'array',
      validation: (r) => r.min(2).max(4),
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'value', type: 'string', validation: (r) => r.required().max(12) }),
          defineField({ name: 'label', type: 'string', validation: (r) => r.required().max(50) }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      })],
    }),
  ],
  preview: { prepare: () => ({ title: 'Stats band', subtitle: 'Stats' }) },
})
