import Link from 'next/link'
import { EventCard } from './EventCard'
import { formatDate, splitEvents, type EventItem } from '@/lib/events'

/** The /events page: upcoming events as cards, past events as a short list. */
export function EventsListing({ events }: { events: EventItem[] }) {
  const { upcoming, past } = splitEvents(events)
  return (
    <>
      <section className="brand-gradient relative overflow-hidden text-white">
        <div className="container-x relative z-10 py-20 md:py-24 text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-white/80">Events</p>
          <h1 className="mx-auto max-w-3xl text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-balance">
            Jede Woche bei hoi
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            Workshops, Pitch Nights und Meetups für Gründer:innen, Forschende und Partner im Nordwesten.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Kommende Events</h2>
          {upcoming.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          ) : (
            <p className="mt-8 text-muted">Gerade sind keine Events geplant.</p>
          )}

          {past.length > 0 && (
            <>
              <h2 className="mt-20 text-xl font-bold tracking-tight text-muted">Vergangene Events</h2>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {past.slice(0, 10).map((e) => (
                  <li key={e.id} {...e.editable}>
                    <Link href={`/events/${e.slug}`} className="flex flex-col gap-1 py-4 transition-colors hover:text-brand-600 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-semibold">{e.title}</span>
                      <span className="text-sm text-muted">{formatDate(e.start)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  )
}
