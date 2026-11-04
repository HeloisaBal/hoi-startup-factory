import Link from 'next/link'
import { PinIcon } from './EventCard'
import { categoryLabel, formatDate, formatTimeRange, isUpcoming, paragraphs, type EventItem } from '@/lib/events'

export function EventDetail({ event }: { event: EventItem }) {
  const upcoming = isUpcoming(event)
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
          <div className="mt-8 flex flex-col gap-3 text-lg text-white/90 sm:flex-row sm:gap-8">
            <p>
              <span className="font-semibold">{formatDate(event.start)}</span>
              <br className="sm:hidden" /><span className="sm:ml-2">{formatTimeRange(event.start, event.end)}</span>
            </p>
            {event.location && (
              <p className="flex items-center gap-2"><PinIcon className="h-5 w-5 shrink-0" /> {event.location}</p>
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
        <div className="mx-auto max-w-3xl">
          {event.imageUrl && (
            <img src={event.imageUrl} alt={event.imageAlt || ''} className="mb-12 w-full rounded-[var(--radius-card)] object-cover shadow-lg" />
          )}
          {event.summary && <p className="text-xl leading-relaxed text-ink">{event.summary}</p>}
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
            {paragraphs(event.description).map((p, i) => <p key={i} className="whitespace-pre-line">{p}</p>)}
          </div>
        </div>
      </div>
    </article>
  )
}
