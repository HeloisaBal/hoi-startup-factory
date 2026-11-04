import type { Metadata } from 'next'
import { EventsListing } from '@/components/events/EventsListing'
import { sanityFetch } from '@/sanity/lib/live'
import { EVENTS_QUERY } from '@/sanity/lib/queries'
import { toEventItem, type SanityEvent } from '@/sanity/lib/events'

export const metadata: Metadata = {
  title: 'Events — hoi startup factory',
  description: 'Workshops, Pitch Nights und Meetups für Gründer:innen im Nordwesten.',
}

// Re-check hourly so events that have passed move to "Vergangene Events" without anyone publishing.
export const revalidate = 3600

export default async function EventsPage() {
  const { data } = await sanityFetch({ query: EVENTS_QUERY })
  const events = ((data as SanityEvent[] | null) ?? []).map((e) => toEventItem(e))
  return <EventsListing events={events} />
}
