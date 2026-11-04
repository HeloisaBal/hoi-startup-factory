import { defineDocuments, defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

/**
 * Tells the Presentation tool (the "click-to-edit" view in the Studio)
 * which URL shows which document, and the other way round.
 */
export const resolve: PresentationPluginOptions['resolve'] = {
  // URL → document: opening "/" or "/partner" in the preview selects that page in the editor
  mainDocuments: defineDocuments([
    { route: '/', filter: `_type == "page" && slug.current == "home"` },
    { route: '/events/:slug', filter: `_type == "event" && slug.current == $slug` },
    { route: '/:slug', filter: `_type == "page" && slug.current == $slug` },
  ]),
  // document → URL: shows "Used on: /partner" at the top of a document
  locations: {
    page: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: doc?.slug === 'home' ? '/' : `/${doc?.slug}` },
        ],
      }),
    }),
    event: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/events/${doc?.slug}` },
          { title: 'All events', href: '/events' },
          { title: 'Homepage (upcoming events)', href: '/' },
        ],
      }),
    }),
    siteSettings: defineLocations({
      message: 'Shown on every page (header & footer)',
      tone: 'positive',
      locations: [{ title: 'Homepage', href: '/' }],
    }),
  },
}
