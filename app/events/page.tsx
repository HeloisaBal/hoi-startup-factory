import type { Metadata } from 'next'
import { EventsListing } from '@/components/events/EventsListing'
import { getEvents } from '@/lib/storyblok-events'

export const metadata: Metadata = {
  title: 'Events — hoi startup factory',
  description: 'Workshops, Pitch Nights und Meetups für Gründer:innen im Nordwesten.',
}

// Re-check every 10 minutes (and on publish, via the webhook) so passed events move to "Vergangene Events".
export const revalidate = 600

export default async function EventsPage() {
  return <EventsListing events={await getEvents()} />
}
