import { defineType, defineField } from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', validation: (r) => r.max(40) }),
    defineField({ name: 'heading', type: 'string', validation: (r) => r.required().max(80) }),
    defineField({ name: 'body', type: 'text', rows: 3, validation: (r) => r.max(240) }),
    defineField({ name: 'buttonLabel', type: 'string', validation: (r) => r.max(28) }),
    defineField({
      name: 'buttonHref', title: 'Button link', type: 'string',
      description: 'A page on this site (e.g. /kontakt), a full URL (https://…) or mailto:',
      validation: (r) => r.custom((href, ctx) => ((ctx.parent as { buttonLabel?: string })?.buttonLabel && !href ? 'The button needs a link' : true)),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title || 'Call to action', subtitle: 'CTA' }),
  },
})
