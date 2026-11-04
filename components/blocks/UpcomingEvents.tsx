import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc'
import { UpcomingEventsSection } from '@/components/events/UpcomingEventsSection'
import { getEvents } from '@/lib/storyblok-events'
import { splitEvents } from '@/lib/events'

/* The "Upcoming events" section: loads the events itself and shows the next ones by date. */
export async function UpcomingEvents({ blok }: { blok: SbBlokData & Record<string, any> }) {
  const { upcoming } = splitEvents(await getEvents())
  return (
    <UpcomingEventsSection
      editable={storyblokEditable(blok) as Record<string, string>}
      eyebrow={blok.eyebrow} heading={blok.heading} intro={blok.intro}
      count={Number(blok.count) || 3}
      showLink={blok.show_link !== false}
      events={upcoming}
    />
  )
}
