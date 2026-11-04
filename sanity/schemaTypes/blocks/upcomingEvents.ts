import { defineType, defineField } from 'sanity'

export const upcomingEvents = defineType({
  name: 'upcomingEvents',
  title: 'Upcoming events',
  type: 'object',
  description: 'Shows the next events automatically, by date. Add and edit events under “Events”.',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', initialValue: 'Events', validation: (r) => r.max(40) }),
    defineField({ name: 'heading', type: 'string', initialValue: 'Nächste Events', validation: (r) => r.max(80) }),
    defineField({ name: 'intro', type: 'text', rows: 2, validation: (r) => r.max(240) }),
    defineField({
      name: 'count', title: 'How many events', type: 'number', initialValue: 3,
      validation: (r) => r.required().integer().min(1).max(6),
    }),
    defineField({ name: 'showLink', title: 'Show “Alle Events” link', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'heading', count: 'count' },
    prepare: ({ title, count }) => ({ title: title || 'Upcoming events', subtitle: `Upcoming events · next ${count ?? 3}` }),
  },
})
