import { apiPlugin, storyblokInit, type ISbStoryData } from '@storyblok/react/rsc'
import { components } from '@/components/storyblok/registry'

/**
 * Storyblok connection.
 *  - STORYBLOK_ACCESS_TOKEN: the space's *Preview* token (Settings → Access Tokens).
 *  - STORYBLOK_VERSION: "draft" shows unsaved/unpublished changes (use on localhost and on the
 *    preview deployment the Visual Editor points to); "published" for the live site.
 *  - STORYBLOK_REGION: "eu" unless the space was created in another region.
 */
export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: process.env.STORYBLOK_REGION || 'eu' },
  components,
})

export const version: 'draft' | 'published' =
  process.env.STORYBLOK_VERSION === 'published' ? 'published'
  : process.env.STORYBLOK_VERSION === 'draft' ? 'draft'
  : process.env.NODE_ENV === 'production' ? 'published' : 'draft'

/** Fetch one story by slug ("home", "partner", "site-settings"). Returns null if it doesn't exist. */
export async function getStory(slug: string): Promise<ISbStoryData | null> {
  try {
    const { data } = await getStoryblokApi().get(
      `cdn/stories/${slug}`,
      { version, resolve_links: 'url' },
      version === 'draft' ? { cache: 'no-store' } : { next: { tags: ['storyblok'] } }
    )
    return data.story ?? null
  } catch (err: unknown) {
    if ((err as { status?: number })?.status === 404) return null
    throw err
  }
}
