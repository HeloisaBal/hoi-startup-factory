import { defineLive } from 'next-sanity/live'

import { client } from './client'
import { token } from './token'

/**
 * `sanityFetch` replaces `client.fetch` everywhere on the site:
 *  - normal visitors get published content, and the page refreshes by itself
 *    the moment something is published (no 60-second wait, no redeploy).
 *  - in draft mode (inside the Studio's Presentation tool) it returns drafts
 *    with click-to-edit markers.
 * `<SanityLive />` (rendered in app/layout.tsx) keeps the connection open.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})
