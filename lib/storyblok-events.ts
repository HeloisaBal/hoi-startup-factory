import { connection } from 'next/server'
import type { ISbStoryData } from '@storyblok/react/rsc'
import { getStoryblokApi, version } from './storyblok'
import { sbHref, sbImage, type SbAsset, type SbLink } from './storyblok-helpers'
import type { EventItem } from './events'

/** Storyblok "Datetime" fields are stored in UTC as "2026-11-05 17:30". */
export const sbDate = (v?: string) => (v ? `${v.trim().replace(' ', 'T')}:00Z` : '')

type EventContent = {
  _uid: string; title?: string; start?: string; end?: string; category?: string; location?: string
  summary?: string; description?: string; image?: SbAsset; registration_link?: SbLink; registration_label?: string
}

export function toEventItem(content: EventContent, slug: string, fallbackTitle = '', w = 800, h = 450): EventItem {
  const href = sbHref(content.registration_link)
  return {
    id: content._uid,
    slug,
    title: content.title || fallbackTitle,
    start: sbDate(content.start),
    end: sbDate(content.end) || undefined,
    category: content.category,
    location: content.location,
    summary: content.summary,
    description: content.description,
    imageUrl: sbImage(content.image, w, h),
    imageAlt: content.image?.alt ?? undefined,
    registrationUrl: href === '#' ? undefined : href,
    registrationLabel: content.registration_label,
  }
}

/** All event stories in the "events" folder. */
export async function getEvents(): Promise<EventItem[]> {
  if (version === 'draft') await connection() // drafts: fetch on every request (see getStory)
  const { data } = await getStoryblokApi().get(
    'cdn/stories',
    { version, starts_with: 'events/', content_type: 'event', per_page: 100, sort_by: 'content.start:asc' },
    version === 'draft' ? { cache: 'no-store' } : { next: { tags: ['storyblok'] } }
  )
  return (data.stories as ISbStoryData[]).map((s) => toEventItem(s.content as EventContent, s.slug, s.name))
}
