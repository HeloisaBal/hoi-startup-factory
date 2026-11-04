/**
 * Called by the Studio's Presentation tool. It checks a one-time secret with Sanity,
 * then switches on Next.js draft mode (a cookie) so the site shows unpublished drafts.
 */
import { defineEnableDraftMode } from 'next-sanity/draft-mode'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})
