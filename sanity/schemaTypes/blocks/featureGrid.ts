import { defineType, defineField, defineArrayMember } from 'sanity'

export const featureGrid = defineType({
  name: 'featureGrid',
  title: 'Feature grid',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', validation: (r) => r.max(40) }),
    defineField({ name: 'heading', type: 'string', validation: (r) => r.required().max(80) }),
    defineField({ name: 'intro', type: 'text', rows: 3, validation: (r) => r.max(280) }),
    defineField({
      name: 'items',
      title: 'Cards',
      type: 'array',
      validation: (r) => r.min(2).max(4),
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'title', type: 'string', validation: (r) => r.required().max(60) }),
          defineField({ name: 'body', type: 'text', rows: 4, validation: (r) => r.max(260) }),
          defineField({
            name: 'icon', title: 'Icon', type: 'string',
            options: { list: [
              { title: 'Compass — funnel / direction', value: 'compass' },
              { title: 'Beaker — science / research', value: 'beaker' },
              { title: 'Handshake — partnership', value: 'handshake' },
              { title: 'Rocket — launch / scale', value: 'rocket' },
              { title: 'Coins — capital', value: 'coins' },
              { title: 'Anchor — harbour', value: 'anchor' },
            ]},
            initialValue: 'compass',
          }),
          defineField({ name: 'href', title: 'Optional link', type: 'string' }),
        ],
        preview: { select: { title: 'title', subtitle: 'icon' } },
      })],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Feature grid', subtitle: 'Feature grid' }),
  },
})
