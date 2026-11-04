import { defineType, defineField, defineArrayMember } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      description: 'Internal name of the page. Also used as the browser-tab title if the SEO title is empty.',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      group: 'content',
      options: { source: 'title' },
      description:
        'The part after the domain: “partner” becomes /partner. Use “home” for the homepage. Changing it breaks existing links to this page.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      description: 'The page is built from these blocks, top to bottom. Drag to reorder, click + to add one.',
      of: [
        defineArrayMember({ type: 'hero' }),
        defineArrayMember({ type: 'audienceHero' }),
        defineArrayMember({ type: 'imageHero' }),
        defineArrayMember({ type: 'featureGrid' }),
        defineArrayMember({ type: 'stats' }),
        defineArrayMember({ type: 'textImage' }),
        defineArrayMember({ type: 'logoWall' }),
        defineArrayMember({ type: 'cta' }),
        defineArrayMember({ type: 'upcomingEvents' }),
      ],
      options: {
        insertMenu: {
          views: [{ name: 'list' }],
          groups: [
            { name: 'hero', title: 'Top of page (hero)', of: ['hero', 'audienceHero', 'imageHero'] },
            { name: 'content', title: 'Content', of: ['featureGrid', 'textImage', 'stats'] },
            { name: 'events', title: 'Events', of: ['upcomingEvents'] },
            { name: 'other', title: 'Logos & call to action', of: ['logoWall', 'cta'] },
          ],
        },
      },
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      description: 'Title in the browser tab and on Google. Leave empty to use the page title.',
      validation: (r) => r.max(60).warning('Google cuts titles longer than ~60 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'The snippet under the title on Google. Leave empty to use the site description.',
      validation: (r) => r.max(160).warning('Google cuts descriptions longer than ~160 characters.'),
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({ title, subtitle: slug === 'home' ? '/ (homepage)' : `/${slug ?? ''}` }),
  },
})
