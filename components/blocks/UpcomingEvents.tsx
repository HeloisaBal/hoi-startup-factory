import { stegaClean } from 'next-sanity'
import { UpcomingEventsSection } from '@/components/events/UpcomingEventsSection'
import { toEventItem, type SanityEvent } from '@/sanity/lib/events'

/* The "Upcoming events" section. Its events come from PAGE_QUERY (next 6 by date). */
export function UpcomingEvents({ eyebrow, heading, intro, count, showLink, events }: {
  eyebrow?: string; heading?: string; intro?: string; count?: number; showLink?: boolean; events?: SanityEvent[]
}) {
  return (
    <UpcomingEventsSection
      eyebrow={eyebrow} heading={heading} intro={intro}
      count={Number(stegaClean(count)) || 3}
      showLink={showLink !== false}
      events={(events ?? []).map((e) => toEventItem(e))}
    />
  )
}
