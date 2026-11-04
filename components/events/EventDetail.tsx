import Link from 'next/link'
import { PinIcon, RepeatIcon } from './EventCard'
import {
  categoryLabel, formatDate, formatShortDate, formatTimeRange, isUpcoming, nextSessions, paragraphs, repeatLabel,
  type EventItem,
} from '@/lib/events'

export function EventDetail({ event }: { event: EventItem }) {
  // Repeating events: show the next session, and the dates after it
  const { current, later } = nextSessions(event)
  const upcoming = isUpcoming(current)
  const repeat = repeatLabel(event)
  return (
    <article {...event.editable}>
      <header className="brand-gradient relative overflow-hidden text-white">
        <div className="container-x relative z-10 py-16 md:py-24">
          <Link href="/events" className="text-sm font-semibold text-white/80 hover:text-white">← Alle Events</Link>
          {event.category && (
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.14em] text-white/80">{categoryLabel(event.category)}</p>
          )}
          <h1 className="mt-3 max-w-3xl text-4xl md:text-5xl font-extrabold leading-[1.08] tracking-tight text-balance">
            {event.title}
          </h1>
          <div className="mt-8 flex flex-col gap-3 text-lg text-white/90 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <p>
              <span className="font-semibold">{formatDate(current.start)}</span>
              <br className="sm:hidden" /><span className="sm:ml-2">{formatTimeRange(current.start, current.end)}</span>
            </p>
            {event.location && (
              <p className="flex items-center gap-2"><PinIcon className="h-5 w-5 shrink-0" /> {event.location}</p>
            )}
            {repeat && (
              <p className="flex items-center gap-2"><RepeatIcon className="h-5 w-5 shrink-0" /> {repeat}</p>
            )}
          </div>
          {upcoming && event.registrationUrl && (
            <a href={event.registrationUrl}
              className="mt-10 inline-flex items-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-700 transition hover:-translate-y-0.5 hover:shadow-xl">
              {event.registrationLabel || 'Jetzt anmelden'}
            </a>
          )}
          {!upcoming && (
            <p className="mt-10 inline-flex rounded-full bg-white/15 px-5 py-2 text-sm font-semibold">Dieses Event hat bereits stattgefunden</p>
          )}
        </div>
      </header>

      <div className="container-x py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div>
            {event.imageUrl && (
              <img src={event.imageUrl} alt={event.imageAlt || ''} className="mb-12 w-full rounded-[var(--radius-card)] object-cover shadow-lg" />
            )}
            {event.summary && <p className="text-xl leading-relaxed text-ink">{event.summary}</p>}
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              {paragraphs(event.description).map((p, i) => <p key={i} className="whitespace-pre-line">{p}</p>)}
            </div>
          </div>

          {later.length > 0 && (
            <aside className="h-fit rounded-[var(--radius-card)] border border-line bg-surface p-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-brand-600">Weitere Termine</h2>
              <ul className="mt-4 space-y-3">
                {later.map((o) => (
                  <li key={o.id} className="text-sm">
                    <span className="font-semibold">{formatShortDate(o.start)}</span>
                    <br /><span className="text-muted">{formatTimeRange(o.start, o.end)}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>
      </div>
    </article>
  )
}
