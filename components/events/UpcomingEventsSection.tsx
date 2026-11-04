import Link from 'next/link'
import { SectionHeading } from '@/components/ui'
import { EventCard } from './EventCard'
import type { EventItem } from '@/lib/events'

/** Homepage (or any page) section: the next few events, picked automatically by date. */
export function UpcomingEventsSection({
  eyebrow, heading, intro, events, count = 3, showLink = true, editable,
}: {
  eyebrow?: string; heading?: string; intro?: string; events: EventItem[]
  count?: number; showLink?: boolean; editable?: Record<string, string>
}) {
  const shown = events.slice(0, Math.max(1, Math.min(count || 3, 6)))
  return (
    <section {...editable} className="py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={eyebrow} heading={heading || 'Nächste Events'} intro={intro} />
          {showLink && (
            <Link href="/events" className="shrink-0 font-semibold text-brand-600 hover:underline">
              Alle Events →
            </Link>
          )}
        </div>

        {shown.length > 0 ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        ) : (
          <p className="mt-12 rounded-[var(--radius-card)] border border-dashed border-line p-10 text-center text-muted">
            Gerade sind keine Events geplant. Schauen Sie bald wieder vorbei.
          </p>
        )}
      </div>
    </section>
  )
}
