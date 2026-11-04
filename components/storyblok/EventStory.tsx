import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc'
import { EventDetail } from '@/components/events/EventDetail'
import { toEventItem } from '@/lib/storyblok-events'

/** The "event" content type, as shown at /events/<slug> and in the Visual Editor. */
export function EventStory({ blok }: { blok: SbBlokData & Record<string, any> }) {
  const event = toEventItem(blok as never, '', '', 1400, 700)
  return <EventDetail event={{ ...event, editable: storyblokEditable(blok) as Record<string, string> }} />
}
