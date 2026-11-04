/* Small helpers to turn Storyblok field values into what HTML needs. */

/** Storyblok "Asset" field */
export type SbAsset = { filename?: string | null; alt?: string | null; focus?: string | null } | undefined | null

/** Storyblok "Link" field (multilink): a page in Storyblok, an external URL, or an email */
export type SbLink =
  | { linktype?: 'story' | 'url' | 'email' | 'asset'; cached_url?: string; url?: string; email?: string; story?: { full_slug?: string } }
  | undefined
  | null

/** Image URL through Storyblok's free image service (resize/crop/webp on the fly). */
export function sbImage(asset: SbAsset, width = 0, height = 0): string | null {
  if (!asset?.filename) return null
  const focus = asset.focus ? `/filters:focal(${asset.focus})` : ''
  return `${asset.filename}/m/${width}x${height}${focus}`
}

/** Link field → href. Pages become "/slug", "home" becomes "/". */
export function sbHref(link: SbLink): string {
  if (!link) return '#'
  if (link.linktype === 'email') return link.email ? `mailto:${link.email}` : '#'
  if (link.linktype === 'url' || link.linktype === 'asset') return link.url || link.cached_url || '#'
  const slug = link.story?.full_slug ?? link.cached_url ?? ''
  if (!slug) return '#'
  if (slug === 'home' || slug === 'home/') return '/'
  return slug.startsWith('/') || slug.startsWith('http') ? slug : `/${slug.replace(/\/$/, '')}`
}
