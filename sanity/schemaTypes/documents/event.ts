import { defineType, defineField } from 'sanity'
import { EVENT_CATEGORIES, REPEAT_OPTIONS } from '../../../lib/events'

const fmt = (iso?: string) =>
  iso ? new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso)) : ''

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required().max(80) }),
    defineField({
      name: 'slug', title: 'Web address', type: 'slug',
      options: { source: 'title' },
      description: 'Becomes /events/… Click “Generate” to create it from the title.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'start', title: 'Starts', type: 'datetime',
      options: { timeStep: 15 },
      description: 'Bremen time. For a repeating event: the first date. Past events move to “Vergangene Events” automatically.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'end', title: 'Ends', type: 'datetime', options: { timeStep: 15 },
      validation: (r) =>
        r.custom((end, ctx) => {
          const start = (ctx.document as { start?: string } | undefined)?.start
          return end && start && end <= start ? 'The end must be after the start' : true
        }),
    }),
    defineField({
      name: 'repeat', title: 'Repeats', type: 'string',
      options: { list: REPEAT_OPTIONS, layout: 'radio' },
      initialValue: 'none',
      description: 'For regular events: enter it once and the site always shows the next dates.',
    }),
    defineField({
      name: 'repeatUntil', title: 'Repeats until', type: 'date',
      description: 'Optional. Leave empty to keep repeating.',
      hidden: ({ document }) => !document?.repeat || document.repeat === 'none',
      validation: (r) =>
        r.custom((until, ctx) => {
          const start = (ctx.document as { start?: string } | undefined)?.start
          return until && start && until < start.slice(0, 10) ? 'Must be after the first date' : true
        }),
    }),
    defineField({
      name: 'category', title: 'Type', type: 'string',
      options: { list: EVENT_CATEGORIES, layout: 'radio', direction: 'horizontal' },
      initialValue: 'meetup',
    }),
    defineField({
      name: 'location', type: 'string',
      initialValue: 'hoi startup factory, Arberger Hafendamm 1, Bremen',
      description: 'Address, or “Online (Zoom)”.',
    }),
    defineField({
      name: 'summary', title: 'Short description', type: 'text', rows: 2,
      description: 'Shown on the event cards. One or two sentences.',
      validation: (r) => r.max(200),
    }),
    defineField({
      name: 'description', title: 'Full description', type: 'text', rows: 8,
      description: 'Shown on the event page. Leave an empty line between paragraphs.',
    }),
    defineField({
      name: 'image', type: 'image', options: { hotspot: true },
      description: 'Optional. Without a photo the card shows the hoi gradient.',
      fields: [defineField({
        name: 'alt', title: 'Alt text', type: 'string',
        description: 'Describe the image in a few words — read aloud to blind visitors and used by Google.',
        validation: (r) => r.custom((alt, ctx) => ((ctx.parent as { asset?: unknown })?.asset && !alt ? 'Please describe the image' : true)),
      })],
    }),
    defineField({
      name: 'registrationUrl', title: 'Sign-up link', type: 'url',
      description: 'Link to the sign-up form (Eventbrite, Luma, Google Form…) or mailto:… Leave empty to hide the button.',
      validation: (r) => r.uri({ scheme: ['http', 'https', 'mailto'] }),
    }),
    defineField({ name: 'registrationLabel', title: 'Button text', type: 'string', initialValue: 'Jetzt anmelden', validation: (r) => r.max(28) }),
  ],
  orderings: [
    { title: 'Date, newest first', name: 'startDesc', by: [{ field: 'start', direction: 'desc' }] },
    { title: 'Date, oldest first', name: 'startAsc', by: [{ field: 'start', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', start: 'start', repeat: 'repeat', media: 'image' },
    prepare: ({ title, start, repeat, media }) => ({
      title,
      subtitle: repeat && repeat !== 'none' ? `${REPEAT_OPTIONS.find((o) => o.value === repeat)?.title} · from ${fmt(start)}` : fmt(start),
      media,
    }),
  },
})
