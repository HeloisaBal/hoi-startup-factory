import { stegaClean } from 'next-sanity'
import { urlFor } from './image'
import type { EventItem } from '@/lib/events'

/* Sanity event document → EventItem. Values used in logic (dates, links, type) are stega-cleaned
   so preview mode's invisible edit markers can't break date parsing or comparisons. */
export type SanityEvent = {
  _id: string; title?: string; slug?: string; start?: string; end?: string; category?: string
  location?: string; summary?: string; description?: string
  image?: { asset?: unknown; alt?: string }; registrationUrl?: string; registrationLabel?: string
}

export function toEventItem(e: SanityEvent, imageWidth = 800, imageHeight = 450): EventItem {
  return {
    id: e._id,
    slug: stegaClean(e.slug) ?? '',
    title: e.title ?? '',
    start: stegaClean(e.start) ?? '',
    end: stegaClean(e.end) || undefined,
    category: stegaClean(e.category),
    location: e.location,
    summary: e.summary,
    description: e.description,
    imageUrl: e.image?.asset ? urlFor(e.image).width(imageWidth).height(imageHeight).fit('crop').url() : null,
    imageAlt: e.image?.alt,
    registrationUrl: stegaClean(e.registrationUrl),
    registrationLabel: e.registrationLabel,
  }
}
