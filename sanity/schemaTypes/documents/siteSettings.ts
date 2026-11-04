import { defineType, defineField, defineArrayMember } from 'sanity'

/* A single link used in the header and footer. */
const link = defineArrayMember({
  type: 'object',
  name: 'link',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required().max(40) }),
    defineField({
      name: 'href',
      title: 'Links to',
      type: 'string',
      description: 'A page on this site (e.g. /partner), a full URL (https://…) or mailto:name@domain.de',
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
})

/**
 * Site settings — ONE document for everything that appears on every page:
 * header navigation, header button, footer text, footer columns and SEO defaults.
 * It is a "singleton": the Studio shows it as a single item, it can't be duplicated or deleted.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header', default: true },
    { name: 'footer', title: 'Footer' },
    { name: 'seo', title: 'SEO defaults' },
  ],
  fields: [
    /* ---------- Header ---------- */
    defineField({
      name: 'nav',
      title: 'Main menu',
      type: 'array',
      group: 'header',
      description: 'The links at the top left. Up to 5 — more won’t fit next to the logo.',
      validation: (r) => r.max(5),
      of: [link],
    }),
    defineField({
      name: 'headerButton',
      title: 'Header button',
      type: 'object',
      group: 'header',
      description: 'The purple button at the top right.',
      fields: [
        defineField({ name: 'label', type: 'string', validation: (r) => r.max(20) }),
        defineField({ name: 'href', title: 'Links to', type: 'string' }),
      ],
    }),

    /* ---------- Footer ---------- */
    defineField({
      name: 'footerTagline',
      title: 'Footer text',
      type: 'text',
      rows: 2,
      group: 'footer',
      description: 'Short line under the logo in the footer.',
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'address',
      type: 'text',
      rows: 2,
      group: 'footer',
      description: 'One line per row, e.g. street on the first line, postcode and city on the second.',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer columns',
      type: 'array',
      group: 'footer',
      description: 'Up to 3 columns of links.',
      validation: (r) => r.max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (r) => r.required().max(30) }),
            defineField({ name: 'links', type: 'array', of: [link], validation: (r) => r.max(6) }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal links (bottom bar)',
      type: 'array',
      group: 'footer',
      description: 'Impressum, Datenschutz, …',
      of: [link],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright name',
      type: 'string',
      group: 'footer',
      description: 'The year is added automatically. e.g. “hoi startup factory GmbH, Bremen”',
    }),

    /* ---------- SEO ---------- */
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      group: 'seo',
      description: 'Shown in the browser tab and Google when a page has no SEO title of its own.',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'The snippet Google shows under the title. Aim for 120–160 characters.',
      validation: (r) => r.max(160),
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})
