import { defineType, defineField, defineArrayMember } from 'sanity'

export const audienceHero = defineType({
  name: 'audienceHero',
  title: 'Hero — audience picker',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
      validation: (r) => r.max(40),
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      initialValue: 'Wer besucht uns heute?',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'subtext',
      type: 'text',
      rows: 2,
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'cards',
      title: 'Audience cards',
      type: 'array',
      validation: (r) => r.min(2).max(4),
      description: 'Two to four. Three looks best.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: (r) => r.required().max(30),
            }),
            defineField({
              name: 'description',
              type: 'string',
              validation: (r) => r.max(70),
            }),
            defineField({
              name: 'href',
              title: 'Links to',
              type: 'string',
              validation: (r) => r.required(),
              description: 'e.g. /startups or /investoren',
            }),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              description: 'Shown at the top of the card. Falls back to the icon below if left empty.',
              fields: [defineField({
        name: 'alt', title: 'Alt text', type: 'string',
        description: 'Describe the image in a few words — read aloud to blind visitors and used by Google.',
        validation: (r) => r.custom((alt, ctx) => ((ctx.parent as { asset?: unknown })?.asset && !alt ? 'Please describe the image' : true)),
      })],
            }),
            defineField({
              name: 'icon',
              title: 'Fallback icon',
              type: 'string',
              description: 'Used only when no photo is set.',
              options: {
                list: [
                  { title: 'Student — graduation cap', value: 'student' },
                  { title: 'Investor — chart', value: 'investor' },
                  { title: 'Startup — rocket', value: 'startup' },
                  { title: 'Company — building', value: 'company' },
                  { title: 'Researcher — beaker', value: 'researcher' },
                ],
              },
              initialValue: 'student',
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'href', media: 'image' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'question' },
    prepare: ({ title }) => ({
      title: title || 'Audience picker',
      subtitle: 'Hero — audience picker',
    }),
  },
})
